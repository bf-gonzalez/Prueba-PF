import React, { useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotComponent = ({ initialMessageShown }) => {
  useEffect(() => {
    if (!initialMessageShown) {
      // Lógica para mostrar el mensaje inicial
      const initialMessage = config.initialMessages[0];
      const createChatBotMessage = config.createChatBotMessage;
      const setState = config.setState;
      const message = createChatBotMessage(initialMessage);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  }, [initialMessageShown]);

  return (
    <div className="relative" style={{ backgroundColor: '#01061A', color: '#000000' }}>
      <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
    </div>
  );
};

export default ChatbotComponent;