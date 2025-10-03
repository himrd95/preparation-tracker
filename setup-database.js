const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://himrd95_db_user:z3SQrdBm0j0NuYag@cluster0.fbogmze.mongodb.net/preparation-tracker?retryWrites=true&w=majority&appName=Cluster0";

async function setupDatabase() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🚀 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('preparation-tracker');
    
    // Create demo user
    console.log('👤 Creating demo user...');
    const usersCollection = db.collection('users');
    let demoUser = await usersCollection.findOne({ email: 'demo@example.com' });
    
    if (!demoUser) {
      const result = await usersCollection.insertOne({
        email: 'demo@example.com',
        name: 'Demo User',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      demoUser = await usersCollection.findOne({ _id: result.insertedId });
    }
    
    console.log('Demo user ID:', demoUser._id);
    console.log('✅ Demo user ready:', demoUser.email);
    
    // Create sample questions
    console.log('📝 Creating sample questions...');
    const questionsCollection = db.collection('questions');
    const questions = [
      {
        title: 'Two Sum',
        link: 'https://leetcode.com/problems/two-sum/',
        topic: 'Array',
        difficulty: 'EASY',
        expertise: 'BEGINNER',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Valid Parentheses',
        link: 'https://leetcode.com/problems/valid-parentheses/',
        topic: 'Stack',
        difficulty: 'EASY',
        expertise: 'BEGINNER',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Merge Two Sorted Lists',
        link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
        topic: 'Linked List',
        difficulty: 'EASY',
        expertise: 'INTERMEDIATE',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Maximum Subarray',
        link: 'https://leetcode.com/problems/maximum-subarray/',
        topic: 'Dynamic Programming',
        difficulty: 'MEDIUM',
        expertise: 'INTERMEDIATE',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Best Time to Buy and Sell Stock',
        link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        topic: 'Array',
        difficulty: 'EASY',
        expertise: 'BEGINNER',
        status: 'DONE',
        solvedAt: new Date(),
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Climbing Stairs',
        link: 'https://leetcode.com/problems/climbing-stairs/',
        topic: 'Dynamic Programming',
        difficulty: 'EASY',
        expertise: 'BEGINNER',
        status: 'DONE',
        solvedAt: new Date(),
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    for (const question of questions) {
      await questionsCollection.findOneAndUpdate(
        { title: question.title, userId: question.userId },
        { $setOnInsert: question },
        { upsert: true }
      );
    }
    console.log('✅ Sample questions created');
    
    // Create sample projects
    console.log('🛠️ Creating sample projects...');
    const projectsCollection = db.collection('projects');
    const projects = [
      {
        title: 'Todo App',
        description: 'A simple todo application built with React',
        techStack: ['React', 'TypeScript', 'TailwindCSS'],
        complexity: 'BEGINNER',
        status: 'PLANNED',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'E-commerce Dashboard',
        description: 'Admin dashboard for e-commerce management',
        techStack: ['Next.js', 'Prisma', 'PostgreSQL'],
        complexity: 'INTERMEDIATE',
        status: 'IN_PROGRESS',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Weather App',
        description: 'Real-time weather application',
        techStack: ['React', 'API Integration'],
        complexity: 'BEGINNER',
        status: 'COMPLETED',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    for (const project of projects) {
      await projectsCollection.findOneAndUpdate(
        { title: project.title, userId: project.userId },
        { $setOnInsert: project },
        { upsert: true }
      );
    }
    console.log('✅ Sample projects created');
    
    // Create sample system design questions
    console.log('🏗️ Creating sample system design questions...');
    const systemDesignsCollection = db.collection('systemdesigns');
    const systemDesigns = [
      {
        title: 'Design a URL Shortener',
        description: 'Design a system like bit.ly or tinyurl.com',
        expertise: 'INTERMEDIATE',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Design a Chat System',
        description: 'Design a real-time chat application like WhatsApp',
        expertise: 'ADVANCED',
        status: 'TODO',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Design a Social Media Feed',
        description: 'Design a social media feed like Twitter or Instagram',
        expertise: 'ADVANCED',
        status: 'IN_PROGRESS',
        userId: demoUser._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    for (const systemDesign of systemDesigns) {
      await systemDesignsCollection.findOneAndUpdate(
        { title: systemDesign.title, userId: systemDesign.userId },
        { $setOnInsert: systemDesign },
        { upsert: true }
      );
    }
    console.log('✅ Sample system design questions created');
    
    console.log('🎉 Database setup completed successfully!');
    console.log('📊 Summary:');
    console.log(`   - Users: 1 (demo@example.com)`);
    console.log(`   - Questions: ${questions.length}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - System Designs: ${systemDesigns.length}`);
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await client.close();
  }
}

setupDatabase();