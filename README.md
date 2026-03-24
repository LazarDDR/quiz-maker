# Quiz Application

A React-based quiz management application built with TypeScript and Material-UI.

## Features

- Create, edit, and delete quizzes
- Question pool system - reuse questions across quizzes
- Play mode for taking quizzes
- Delete confirmation dialogs
- Toast notifications
- Persistent storage with localStorage

## Tech Stack

- **React 19.2.3** - UI framework
- **TypeScript 4.9.5** - Type safety
- **Material-UI 7.3.6** - Component library
- **styled-components 6.1.19** - CSS-in-JS
- **React Router 6.30.3** - Navigation
- **Yup 1.7.1** - Form validation

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Testing

```bash
npm test
```

Tests have not been implemented, this is an area for improvement.

## Architecture

```
src/
├── features/quizzes/       # Quiz feature module
│   ├── api/               # API layer (ready for backend)
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Business logic helpers
│   ├── validation/       # Form validation
│   └── types/            # TypeScript types
├── shared/               # Shared utilities
│   ├── components/       # Reusable components
│   └── hooks/           # Shared hooks
└── theme/               # Theme configuration
```

## Data Flow

**Component → API → Helper → Storage (localStorage)**

- Components call API methods
- API layer delegates to helper functions
- Helpers handle business logic and storage
- Ready for backend integration (just replace API implementations)

## Storage

Two separate localStorage keys:

- `quizzes` - Quiz data
- `questions` - Question pool (persists after quiz deletion)
