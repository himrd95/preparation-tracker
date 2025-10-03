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
    const { questionId, status, notes } = body

    if (!questionId) {
      await client.close()
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 })
    }

    const updateData: any = { 
      status,
      updatedAt: new Date()
    }
    
    if (notes !== undefined) {
      updateData.notes = notes
    }
    
    if (status === 'DONE') {
      updateData.solvedAt = new Date()
    } else if (status !== 'DONE') {
      updateData.solvedAt = null
    }

    // Find or create the user's progress for this question
    const existingProgress = await db.collection('questionprogress').findOne({
      userId: user._id,
      questionId: new ObjectId(questionId)
    })

    let updatedProgress
    if (existingProgress) {
      // Update existing progress
      await db.collection('questionprogress').updateOne(
        { _id: existingProgress._id },
        { $set: updateData }
      )
      updatedProgress = { ...existingProgress, ...updateData }
    } else {
      // Create new progress entry
      const result = await db.collection('questionprogress').insertOne({
        userId: user._id,
        questionId: new ObjectId(questionId),
        ...updateData,
        createdAt: new Date()
      })
      updatedProgress = { 
        _id: result.insertedId, 
        userId: user._id, 
        questionId: new ObjectId(questionId), 
        ...updateData 
      }
    }

    // Get the question details from the question bank
    const question = await db.collection('questionbank').findOne({ 
      _id: new ObjectId(questionId) 
    })

    if (!question) {
      await client.close()
      return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    }

    await client.close()

    // Return the combined data (question bank info + updated progress)
    return NextResponse.json({
      id: question._id.toString(),
      progressId: updatedProgress._id.toString(),
      title: question.title,
      link: question.link,
      topic: question.topic,
      difficulty: question.difficulty,
      expertise: question.expertise,
      status: updatedProgress.status,
      notes: updatedProgress.notes,
      solvedAt: updatedProgress.solvedAt,
      createdAt: question.createdAt,
      updatedAt: updatedProgress.updatedAt,
    })
  } catch (error) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
