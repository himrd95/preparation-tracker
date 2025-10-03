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

    // Fetch all projects from the shared ProjectBank
    const allProjects = await db.collection('projectbank').find({}).sort({ createdAt: -1 }).toArray()

    // Fetch user's progress for these projects
    const userProgress = await db.collection('projectprogress').find({ userId: user._id }).toArray()

    // Merge shared projects with user-specific progress
    const projectsWithProgress = allProjects.map(project => {
      const progress = userProgress.find(p => p.projectId.toString() === project._id.toString())
      return {
        id: project._id.toString(),
        progressId: progress?._id?.toString() || null,
        title: project.title,
        description: project.description,
        repoLink: project.repoLink,
        liveDemo: project.liveDemo,
        complexity: project.complexity,
        techStack: project.techStack,
        status: progress?.status || 'PLANNED',
        notes: progress?.notes || null,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      }
    })

    await client.close()
    return NextResponse.json(projectsWithProgress)
  } catch (error) {
    console.error('Error fetching projects:', error)
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
    const { title, description, repoLink, liveDemo, complexity, techStack, status, notes } = body

    // First, check if the project exists in the shared ProjectBank
    let projectInBank = await db.collection('projectbank').findOne({ title })

    if (!projectInBank) {
      // If not, create it in the ProjectBank
      const result = await db.collection('projectbank').insertOne({
        title,
        description,
        repoLink,
        liveDemo,
        complexity,
        techStack,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      projectInBank = { _id: result.insertedId, title, description, repoLink, liveDemo, complexity, techStack }
    }

    // Then, create or update the user's progress for this project
    const existingProgress = await db.collection('projectprogress').findOne({
      userId: user._id,
      projectId: projectInBank._id
    })

    let projectProgress
    if (existingProgress) {
      await db.collection('projectprogress').updateOne(
        { _id: existingProgress._id },
        {
          $set: {
            status: status || 'PLANNED',
            notes,
            updatedAt: new Date()
          }
        }
      )
      projectProgress = { ...existingProgress, status: status || 'PLANNED', notes }
    } else {
      const result = await db.collection('projectprogress').insertOne({
        userId: user._id,
        projectId: projectInBank._id,
        status: status || 'PLANNED',
        notes,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      projectProgress = { _id: result.insertedId, userId: user._id, projectId: projectInBank._id, status: status || 'PLANNED', notes }
    }

    await client.close()

    // Return the combined data (project bank info + user progress)
    return NextResponse.json({
      id: projectInBank._id.toString(),
      progressId: projectProgress._id.toString(),
      title: projectInBank.title,
      description: projectInBank.description,
      repoLink: projectInBank.repoLink,
      liveDemo: projectInBank.liveDemo,
      complexity: projectInBank.complexity,
      techStack: projectInBank.techStack,
      status: projectProgress.status,
      notes: projectProgress.notes,
      createdAt: projectInBank.createdAt,
      updatedAt: projectInBank.updatedAt,
    })
  } catch (error) {
    console.error('Error creating project or progress:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
