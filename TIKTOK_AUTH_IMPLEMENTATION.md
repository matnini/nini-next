# 🎯 TikTok Authentication Implementation Plan for NINI

**Last Updated:** 2025-10-24
**Estimated Total Time:** 16-24 hours

## 📋 Overview

This document provides a comprehensive implementation plan for adding TikTok OAuth authentication to the NINI platform. The platform currently has no authentication system, making this a greenfield implementation.

---

## 📋 **PHASE 1: Prerequisites & Setup** (2-3 hours)

### Step 1: TikTok Developer Account Setup
**Before coding anything:**

1. Go to https://developers.tiktok.com/
2. Create a developer account
3. Register a new app
4. Enable "Login Kit" product
5. Configure redirect URIs:
   - Development: `https://localhost:3000/api/auth/callback/tiktok`
   - Production: `https://yourdomain.com/api/auth/callback/tiktok`
   - ⚠️ **Must be HTTPS, max 10 URIs, no query params**
6. Request scopes you need:
   - `user.info.basic` - Avatar, display name, bio
   - `video.list` - Public videos (for ranking system)
   - Additional scopes as needed
7. Save your **Client Key** and **Client Secret**

### Step 2: Database Setup with Prisma
**Install dependencies:**
```bash
npm install prisma @prisma/client
npm install -D prisma
```

**Initialize Prisma:**
```bash
npx prisma init
```

**Create schema** (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                String    @id @default(cuid())
  username          String    @unique
  email             String?   @unique

  // TikTok OAuth fields
  tiktokId          String    @unique @map("tiktok_id")
  tiktokUsername    String    @map("tiktok_username")
  avatar            String?
  displayName       String?   @map("display_name")

  // Token management
  accessToken       String?   @map("access_token") @db.Text
  refreshToken      String?   @map("refresh_token") @db.Text
  tokenExpiresAt    DateTime? @map("token_expires_at")
  refreshExpiresAt  DateTime? @map("refresh_expires_at")

  // NINI platform data
  videos            Int       @default(0)
  streak            Int       @default(0)
  earnings          Decimal   @default(0) @db.Decimal(10, 2)
  niniScore         Int       @default(0) @map("nini_score")
  verified          Boolean   @default(false)

  // Metadata
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  // Relations
  accounts          Account[]
  sessions          Session[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String  @map("user_id")
  type              String
  provider          String
  providerAccountId String  @map("provider_account_id")
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique @map("session_token")
  userId       String   @map("user_id")
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}
```

**Run migrations:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 📋 **PHASE 2: NextAuth.js v5 Integration** (3-4 hours)

### Step 3: Install NextAuth.js v5
```bash
npm install next-auth@beta
npm install @auth/prisma-adapter
```

### Step 4: Environment Variables
**Create `.env.local`:**
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nini_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret-with-openssl-rand-base64-32"

# TikTok OAuth
TIKTOK_CLIENT_KEY="your-client-key-from-tiktok-dev-portal"
TIKTOK_CLIENT_SECRET="your-client-secret-from-tiktok-dev-portal"
```

**Create `.env.example` (for version control):**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/nini_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
TIKTOK_CLIENT_KEY="your-tiktok-client-key"
TIKTOK_CLIENT_SECRET="your-tiktok-client-secret"
```

**Generate secret:**
```bash
openssl rand -base64 32
```

### Step 5: Create Custom TikTok Provider
**File:** `lib/auth/tiktok-provider.ts`

```typescript
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

interface TikTokProfile {
  open_id: string
  union_id: string
  avatar_url: string
  avatar_url_100: string
  avatar_large_url: string
  display_name: string
  bio_description: string
  profile_deep_link: string
  is_verified: boolean
  follower_count: number
  following_count: number
  likes_count: number
  video_count: number
}

export default function TikTokProvider<P extends TikTokProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize/",
      params: {
        scope: "user.info.basic,video.list",
        response_type: "code",
      },
    },
    token: {
      url: "https://open.tiktokapis.com/v2/oauth/token/",
      async request({ params, provider }) {
        const response = await fetch(provider.token.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_key: options.clientId,
            client_secret: options.clientSecret,
            code: params.code,
            grant_type: "authorization_code",
            redirect_uri: params.redirect_uri,
          }),
        })

        const tokens = await response.json()
        return { tokens }
      },
    },
    userinfo: {
      url: "https://open.tiktokapis.com/v2/user/info/",
      async request({ tokens, provider }) {
        const response = await fetch(provider.userinfo.url, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })

        const data = await response.json()
        return data.data.user
      },
    },
    profile(profile) {
      return {
        id: profile.open_id,
        name: profile.display_name,
        email: null, // TikTok doesn't provide email
        image: profile.avatar_url_100,
        tiktokUsername: profile.display_name,
        verified: profile.is_verified,
      }
    },
    style: {
      logo: "/tiktok-logo.svg",
      logoDark: "/tiktok-logo-dark.svg",
      bg: "#000",
      text: "#fff",
      bgDark: "#fff",
      textDark: "#000",
    },
    options,
  }
}
```

### Step 6: Configure NextAuth
**File:** `app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import TikTokProvider from "@/lib/auth/tiktok-provider"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.tiktokId = user.tiktokId
        session.user.niniScore = user.niniScore
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})

