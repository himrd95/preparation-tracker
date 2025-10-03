import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient } from 'mongodb'

export async function GET(request: NextRequest) {
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

    // Fetch all system designs from the shared SystemDesignBank
    const allSystemDesigns = await db.collection('systemdesignbank').find({}).sort({ createdAt: -1 }).toArray()

    // Fetch user's progress for these system designs
    const userProgress = await db.collection('systemdesignprogress').find({ userId: user._id }).toArray()

    // Merge shared system designs with user-specific progress
    const systemDesignsWithProgress = allSystemDesigns.map(systemDesign => {
      const progress = userProgress.find(p => p.systemDesignId.toString() === systemDesign._id.toString())
      return {
        id: systemDesign._id.toString(),
        progressId: progress?._id?.toString() || null,
        title: systemDesign.title,
        description: systemDesign.description,
        expertise: systemDesign.expertise,
        status: progress?.status || 'TODO',
        notes: progress?.notes || null,
        createdAt: systemDesign.createdAt,
        updatedAt: systemDesign.updatedAt,
      }
    })

    await client.close()
    return NextResponse.json(systemDesignsWithProgress)
  } catch (error) {
    console.error('Error fetching system designs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
    const { title, description, expertise, status, notes } = body

    // First, check if the system design exists in the shared SystemDesignBank
    let systemDesignInBank = await db.collection('systemdesignbank').findOne({ title })

    if (!systemDesignInBank) {
      // If not, create it in the SystemDesignBank
      const result = await db.collection('systemdesignbank').insertOne({
        title,
        description,
        expertise,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      systemDesignInBank = { _id: result.insertedId, title, description, expertise }
    }

    // Then, create or update the user's progress for this system design
    const existingProgress = await db.collection('systemdesignprogress').findOne({
      userId: user._id,
      systemDesignId: systemDesignInBank._id
    })

    let systemDesignProgress
    if (existingProgress) {
      await db.collection('systemdesignprogress').updateOne(
        { _id: existingProgress._id },
        {
          $set: {
            status: status || 'TODO',
            notes,
            updatedAt: new Date()
          }
        }
      )
      systemDesignProgress = { ...existingProgress, status: status || 'TODO', notes }
    } else {
      const result = await db.collection('systemdesignprogress').insertOne({
        userId: user._id,
        systemDesignId: systemDesignInBank._id,
        status: status || 'TODO',
        notes,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      systemDesignProgress = { _id: result.insertedId, userId: user._id, systemDesignId: systemDesignInBank._id, status: status || 'TODO', notes }
    }

    await client.close()

    // Return the combined data (system design bank info + user progress)
    return NextResponse.json({
      id: systemDesignInBank._id.toString(),
      progressId: systemDesignProgress._id.toString(),
      title: systemDesignInBank.title,
      description: systemDesignInBank.description,
      expertise: systemDesignInBank.expertise,
      status: systemDesignProgress.status,
      notes: systemDesignProgress.notes,
      createdAt: systemDesignInBank.createdAt,
      updatedAt: systemDesignInBank.updatedAt,
    })
  } catch (error) {
    console.error('Error creating system design or progress:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
