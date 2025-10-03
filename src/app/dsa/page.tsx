'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Search, CheckCircle, Circle, Clock, ExternalLink } from 'lucide-react'
import { Card, Button, Input, Select } from '@/components/ui/styled'
import { ProgressChart } from '@/components/charts/progress-chart'
import { DSASkeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const topics = [
  'Arrays', 'Strings', 'Linked Lists', 'Stacks', 'Queues', 
  'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching'
]

const difficulties = ['Easy', 'Medium', 'Hard']
const statuses = ['To Do', 'In Progress', 'Done']
const expertiseLevels = ['Beginner', 'Intermediate', 'Expert']


// Calculate progress data from actual questions
const getProgressData = (questions: Question[]) => {
  const topicStats = questions.reduce((acc, question) => {
    const topic = question.topic
    if (!acc[topic]) {
      acc[topic] = { total: 0, solved: 0 }
    }
    acc[topic].total++
    if (question.status === 'DONE') {
      acc[topic].solved++
    }
    return acc
  }, {} as Record<string, { total: number; solved: number }>)

  const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#84CC16']
  
  return Object.entries(topicStats).map(([topic, stats], index) => ({
    name: topic,
    value: stats.solved,
    total: stats.total,
    color: colors[index % colors.length]
  }))
}

interface Question {
  id: string // This is the QuestionBank ID
  progressId: string | null // This is the QuestionProgress ID
  title: string
  link?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  expertise: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
  topic: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  notes?: string
  solvedAt?: string
  createdAt: string
  updatedAt: string
}

export default function DSAPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  // Fetch questions from API
  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      console.log('🔍 Fetching questions from API...')
      const response = await fetch('/api/questions')
      console.log('📡 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Questions received:', data.length)
        console.log('📋 Sample question:', data[0])
        setQuestions(data)
      } else {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        toast.error('Failed to fetch questions')
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      toast.error('Error fetching questions')
    } finally {
      setLoading(false)
    }
  }

  const updateQuestionStatus = async (questionId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          questionId: questionId, // Send questionId as required by API
          status: newStatus 
        }),
      })

      if (response.ok) {
        const updatedQuestion = await response.json()
        setQuestions(prev => 
          prev.map(q => q.id === questionId ? updatedQuestion : q)
        )
        toast.success('Status updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('Update failed:', errorData)
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Error updating status')
    }
  }

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = !selectedTopic || question.topic === selectedTopic
    const matchesDifficulty = !selectedDifficulty || question.difficulty === selectedDifficulty
    const matchesStatus = !selectedStatus || question.status === selectedStatus

    return matchesSearch && matchesTopic && matchesDifficulty && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DONE':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'TODO':
        return 'IN_PROGRESS'
      case 'IN_PROGRESS':
        return 'DONE'
      case 'DONE':
        return 'TODO'
      default:
        return 'TODO'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'text-green-600 bg-green-100'
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100'
      case 'HARD':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  if (loading) {
    return <DSASkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">DSA Problems</h1>
          <p className="text-muted-foreground mt-2">
            Track your data structures and algorithms journey
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Solved</p>
              <p className="text-xl font-bold">{questions.filter(q => q.status === 'DONE').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="text-xl font-bold">{questions.filter(q => q.status === 'IN_PROGRESS').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-lg">
              <Circle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">To Do</p>
              <p className="text-xl font-bold">{questions.filter(q => q.status === 'TODO').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-xl font-bold">
                {Math.round((questions.filter(q => q.status === 'DONE').length / questions.length) * 100)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions Table */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Problems</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button $variant="ghost">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-4">
              <Select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-32"
              >
                <option value="">All Topics</option>
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </Select>
              <Select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-32"
              >
                <option value="">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </Select>
              <Select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-32"
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </Select>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {questions.length === 0 
                      ? 'No questions found. Try refreshing the page.' 
                      : 'No questions match your current filters.'
                    }
                  </p>
                  {questions.length === 0 && (
                    <Button 
                      onClick={fetchQuestions} 
                      className="mt-4"
                      $variant="secondary"
                    >
                      Refresh Questions
                    </Button>
                  )}
                </div>
              ) : (
                filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => updateQuestionStatus(question.id, getNextStatus(question.status) as any)}
                      className="hover:opacity-70 transition-opacity"
                      title={`Click to change status from ${question.status} to ${getNextStatus(question.status)}`}
                    >
                      {getStatusIcon(question.status)}
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {question.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {question.topic}
                      </span>
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getDifficultyColor(question.difficulty)
                      )}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {question.link && (
                      <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Button $variant="ghost">
                      Edit
                    </Button>
                  </div>
                </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Progress Chart */}
        <div>
          <ProgressChart 
            data={getProgressData(questions)} 
            type="pie" 
            title="Progress by Topic" 
          />
        </div>
      </div>
    </div>
  )
}
