export const validateLogin = (values: { email: string; password: string }) => {
  const errors: { [key: string]: string } = {};

  if (!values.email) {
      errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email no es válido";
  }
  
  if (!values.password) {
      errors.password = "La contraseña es requerida";
  }

  return errors;
};
