import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdUploadFile, MdMenuBook } from "react-icons/md";
import { GiRead } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

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
    {
      widgetName: "uploadComicOptions",
      widgetFunc: (props) => (
        <div>
          <button onClick={() => props.actionProvider.handleUploadComicDetails()} style={{ marginRight: '10px' }}>
            <FaCheck size={24} />
          </button>
          <button onClick={() => props.actionProvider.handleCancel()}>
            <FaTimes size={24} />
          </button>
        </div>
      ),
    },
    {
      widgetName: "menuOptions",
      widgetFunc: (props) => (
        <div>
          <ul>
            <li onClick={() => props.actionProvider.handleUploadComicQuery()} style={{ cursor: 'pointer' }}>
              <MdUploadFile size={24} /> Subir un comic
            </li>
            <li onClick={() => props.actionProvider.handleComicQuery()} style={{ cursor: 'pointer' }}>
              <MdMenuBook size={24} /> Ver todos los comics
            </li>
            <li onClick={() => props.actionProvider.handleReadRequest()} style={{ cursor: 'pointer' }}>
              <GiRead size={24} /> Leer un comic completo
            </li>
            <li onClick={() => props.actionProvider.handleProfileImageQuery()} style={{ cursor: 'pointer' }}>
              <ImProfile size={24} /> Cambiar imagen de perfil
            </li>
          </ul>
        </div>
      ),
    },
  ],
};

export default config;