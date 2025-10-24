# Database Setup Guide

## Prerequisites

- PostgreSQL database already set up with your schema
- Database connection credentials

## Setup Steps

### 1. Configure Environment Variables

Copy the example environment file and add your database credentials:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL` with your actual PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
```

### 2. Generate Prisma Client

After configuring your DATABASE_URL, generate the Prisma Client:

```bash
npx prisma generate
```

This will create the Prisma Client based on your schema file.

### 3. (Optional) Introspect Existing Database

If you need to sync your Prisma schema with any changes made directly to the database:

```bash
npx prisma db pull
```

### 4. (Optional) Push Schema Changes to Database

If you make changes to `prisma/schema.prisma` and want to update your database:

```bash
npx prisma db push
```

**Warning:** This is good for development but for production, use migrations.

## Usage in Your Code

### Import Prisma Client

```typescript
import prisma from '@/lib/prisma'
```

### Example Queries

#### Get all active quests

```typescript
const activeQuests = await prisma.quest.findMany({
  where: {
    isActive: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
})
```

#### Get user with their submissions

```typescript
const user = await prisma.user.findUnique({
  where: {
    id: userId,
  },
  include: {
    submissions: {
      include: {
        quest: true,
        rewards: true,
      },
    },
  },
})
```

#### Create a new submission

```typescript
const submission = await prisma.submission.create({
  data: {
    userId: userId,
    questId: questId,
    shareUrl: url,
    state: 'pending',
    metrics: {
      views: 0,
      likes: 0,
    },
  },
})
```

#### Update user's NINI coins

```typescript
const updatedUser = await prisma.user.update({
  where: {
    id: userId,
  },
  data: {
    niniCoinsBalance: {
      increment: 100,
    },
  },
})
```

#### Get leaderboard (top users by XP)

```typescript
const leaderboard = await prisma.user.findMany({
  orderBy: {
    xpTotal: 'desc',
  },
  take: 10,
  select: {
    id: true,
    username: true,
    displayName: true,
    xpTotal: true,
    niniCoinsBalance: true,
    streakDays: true,
    rank: true,
  },
})
```

## Useful Prisma Commands

- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db pull` - Pull schema from database
- `npx prisma db push` - Push schema to database
- `npx prisma migrate dev` - Create and apply migrations (for production-ready changes)
- `npx prisma format` - Format your schema file

## TypeScript Support

Prisma provides full TypeScript support. All your models are automatically typed, and you'll get autocomplete and type checking in your editor.

## Documentation

For more information, visit:
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Client API Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
