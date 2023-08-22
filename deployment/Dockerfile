# Usar la imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo en la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación al contenedor
COPY . .

# Instalar las dependencias
RUN yarn install

# Exponer los puertos requeridos
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "yarn", "dev" ]
