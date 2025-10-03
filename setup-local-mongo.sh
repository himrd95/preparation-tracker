#!/bin/bash

# MongoDB Local Setup Script
echo "🚀 Setting up local MongoDB for development..."

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "📦 Installing MongoDB..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        echo "❌ Homebrew not found. Please install Homebrew first:"
        echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
        exit 1
    fi
    
    # Install MongoDB
    brew tap mongodb/brew
    brew install mongodb-community
else
    echo "✅ MongoDB already installed"
fi

# Start MongoDB service
echo "🔄 Starting MongoDB service..."
brew services start mongodb-community

# Wait a moment for MongoDB to start
sleep 3

# Test connection
echo "🔍 Testing MongoDB connection..."
if mongosh --eval "db.runCommand('ping')" --quiet; then
    echo "✅ MongoDB is running successfully!"
    
    # Create database and collections
    echo "📊 Setting up database structure..."
    mongosh preparation-tracker --eval "
        db.createCollection('users');
        db.createCollection('questionbank');
        db.createCollection('questionprogress');
        db.createCollection('projectbank');
        db.createCollection('projectprogress');
        db.createCollection('systemdesignbank');
        db.createCollection('systemdesignprogress');
        print('✅ Database collections created');
    " --quiet
    
    # Update .env.local to use local MongoDB
    echo "🔧 Updating .env.local to use local MongoDB..."
    if [ -f .env.local ]; then
        # Backup original
        cp .env.local .env.local.backup
        echo "📋 Original .env.local backed up to .env.local.backup"
    fi
    
    # Create new .env.local with local MongoDB
    cat > .env.local << EOF
DATABASE_URL="mongodb://localhost:27017/preparation-tracker"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET="PREPARATION_TRACKER_SECRET"
GOOGLE_CLIENT_ID="838559095003-m0rtmtrb3q9o37g1kcbjbocbnu3q13dm.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
EOF
    
    echo "✅ .env.local updated for local MongoDB"
    echo ""
    echo "🎉 Local MongoDB setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npx prisma db push"
    echo "2. Run: npm run db:seed"
    echo "3. Run: npm run dev"
    echo ""
    echo "To switch back to MongoDB Atlas later:"
    echo "1. Fix Atlas connection issues"
    echo "2. Run: cp .env.local.backup .env.local"
    
else
    echo "❌ Failed to start MongoDB"
    echo "Try running: brew services restart mongodb-community"
    exit 1
fi