export { handlers as GET, handlers as POST }
```

---

## 📋 **PHASE 3: Auth Context & UI** (2-3 hours)

### Step 7: Create Auth Context
**File:** `contexts/auth-context.tsx`

```typescript
"use client"

import { createContext, useContext, ReactNode } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthContextType {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  login: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  const login = async () => {
    await signIn("tiktok", { callbackUrl: "/dashboard" })
  }

  const logout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return (
    <AuthContext.Provider value={{ session, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
```

### Step 8: Update Root Layout
**File:** `app/layout.tsx` (add AuthProvider)

```typescript
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "@/contexts/auth-context"

// ... existing imports

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <AuthProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
```

### Step 9: Create Login Page
**File:** `app/login/page.tsx`

```typescript
"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function LoginPage() {
  const { login, status } = useAuth()
  const { t } = useLanguage()

  if (status === "authenticated") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-black">{t('loginTitle')}</h1>
          <p className="mt-2 text-muted-foreground">{t('loginSubtitle')}</p>
        </div>

        <Button
          onClick={login}
          className="w-full"
          size="lg"
          disabled={status === "loading"}
        >
          {status === "loading" ? t('loading') : t('loginWithTikTok')}
        </Button>
      </div>
    </div>
  )
}
```

### Step 10: Update Translations
**File:** `lib/translations.ts` (add auth keys)

```typescript
export const translations = {
  es: {
    // ... existing translations
    loginTitle: "Inicia sesión en NINI",
    loginSubtitle: "Conecta tu cuenta de TikTok para empezar",
    loginWithTikTok: "Continuar con TikTok",
    logout: "Cerrar sesión",
    myProfile: "Mi perfil",
    loading: "Cargando...",
    welcome: "Bienvenido",
  },
  en: {
    // ... existing translations
    loginTitle: "Sign in to NINI",
    loginSubtitle: "Connect your TikTok account to get started",
    loginWithTikTok: "Continue with TikTok",
    logout: "Sign out",
    myProfile: "My profile",
    loading: "Loading...",
    welcome: "Welcome",
  },
}
```

---

## 📋 **PHASE 4: Protected Routes & Middleware** (1-2 hours)

### Step 11: Create Middleware
**File:** `middleware.ts` (at project root)

```typescript
export { auth as middleware } from "@/app/api/auth/[...nextauth]/route"

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/api/user/:path*"],
}
```

### Step 12: Update Dashboard
**File:** `app/dashboard/page.tsx`

```typescript
"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { session, status } = useAuth()
  const { t } = useLanguage()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/login")
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-black">
        {t('welcome')}, {session?.user?.name}!
      </h1>
      {/* Dashboard content */}
    </div>
  )
}
```

---

## 📋 **PHASE 5: Token Refresh Logic** (2-3 hours)

### Step 13: Create Token Refresh Utility
**File:** `lib/auth/refresh-token.ts`

```typescript
export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: process.env.TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })

    const tokens = await response.json()

    if (!response.ok) throw tokens

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? refreshToken,
      expiresAt: Math.floor(Date.now() / 1000) + tokens.expires_in,
      refreshExpiresAt: Math.floor(Date.now() / 1000) + tokens.refresh_expires_in,
    }
  } catch (error) {
    console.error("Error refreshing access token:", error)
    throw error
  }
}
```

### Step 14: Add Refresh Logic to NextAuth Callbacks
Update `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { refreshAccessToken } from "@/lib/auth/refresh-token"

