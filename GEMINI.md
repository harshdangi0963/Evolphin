# Project Overview

This is a React-based web application built with TypeScript and Vite. It is an AI-powered Knowledge Management (KM) platform called **Nexus KM**, featuring a modern, award-worthy UI design system.

**Key Technologies:**

*   **React 19:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
*   **Tailwind CSS:** Utility-first CSS framework with a comprehensive custom design system.
*   **Gemini API:** The application interacts with a Gemini API for AI-powered features.

## Design System

The application uses a custom design system with:

*   **Typography:** Manrope (display), Inter (UI), Lora (documents)
*   **Colors:** Primary Teal (#1c7487), AI Indigo (#6366f1), with full semantic palette
*   **Animations:** Spring-based easings with fade-in, slide-up, scale-in effects
*   **Components:** Glassmorphic cards, gradient buttons, glow effects

**Architecture:**

The project follows a standard React project structure.

*   `App.tsx`: The main application component with routing.
*   `index.tsx`: The entry point of the application.
*   `index.html`: Contains the Tailwind config and design tokens.
*   `components/Layout.tsx`: Main layout with glassmorphic sidebar.
*   `pages/`: Contains the different pages of the application.
*   `constants.ts`: Contains mock data constants.
*   `types.ts`: Contains TypeScript type definitions.
*   `UI_UX_REVAMP_PLAN.md`: Comprehensive design system documentation.

# Building and Running

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:**
    Create a `.env.local` file and add your Gemini API key:
    ```
    GEMINI_API_KEY=your_api_key
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```
5.  **Preview the production build:**
    ```bash
    npm run preview
    ```

# Development Conventions

*   **Coding Style:** TypeScript with React functional components and hooks.
*   **Styling:** Tailwind CSS with custom design tokens defined in `index.html`.
*   **Animation:** CSS transitions with custom easing functions (ease-smooth, ease-spring).
*   **Components:** Reusable UI patterns with consistent `btn-lift`, `card-interactive`, `glass` classes.
