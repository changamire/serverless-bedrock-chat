import React, { useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import useWebSocket from 'react-use-websocket';
import ReactMarkdown from 'react-markdown';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import lens from './assets/lens.png';
import spinner from './assets/spinner.gif';

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const REGION = 'us-east-1';
const USER_POOL_ID = 'us-east-1_VflMq57x5';
const USER_POOL_WEB_CLIENT_ID = '3r3dvigfnkpl8aav5e6ldlon9v';
const API_ENDPOINT = 'wss://bvqcwbye4l.execute-api.us-east-1.amazonaws.com/dev/';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: USER_POOL_ID,
    userPoolWebClientId: USER_POOL_WEB_CLIENT_ID,
  },
});

function App() {
  const [response, setResponse] = useState('');
  
   const { lastMessage, sendJsonMessage, readyState } = useWebSocket(API_ENDPOINT);//, {
  //   onOpen: () => {
  //     console.log('WebSocket connection established.');
  //   },
  //   onMessage(event) {
  //     console.log(readyState);
  //     if (event.data != 'End') {
  //       // Indicates no more tokens
  //       const a = response + event.data;
  //       setResponse(a);
  //       setChatMessages(chatMessages);
  //     }
  //   },
  //   share: true,
  //   filter: () => false,
  //   retryOnError: true,
  //   shouldReconnect: () => true,
  // });

  useEffect(() => {
    if (lastMessage !== null) {
      //setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(lastMessage.data);
      setResponse(response+lastMessage.data);
    }
  }, [lastMessage, setResponse]);

  const handleUserMessage = async (userMessage) => {
    // Create a new user message object
    const newUserMessage = {
      message: userMessage,
      sender: 'user',
      direction: 'outgoing',
    };

    setResponse('');
    // Update chat messages state with the new user message
    const updatedChatMessages = [...chatMessages, newUserMessage];
    setChatMessages(updatedChatMessages);
    sendJsonMessage({
      action: 'ask',
      data: userMessage,
      token: (await Auth.currentSession()).getIdToken().getJwtToken(),
    });

  };

  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');


  const [chatMessages, setChatMessages] = useState([
    {
      message: 'Hello, I am ChatGPT!',
      sender: 'ChatGPT',
    },
  ]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '700px' }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {chatMessages.map((message, i) => {
              return (
                <Message key={i} model={message} style={message.sender === 'ChatGPT' ? { textAlign: 'left' } : {}} />
              );
            })}
          </MessageList>
          <MessageInput placeholder="Type Message here" onSend={handleUserMessage} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default withAuthenticator(App);
