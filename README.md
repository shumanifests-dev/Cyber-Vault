# Cyber Ethics Portal

An interactive platform for cybersecurity ethics training and awareness, featuring a cyberpunk-themed interface and engaging case studies.

## Features

- 🔐 **Secure Authentication** - OAuth2 login via Google and GitHub using NextAuth
- 📚 **Interactive Case Studies** - Real-world cybersecurity scenarios with quiz-based learning
- 🎨 **Cyberpunk UI** - Immersive dark theme with glitch effects and animations
- 📊 **Dashboard** - User progress tracking and performance analytics
- 🛡️ **Security-First** - Built with TypeScript and security headers

## Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

## Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd cyber-ethics-portal
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXTAUTH_URL` - Your application URL (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET` - A secure random string for session encryption
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GITHUB_ID` & `GITHUB_SECRET` - From GitHub OAuth settings

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes (NextAuth)
│   ├── case/           # Case study pages
│   ├── dashboard/      # User dashboard
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Login page
├── components/         # Reusable React components
├── lib/                # Utility functions and helpers
└── auth.ts            # NextAuth configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint validation

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Authentication**: NextAuth v5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Linting**: ESLint

## Security Features

- ✅ CORS and XSS protection headers
- ✅ Secure session management with CSRF tokens
- ✅ OAuth2 provider integration
- ✅ Environment variable validation
- ✅ Type-safe authentication callbacks
- ✅ Robots.txt protection (no indexing)

## Development Guidelines

- Always validate environment variables on startup
- Use TypeScript for type safety
- Follow ESLint configuration
- Add proper error boundaries for components
- Test authentication flows thoroughly

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Other Platforms

Ensure Node.js 18+ is installed and use `npm run build && npm run start`.

## Contributing

When making changes:
1. Follow the existing code style
2. Add TypeScript types for new functions
3. Test authentication and API routes
4. Run `npm run lint` before committing

## Support

For issues or questions, please open a GitHub issue.
