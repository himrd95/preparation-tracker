"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuoteWidget } from "@/components/layout/quote-widget"
import { ProgressChart } from "@/components/charts/progress-chart"
import { Plus, ExternalLink, Github } from "lucide-react"

// Mock data
const roadmapTopics = [
  { topic: "React Fundamentals", status: "Completed", progress: 100 },
  { topic: "Next.js & SSR", status: "In Progress", progress: 75 },
  { topic: "TypeScript", status: "Completed", progress: 100 },
  { topic: "State Management", status: "In Progress", progress: 60 },
  { topic: "Testing", status: "Not Started", progress: 0 },
  { topic: "Performance", status: "Not Started", progress: 0 },
  { topic: "Styling", status: "Completed", progress: 100 },
  { topic: "System Design", status: "Not Started", progress: 0 }
]

const projects = [
  {
    id: "1",
    title: "E-commerce Dashboard",
    description: "Full-stack e-commerce admin dashboard with analytics",
    repoLink: "https://github.com/user/ecommerce-dashboard",
    liveLink: "https://ecommerce-demo.vercel.app",
    status: "Done",
    complexity: "Hard",
    technologies: ["React", "Next.js", "TypeScript", "Prisma", "PostgreSQL"]
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    repoLink: "https://github.com/user/task-manager",
    liveLink: "https://task-manager-demo.vercel.app",
    status: "In Progress",
    complexity: "Medium",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"]
  },
  {
    id: "3",
    title: "Weather Widget",
    description: "Beautiful weather widget with location services",
    repoLink: "https://github.com/user/weather-widget",
    liveLink: "https://weather-widget-demo.vercel.app",
    status: "Done",
    complexity: "Easy",
    technologies: ["React", "CSS", "Weather API"]
  }
]

const progressData = [
  { category: "React", completed: 8, total: 10, percentage: 80 },
  { category: "Next.js", completed: 6, total: 8, percentage: 75 },
  { category: "TypeScript", completed: 7, total: 8, percentage: 87.5 },
  { category: "Styling", completed: 5, total: 6, percentage: 83.3 },
  { category: "State Mgmt", completed: 3, total: 5, percentage: 60 },
  { category: "Testing", completed: 2, total: 6, percentage: 33.3 }
]

export default function FrontendPage() {
  const [selectedTab, setSelectedTab] = useState("roadmap")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Not Started": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Easy": return "bg-green-100 text-green-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Hard": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frontend Development</h1>
          <p className="text-gray-600 mt-1">
            Master modern frontend technologies and build amazing projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Technology Progress</CardTitle>
            <CardDescription>
              Your progress across different frontend technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressChart data={progressData} />
          </CardContent>
        </Card>

        <div>
          <QuoteWidget />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("roadmap")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "roadmap"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Learning Roadmap
          </button>
          <button
            onClick={() => setSelectedTab("projects")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "projects"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Projects
          </button>
        </nav>
      </div>

      {/* Roadmap Tab */}
      {selectedTab === "roadmap" && (
        <Card>
          <CardHeader>
            <CardTitle>Frontend Learning Roadmap</CardTitle>
            <CardDescription>
              Track your progress through essential frontend technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roadmapTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{topic.topic}</h3>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{topic.progress}%</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(topic.status)}>
                    {topic.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects Tab */}
      {selectedTab === "projects" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Portfolio</CardTitle>
              <CardDescription>
                Showcase your frontend development skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge className={getComplexityColor(project.complexity)}>
                          {project.complexity}
                        </Badge>
                      </div>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            {project.repoLink && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {project.liveLink && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
