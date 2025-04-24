# Explorador de Personajes de Rick y Morty

Este proyecto es una aplicación web desarrollada con Vue.js, TypeScript y Vite, diseñada para explorar los personajes de la API de Rick y Morty. Muestra una interfaz responsiva y fácil de usar con características como scroll infinito, búsqueda y filtrado dinámicos, y un manejo robusto de errores.

**Introducción**

Como desarrollador con una sólida experiencia en TypeScript, React y Next.js, aproveché la oportunidad de adaptarme a Vue.js para este proyecto. Esta aplicación demuestra mi capacidad para aprender y aplicar rápidamente nuevas tecnologías para ofrecer una solución de alta calidad.

---

**Características Clave**

- **Listado de Personajes:** Muestra una lista completa de los personajes de la API de Rick y Morty.
- **Scroll Infinito:** Implementa el scroll infinito con un efecto de animación escalonada para proporcionar una experiencia de usuario fluida al cargar más personajes. Esto evita los cambios bruscos de diseño e indica visualmente la carga de nuevos datos.
- **Búsqueda y Filtrado Dinámicos:** Permite a los usuarios buscar y filtrar personajes de manera eficiente utilizando una entrada con "debounce". Esto optimiza el rendimiento al minimizar las solicitudes a la API y proporcionar una experiencia de búsqueda fluida.
- **Vista Detallada del Personaje:** Permite a los usuarios ver información detallada sobre personajes individuales.
- **Manejo de Errores:** Se implementa un manejo robusto de errores para gestionar fallos de la API, errores de validación de datos (utilizando Zod) y estados de carga. La interfaz de usuario proporciona información clara al usuario en todos los escenarios.
- **Validación de Datos:** Se utiliza Zod para garantizar la integridad de los datos y validar las respuestas de la API, lo que aumenta la confiabilidad de la aplicación.
- **Diseño Responsivo:** La aplicación está diseñada utilizando un enfoque "mobile-first" para garantizar una visualización e interacción óptimas en varios dispositivos.
- **Página 404:** Se incluye una página 404 personalizada para mejorar la navegación y la experiencia del usuario.
- **Arquitectura Modular:** Las funciones de solicitud de la API y la implementación de Intersection Observer están modularizadas para una mejor organización del código y reutilización.
- **Componentes de la Interfaz de Usuario:** Se utilizan componentes reutilizables de la interfaz de usuario (por ejemplo, `UISelect`, `UIButton`) para mantener un estilo coherente y simplificar las actualizaciones de la interfaz de usuario.
- **Layouts:** Se utilizan los "layouts" para estructurar la interfaz de usuario y mantener elementos comunes en diferentes vistas.
- **Pruebas:** Se implementan pruebas unitarias exhaustivas utilizando Vitest y @testing-library/vue para garantizar la calidad y el mantenimiento del código.
- **Estilos:** Se utiliza Tailwind CSS para el estilo, lo que proporciona un enfoque "utility-first" y un rápido desarrollo de la interfaz de usuario.
- **Temas Dinámicos con Selector de Colores:** La aplicación permite cambiar el color principal de la interfaz mediante un selector de temas. Se utilizan variables CSS (`--primary-color`, etc.) combinadas con utilidades extendidas de Tailwind para actualizar colores de fondo, bordes, foco y más en tiempo real.
- **Modo Claro/Oscuro:** Se incluye un switch global para cambiar entre modo claro y oscuro, utilizando la clase `dark` y utilidades de Tailwind como `dark:bg-gray-800` o `dark:text-white`. Esto mejora la accesibilidad y personalización de la experiencia del usuario.

---

**Decisiones Técnicas y Justificaciones**

- **Vue.js y TypeScript:** Elegidos por la arquitectura basada en componentes, la reactividad y la seguridad de tipos.
- **Vite:** Seleccionado por su rápido servidor de desarrollo y proceso de construcción.
- **Scroll Infinito con Animación Escalonada:** Implementado para mejorar la participación del usuario y proporcionar retroalimentación visual durante la carga de datos.
- **Búsqueda y Filtrado con "Debounce":** Optimiza las solicitudes a la API y mejora el rendimiento.
- **Zod:** Se utiliza para la validación del esquema para garantizar la integridad de los datos y manejar posibles inconsistencias en la respuesta de la API.
- **Diseño "Mobile-First":** Prioriza una experiencia perfecta en dispositivos móviles al tiempo que se escala a pantallas más grandes.
- **Modularización:** Promueve la reutilización y el mantenimiento del código, lo que facilita el desarrollo futuro.
- **Tailwind CSS:** Acelera el estilo y garantiza la coherencia.
- **Vitest y @testing-library/vue:** Elegidos para realizar pruebas unitarias eficientes dentro del ecosistema de Vue.js.
- **Temas con Variables CSS y Tailwind v4.1:** Se eligió extender Tailwind utilizando variables CSS para lograr un sistema de temas dinámico, escalable y de fácil mantenimiento. Esta decisión permite cambiar el color principal globalmente sin modificar cada componente manualmente.
- **Modo Oscuro con Tailwind:** Se habilitó el modo oscuro mediante la clase `dark` en el HTML, siguiendo las recomendaciones de Tailwind v4.1. Esto permite aplicar estilos alternativos a través de utilidades `dark:` sin duplicar lógica o clases.

**Arquitectura**

La aplicación sigue una arquitectura basada en componentes. Los componentes clave incluyen:

- **CharacterList:** Muestra la lista de personajes con scroll infinito.
- **CharacterDetails:** Muestra información detallada de un personaje seleccionado.
- **SearchFilter:** Maneja la búsqueda y el filtrado de personajes.
- **Componentes de la Interfaz de Usuario:** Elementos reutilizables de la interfaz de usuario para botones, selects, etc.
- **Layouts:** Proporciona una estructura coherente en todas las páginas.
- **Servicios de la API:** Encapsula las solicitudes a la API.
- **Hooks:** Hooks personalizados para llamadas a la API e Intersection Observer.

**Instalación y Configuración**

1.  **Clonar el repositorio:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navegar al directorio del proyecto:**

    ```bash
    cd <project_directory>
    ```

3.  **Instalar las dependencias:**

    ```bash
    npm install
    ```

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación estará accesible en `http://localhost:5173/` (o el puerto que asigne Vite).

**Ejecutar las Pruebas**

Para ejecutar las pruebas unitarias:

```bash
npm run test
```
