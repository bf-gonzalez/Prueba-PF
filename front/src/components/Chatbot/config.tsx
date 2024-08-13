import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const config = {
    botName: "MyChatbot",
    initialMessages: ["Hola, ¿en qué puedo ayudarte hoy?"],
    customStyles: {
      botMessageBox: {
        backgroundColor: "#01061A",
        color: "#000000",
      },
      chatButton: { 
        backgroundColor: "#01061A",
      },
      chatContainer: {
        backgroundColor: "#01061A", 
      },
    },
    customComponents: {
      header: () => <div style={{ backgroundColor: '#01061A', color: 'white', padding: '10px', fontSize: '18px' }}>Conversación Chatbot</div>,
      userInput: (props) => <input {...props} placeholder="Escribe tu mensaje aquí" style={{ width: '100%', padding: '10px', fontSize: '16px', color: '#000000' }} />
    },
    widgets: [
      {
        widgetName: "comicOptions",
        widgetFunc: (props) => (
          <div>
            <button onClick={() => props.actionProvider.handleAcceptComicQuery()} style={{ marginRight: '10px' }}>
              <FaCheck size={24} />
            </button>
            <button onClick={() => props.actionProvider.handleCancel()}>
              <FaTimes size={24} />
            </button>
          </div>
        ),
      },
      {
        widgetName: "readRequestOptions",
        widgetFunc: (props) => (
          <div>
            <button onClick={() => props.actionProvider.handleAcceptReadRequest()} style={{ marginRight: '10px' }}>
              <FaCheck size={24} />
            </button>
            <button onClick={() => props.actionProvider.handleCancel()}>
              <FaTimes size={24} />
            </button>
          </div>
        ),
      },
    ],
  };
  
  export default config;