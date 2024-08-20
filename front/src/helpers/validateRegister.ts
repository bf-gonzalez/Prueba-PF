export const validateRegister = (values: { [key: string]: string }) => {
    const errors: { [key: string]: string } = {};
  
    if (!values.name) {
        errors.name = "El nombre es requerido";
    }
  
    if (!values.email) {
        errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "El email no es válido";
    }
  
    if (!values.password) {
        errors.password = "La contraseña es requerida";
    } else if (values.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos una letra mayúscula";
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un número";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
        errors.password = "La contraseña debe contener al menos un símbolo";
    }
  
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Las contraseñas deben coincidir";
    }
  
    if (!/^\d{10,}$/.test(values.phone)) {
        errors.phone = "El teléfono debe tener al menos 10 dígitos";
    }
  
    if (!values.address) {
        errors.address = "La dirección es requerida";
    }
  
    if (!values.dob) {
        errors.dob = "La fecha de nacimiento es requerida";
    } else {
        const today = new Date();
        const dob = new Date(values.dob);
        if (dob > today) {
            errors.dob = "La fecha de nacimiento no puede ser futura";
        } else {
            let age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 18) {
                errors.dob = "Debes tener al menos 18 años";
            }
        }
    }
  
    if (!values.username) {
        errors.username = "El nombre de usuario es requerido";
    } else if (values.username.length < 4) {
        errors.username = "El nombre de usuario debe tener al menos 4 letras";
    }
  
    return errors;
};

export const validateCompleteProfile = (values: { [key: string]: string }) => {
    const errors: { [key: string]: string } = {};
  
  
    if (!/^\d{10,}$/.test(values.phone)) {
        errors.phone = "El teléfono debe tener al menos 10 dígitos";
    }
  
    if (!values.address) {
        errors.address = "La dirección es requerida";
    }
  
    if (!values.dob) {
        errors.dob = "La fecha de nacimiento es requerida";
    } else {
        const today = new Date();
        const dob = new Date(values.dob);
        if (dob > today) {
            errors.dob = "La fecha de nacimiento no puede ser futura";
        } else {
            let age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            if (age < 18) {
                errors.dob = "Debes tener al menos 18 años";
            }
        }
    }
  
    return errors;
  };
