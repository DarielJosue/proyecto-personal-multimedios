# Proyecto: Propiedad Intelectual, Marcas y Emprendimiento

## Breve descripción

Aplicación interactiva que explica —mediante secciones enriquecidas y audio— conceptos de propiedad intelectual (derechos de autor, marcas y patentes), con ejemplos y un caso práctico.

## Objetivo

Proveer una guía visual y accesible para personas emprendedoras en Costa Rica sobre mecanismos de protección de activos intangibles.

## Tecnologías

- Angular (framework front-end)
- TypeScript
- Three.js (biblioteca 3D) — si se usa en `src/components/interactive-diagram`
- Node.js / Express (servidor para SSR cuando aplica)

## Requisitos previos

- Node.js (recomendado v16+ / v18+)
- npm (v8+ / la versión incluida con su instalación de Node)

## Clonar el repositorio

Clona el repositorio con el siguiente comando (reemplaza la URL por la del repositorio real):

```bash
git clone https://github.com/DarielJosue/proyecto-personal-multimedios.git
```

## Instalación de dependencias

```bash
npm ci
```

## Ejecución en desarrollo

```bash
npm start
```

Abre `http://localhost:4200` en tu navegador.

## Generar build de producción

```bash
npm run build
```

La salida de producción se escribe en `dist/proyecto-personal`.

## Comandos útiles

- `npm ci` — instalar dependencias de forma reproducible
- `npm start` — servidor de desarrollo (Angular dev server)
- `npm run build` — crear build de producción
- `npm run watch` — construir en modo watch (development)

## Estructura básica del proyecto

- `src/` — código fuente Angular
  - `app/` — componentes y servicios de la aplicación
  - `assets/` — recursos estáticos embebidos en `public/` via configuración
- `public/assets/` — imágenes, audios y datos JSON consumidos por la app
- `dist/` — salida de la compilación

## Documentación y referencias

La documentación de apoyo, créditos y referencias se encuentra en:

- `docs/referencias.md` — créditos, enlaces y recursos consultados

## Créditos

Las imágenes y recursos multimedia utilizados están referenciados en `docs/referencias.md`

## Capturas del proyecto

Galería de pantallas del proyecto en PC y movil:

![Captura 1](public/assets/captures/Captura%20de%20pantalla%201.png)

![Captura 2](public/assets/captures/Captura%20de%20pantalla%202.png)

![Captura 3](public/assets/captures/Captura%20de%20pantalla%203.png)

![Captura 4](public/assets/captures/Captura%20de%20pantalla%204.png)

![Captura 5](public/assets/captures/Captura%20de%20pantalla%205.png)

![Captura 6](public/assets/captures/Captura%20de%20pantalla%206.png)

![Captura 7](public/assets/captures/Captura%20de%20pantalla%207.png)

![Captura 8](public/assets/captures/Captura%20de%20pantalla%208.png)


