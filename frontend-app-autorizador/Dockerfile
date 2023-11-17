# Fase de construcción
FROM node:16 as build-step

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Fase de ejecución
FROM nginx:alpine

# Asegúrate de que esta ruta coincida con el outputPath en tu angular.json
COPY --from=build-step /app/dist/frontend-app-autorizador/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
