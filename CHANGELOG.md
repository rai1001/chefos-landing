# Changelog

All notable changes to this project will be documented in this file. El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

## [Unreleased] - 2026-04-05

### Added
- **Multi-Step Lead Capture:** Formulario interactivo en dos fases (`LeadCaptureMultiStep`) utilizando Framer Motion para transiciones animadas fluidas.
- **Backend (Supabase):** Implementación de cliente oficial SSR `@supabase/ssr` en la capa de utilidades (`src/lib/supabase.ts`).
- **Server Actions:** Nuevos endpoints transaccionales `savePartialLead` y `completeLeadCapture` que ocultan la lógica del lado del servidor.
- **Silent Save:** Persistencia de leads parciales ('carrito abandonado') de forma silenciosa al finalizar el Paso 1 de la Landing Page.
- **Notificaciones Speed-To-Lead:** Integrado un sistema nativo a través de webhooks de la API de Telegram (`src/lib/notifications.ts`), permitiendo alertas instantáneas a los comercios.
- **Video Cards:** Componentes `VideoDemoCard` asíncronos para lazy-loading y optimización del LCP (Largest Contentful Paint).

### Changed
- Reestructurada la `Hero Section` estática por un Grid Dinámico adaptativo con el formulario en The Fold.
- Desactivado el mock placeholder del streaming en directo de HeyGen (CLARA Live) a favor del sistema de vídeos en grid estático.

### Security
- Inyectada la restricción de base de datos a nivel Row-Level Security requerida para que inserts anónimos (`anon_insert_inbound`) exijan `source = 'inbound'` en la tabla REST.
