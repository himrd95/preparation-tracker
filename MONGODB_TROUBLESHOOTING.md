# MongoDB Connection Troubleshooting Guide

## Current Issue
SSL/TLS error: "tlsv1 alert internal error" when connecting to MongoDB Atlas

## Your Current IP Address
**152.59.179.117** - This needs to be whitelisted in MongoDB Atlas

## Step-by-Step Solutions

### 1. Check MongoDB Atlas Cluster Status
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Sign in with your account
3. Check if your cluster is **RUNNING** (not paused)
4. If paused, click "Resume" to restart it

### 2. Whitelist Your IP Address
1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. Add your current IP: **152.59.179.117**
4. Or add **0.0.0.0/0** for development (less secure but allows all IPs)

### 3. Verify Database User Credentials
1. Go to **Database Access** in MongoDB Atlas
2. Check if user `himrd95_db_user` exists
3. Verify the password: `z3SQrdBm0j0NuYag`
4. Ensure user has **Read and write** permissions

### 4. Test Connection with MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Use connection string: `mongodb+srv://himrd95_db_user:z3SQrdBm0j0NuYag@cluster0.fbogmze.mongodb.net/preparation-tracker`
3. If this works, the issue is with Node.js/Prisma

### 5. Alternative: Use Local MongoDB for Development
If Atlas continues to have issues, you can use a local MongoDB instance:

```bash
# Install MongoDB locally (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Update .env.local to use local MongoDB
DATABASE_URL="mongodb://localhost:27017/preparation-tracker"
```

## Quick Fix Commands

Once you've fixed the Atlas connection, run:

```bash
# Test connection
node test-mongo.js

# Push schema to database
npx prisma db push

# Seed the database
npm run db:seed

# Start the application
npm run dev
```

## Expected Results After Fix
- ✅ 70+ DSA questions in shared question bank
- ✅ 6 frontend projects in shared project bank  
- ✅ 8 system design questions in shared bank
- ✅ Demo user with sample progress data
- ✅ All users can see shared content, track individual progress
