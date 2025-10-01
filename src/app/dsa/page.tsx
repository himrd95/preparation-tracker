"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QuoteWidget } from "@/components/layout/quote-widget"
import { ProgressChart } from "@/components/charts/progress-chart"
import { Plus, Search, ExternalLink } from "lucide-react"

// Mock data - in real app, this would come from API
const problems = [
  {
    id: "1",
    title: "Two Sum",
    link: "https://leetcode.com/problems/two-sum/",
    category: "Array",
    status: "Done",
    expertise: "Expert",
    difficulty: "Easy"
  },
  {
    id: "2", 
    title: "Add Two Numbers",
    link: "https://leetcode.com/problems/add-two-numbers/",
    category: "Linked List",
    status: "In Progress",
    expertise: "Intermediate",
    difficulty: "Medium"
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    category: "String",
    status: "To Do",
    expertise: "Beginner",
    difficulty: "Medium"
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    category: "Array",
    status: "Done",
    expertise: "Expert",
    difficulty: "Hard"
  }
]

const categories = ["All", "Array", "String", "Linked List", "Tree", "Graph", "Dynamic Programming"]
const statuses = ["All", "To Do", "In Progress", "Done"]
const expertiseLevels = ["All", "Beginner", "Intermediate", "Expert"]

const progressData = [
  { category: "Array", completed: 15, total: 30, percentage: 50 },
  { category: "String", completed: 8, total: 20, percentage: 40 },
  { category: "Linked List", completed: 5, total: 15, percentage: 33.3 },
  { category: "Tree", completed: 12, total: 25, percentage: 48 },
  { category: "Graph", completed: 3, total: 10, percentage: 30 }
]

export default function DSAPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedExpertise, setSelectedExpertise] = useState("All")

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || problem.status === selectedStatus
    const matchesExpertise = selectedExpertise === "All" || problem.expertise === selectedExpertise
    
    return matchesSearch && matchesCategory && matchesStatus && matchesExpertise
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DSA Problems</h1>
          <p className="text-gray-600 mt-1">
            Track your data structures and algorithms journey
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Problem
        </Button>
      </div>

      {/* Stats and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Progress by Category</CardTitle>
            <CardDescription>
              Your progress across different DSA topics
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Problem Tracker</CardTitle>
          <CardDescription>
            Manage and track your DSA problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
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

            {/* Problems Table */}
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Problem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expertise
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProblems.map((problem) => (
                      <tr key={problem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {problem.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {problem.difficulty}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{problem.category}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(problem.status)}>
                            {problem.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getExpertiseColor(problem.expertise)}>
                            {problem.expertise}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            {problem.link && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
