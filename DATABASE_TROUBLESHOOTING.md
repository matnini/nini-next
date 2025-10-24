# Database Connection Troubleshooting

## Current Status

✅ Prisma is installed and configured
✅ Connection string is set up with properly encoded special characters
✅ Prisma Client has been generated
⚠️ Cannot currently connect to the database (connection timeout)

## Your Connection Details

- **Host**: easypanel.soyrenzoai.com
- **Port**: 5432
- **Database**: n8n_db
- **User**: n8n_user
- **SSL Mode**: disabled

## Possible Issues & Solutions

### 1. IP Whitelist / Firewall

**Most likely issue**: The database server may only accept connections from whitelisted IP addresses.

**Solution**:
- Check your Easypanel dashboard for database settings
- Look for "Allowed IPs" or "Firewall Rules"
- Add your application's IP address to the whitelist
- For development, you might need to add your local IP

### 2. Database Server Configuration

The PostgreSQL server might not be configured to accept external connections.

**Check in Easypanel**:
- Ensure the database is running
- Verify that remote connections are enabled
- Check if there's a "public access" toggle

### 3. Network/VPN Requirement

The database might be in a private network.

**Solutions**:
- Check if you need to be on a VPN to access the database
- Consider using Easypanel's internal network if deploying on the same platform
- Use an SSH tunnel for development

### 4. Connection String Format

Your password contains special characters: `8y%fq7!zTQV6Mgb%yD9@`

These have been URL-encoded in the connection string:
- `%` → `%25`
- `!` → `%21`
- `@` → `%40`

Current encoded password: `8y%25fq7%21zTQV6Mgb%25yD9%40`

## Testing the Connection

### Option 1: From Your Development Environment

If you have `psql` installed:

```bash
psql "postgres://n8n_user:8y%fq7!zTQV6Mgb%yD9@@easypanel.soyrenzoai.com:5432/n8n_db?sslmode=disable"
```

### Option 2: Using Prisma

```bash
npm run db:pull
```

If successful, you should see schema introspection complete.

### Option 3: Using Prisma Studio

```bash
npm run db:studio
```

## When Deployed to Production

If you're deploying to Vercel, Netlify, or similar:

1. The production environment will likely have different network access
2. Add the connection string as an environment variable in your hosting platform
3. Make sure to use the production database URL (if different)

## Alternative: Local Development with Tunneling

If the database is only accessible from certain locations, you can:

1. **Use SSH Tunneling**:
```bash
ssh -L 5432:localhost:5432 user@easypanel.soyrenzoai.com
```

Then update your `.env`:
```
DATABASE_URL="postgres://n8n_user:password@localhost:5432/n8n_db"
```

2. **Use Easypanel's Internal Network**:
If deploying on Easypanel, use the internal connection string instead

## Next Steps

1. ✅ Configuration is complete - Prisma is ready to use
2. 🔧 Contact your database administrator or check Easypanel settings
3. 📝 Once connected, run `npm run db:pull` to verify
4. 🎉 Start using Prisma in your code!

## Using Prisma (Even Without Current Connection)

The setup is complete, so you can start writing code. The connection will work once the network/firewall issue is resolved.

```typescript
import prisma from '@/lib/prisma'

// This code is ready to use
const quests = await prisma.quest.findMany()
```

All TypeScript types are generated and ready to use! 🚀
