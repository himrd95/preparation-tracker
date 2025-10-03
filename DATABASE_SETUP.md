# Database Setup Instructions

## MongoDB Atlas Setup (Recommended)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier available)

2. **Get Connection String**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Replace `<dbname>` with `preparation-tracker`

3. **Update Environment Variables**:
   ```bash
   # In .env.local file
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/preparation-tracker?retryWrites=true&w=majority"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

4. **Push Schema and Seed Data**:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## Local MongoDB Setup (Alternative)

1. **Install MongoDB**:
   ```bash
   # macOS with Homebrew
   brew install mongodb-community
   
   # Start MongoDB
   brew services start mongodb-community
   ```

2. **Update Environment Variables**:
   ```bash
   DATABASE_URL="mongodb://localhost:27017/preparation-tracker"
   ```

3. **Push Schema and Seed Data**:
   ```bash
   npm run db:push
   npm run db:seed
   ```

## Current Status

✅ **Completed**:
- Prisma schema with proper models
- API routes for CRUD operations
- Real-time status updates
- Authentication with NextAuth
- Component updates for API integration

🔄 **In Progress**:
- Database connection setup
- Data seeding

📋 **Next Steps**:
1. Set up MongoDB Atlas or local MongoDB
2. Run `npm run db:push` to create tables
3. Run `npm run db:seed` to populate initial data
4. Test all functionality

## Features Working

- ✅ **Sign-in/Sign-out**: Google OAuth + Email/Password
- ✅ **Profile Dropdown**: Settings and sign-out options
- ✅ **API Routes**: Questions, Projects, System Design
- ✅ **Real-time Updates**: Status changes update immediately
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Error Handling**: Toast notifications for all actions
