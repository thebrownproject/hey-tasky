# HeyTasky

![Status](https://img.shields.io/badge/status-complete-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

> AI-powered task manager that uses OpenAI API to automatically enhance and restructure user task inputs

🔗 **Live Demo:** [heytasky.netlify.app](https://heytasky.netlify.app)

---

## Overview

HeyTasky transforms the way users create todos by integrating AI directly into the task creation workflow. Users enter tasks in natural language, and the OpenAI API automatically transforms them into JARVIS inpired tasks with wit and personality. The application demonstrates a practical use case for LLM integration in productivity tools, showing how AI can enhance user input without requiring structured formats.

---

## Tech Stack

**Frontend:** SvelteKit · TypeScript · TailwindCSS <br>
**AI/ML:** OpenAI API <br>
**Data Persistence:** LocalStorage <br>
**State Management:** Svelte 5 Runes <br>

---

## Features

- Natural language task input processed through OpenAI API
- Real-time AI transformation of user input into formatted tasks with personality
- Secure server-side API architecture (API keys never exposed to browser)
- Full CRUD operations (create, read, update, delete)
- Task completion tracking with persistent state
- LocalStorage persistence across browser sessions
- Responsive UI with loading states during AI processing
- Component-based architecture with TypeScript type safety

---

## Architecture & Tech Decisions

Built with SvelteKit and the OpenAI API to explore AI-augmented user interfaces. The application uses a secure server-side architecture. The user input is sent to a SvelteKit API endpoint which processes it through OpenAI's API with a custom JARVIS-inspired system prompt, then returns the enhanced version. This keeps API keys secure on the server, never exposing them to the browser. Chose LocalStorage for data persistence to keep the project lightweight and client-side focused. Svelte 5's new runes provide clean reactivity patterns for managing task state and edit modes.

---

## Learnings & Challenges

**Key Learnings:**

- Implementing OpenAI API integration in a SvelteKit application
- Managing asynchronous AI responses with proper loading states and error handling
- Using Svelte 5's runes ($state, $derived) for reactive state management

**Challenges Overcome:**

- Implementing secure server-side API endpoint to protect OpenAI API keys from client-side exposure
- Designing prompts that consistently return clean, formatted task descriptions with personality
- Managing component state across create/edit modes with TypeScript type safety
- Refactoring duplicated code into reusable components for better maintainability

---

## Quick Start

```bash
npm install
npm run dev
# Requires .env with OPENAI_API_KEY
```

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your_api_key_here
```
