# TourPlanner Pro Bookmarklet Generator

## Overview

This is a React-based web application that generates enhanced bookmarklets for the TourPlanner system. The application automatically detects authentication tokens and creates JavaScript bookmarklets that can create and automatically activate actions in TourPlanner with real-time status tracking and error handling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server bundling

### Key Components

#### Token Detection System
- **Auto-detection**: Scans localStorage and sessionStorage for Bearer tokens
- **Network Interceptors**: Monitors network requests to capture tokens
- **Manual Input**: Fallback option for manual token entry
- **Real-time Status**: Live status updates during token detection process

#### Bookmarklet Generator
- **Enhanced Bookmarklet**: Generates JavaScript code that creates TourPlanner actions with automatic activation
- **API Integration**: Direct integration with TourPlanner API endpoints
- **Error Handling**: Comprehensive error management with user-friendly messages
- **Status Tracking**: Real-time progress indicators for action creation and activation

#### UI Components
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui components built on Radix UI
- **Toast Notifications**: User feedback through toast messages
- **Interactive Features**: Copy-to-clipboard functionality, loading states, error states

## Data Flow

1. **Token Detection Flow**:
   - Application scans browser storage for existing Bearer tokens
   - Sets up network interceptors to capture new tokens
   - Provides manual input option as fallback
   - Updates UI with real-time detection status

2. **Bookmarklet Generation Flow**:
   - Takes detected or manually entered token
   - Generates enhanced JavaScript bookmarklet code
   - Includes TourPlanner API integration logic
   - Provides copy-to-clipboard functionality

3. **Bookmarklet Execution Flow** (Client-side):
   - Creates overlay UI on target webpage
   - Extracts webpage URL and metadata
   - Makes API calls to TourPlanner to create action
   - Automatically activates the created action
   - Provides real-time feedback to user

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **State Management**: @tanstack/react-query
- **UI Components**: Multiple @radix-ui packages for accessible components
- **Form Handling**: @hookform/resolvers, react-hook-form
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Utilities**: date-fns, nanoid, zod

### Database Integration
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Driver**: @neondatabase/serverless for Neon PostgreSQL
- **Migrations**: Drizzle Kit for schema management
- **Session Storage**: connect-pg-simple for PostgreSQL session store

### Development Tools
- **Build Tools**: Vite, esbuild, TypeScript
- **Development**: tsx for TypeScript execution
- **Replit Integration**: @replit/vite-plugin-cartographer, @replit/vite-plugin-runtime-error-modal

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with HMR
- **TypeScript**: Real-time type checking
- **Error Handling**: Runtime error overlay for development
- **Replit Integration**: Special plugins for Replit environment

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Asset Serving**: Express serves static files in production
- **Process Management**: Single Node.js process serves both API and static files

### Database Setup
- **Schema Location**: `shared/schema.ts` with Drizzle definitions
- **Migrations**: Generated in `./migrations` directory
- **Database URL**: Environment variable `DATABASE_URL` required
- **Connection**: Uses Neon serverless driver for PostgreSQL

### Environment Configuration
- **Development**: `NODE_ENV=development` with tsx
- **Production**: `NODE_ENV=production` with compiled JavaScript
- **Database**: Requires `DATABASE_URL` environment variable
- **Replit**: Special handling for Replit environment variables

The application is designed as a full-stack TypeScript application with a focus on developer experience and production reliability. The architecture supports both development and production environments with appropriate tooling for each phase.