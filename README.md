# Cyber Vault

Cyber Vault is a cybersecurity training and learning portal built with Next.js and NextAuth. It combines a dark cyberpunk interface with a secure authentication flow, training-focused landing experience, and a dashboard-driven learning workflow for security awareness and cyber defense education.

## Architecture

This project follows a simple but practical Next.js App Router architecture:

- App Router structure under `src/app` for pages, routes, and layout
- `src/auth.ts` handles the central NextAuth configuration
- Google and GitHub OAuth providers are registered for sign-in
- Environment validation is handled in `src/lib/env.ts` before app startup
- UI layers are separated into reusable components such as the cyberpunk background system and top status bar
- Security and app metadata are managed in the root layout and Next.js config

### Main architectural pieces

- `src/app/page.tsx` - landing/authentication screen
- `src/app/dashboard/page.tsx` - authenticated dashboard experience
- `src/app/case/[id]/page.tsx` - case study detail flow
- `src/app/api/auth/[...nextauth]/route.ts` - NextAuth route
- `src/auth.ts` - auth provider setup and callbacks
- `src/lib/env.ts` - required environment variable validation
- `src/components/CyberpunkBackground.tsx` - animated cyber background system
- `src/components/TopBar.tsx` - top status UI

## What is in this app

This app includes:

- a secure cyber-themed login landing page
- Google and GitHub authentication
- a dashboard area for authenticated users
- cyber training content modules and learning-focused sections
- cyber incident/case study pages
- animated red-black cyberpunk interface styling
- security-aware app configuration and environment checks

## Features

- 🔐 Google and GitHub OAuth login
- 🛡️ Cybersecurity-themed learning experience
- 📚 Training module information for phishing, threat intelligence, compliance, ransomware, forensics, and SOC operations
- 🎨 Red/black cyberpunk UI with animated background effects
- 🚦 Protected authenticated flow with dashboard redirection
- ⚙️ Runtime validation for required environment variables
- 🔒 Security headers and hardened app configuration
- 📱 Responsive landing layout for desktop and mobile screens

## Technologies used

- Next.js 16
- React 19
- TypeScript
- NextAuth v5
- Tailwind CSS
- Framer Motion
- ESLint

## Project structure

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── case/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── providers.tsx
├── auth.ts
├── components/
│   ├── CyberpunkBackground.tsx
│   └── TopBar.tsx
├── lib/
│   └── env.ts
└── types/
```

## Environment variables

Create a `.env.local` file with the following values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

## Local development

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Production build

```bash
npm run build
npm run start
```

## Notes

This app is designed as a cyber training platform with a security-focused identity layer and dark cyberpunk interface. The front end is intentionally themed around cyber defense, training, and operational awareness, while the backend/authentication flow remains simple and secure.

