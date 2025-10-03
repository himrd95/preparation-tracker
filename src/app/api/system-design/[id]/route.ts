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
    const { systemDesignId, status, notes } = body

    if (!systemDesignId) {
      await client.close()
      return NextResponse.json({ error: 'System Design ID is required' }, { status: 400 })
    }

    const updateData: any = { 
      status,
      updatedAt: new Date()
    }
    
    if (notes !== undefined) {
      updateData.notes = notes
    }

    // Find or create the user's progress for this system design
    const existingProgress = await db.collection('systemdesignprogress').findOne({
      userId: user._id,
      systemDesignId: new ObjectId(systemDesignId)
    })

    let updatedProgress
    if (existingProgress) {
      // Update existing progress
      await db.collection('systemdesignprogress').updateOne(
        { _id: existingProgress._id },
        { $set: updateData }
      )
      updatedProgress = { ...existingProgress, ...updateData }
    } else {
      // Create new progress entry
      const result = await db.collection('systemdesignprogress').insertOne({
        userId: user._id,
        systemDesignId: new ObjectId(systemDesignId),
        ...updateData,
        createdAt: new Date()
      })
      updatedProgress = { 
        _id: result.insertedId, 
        userId: user._id, 
        systemDesignId: new ObjectId(systemDesignId), 
        ...updateData 
      }
    }

    // Get the system design details from the system design bank
    const systemDesign = await db.collection('systemdesignbank').findOne({ 
      _id: new ObjectId(systemDesignId) 
    })

    if (!systemDesign) {
      await client.close()
      return NextResponse.json({ error: 'System Design not found' }, { status: 404 })
    }

    await client.close()

    // Return the combined data (system design bank info + updated progress)
    return NextResponse.json({
      id: systemDesign._id.toString(),
      progressId: updatedProgress._id.toString(),
      title: systemDesign.title,
      description: systemDesign.description,
      expertise: systemDesign.expertise,
      status: updatedProgress.status,
      notes: updatedProgress.notes,
      createdAt: systemDesign.createdAt,
      updatedAt: updatedProgress.updatedAt,
    })
  } catch (error) {
    console.error('Error updating system design:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
