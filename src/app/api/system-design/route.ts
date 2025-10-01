import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // For demo purposes, return mock data
    const designs = [
      {
        id: "1",
        title: "Design a URL Shortener",
        notes: "Key components: URL encoding, database design, caching strategy, load balancing. Used base62 encoding for short URLs.",
        status: "Done",
        expertise: "Expert",
        userId: "demo-user"
      }
    ]

    return NextResponse.json(designs)
  } catch (error) {
    console.error("Error fetching system designs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, notes, status, expertise } = body

    // For demo purposes, return mock data
    const design = {
      id: Date.now().toString(),
      title,
      notes,
      status: status || "To Do",
      expertise: expertise || "Beginner",
      userId: "demo-user"
    }

    return NextResponse.json(design)
  } catch (error) {
    console.error("Error creating system design:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}