// In callbacks:
async jwt({ token, account, profile }) {
  // Initial sign in
  if (account && profile) {
    return {
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      expiresAt: account.expires_at,
      ...token,
    }
  }

  // Token still valid
  if (Date.now() < token.expiresAt * 1000) {
    return token
  }

  // Token expired, refresh it
  try {
    const refreshedTokens = await refreshAccessToken(token.refreshToken)
    return {
      ...token,
      ...refreshedTokens,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}
```

---

## 📋 **PHASE 6: TikTok API Integration** (2-3 hours)

### Step 15: Fetch User TikTok Data
**File:** `lib/tiktok/api.ts`

```typescript
export async function getTikTokUserInfo(accessToken: string) {
  const response = await fetch("https://open.tiktokapis.com/v2/user/info/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()
  return data.data.user
}

export async function getTikTokUserVideos(accessToken: string) {
  const response = await fetch("https://open.tiktokapis.com/v2/video/list/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      max_count: 20,
    }),
  })

  const data = await response.json()
  return data.data.videos
}
```

### Step 16: Create API Route for Syncing TikTok Data
**File:** `app/api/user/sync-tiktok/route.ts`

```typescript
import { auth } from "@/app/api/auth/[...nextauth]/route"
import { getTikTokUserInfo, getTikTokUserVideos } from "@/lib/tiktok/api"
import { prisma } from "@/lib/prisma"

export async function POST() {
  const session = await auth()

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const accessToken = session.accessToken

  try {
    const [userInfo, videos] = await Promise.all([
      getTikTokUserInfo(accessToken),
      getTikTokUserVideos(accessToken),
    ])

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        avatar: userInfo.avatar_url_100,
        displayName: userInfo.display_name,
        verified: userInfo.is_verified,
        videos: videos.length,
      },
    })

    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: "Failed to sync" }, { status: 500 })
  }
}
```

### Step 17: Create Prisma Client
**File:** `lib/prisma.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 📋 **PHASE 7: UI Components** (2-3 hours)

### Step 18: User Avatar Component
**File:** `components/user-avatar.tsx`

```typescript
"use client"

import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"

export function UserAvatar() {
  const { session, logout } = useAuth()
  const { t } = useLanguage()

  if (!session?.user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session.user.image} alt={session.user.name} />
          <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => window.location.href = "/dashboard"}>
          {t('myProfile')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Step 19: Add Login Button to Header
**Update:** `app/page.tsx` (in header section)

```typescript
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

// In header:
const { status, login } = useAuth()

{status === "authenticated" ? (
  <UserAvatar />
) : (
  <Button onClick={login}>
    {t('loginWithTikTok')}
  </Button>
)}
```

---

## 📋 **PHASE 8: Testing & Refinement** (2-3 hours)

### Step 20: Test OAuth Flow
1. Start dev server: `npm run dev`
2. Click "Login with TikTok"
3. Authorize on TikTok
4. Verify redirect to dashboard
5. Check database for user record
6. Test token refresh (wait 24 hours or manipulate expiry)
7. Test logout

### Step 21: Error Handling
**File:** `app/auth/error/page.tsx`

```typescript
"use client"

import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-black mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">Error: {error}</p>
        <Button onClick={() => window.location.href = "/"}>
          Return Home
        </Button>
      </div>
    </div>
  )
}
```

---

## 🎯 **Key Technical Details**

### TikTok OAuth Endpoints:
- **Authorization:** `https://www.tiktok.com/v2/auth/authorize/`
- **Token:** `https://open.tiktokapis.com/v2/oauth/token/`
- **User Info:** `https://open.tiktokapis.com/v2/user/info/`
- **Video List:** `https://open.tiktokapis.com/v2/video/list/`
- **Revoke:** `https://open.tiktokapis.com/v2/oauth/revoke/`

### Token Lifespans:
- **Access Token:** 24 hours (86,400 seconds)
- **Refresh Token:** 365 days (31,536,000 seconds)

### Required Scopes:
- `user.info.basic` - Avatar, display name, bio
- `video.list` - Public videos

### OAuth Flow Parameters:
**Authorization Request:**
- `client_key` - Your TikTok app client key
- `response_type` - Always `code`
- `scope` - Comma-separated list of scopes
- `redirect_uri` - Must match registered URI
- `state` - CSRF protection token

