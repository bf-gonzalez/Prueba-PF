import React from 'react';

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("buenos días") || lowerCaseMessage.includes("buenas tardes") || lowerCaseMessage.includes("buenas noches")) {
      this.actionProvider.greet();
      return;
    }

    if (lowerCaseMessage.includes("comics") && lowerCaseMessage.includes("todos")) {
      this.actionProvider.handleComicQuery();
      return;
    }

    if (lowerCaseMessage.includes("quiero") && (lowerCaseMessage.includes("leer") || lowerCaseMessage.includes("ver")) && (lowerCaseMessage.includes("comic") || lowerCaseMessage.includes("manga") || lowerCaseMessage.includes("webcomic"))) {
      this.actionProvider.handleReadRequest();
      return;
    }

    if (lowerCaseMessage.includes("comic")) {
      this.actionProvider.handleReadRequest();
    }
  }
}

export default MessageParser;