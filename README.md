# Web Playground

A modern code playground for HTML, CSS, and JavaScript. Built to understand how iframes work in real applications.

## Features

- Live preview with real-time updates
- Syntax highlighting with CodeMirror 6
- Dark mode with system preference detection
- Code formatting with Prettier
- Console output capture
- Responsive design
- Collapsible editors

## Why I Built This

I wanted to understand how code playgrounds like CodePen work, specifically:
- Iframe sandboxing and security
- postMessage API for cross-frame communication
- Console output capture from iframes
- Building performant live preview systems

## Architecture

**Iframe Sandboxing**: Preview runs in a sandboxed iframe using `srcdoc` for HTML injection. Provides security, isolation, and real execution.

**Cross-Frame Communication**: Console methods are intercepted in the iframe and sent to the parent via `postMessage`.

**Performance**: Debounced updates (300ms), memoized components, smart auto-scroll.

**State Management**: React Context for theme, local state for code/logs, proper cleanup.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- CodeMirror 6
- Prettier
- Radix UI

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # Theme context
├── hooks/          # useDebounce hook
└── lib/            # Formatter utilities
```

## Key Technical Decisions

1. **Security**: Iframe sandboxing prevents XSS, proper message validation
2. **Performance**: Debouncing, memoization, optimized re-renders
3. **Type Safety**: Full TypeScript coverage
4. **Architecture**: Clean separation, reusable components
5. **Error Handling**: Graceful error handling throughout

## License

MIT