**Token Exchange:**
- `client_key` - Your TikTok app client key
- `client_secret` - Your TikTok app client secret
- `code` - Authorization code from callback
- `grant_type` - `authorization_code` or `refresh_token`
- `redirect_uri` - Same as authorization request

---

## ⚠️ **Important Gotchas**

1. **HTTPS Required:** Redirect URIs must be HTTPS (use ngrok for local dev)
   ```bash
   # Install ngrok
   npm install -g ngrok

   # Start tunnel
   ngrok http 3000

   # Use the HTTPS URL in TikTok developer portal
   ```

2. **No Email:** TikTok doesn't provide email addresses - use `open_id` as unique identifier

3. **Rate Limits:** TikTok API has rate limits - cache data and implement retry logic

4. **Token Storage:** Store tokens server-side only (never in localStorage or client-side)

5. **CSRF Protection:** Always validate `state` parameter in OAuth callback

6. **Refresh Before Expiry:** Refresh tokens 1 hour before expiration to avoid gaps

7. **Redirect URI Must Match Exactly:** Query params and trailing slashes matter

8. **Client-Side Components:** NextAuth requires client components - use `"use client"` directive

---

## 📦 **Files Summary**

### New Files (16):
1. `prisma/schema.prisma` - Database schema
2. `.env.local` - Environment variables (gitignored)
3. `.env.example` - Example environment template
4. `lib/prisma.ts` - Prisma client singleton
5. `lib/auth/tiktok-provider.ts` - Custom TikTok OAuth provider
6. `lib/auth/refresh-token.ts` - Token refresh logic
7. `lib/tiktok/api.ts` - TikTok API functions
8. `app/api/auth/[...nextauth]/route.ts` - NextAuth configuration
9. `app/api/user/sync-tiktok/route.ts` - TikTok data sync endpoint
10. `app/login/page.tsx` - Login page
11. `app/auth/error/page.tsx` - Error page
12. `contexts/auth-context.tsx` - Auth context provider
13. `components/user-avatar.tsx` - User avatar dropdown
14. `middleware.ts` - Route protection middleware

### Modified Files (4):
1. `app/layout.tsx` - Add SessionProvider & AuthProvider
2. `app/page.tsx` - Add login button/user avatar
3. `app/dashboard/page.tsx` - Add auth check
4. `lib/translations.ts` - Add auth translations

---

## 🚀 **Quick Start Commands**

```bash
# 1. Install dependencies
npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client

# 2. Initialize Prisma
npx prisma init

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Generate secret
openssl rand -base64 32

# 5. Run migrations
npx prisma migrate dev --name init
npx prisma generate

# 6. Start development server with HTTPS (for OAuth)
ngrok http 3000
# Or configure local HTTPS

# 7. Update TikTok Developer Portal with redirect URI
# https://your-ngrok-url.ngrok.io/api/auth/callback/tiktok

# 8. Test the flow
npm run dev
```

---

## 📚 **Resources**

- [TikTok Login Kit Documentation](https://developers.tiktok.com/doc/login-kit-web/)
- [TikTok OAuth Token Management](https://developers.tiktok.com/doc/oauth-user-access-token-management)
- [NextAuth.js v5 Documentation](https://authjs.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

---

## 🎯 **Testing Checklist**

- [ ] TikTok developer app created and configured
- [ ] Database schema migrated successfully
- [ ] Environment variables set correctly
- [ ] Login button appears on homepage
- [ ] OAuth flow redirects to TikTok
- [ ] Authorization succeeds and redirects back
- [ ] User record created in database
- [ ] Access token stored securely
- [ ] Dashboard shows user information
- [ ] User avatar dropdown works
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] Token refresh works after 24 hours
- [ ] Error page displays on auth failure
- [ ] Translations work in both languages

---

## 💡 **Next Steps After Implementation**

1. **Add TikTok Video Sync:** Automatically sync user's TikTok videos to calculate NINI score
2. **Implement Streak Tracking:** Track daily video uploads for streak calculation
3. **Integrate Ranking System:** Use real TikTok data instead of mock data
4. **Add Analytics:** Track OAuth conversion rates and user engagement
5. **Implement Webhooks:** Listen for TikTok account changes
6. **Add Social Features:** Connect users, comments, collaboration
7. **Optimize Performance:** Add caching layer for TikTok API responses
8. **Security Audit:** Review token storage and API security

---

**Last Updated:** 2025-10-24
**Version:** 1.0
**Status:** Ready for Implementation
