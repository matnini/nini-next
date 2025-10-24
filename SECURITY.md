# Security Guidelines

## 🔒 Sensitive Information Protection

This project is configured to **never expose sensitive information** in version control or deployments.

### Protected Files

The following files are **never committed to Git** (via `.gitignore`):

#### Environment Variables
- `.env` - Local environment variables
- `.env.local` - Local overrides
- `.env*.local` - Any local environment files

#### Credentials & Keys
- `*.key` - Private keys
- `*.pem` - Certificate files
- `*.p12`, `*.pfx` - Certificate archives
- `credentials.json` - Service account credentials
- `secrets.json` - Secret configuration files

#### Database Files
- `*.sqlite`, `*.sqlite3`, `*.db` - Local database files
- Database migration files (except schema)

#### Build & Cache
- `node_modules/` - Dependencies (can contain secrets)
- `.next/` - Built files
- Build artifacts and caches

## 🔐 Environment Variables

### Development

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Then add your actual credentials to `.env` (this file is **never committed**).

### Production (Easypanel/Vercel/etc)

Set environment variables in your hosting platform's dashboard:

**Required:**
```env
DATABASE_URL=postgres://user:password@host:port/database
NODE_ENV=production
```

**Optional:**
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## ⚠️ What NOT to Commit

### ❌ Never commit:
- Database passwords or connection strings
- API keys or tokens
- Private keys or certificates
- User credentials
- Session secrets
- OAuth client secrets
- Encryption keys
- `.env` files with real values

### ✅ Safe to commit:
- `.env.example` with placeholder values
- Public configuration
- Code and components
- Documentation
- `prisma/schema.prisma` (database schema definition)

## 🛡️ Security Best Practices

### 1. Environment Variables

```typescript
// ✅ GOOD - Use environment variables
const dbUrl = process.env.DATABASE_URL

// ❌ BAD - Never hardcode credentials
const dbUrl = "postgres://user:password@host/db"
```

### 2. API Keys

```typescript
// ✅ GOOD - Environment variable
const apiKey = process.env.NEXT_PUBLIC_API_KEY

// ❌ BAD - Hardcoded
const apiKey = "sk_live_123456789"
```

### 3. Database Connections

Always use environment variables for database connections:

```typescript
// lib/prisma.ts uses process.env.DATABASE_URL
// This is configured in prisma/schema.prisma:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ✅ GOOD
}
```

### 4. Client-Side vs Server-Side

```typescript
// ✅ Server-side only (API routes, Server Components)
const secret = process.env.SECRET_KEY

// ✅ Client-side safe (must start with NEXT_PUBLIC_)
const publicUrl = process.env.NEXT_PUBLIC_APP_URL

// ❌ Never expose server secrets to client
// Don't use private env vars in Client Components
```

## 🔍 Audit Checklist

Before committing or deploying, verify:

- [ ] No `.env` file in version control
- [ ] No hardcoded passwords or keys in code
- [ ] No API keys or tokens in source code
- [ ] `.env.example` only has placeholder values
- [ ] `.gitignore` includes all sensitive file patterns
- [ ] Database connection strings use environment variables
- [ ] Secrets are set in hosting platform (not in code)

## 🚨 If Credentials Are Exposed

If you accidentally commit sensitive information:

1. **Immediately rotate all exposed credentials**
   - Change database passwords
   - Regenerate API keys
   - Revoke and recreate tokens

2. **Remove from Git history**
   ```bash
   # Use git filter-branch or BFG Repo-Cleaner
   # This is complex - consider creating a new repo if needed
   ```

3. **Update `.gitignore`** to prevent future exposure

4. **Audit all systems** that use the exposed credentials

## 📋 Current Security Status

### ✅ Protected
- Database credentials (in `.env`, excluded from Git)
- Environment variables (`.gitignore` configured)
- Build artifacts (`.next/`, `node_modules/`)

### ✅ Safe in Repository
- Prisma schema (no credentials, just structure)
- `.env.example` (placeholder values only)
- Source code (uses environment variables)
- Configuration files (no secrets)

## 📚 Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Prisma Security Best Practices](https://www.prisma.io/docs/guides/security)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

## 🔐 Encryption Recommendations

For production:

1. **Use HTTPS/TLS** (Easypanel/Vercel handle this automatically)
2. **Enable SSL for database connections** (change `sslmode=disable` to `sslmode=require`)
3. **Use environment-specific variables** (different credentials for dev/staging/prod)
4. **Rotate credentials regularly**
5. **Use secrets management** (Vercel Secrets, AWS Secrets Manager, etc.)

## 🎯 Summary

This project follows security best practices:
- ✅ All sensitive data in environment variables
- ✅ `.gitignore` properly configured
- ✅ No credentials in source code
- ✅ Safe for public repositories
- ✅ Ready for secure deployment

**Stay secure!** 🛡️
