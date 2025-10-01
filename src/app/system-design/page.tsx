"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QuoteWidget } from "@/components/layout/quote-widget"
import { ProgressChart } from "@/components/charts/progress-chart"
import { Plus, Search, Edit, Save, X } from "lucide-react"

// Mock data
const systemDesignQuestions = [
  {
    id: "1",
    title: "Design a URL Shortener",
    description: "Design a service like bit.ly that can shorten long URLs",
    status: "Done",
    expertise: "Expert",
    notes: "Key components: URL encoding, database design, caching strategy, load balancing. Used base62 encoding for short URLs."
  },
  {
    id: "2",
    title: "Design a Chat Application",
    description: "Design a real-time chat application like WhatsApp",
    status: "In Progress",
    expertise: "Intermediate",
    notes: "Focusing on WebSocket connections, message queuing, and real-time synchronization."
  },
  {
    id: "3",
    title: "Design a Social Media Feed",
    description: "Design a news feed system like Facebook or Twitter",
    status: "To Do",
    expertise: "Beginner",
    notes: ""
  },
  {
    id: "4",
    title: "Design a Distributed Cache",
    description: "Design a distributed caching system like Redis",
    status: "Done",
    expertise: "Expert",
    notes: "Implemented consistent hashing, cache eviction policies, and replication strategies."
  }
]

const progressData = [
  { category: "Scalability", completed: 8, total: 12, percentage: 66.7 },
  { category: "Distributed Systems", completed: 6, total: 10, percentage: 60 },
  { category: "Database Design", completed: 7, total: 8, percentage: 87.5 },
  { category: "Caching", completed: 5, total: 6, percentage: 83.3 },
  { category: "Load Balancing", completed: 4, total: 6, percentage: 66.7 }
]

export default function SystemDesignPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedExpertise, setSelectedExpertise] = useState("All")

  const statuses = ["All", "To Do", "In Progress", "Done"]
  const expertiseLevels = ["All", "Beginner", "Intermediate", "Expert"]

  const filteredQuestions = systemDesignQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || question.status === selectedStatus
    const matchesExpertise = selectedExpertise === "All" || question.expertise === selectedExpertise
    
    return matchesSearch && matchesStatus && matchesExpertise
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Done": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "To Do": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case "Expert": return "bg-purple-100 text-purple-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Beginner": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleEditNotes = (question: { id: string; notes: string }) => {
    setEditingId(question.id)
    setEditingNotes(question.notes)
  }

  const handleSaveNotes = () => {
    // In real app, this would update the database
    console.log("Saving notes:", editingNotes)
    setEditingId(null)
    setEditingNotes("")
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingNotes("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Design</h1>
          <p className="text-gray-600 mt-1">
            Master large-scale system design and architecture
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Design Concepts Progress</CardTitle>
            <CardDescription>
              Your progress across different system design concepts
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

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>System Design Questions</CardTitle>
          <CardDescription>
            Practice and track your system design interview preparation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {expertiseLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{question.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {question.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(question.status)}>
                          {question.status}
                        </Badge>
                        <Badge className={getExpertiseColor(question.expertise)}>
                          {question.expertise}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Notes:</h4>
                        {editingId === question.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editingNotes}
                              onChange={(e) => setEditingNotes(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-md text-sm resize-none"
                              rows={3}
                              placeholder="Add your notes here..."
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={handleSaveNotes}>
                                <Save className="h-4 w-4 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                <X className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-600 flex-1">
                              {question.notes || "No notes added yet..."}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditNotes(question)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
