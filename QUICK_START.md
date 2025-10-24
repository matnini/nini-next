# Quick Start - Database Integration

## ✅ What's Been Set Up

I've configured your NINI project with Prisma ORM to manage your PostgreSQL database.

### Installed Packages

- `prisma` - Prisma CLI and development tools
- `@prisma/client` - Prisma Client for database queries

### Files Created

1. **`prisma/schema.prisma`** - Your database schema (converted from SQL)
2. **`lib/prisma.ts`** - Prisma Client singleton for Next.js
3. **`.env.example`** - Environment variables template
4. **`DATABASE_SETUP.md`** - Complete setup and usage guide
5. **`app/api/quests/route.ts`** - Example API route for quests
6. **`app/api/leaderboard/route.ts`** - Example API route for leaderboard

## 🚀 Next Steps

### 1. Set up your environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your database connection string
# DATABASE_URL="postgresql://username:password@host:port/database"
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

This creates the TypeScript types and client for your database.

### 3. Test the connection

You can open Prisma Studio to view your database:

```bash
npm run db:studio
```

This will open a GUI at http://localhost:5555

## 📝 Available Commands

```bash
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema changes to database
npm run db:pull      # Pull schema from database
npm run db:studio    # Open Prisma Studio (database GUI)
```

## 🔧 Usage Examples

### In API Routes

```typescript
import prisma from '@/lib/prisma'

// Get all users
const users = await prisma.user.findMany()

// Get user by ID with relations
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    submissions: true,
    rewards: true,
  },
})

// Create a new quest
const quest = await prisma.quest.create({
  data: {
    trackingCode: 'QUEST_001',
    title: 'My First Quest',
    xp: 100,
    rewardCoins: 50,
  },
})
```

### In Server Components

```typescript
import prisma from '@/lib/prisma'

export default async function QuestsPage() {
  const quests = await prisma.quest.findMany({
    where: { isActive: true }
  })

  return (
    <div>
      {quests.map(quest => (
        <div key={quest.id}>{quest.title}</div>
      ))}
    </div>
  )
}
```

## 📚 Resources

- Full setup guide: `DATABASE_SETUP.md`
- Example API routes: `app/api/quests/route.ts` and `app/api/leaderboard/route.ts`
- Prisma docs: https://www.prisma.io/docs
- Prisma Client API: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference

## 🎯 Your Database Schema

Your Prisma schema includes these models:

- **User** - User accounts with XP, coins, streaks
- **Quest** - Missions/quests for users to complete
- **Submission** - User quest submissions
- **Reward** - Rewards earned from submissions
- **N8nChatHistory** - Chat history storage

All models have proper relations set up and TypeScript types will be auto-generated!
