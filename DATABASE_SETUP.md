# Database Setup Guide

## Local Development Setup

### Quick Start (Recommended)

Run the automated setup script:

```bash
./setup-local-db.sh
```

This will:
1. Start PostgreSQL in Docker
2. Generate Prisma Client
3. Push the database schema
4. Display connection details

### Manual Setup

If you prefer to run commands manually:

#### 1. Start PostgreSQL Database

```bash
docker-compose -f docker-compose.dev.yml up -d
```

This starts a PostgreSQL 16 container with:
- **Host**: localhost
- **Port**: 5432
- **Database**: nini_db
- **User**: nini_user
- **Password**: nini_password

#### 2. Generate Prisma Client

```bash
npm run db:generate
```

#### 3. Push Database Schema

```bash
npm run db:push
```

This creates all tables based on your `prisma/schema.prisma` file.

### Verify Database Connection

Open Prisma Studio to view your database:

```bash
npm run db:studio
```

This opens a web interface at http://localhost:5555

## Development Workflow

### Start Development Server

```bash
npm run dev
```

Your app will run at http://localhost:3000

### Managing the Database

**View database contents:**
```bash
npm run db:studio
```

**Stop the database:**
```bash
docker-compose -f docker-compose.dev.yml down
```

**Stop and remove data:**
```bash
docker-compose -f docker-compose.dev.yml down -v
```

**View database logs:**
```bash
docker logs nini-postgres-dev
```

**Access PostgreSQL CLI:**
```bash
docker exec -it nini-postgres-dev psql -U nini_user -d nini_db
```

## Database Schema

Your Prisma schema includes:

- **User** - User profiles with XP, levels, streaks
- **Quest** - Missions/challenges with tracking codes
- **Submission** - User quest submissions
- **Reward** - XP and coin rewards
- **N8nChatHistory** - Chat session history

## Connection String

The connection string in `.env`:

```
DATABASE_URL="postgresql://nini_user:nini_password@localhost:5432/nini_db?schema=public"
```

## Production Deployment

For production with Docker Compose:

```bash
docker-compose up -d
```

This starts both the Next.js app and PostgreSQL database together.

## Troubleshooting

### Port 5432 already in use

If you have another PostgreSQL instance running:

```bash
# Stop other PostgreSQL services
sudo systemctl stop postgresql

# Or change the port in docker-compose.dev.yml
ports:
  - "5433:5432"  # Use port 5433 instead
```

Then update your `.env`:
```
DATABASE_URL="postgresql://nini_user:nini_password@localhost:5433/nini_db?schema=public"
```

### Database connection refused

Make sure the container is running:

```bash
docker ps | grep nini-postgres
```

If not running, start it:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Reset database completely

```bash
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up -d
npm run db:push
```

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
