const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = "mongodb+srv://himrd95_db_user:z3SQrdBm0j0NuYag@cluster0.fbogmze.mongodb.net/preparation-tracker?retryWrites=true&w=majority&appName=Cluster0";
  
  try {
    console.log('Testing MongoDB connection...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');
    
    // Test database operations
    const db = client.db('preparation-tracker');
    const collections = await db.listCollections().toArray();
    console.log('📋 Collections:', collections.map(c => c.name));
    
    await client.close();
    console.log('✅ Connection test completed successfully!');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
