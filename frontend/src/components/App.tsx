import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import useWebSocket from 'react-use-websocket';
import ReactMarkdown from 'react-markdown';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import lens from './assets/lens.png';
import spinner from './assets/spinner.gif';

const REGION = 'us-east-1';
const USER_POOL_ID = '';
const USER_POOL_WEB_CLIENT_ID = '';
const API_ENDPOINT = '';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
  },
});

function App() {
  const { lastJsonMessage, sendJsonMessage, readyState } = useWebSocket(
    API_ENDPOINT,
    {
      onOpen: () => {
        console.log('WebSocket connection established.');
      },
      onMessage(event) {
        if (event.data != 'End') { // Indicates no more tokens
          if (!event.data.includes('Endpoint request timed out')) { // Exclude APIGateway timeout message
            setAnswer(answer + event.data);
          }
        } else {
          setLoading(false);
        }
      },
      share: true,
      filter: () => false,
      retryOnError: true,
      shouldReconnect: () => true,
    },
  );

  const sendPrompt = async (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    setAnswer('');
    setLoading(true);
    sendJsonMessage({
      action: 'ask',
      data: prompt,
      token: (await Auth.currentSession()).getIdToken().getJwtToken(),
    });
  };

  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  return (
    <div className="app">
      <div className="app-container">
        <div className="spotlight__wrapper">
          <input
            type="text"
            className="spotlight__input"
            placeholder="Ask me anything..."
            style={{
              backgroundImage: `url(${lens})`,
            }}
            disabled={loading}
            style={{
              backgroundImage: loading ? `url(${spinner})` : `url(${lens})`,
            }}
            onChange={(e) => updatePrompt(e.target.value)}
            onKeyDown={(e) => sendPrompt(e)}
          />
        </div>

        <div className="answer">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
