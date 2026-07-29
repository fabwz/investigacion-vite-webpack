# Vite vs Webpack: Investigación Técnica Comparativa

Investigación con demostración técnica en vivo para el curso ISW-521 —
Programación en Ambiente Web I, que compara **Vite** y **Webpack**, dos
herramientas de build para el ecosistema de desarrollo web moderno.

## Integrantes

- Giovanni Sandi
- Fabián Zamora

## Curso

ISW-521 — Programación en Ambiente Web I
Universidad Técnica Nacional, Sede San Carlos
Docente: Bryan Miguel Chaves Salas
2026 — II Cuatrimestre

## Descripción

Este repositorio contiene una demo funcional en JavaScript vanilla (ESM, sin
frameworks) que se ejecuta indistintamente bajo Vite o bajo Webpack, usando
el mismo código fuente. El objetivo es ilustrar en vivo las diferencias
arquitectónicas entre ambas herramientas:

- **Arranque en frío**: Vite sirve el código sin empaquetar (ESM nativo del
  navegador); Webpack construye el bundle completo antes de servir.
- **Hot Module Replacement (HMR)**: ambos motores están configurados para
  actualizar componentes individuales sin recargar la página completa, cada
  uno con su propia API (`import.meta.hot` en Vite, `import.meta.webpackHot`
  en Webpack).
- **Peticiones de red**: Vite sirve 120 módulos por separado (uno por
  componente); Webpack sirve un único bundle compilado.

La aplicación de prueba monta 120 componentes generados automáticamente
(`scripts/generate-components.js`), pensados para que la diferencia de
arranque entre ambas herramientas sea perceptible.

## Requisitos previos

- [Node.js](https://nodejs.org/) v20.19+ o v22.12+
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
   git clone https://github.com/fabwz/investigacion-vite-webpack.git
   cd investigacion-vite-webpack
```

2. Instalar dependencias:
```bash
   npm install
```

3. (Opcional) Regenerar los componentes de prueba:
```bash
   npm run generate:components
```
   Esto crea 120 archivos en `src/components/generated/`. Ya vienen
   generados en el repositorio, así que este paso no es obligatorio.

## Ejecución

### Modo desarrollo con Vite

```bash
npm run dev:vite
```

Abre `http://localhost:5173/` en el navegador.

### Modo desarrollo con Webpack

```bash
npm run dev:webpack
```

Abre `http://localhost:5000/` en el navegador.

### Build de producción

```bash
npm run build:vite      # genera dist-vite/
npm run build:webpack   # genera dist-webpack/
```

## Probar el HMR en vivo

Con cualquiera de los dos servidores corriendo, edita el texto de cualquier
archivo en `src/components/generated/itemXXX.js` y guarda. El cambio se
refleja en el navegador sin recargar la página completa:

- **Vite**: revisa la consola del navegador (`[vite] hmr update`).
- **Webpack**: revisa la terminal donde corre el servidor
  (`hot-update.js` emitido).

## Estructura del proyecto

investigacion-vite-webpack/
├── config/
│ ├── webpack.config.js # Configuracion de Webpack
│ ├── webpack-template.html # Plantilla HTML especifica para Webpack
│ └── vite.config.js # Configuracion de Vite
├── src/
│ ├── index.html
│ ├── main.js # Punto de entrada + logica de HMR
│ ├── components/generated/ # 120 componentes de prueba
│ └── utils/formatPrice.js
├── scripts/
│ └── generate-components.js # Script generador de componentes
└── docs/
└── Investigacion_Vite_vs_Webpack.pdf


## Documentación

La investigación completa (arquitectura interna, comparativa técnica,
adopción en la industria, seguridad y bibliografía) está disponible en
[`docs/Investigacion_Vite_vs_Webpack.pdf`](./docs/Investigacion_Vite_vs_Webpack.pdf).
