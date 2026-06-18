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


