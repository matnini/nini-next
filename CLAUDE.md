# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NINI is a Next.js 14 content creator platform that gamifies TikTok creation through rankings, streaks, and mission pools. The platform rewards creators for consistency rather than follower counts, features educational content through "NotUniversity", and connects brands with creators through UGC and content editing services.

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Fonts**: Inter (sans), JetBrains Mono (mono)
- **UI Components**: Radix UI primitives via shadcn/ui ("new-york" style)
- **Analytics**: Vercel Analytics
- **State Management**: React Context (LanguageProvider for i18n)

## Architecture

### Internationalization (i18n)

The app uses a **custom React Context-based i18n system** (not next-intl or similar libraries):

- **Context**: `contexts/language-context.tsx` provides `LanguageProvider` and `useLanguage()` hook
- **Translations**: `lib/translations.ts` contains all Spanish/English translations
- **Storage**: Language preference persists in localStorage
- **Usage**: Components call `const { t, language, setLanguage } = useLanguage()` and `t('translationKey')`

When adding new UI text:
1. Add keys to both `es` and `en` objects in `lib/translations.ts`
2. Use `t()` function in components, never hardcode text

### Routing & Pages

- **App Router structure**: All routes in `app/` directory
- **Key routes**:
  - `/` - Main landing page with leaderboard, mission pools, FAQ
  - `/onboarding` - User onboarding flow
  - `/dashboard` - User dashboard (has loading state)
  - `/profile/[username]` - Dynamic user profiles
  - `app/api/ranking/route.ts` - Ranking API endpoint
  - `app/api/profile/[username]/route.ts` - Profile API endpoint

### Component Organization

```
components/
├── ui/                    # shadcn/ui components (Button, Input, Card, etc.)
├── mission-pools.tsx      # Mission pools with brand partnerships
├── gradient-stars-background.tsx  # Animated background
└── [feature-components].tsx  # Various feature components
```

**Important**: All components use path alias `@/` which maps to project root (configured in `tsconfig.json` and `components.json`).

### Data Flow

- **Mock Data**: Currently uses `lib/mock-data.ts` for demo purposes
- **API Routes**: Next.js API routes in `app/api/` simulate backend with artificial delays
- **Future Backend**: API routes are structured to easily swap mock data with real database calls

### Styling System

- **Design Tokens**: CSS variables defined in `app/globals.css` for theming
- **Dark Mode**: Configured via Tailwind's `class` strategy
- **shadcn/ui config**: `components.json` defines import aliases and styling preferences
- **Radius**: Uses CSS variable `--radius` for consistent border radius

## Key Features

1. **Leaderboard System**: Ranks users by "NINI Score" based on consistency (streak, videos uploaded)
2. **Mission Pools**: Brand partnerships where creators earn based on video views
3. **NotUniversity**: Free educational content (Marketing on Tuesdays, Faceless content on Thursdays at 8PM on Discord)
4. **Multi-language**: Spanish (default) and English support
5. **Companies Section**: UGC and Clippers services for brands
6. **Manifesto**: Platform philosophy and values

## Development Guidelines

### Adding New Components

1. Use shadcn/ui CLI to add UI components: `npx shadcn@latest add [component-name]`
2. Import from `@/components/ui/[component-name]`
3. Always use the custom `useLanguage()` hook for any user-facing text

### Styling Conventions

- Use Tailwind utility classes
- Prefer semantic color tokens (`primary`, `muted-foreground`, etc.) over hardcoded colors
- Use `font-black` for headings, `font-bold` for emphasis
- Responsive design: mobile-first with `lg:` breakpoint for desktop

### TypeScript Patterns

- Strict mode enabled - all types must be explicit
- Interface definitions at top of component files
- Use `type` for union types and simple aliases
- Use `interface` for object shapes

### API Development

When creating new API routes:
1. Use Next.js App Router conventions: `app/api/[route]/route.ts`
2. Export named functions: `GET`, `POST`, etc.
3. Return `NextResponse.json()` with consistent shape: `{ success: boolean, data?: any, error?: string }`
4. Include artificial delays for realistic demo: `await new Promise(resolve => setTimeout(resolve, 100))`

### Component Patterns

- Use `"use client"` directive for interactive components (required for hooks, events)
- Prefer functional components with TypeScript
- Destructure props in function signature
- Use React 19 features where applicable

## Common Workflows

### Adding a New Translation

1. Open `lib/translations.ts`
2. Add key-value to `es` object
3. Add corresponding key-value to `en` object
4. Use in component: `t('yourNewKey')`

### Creating a New Page

1. Create `app/[route]/page.tsx`
2. Add `"use client"` if using client-side features
3. Wrap any displayed text with `t()` function
4. Update navigation in `app/page.tsx` header if needed

### Modifying Mission Pools

Edit the `missions` array in `components/mission-pools.tsx`. Each mission requires:
- `id`, `brand`, `logo` path, `budget`, `payPerView`, `viewsThreshold`, `scriptsAvailable`, `category`, `color`

