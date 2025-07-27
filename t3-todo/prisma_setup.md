# T3 App + Neon Database Setup Guide

## Initial Setup (After create-t3-app)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create/update your `.env` file:

```env
# NextAuth
AUTH_SECRET="your-secret-here"
AUTH_DISCORD_ID=""
AUTH_DISCORD_SECRET=""

# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@your-neon-host/database?sslmode=require"
```

## Connecting to Neon Database

### 1. Create Neon Account

- Go to [neon.tech](https://neon.tech)
- Sign up and create a new project
- Copy your connection string

### 2. Update DATABASE_URL

Replace your local database URL with the Neon connection string in `.env`:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx-xxx.region.aws.neon.tech/database?sslmode=require"
```

### 3. Push Schema to Neon (First Time)

```bash
npm run db:push
```

## Setting Up Migration History (Without Losing Data)

### 1. Create Baseline Migration

```bash
npx prisma migrate dev --name baseline --create-only
```

### 2. Mark Baseline as Applied

```bash
npx prisma migrate resolve --applied [migration-name]
```

Replace `[migration-name]` with your actual migration name (e.g., `20250727080211_baseline`)

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Verify Setup

```bash
npm run db:studio
```

## Adding Changes to Migration History (Future)

### Step 1: Edit Schema

Modify your `prisma/schema.prisma` file:

```prisma
model Todo {
    id          Int      @id @default(autoincrement())
    title       String
    description String?
    priority    String?  // Add new field
    User        User?    @relation(fields: [userId], references: [id])
    userId      String?
    createdAt   DateTime @default(now())
    updatedAt   DateTime @default(now())
}
```

### Step 2: Create Migration

```bash
npx prisma migrate dev --name add_priority_field
```

### Step 3: Verify Changes

```bash
npm run db:studio
```

## Common Commands Reference

### Database Operations

```bash
# Push schema changes (no migration history)
npm run db:push

# Create and apply migration
npx prisma migrate dev --name migration_name

# Create migration without applying
npx prisma migrate dev --name migration_name --create-only

# Mark migration as applied
npx prisma migrate resolve --applied migration_name

# Reset database (⚠️ WARNING: Deletes all data)
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### Development

```bash
# Start development server
npm run dev

# Open Prisma Studio
npm run db:studio

# Type checking
npm run typecheck

# Linting
npm run lint
```

✅ **Migration History**

- Track all database changes
- Safe rollbacks
- Team collaboration
- Production deployments
