import React, { useState } from 'react';
import { MdSupportAgent } from "react-icons/md";
import ChatbotComponent from './Chatbot';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialMessageShown, setInitialMessageShown] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!initialMessageShown) {
      setInitialMessageShown(true);
    }
  };

  return (
    <div>
      {!isOpen && (
        <div 
          onClick={toggleChatbot} 
          className="fixed bottom-4 right-4 cursor-pointer z-50 text-black bg-yellow-400 border-4 border-rose-800 rounded-xl"
        >
          <MdSupportAgent size={50} />
        </div>
      )}
      {isOpen && (
        <div className="fixed bottom-16 right-4 z-50">
          <ChatbotComponent initialMessageShown={initialMessageShown} />
          <button 
            onClick={toggleChatbot} 
            className="absolute top-0 right-0 mt-2 mr-2 text-white bg-red-500 rounded-full p-1"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;