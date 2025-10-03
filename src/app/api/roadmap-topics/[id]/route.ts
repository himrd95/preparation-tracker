import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient, ObjectId } from 'mongodb'

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Connect to MongoDB directly
    const client = new MongoClient(process.env.DATABASE_URL!)
    await client.connect()
    const db = client.db('preparation-tracker')

    // Find user by email
    const user = await db.collection('users').findOne({ email: session.user.email })
    if (!user) {
      await client.close()
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { topicId, status } = body

    if (!topicId) {
      await client.close()
      return NextResponse.json({ error: 'Topic ID is required' }, { status: 400 })
    }

    const updateData = { 
      status: status?.toUpperCase() || 'TODO',
      updatedAt: new Date()
    }

    // Update the roadmap topic
    const result = await db.collection('roadmaptopics').updateOne(
      { 
        _id: new ObjectId(topicId),
        userId: user._id 
      },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      await client.close()
      return NextResponse.json({ error: 'Roadmap topic not found' }, { status: 404 })
    }

    // Get the updated topic
    const updatedTopic = await db.collection('roadmaptopics').findOne({ 
      _id: new ObjectId(topicId),
      userId: user._id 
    })

    if (!updatedTopic) {
      await client.close()
      return NextResponse.json({ error: 'Roadmap topic not found after update' }, { status: 404 })
    }

    await client.close()

    return NextResponse.json({
      id: updatedTopic._id.toString(),
      name: updatedTopic.name,
      description: updatedTopic.description,
      status: updatedTopic.status.toLowerCase(),
      resources: updatedTopic.resources || []
    })
  } catch (error) {
    console.error('Error updating roadmap topic:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
