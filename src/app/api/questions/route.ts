import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // For demo purposes, return mock data
    const questions = [
      {
        id: "1",
        title: "Two Sum",
        link: "https://leetcode.com/problems/two-sum/",
        category: "Array",
        status: "Done",
        expertise: "Expert",
        userId: "demo-user"
      }
    ]

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, link, category, status, expertise } = body

    // For demo purposes, return mock data
    const question = {
      id: Date.now().toString(),
      title,
      link,
      category,
      status: status || "To Do",
      expertise: expertise || "Beginner",
      userId: "demo-user"
    }

    return NextResponse.json(question)
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}