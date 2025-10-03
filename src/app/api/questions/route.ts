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

    // Fetch all questions from the shared QuestionBank
    const allQuestions = await db.collection('questionbank').find({}).sort({ createdAt: -1 }).toArray()

    // Fetch user's progress for these questions
    const userProgress = await db.collection('questionprogress').find({ userId: user._id }).toArray()

    // Merge shared questions with user-specific progress
    const questionsWithProgress = allQuestions.map(question => {
      const progress = userProgress.find(p => p.questionId.toString() === question._id.toString())
      return {
        id: question._id.toString(),
        progressId: progress?._id?.toString() || null,
        title: question.title,
        link: question.link,
        topic: question.topic,
        difficulty: question.difficulty,
        expertise: question.expertise,
        status: progress?.status || 'TODO',
        notes: progress?.notes || null,
        solvedAt: progress?.solvedAt || null,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      }
    })

    await client.close()
    return NextResponse.json(questionsWithProgress)
  } catch (error) {
    console.error('Error fetching questions:', error)
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
    const { title, link, topic, difficulty, expertise, status, notes } = body

    // First, check if the question exists in the shared QuestionBank
    let questionInBank = await db.collection('questionbank').findOne({ title })

    if (!questionInBank) {
      // If not, create it in the QuestionBank
      const result = await db.collection('questionbank').insertOne({
        title,
        link,
        topic,
        difficulty,
        expertise,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      questionInBank = { _id: result.insertedId, title, link, topic, difficulty, expertise }
    }

    // Then, create or update the user's progress for this question
    const existingProgress = await db.collection('questionprogress').findOne({
      userId: user._id,
      questionId: questionInBank._id
    })

    let questionProgress
    if (existingProgress) {
      await db.collection('questionprogress').updateOne(
        { _id: existingProgress._id },
        {
          $set: {
            status: status || 'TODO',
            notes,
            updatedAt: new Date()
          }
        }
      )
      questionProgress = { ...existingProgress, status: status || 'TODO', notes }
    } else {
      const result = await db.collection('questionprogress').insertOne({
        userId: user._id,
        questionId: questionInBank._id,
        status: status || 'TODO',
        notes,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      questionProgress = { _id: result.insertedId, userId: user._id, questionId: questionInBank._id, status: status || 'TODO', notes }
    }

    await client.close()

    // Return the combined data (question bank info + user progress)
    return NextResponse.json({
      id: questionInBank._id.toString(),
      progressId: questionProgress._id.toString(),
      title: questionInBank.title,
      link: questionInBank.link,
      topic: questionInBank.topic,
      difficulty: questionInBank.difficulty,
      expertise: questionInBank.expertise,
      status: questionProgress.status,
      notes: questionProgress.notes,
      createdAt: questionInBank.createdAt,
      updatedAt: questionInBank.updatedAt,
    })
  } catch (error) {
    console.error('Error creating question or progress:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
