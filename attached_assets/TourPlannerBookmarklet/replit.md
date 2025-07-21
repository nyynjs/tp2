# Replit.md

## Overview

"TourPlanner Pro" is a React-based bookmarklet generator that automatically detects Bearer tokens from TourPlanner sessions and generates personalized bookmarklets. The application is designed for deployment on Surge.sh as a static single-page application with automatic token detection capabilities and a modern responsive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Architecture
- **Deployment**: Static React application for Surge.sh hosting
- **Frontend**: React with TypeScript and modern UI components (Radix UI + Tailwind CSS)
- **Token Detection**: Client-side Bearer token extraction from browser sessions and storage
- **Build System**: Vite for optimized production builds with asset bundling
- **SPA Routing**: Wouter for lightweight client-side routing

## Key Components

### Static Bookmarklet Distribution
- Single permanent bookmarklet with embedded token detection logic
- No need for dynamic generation or user input
- Ready-to-use JavaScript code for immediate deployment

### Automatic Token Detection
- Multi-layered token detection strategy:
  1. Network request interception (XMLHttpRequest and fetch monitoring)
  2. Browser storage scanning (localStorage and sessionStorage)
  3. Performance API analysis for TourPlanner requests
- Real-time token extraction from active TourPlanner sessions
- Fallback mechanisms for different authentication scenarios

### User Interface
- Clean, responsive design with gradient backgrounds
- Step-by-step installation instructions
- Copy-to-clipboard functionality with fallback support
- Mobile-friendly responsive layout
- No external dependencies or frameworks

## Data Flow

1. **Token Detection**: Client monitors network requests to detect active TourPlanner sessions
2. **Validation**: Detected tokens are validated against TourPlanner API endpoints
3. **Generation**: Valid tokens are embedded into bookmarklet JavaScript code
4. **Distribution**: Users copy the generated bookmarklet for browser installation
5. **Usage**: Bookmarklet enhances TourPlanner interface when activated

## External Dependencies

### Database Integration
- **Neon Database**: Serverless PostgreSQL hosting
- **Connection**: Database URL via environment variables
- **Pooling**: Built-in connection pooling through Neon

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Error Handling**: Runtime error overlay for development
- **TypeScript**: Full type safety across frontend and backend

### Build & Deployment
- **esbuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- tsx for TypeScript execution on backend
- Integrated development with shared TypeScript configuration
- Replit-specific tooling for cloud development

### Production Build
- Frontend: Vite build with static asset optimization
- Backend: esbuild bundle with external dependencies
- Database: Automated migrations via Drizzle Kit
- Environment: NODE_ENV-based configuration switching

### Configuration Management
- Environment variables for database connections
- Shared TypeScript paths for import resolution
- Modular Vite configuration with conditional plugins
- CSS custom properties for themeable design system

The application follows a modern full-stack architecture with emphasis on type safety, developer experience, and production readiness. The token detection mechanism represents the core business logic, enabling seamless integration with external TourPlanner services while maintaining security through session validation.