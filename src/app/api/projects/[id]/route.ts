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
    const { projectId, status, notes } = body

    if (!projectId) {
      await client.close()
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const updateData: any = { 
      status,
      updatedAt: new Date()
    }
    
    if (notes !== undefined) {
      updateData.notes = notes
    }

    // Find or create the user's progress for this project
    const existingProgress = await db.collection('projectprogress').findOne({
      userId: user._id,
      projectId: new ObjectId(projectId)
    })

    let updatedProgress
    if (existingProgress) {
      // Update existing progress
      await db.collection('projectprogress').updateOne(
        { _id: existingProgress._id },
        { $set: updateData }
      )
      updatedProgress = { ...existingProgress, ...updateData }
    } else {
      // Create new progress entry
      const result = await db.collection('projectprogress').insertOne({
        userId: user._id,
        projectId: new ObjectId(projectId),
        ...updateData,
        createdAt: new Date()
      })
      updatedProgress = { 
        _id: result.insertedId, 
        userId: user._id, 
        projectId: new ObjectId(projectId), 
        ...updateData 
      }
    }

    // Get the project details from the project bank
    const project = await db.collection('projectbank').findOne({ 
      _id: new ObjectId(projectId) 
    })

    if (!project) {
      await client.close()
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    await client.close()

    // Return the combined data (project bank info + updated progress)
    return NextResponse.json({
      id: project._id.toString(),
      progressId: updatedProgress._id.toString(),
      title: project.title,
      description: project.description,
      repoLink: project.repoLink,
      liveDemo: project.liveDemo,
      complexity: project.complexity,
      techStack: project.techStack,
      status: updatedProgress.status,
      notes: updatedProgress.notes,
      createdAt: project.createdAt,
      updatedAt: updatedProgress.updatedAt,
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
