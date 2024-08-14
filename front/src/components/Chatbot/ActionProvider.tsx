import React from 'react';
import { MdUploadFile, MdMenuBook } from "react-icons/md";
import { GiRead } from "react-icons/gi";
import { ImProfile } from "react-icons/im";

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

  handleProfileImageQuery = () => {
    const message = this.createChatBotMessage(
        "Para subir una imagen de perfil, debes de acercarte a Mi Perfil, luego haz click en Cambiar Foto de Perfil, Finalmente elige la foto de perfil deseada y haz click en guardar."
    );
    this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
    }));
  };

  handleUploadComicQuery = () => {
    const message = this.createChatBotMessage(
      "Para subir un comic, debes de dirigirte a tu perfil, y haz click en añadir un comic, y se te ofrecerá una interfaz y campos para completar la subida de un comic propio. Recuerda que los comics deben de ser aceptados por el administrador antes de su publicación. ¿Deseas saber más acerca de la interfaz de subida de comic?",
      {
        widget: "uploadComicOptions",
      }
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleUploadComicDetails = () => {
    const message = this.createChatBotMessage(
      "Deberás agregar un título, en Nombre del Cómic. Una descripción del Cómic. Debes seleccionar por lo menos una categoría. Puedes elegir múltiples también. Seleccionar el tipo de Comic y el Idioma del Comic. Por último podrás agregar una portada que será la primera imágen, y por consecuente las demás páginas que se ordenan automaticamente, aún que puedes editar la paginación con nuestras herramientas."
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  // Nueva función para manejar el menú
  handleMenu = () => {
    const message = this.createChatBotMessage(
      "No estoy seguro de lo que necesitas. Aquí tienes algunas opciones que puedo ayudarte con:",
      {
        widget: "menuOptions",
      }
    );

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;