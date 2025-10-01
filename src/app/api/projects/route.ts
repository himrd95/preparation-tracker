import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // For demo purposes, return mock data
    const projects = [
      {
        id: "1",
        title: "E-commerce Dashboard",
        repoLink: "https://github.com/user/ecommerce-dashboard",
        liveLink: "https://ecommerce-demo.vercel.app",
        status: "Done",
        complexity: "Hard",
        userId: "demo-user"
      }
    ]

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, repoLink, liveLink, status, complexity } = body

    // For demo purposes, return mock data
    const project = {
      id: Date.now().toString(),
      title,
      repoLink,
      liveLink,
      status: status || "Planned",
      complexity: complexity || "Medium",
      userId: "demo-user"
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}