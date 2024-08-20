import React from 'react';

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("subir") || lowerCaseMessage.includes("postear") || lowerCaseMessage.includes("publicar")) {
      if (lowerCaseMessage.includes("comic") || lowerCaseMessage.includes("comics")) {
        this.actionProvider.handleUploadComicQuery();
        return;
      }
    }

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
      return;
    }

    if (lowerCaseMessage.includes("imagen de perfil") && 
        (lowerCaseMessage.includes("subir") || lowerCaseMessage.includes("poner") || lowerCaseMessage.includes("postear") || lowerCaseMessage.includes("cambiar") || lowerCaseMessage.includes("actualizar") || lowerCaseMessage.includes("modificar") || lowerCaseMessage.includes("sacar"))) {
        this.actionProvider.handleProfileImageQuery();
        return;
    }

    if (lowerCaseMessage.includes("comic") || lowerCaseMessage.includes("comics")) {
      if (lowerCaseMessage.includes("subir") || lowerCaseMessage.includes("postear") || lowerCaseMessage.includes("publicar")) {
        this.actionProvider.handleUploadComicQuery();
        return;
      }
    }

    // Si no se cumple ninguna condición, mostrar el menú
    this.actionProvider.handleMenu();
  }
}

export default MessageParser;