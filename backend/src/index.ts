import { Handler } from 'aws-lambda';
import { Bedrock } from 'langchain/llms/bedrock';
import { BaseCallbackHandler } from 'langchain/callbacks';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';
import { DynamoDBChatMessageHistory } from '@langchain/community/stores/message/dynamodb';
import { decode, verify } from 'jsonwebtoken';
import { promisify, TextEncoder } from 'util';
import { ApiGatewayManagementApiClient, PostToConnectionCommand } from '@aws-sdk/client-apigatewaymanagementapi';
import jwksRsa from 'jwks-rsa';

const textEncoder = new TextEncoder();

const JWKS_URI = process.env.JWKS_URI ? process.env.JWKS_URI : '';
const API_GW_ENDPOINT = process.env.API_GW_ENDPOINT;
const ISSUER = process.env.ISSUER; 
const AUDIENCE = process.env.AUDIENCE ? process.env.AUDIENCE : '';

const apiGwManApiClient = new ApiGatewayManagementApiClient({
  region: process.env.AWS_REGION,
  endpoint: API_GW_ENDPOINT,
});

const client = jwksRsa({
  cache: true,
  rateLimit: true,
  jwksUri: JWKS_URI
});

export const getSigningKey = promisify(client.getSigningKey);

let connectionId: string;
let prompt: string;

async function verifyToken(token: string, publicKey: string, audience: string) {
  console.log(`Verify token`);
  await verify(token, publicKey, {
    audience: AUDIENCE,
    issuer: ISSUER,
  });
  console.log(`Verified the token for ${audience}`);
}

function decodeToken(token: string) {
  console.log(`Decode token`);
  const decoded = decode(token, { complete: true });
  console.log(`Decoded token ${JSON.stringify(decoded)}`);
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid token');
  }
  return decoded;
}

async function authorize(token: string): Promise<boolean> {
  try {
    console.log(token);
    const decodedToken = decodeToken(token);
    const signingKey = await getSigningKey(decodedToken.header.kid);

    if (signingKey) {
      const publicKey = signingKey.getPublicKey();
      let verified = false;
      const audience = AUDIENCE;

      try {
        await verifyToken(token, publicKey, audience);
        console.log(`Verified the token for ${audience}`);
        verified = true;
      } catch (err) {
        console.error('Token not verified', err);
        return false;
      }

      if (verified) {
        return true;
      }
    }
  } catch (err) {
    console.error('Token not verified', err);
    return false;
  }
  return false;
}

export const handler: Handler = async (event: any, context: any) => {
  console.log('EVENT: \n' + JSON.stringify(event, null, 2));
  connectionId = event.requestContext.connectionId;
  const routeKey = event.requestContext.routeKey;

  const memory = new BufferMemory({
    chatHistory: new DynamoDBChatMessageHistory({
      tableName: `conversationhistory`,
      partitionKey: 'id',
      sessionId: connectionId,
    }),
  });

  switch (routeKey) {
    case '$connect': {
      console.log('$connect');
      break;
    }
    case '$disconnect': {
      console.log('$disconnect');
      break;
    }
    case 'ask': {
      console.log('ask');
      const requestData = JSON.parse(event.body);
      const token = requestData.token;
      const isAuthorized = await authorize(token);
      if (!isAuthorized) {
        console.log('Not Authorized');
        return;
      } else {
        console.log('Authorized');
        prompt = requestData.data;
      }
      break;
    }
    default: {
      console.log('default');
      break;
    }
  }

  console.log(`Connection id ${connectionId}`);
  console.log(`Route key ${routeKey}`);

  const callbackHandler = BaseCallbackHandler.fromMethods({
    async handleLLMNewToken(token: string) {
      console.log('token', { token });

      const postToConnectionCommandResp = await apiGwManApiClient.send(
        new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: textEncoder.encode(token),
        }),
      );
      console.log(`postToConnectionCommand resp => ${JSON.stringify(postToConnectionCommandResp)}`);
    },
    async handleLLMEnd() {
      const postToConnectionCommandResp = await apiGwManApiClient.send(
        new PostToConnectionCommand({
          ConnectionId: connectionId,
          Data: textEncoder.encode('End'),
        }),
      );
      console.log(`postToConnectionCommand resp => ${JSON.stringify(postToConnectionCommandResp)}`);
    },
  });

  const model = new Bedrock({
    model: 'anthropic.claude-v2',
    region: 'us-east-1',
    streaming: true,
    callbacks: [callbackHandler],
    modelKwargs: { max_tokens_to_sample: 4000, temperature: 0.1 },
  });

  const chain = new ConversationChain({ llm: model, memory });
  const res = await chain.predict({input: `\n\nHuman: ${prompt} \n\nAssistant:`});
  console.log(res);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: '{}',
  };
};
