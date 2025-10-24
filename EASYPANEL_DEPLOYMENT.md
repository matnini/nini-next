# Easypanel Deployment Guide

## 📦 Deployment Package

Your project has been packaged as: `nini-deployment.zip` (2.1 MB)

**Location**: `/home/mat/Work/nini-deployment.zip`

### What's Included

✅ All source code
✅ Configuration files
✅ Prisma schema
✅ Public assets (images, logos)
✅ Documentation

### What's Excluded (automatically installed on deploy)

❌ `node_modules/` - Dependencies will be installed during build
❌ `.next/` - Built during deployment
❌ `.git/` - Version control history
❌ `.env` - Environment variables set in Easypanel

## 🚀 Deployment Steps

### 1. Upload to Easypanel

1. Log in to your Easypanel dashboard at `easypanel.soyrenzoai.com`
2. Create a new service or update existing
3. Choose "Deploy from Archive" or similar option
4. Upload `nini-deployment.zip`

### 2. Configure Environment Variables

In Easypanel, add these environment variables:

```env
# Database (use internal connection if possible)
DATABASE_URL=postgres://n8n_user:8y%25fq7%21zTQV6Mgb%25yD9%40@easypanel.soyrenzoai.com:5432/n8n_db?sslmode=disable

# Or use internal network connection (recommended if available):
# DATABASE_URL=postgres://n8n_user:password@internal-db-host:5432/n8n_db

# Node Environment
NODE_ENV=production

# Next.js (optional)
NEXT_PUBLIC_APP_URL=https://your-app-url.com
```

**Important**: Use the **internal database connection** if your database is on the same Easypanel instance for better security and performance.

### 3. Build Configuration

Easypanel should auto-detect Next.js and use these commands:

**Install**:
```bash
npm install --legacy-peer-deps
```

**Build**:
```bash
npm run db:generate && npm run build
```

**Start**:
```bash
npm start
```

If you need to configure manually in Easypanel, use these settings:
- **Framework**: Next.js
- **Node Version**: 18.x or higher
- **Port**: 3000 (default Next.js port)

### 4. Database Setup

After deployment, the Prisma client will automatically generate during the build process.

If you need to run migrations or sync the database:

```bash
npm run db:push
```

This is already configured as a script in `package.json`.

## 🔧 Post-Deployment Checklist

### Verify Everything Works

1. **Check Build Logs**
   - Ensure `npm run db:generate` completed
   - Ensure `npm run build` succeeded
   - No errors about missing environment variables

2. **Test Database Connection**
   - Visit `/api/leaderboard` to test API routes
   - Visit `/api/quests` to verify database queries work

3. **Test Main Pages**
   - Homepage `/` - Should load with leaderboard
   - Mission page `/mission/nini` - Should show scripts
   - Check that all assets load (images, logos)

### Common Issues

#### Build Fails with "Cannot find module '@prisma/client'"

**Solution**: Ensure `npm run db:generate` runs before `npm run build`

Update build command to:
```bash
npm run db:generate && npm run build
```

#### Database Connection Error

**Solutions**:
1. Use internal network connection if database is on same Easypanel
2. Check that `DATABASE_URL` environment variable is set correctly
3. Verify database is running and accessible
4. Check firewall/security group settings

#### Images Not Loading

**Solution**: Ensure `public/` folder is included in deployment (it is in the zip)

## 📝 Available Scripts (for reference)

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Start production server
npm run lint         # Run ESLint

# Database commands (if needed)
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:pull      # Pull schema from database
npm run db:studio    # Open Prisma Studio
```

## 🔐 Security Notes

1. **Never commit `.env` file** - ✅ Already excluded from zip
2. **Use internal database connection** if possible for better security
3. **Set strong environment variables** in Easypanel dashboard
4. **Enable HTTPS** for production (Easypanel should handle this)

## 🌐 After Deployment

Once deployed, your app will be available at the URL provided by Easypanel.

**Test these endpoints**:
- `https://your-app.com/` - Homepage
- `https://your-app.com/api/leaderboard` - Leaderboard API
- `https://your-app.com/api/quests` - Quests API
- `https://your-app.com/mission/nini` - Mission page

## 📞 Support

If you encounter issues:

1. Check Easypanel build logs
2. Review `DATABASE_TROUBLESHOOTING.md` for connection issues
3. Ensure all environment variables are set correctly
4. Try rebuilding with `npm run db:generate && npm run build`

## 🎉 Success!

Once deployed, your NINI platform will be live with:
- ✅ Leaderboard system
- ✅ Mission pools
- ✅ User profiles
- ✅ Multi-language support (ES/EN)
- ✅ Database integration with Prisma

**Good luck with your deployment!** 🚀
