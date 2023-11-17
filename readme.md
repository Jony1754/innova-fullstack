# Innova Fullstack Solution

Este proyecto contiene una solución fullstack compuesta por un frontend Angular y un backend Node.js con Express, gestionados a través de Docker.

## Estructura del Proyecto

```
innova-fullstack/
├── frontend-app-autorizador/  # Aplicación Angular
└── backend/                   # API en Node.js y Express
└── docker-compose.yml         # Configuración de Docker Compose
```

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Docker y Docker Compose en tu máquina. Puedes descargarlos desde el [sitio oficial de Docker](https://www.docker.com/get-started).

## Instrucciones de Uso

Para levantar los servicios, sigue estos pasos:

1. **Clonar el Repositorio**:

   ```bash
   git clone [URL-del-repositorio]
   cd innova-fullstack
   ```

2. **Construir y Levantar los Contenedores**:

   ```bash
   docker-compose up --build
   ```

   Este comando construirá las imágenes de Docker para el frontend y backend (si es necesario) y luego iniciará los contenedores.

3. **Acceder a las Aplicaciones**:
   - **Frontend**: Abre tu navegador y ve a `http://localhost`. Deberías ver la aplicación Angular.
   - **Backend**: La API de Node.js está accesible en `http://localhost:3000`.

## Desarrollo

Para trabajar en el desarrollo de cada parte del proyecto, puedes navegar a las carpetas `frontend-app-autorizador` y `backend` respectivamente. Cada subproyecto tiene su propio conjunto de dependencias y scripts.
