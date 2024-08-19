# Comicraft 📚🎨

## Descripción

**Comicraft** es una plataforma donde los usuarios pueden leer cómics y acceder a contenido exclusivo a través de membresías. Los usuarios pueden registrarse, iniciar sesión con autenticación de terceros (como Google) y comprar diferentes tipos de membresías. Además, aquellos que adquieran la membresía de creador pueden crear y publicar sus propios cómics. Este proyecto utiliza una arquitectura moderna y segura, enfocada en ofrecer una excelente experiencia al usuario.

## Tecnologías Utilizadas

### Frontend

- **React** con **Next.js**
- **TypeScript** para tipado estático
- **Tailwind CSS** para los estilos

### Backend

- **NestJS** como framework para el backend
- **TypeORM** para la gestión de la base de datos
- **PostgreSQL** como base de datos
- **JWT** para autenticación segura
- **Cors** para permitir solicitudes cross-origin

## Características

- **Secciones**
  - **Inicio:** Página principal donde los usuarios pueden explorar cómics.
  - **Cómics:** Lista de cómics disponibles para lectura.
  - **Membresías:** Página donde los usuarios pueden comprar diferentes tipos de membresías.

- **Autenticación**
  - **Registro:** Los usuarios pueden crear una cuenta a través de un formulario de registro.
  - **Inicio de Sesión:** Autenticación mediante correo y contraseña o a través de proveedores externos como Google.
  - **Token JWT:** Después de iniciar sesión, se genera un token JWT para la autenticación de las sesiones.

- **Membresías**
  - **Membresía Básica:** Acceso limitado a los cómics.
  - **Membresía Premium:** Acceso a contenido exclusivo y sin restricciones.
  - **Membresía de Creador:** Permite a los usuarios crear y publicar sus propios cómics.

## Instalación

Sigue estos pasos para ejecutar **Comicraft** en tu máquina local:

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/TuUsuario/Comicraft.git
    ```

2. **Navegar al directorio del proyecto:**

    ```bash
    cd Comicraft
    ```

### Frontend

3. **Instalar las dependencias:**

    ```bash
    npm install
    ```

4. **Iniciar la aplicación Next.js:**

    ```bash
    npm run dev
    ```

5. **Abrir el proyecto en tu navegador:**
   - Visita `http://localhost:3001` para ver la aplicación en funcionamiento.

### Backend

6. **Configuración del Backend:**
   - Configura el entorno de NestJS y asegúrate de que PostgreSQL esté funcionando.
   - Ejecuta las migraciones de TypeORM para crear las tablas en la base de datos.
   
    ```bash
    npm install
    ```

7. **Iniciar el servidor NestJS:**

    ```bash
    npm run start:dev
    ```

## Uso

- **Registro e Inicio de Sesión**
  - **Registro:** Accede a la página de registro y crea una cuenta o utiliza Google para registrarte fácilmente.
  - **Inicio de Sesión:** Ingresa con tu cuenta y comienza a explorar el contenido disponible.

- **Membresías**
  - **Compra Membresías:** Elige entre las diferentes opciones de membresía según tus necesidades. Con la membresía de creador, puedes empezar a publicar tus propios cómics.

## Autor

Este proyecto fue desarrollado por Bruno Gonzales, Diego Gallo, Carlos Diaz, Franco Stebe, Alejandro Galarza, Douglas Diaz. Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con alguno de nosotros.
"""
