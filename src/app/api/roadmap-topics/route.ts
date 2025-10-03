import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { MongoClient, ObjectId } from 'mongodb'

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

    // Fetch user's roadmap topics
    const roadmapTopics = await db.collection('roadmaptopics').find({ userId: user._id }).sort({ createdAt: 1 }).toArray()

    // If no topics exist, create default ones
    if (roadmapTopics.length === 0) {
      const defaultTopics = [
        {
          name: 'React Fundamentals',
          description: 'Components, JSX, Props, State',
          status: 'COMPLETED',
          resources: [
            { name: 'React Docs', url: 'https://react.dev' },
            { name: 'React Tutorial', url: 'https://react.dev/learn' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Next.js',
          description: 'App Router, SSR, SSG, API Routes',
          status: 'IN_PROGRESS',
          resources: [
            { name: 'Next.js Docs', url: 'https://nextjs.org/docs' },
            { name: 'Next.js Learn', url: 'https://nextjs.org/learn' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'TypeScript',
          description: 'Types, Interfaces, Generics',
          status: 'TODO',
          resources: [
            { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Styling',
          description: 'CSS Modules, Styled Components, Tailwind',
          status: 'TODO',
          resources: [
            { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'State Management',
          description: 'Context API, Zustand, React Query',
          status: 'TODO',
          resources: [
            { name: 'React Query', url: 'https://tanstack.com/query/latest' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Performance',
          description: 'Optimization, Bundle Analysis, Core Web Vitals',
          status: 'TODO',
          resources: [
            { name: 'Web Vitals', url: 'https://web.dev/vitals' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Testing',
          description: 'Jest, React Testing Library, Playwright',
          status: 'TODO',
          resources: [
            { name: 'Testing Library', url: 'https://testing-library.com' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'System Design',
          description: 'Architecture Patterns, Scalability',
          status: 'TODO',
          resources: [
            { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
          ],
          userId: user._id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      await db.collection('roadmaptopics').insertMany(defaultTopics)
      
      // Fetch the newly created topics
      const newTopics = await db.collection('roadmaptopics').find({ userId: user._id }).sort({ createdAt: 1 }).toArray()
      
      await client.close()
      return NextResponse.json(newTopics.map(topic => ({
        id: topic._id.toString(),
        name: topic.name,
        description: topic.description,
        status: topic.status.toLowerCase(),
        resources: topic.resources || []
      })))
    }

    await client.close()
    return NextResponse.json(roadmapTopics.map(topic => ({
      id: topic._id.toString(),
      name: topic.name,
      description: topic.description,
      status: topic.status.toLowerCase(),
      resources: topic.resources || []
    })))
  } catch (error) {
    console.error('Error fetching roadmap topics:', error)
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
    const { name, description, status, resources } = body

    const roadmapTopic = await db.collection('roadmaptopics').insertOne({
      name,
      description,
      status: status?.toUpperCase() || 'TODO',
      resources: resources || [],
      userId: user._id,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await client.close()

    return NextResponse.json({
      id: roadmapTopic.insertedId.toString(),
      name,
      description,
      status: status?.toLowerCase() || 'todo',
      resources: resources || []
    })
  } catch (error) {
    console.error('Error creating roadmap topic:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
