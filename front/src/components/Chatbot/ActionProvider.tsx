import React from 'react';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("¡Hola! ¿En qué puedo ayudarte hoy?");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleComicQuery = () => {
    const message = this.createChatBotMessage(
      "¿Deseas ver todos los comics de nuestros fabulosos autores?",
      {
        widget: "comicOptions",
      }
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleAcceptComicQuery = () => {
    const message = this.createChatBotMessage("Te envíaremos a nuestra página de todos los comics disponibles, recuerda que debe de tener una membresía para leerlos.");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    setTimeout(() => {
      window.location.href = "/all-comics";
    }, 3000);
  };

  handleCancel = () => {
    const message = this.createChatBotMessage("Entendido, si necesitas algo más, avísame.");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleReadRequest = () => {
    const message = this.createChatBotMessage(
      "Para leer los comics por completo de nuestros autores, es necesario una Membresía. Debes registrarte y Presionar el botón de Suscribirse. Para saber más información presionar el botón FaCheck",
      {
        widget: "readRequestOptions",
      }
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleAcceptReadRequest = () => {
    const message = this.createChatBotMessage(
      "Para comprar una membresía, dirigete al botón Subscribirse, apareceran 3 opciones. Uno mensual donde disfrutaras nuestros comics. Uno anual con descuento y una semana de antelación. Y Creador en caso de que seas un autor y deseas subir tu propio comic. El pago se realiza a través de Stripe. Recuerda leer nuestro Acuerdo y Condiciones, y consultar con soporte técnico en caso de complicaciones."
    );
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;