# Course Registration System

## Overview

A full-stack course registration web application built with React, Express, and TypeScript. The system allows students to browse courses, register for classes, and manage their enrollments. It includes an admin mode for course management with full CRUD operations. The application features a modern, accessible UI built with shadcn/ui components and follows Material Design principles inspired by educational platforms like Coursera and Canvas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui (Radix UI primitives) with the "new-york" style preset, providing accessible, customizable components.

**Styling**: Tailwind CSS with custom design tokens for colors, spacing, and typography. Supports light/dark theme switching via a custom ThemeProvider context.

**State Management**: 
- TanStack Query (React Query) for server state and caching
- Local React state (useState/useEffect) for UI state
- Custom hooks for reusable logic (useToast, useIsMobile, useTheme)

**Routing**: Wouter for client-side routing (lightweight alternative to React Router).

**Form Handling**: React Hook Form with Zod schema validation for type-safe forms.

**Data Storage**: Currently uses localStorage for client-side persistence of courses and registrations via a custom storage layer (`courseStorage.ts`). This allows the app to function without a backend initially, with the architecture designed to swap to API calls later.

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured for ES modules.

**API Design**: RESTful API structure (routes prefixed with `/api`). Currently uses an in-memory storage abstraction (`MemStorage` class) that implements an `IStorage` interface, making it easy to swap to database-backed storage.

**Data Validation**: Zod schemas shared between client and server for type safety and validation.

**Session Management**: Prepared for connect-pg-simple session store (dependency included).

**Development Setup**: 
- Vite middleware integration for HMR in development
- Custom request logging middleware
- Runtime error overlay for development debugging

### Database Schema

**ORM**: Drizzle ORM configured for PostgreSQL (Neon serverless).

**Current Schema**:
- `users` table: Basic user authentication with username/password
- Course and registration schemas defined in Zod but not yet implemented as database tables

**Migration Strategy**: Using drizzle-kit for schema migrations (config in `drizzle.config.ts`).

**Design Decision**: The application is architected to support both client-side localStorage (for initial development/demo) and PostgreSQL (for production). The storage interface pattern allows seamless transition between storage backends.

### Authentication & Authorization

**Planned Approach**: User authentication schema is defined but not yet implemented. The current system has an "Admin Mode" toggle in the UI without backend enforcement, suitable for demo purposes.

**Future Implementation**: Will use session-based authentication with PostgreSQL session store (connect-pg-simple).

### Component Architecture

**Design System**: Custom design tokens defined in CSS variables, following a system-based approach with educational platform inspiration.

**Key UI Components**:
- Navigation: Fixed header with view switching and theme toggle
- Hero: Full-width banner with integrated search
- CourseCard: Reusable card component for displaying course information
- CourseGrid: Responsive grid layout (3-column desktop, 2-column tablet, 1-column mobile)
- AdminPanel: Data table for course management with inline actions
- Forms: Modal-based forms using Dialog + Form components

**Accessibility**: All components use Radix UI primitives ensuring ARIA compliance and keyboard navigation.

## External Dependencies

### Core Dependencies

**Database & ORM**:
- `@neondatabase/serverless`: Neon PostgreSQL serverless driver
- `drizzle-orm`: Type-safe ORM for database operations
- `drizzle-zod`: Integration between Drizzle schemas and Zod validation
- `connect-pg-simple`: PostgreSQL session store for Express

**UI Libraries**:
- `@radix-ui/*`: Headless UI component primitives (17 different component packages)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Utility for creating component variants
- `clsx` + `tailwind-merge`: Conditional class name utilities

**Forms & Validation**:
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Form validation resolvers
- `zod`: Schema validation library

**Data Fetching**:
- `@tanstack/react-query`: Server state management and caching

**Development Tools**:
- `vite`: Build tool and dev server
- `typescript`: Type checking
- `tsx`: TypeScript execution for Node.js
- `esbuild`: Fast bundler for server-side code
- `@replit/vite-plugin-*`: Replit-specific development enhancements

**Utilities**:
- `wouter`: Lightweight router for React
- `date-fns`: Date manipulation library
- `nanoid`: Unique ID generation
- `cmdk`: Command menu component
- `embla-carousel-react`: Carousel/slider component

### Asset Management

The application uses a mix of:
- Stock images stored in `attached_assets/stock_images/`
- Generated images stored in `attached_assets/generated_images/`
- Images are imported and mapped to courses via the `imageMap` object in `CourseCard.tsx`

### Build & Deployment

**Development**: `npm run dev` - Runs Express server with Vite middleware for HMR
**Build**: `npm run build` - Builds client (Vite) and bundles server (esbuild)
**Production**: `npm start` - Runs built server serving static client files
**Database**: `npm run db:push` - Pushes schema changes to database