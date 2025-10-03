'use client'

import { useState, useEffect } from 'react'
import { Plus, CheckCircle, Circle, Clock, FileText, Edit3, Save } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui/styled'
import { ProgressChart } from '@/components/charts/progress-chart'
import { SystemDesignSkeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface SystemDesign {
  id: string
  progressId: string | null
  title: string
  description?: string
  expertise: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  notes?: string
  createdAt: string
  updatedAt: string
}

// Calculate progress data from actual system designs
const getProgressData = (questions: SystemDesign[]) => {
  const statusStats = questions.reduce((acc, design) => {
    const status = design.status
    if (!acc[status]) {
      acc[status] = 0
    }
    acc[status]++
    return acc
  }, {} as Record<string, number>)

  const colors = ['#10B981', '#F59E0B', '#6B7280']
  
  return Object.entries(statusStats).map(([status, count], index) => ({
    name: status.replace('_', ' '),
    value: count,
    color: colors[index % colors.length]
  }))
}

const getExpertiseData = (questions: SystemDesign[]) => {
  const expertiseStats = questions.reduce((acc, design) => {
    const expertise = design.expertise
    if (!acc[expertise]) {
      acc[expertise] = 0
    }
    acc[expertise]++
    return acc
  }, {} as Record<string, number>)

  const colors = ['#3B82F6', '#8B5CF6', '#EF4444']
  
  return Object.entries(expertiseStats).map(([expertise, count], index) => ({
    name: expertise,
    value: count,
    color: colors[index % colors.length]
  }))
}

export default function SystemDesignPage() {
  const [questions, setQuestions] = useState<SystemDesign[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesText, setNotesText] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  // Fetch system designs from API
  useEffect(() => {
    fetchSystemDesigns()
  }, [])

  const fetchSystemDesigns = async () => {
    try {
      console.log('🔍 Fetching system designs from API...')
      const response = await fetch('/api/system-design')
      console.log('📡 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 System designs received:', data.length)
        console.log('📋 Sample system design:', data[0])
        setQuestions(data)
      } else {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        toast.error('Failed to fetch system designs')
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      toast.error('Error fetching system designs')
    } finally {
      setLoading(false)
    }
  }

  const updateSystemDesignStatus = async (systemDesignId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    try {
      const response = await fetch(`/api/system-design/${systemDesignId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          systemDesignId: systemDesignId,
          status: newStatus 
        }),
      })

      if (response.ok) {
        const updatedSystemDesign = await response.json()
        setQuestions(prev => 
          prev.map(sd => sd.id === systemDesignId ? updatedSystemDesign : sd)
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

  const updateSystemDesignNotes = async (systemDesignId: string, notes: string) => {
    try {
      const response = await fetch(`/api/system-design/${systemDesignId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          systemDesignId: systemDesignId,
          notes: notes 
        }),
      })

      if (response.ok) {
        const updatedSystemDesign = await response.json()
        setQuestions(prev => 
          prev.map(sd => sd.id === systemDesignId ? updatedSystemDesign : sd)
        )
        setEditingNotes(false)
        setSelectedQuestionId(null)
        toast.success('Notes updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('Update failed:', errorData)
        toast.error('Failed to update notes')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('Error updating notes')
    }
  }

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'text-green-600 bg-green-100'
      case 'IN_PROGRESS':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case 'BEGINNER':
        return 'text-green-600 bg-green-100'
      case 'INTERMEDIATE':
        return 'text-yellow-600 bg-yellow-100'
      case 'EXPERT':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-muted-foreground bg-muted'
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

  const handleEditNotes = (questionId: string) => {
    const question = questions.find(q => q.id === questionId)
    if (question) {
      setSelectedQuestionId(questionId)
      setNotesText(question.notes || '')
      setEditingNotes(true)
    }
  }

  const handleSaveNotes = () => {
    if (selectedQuestionId) {
      updateSystemDesignNotes(selectedQuestionId, notesText)
    }
  }

  const selectedQuestionData = questions.find(q => q.id === selectedQuestionId)

  if (loading) {
    return <SystemDesignSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Design</h1>
          <p className="text-muted-foreground mt-2">
            Practice system design questions and track your architectural thinking
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4" />
          Add Question
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-xl font-bold">{questions.filter(sd => sd.status === 'DONE').length}</p>
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
              <p className="text-xl font-bold">{questions.filter(sd => sd.status === 'IN_PROGRESS').length}</p>
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
              <p className="text-xl font-bold">{questions.filter(sd => sd.status === 'TODO').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Questions</p>
              <p className="text-xl font-bold">{questions.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">System Design Questions</h3>
            <div className="space-y-4">
              {questions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No system design questions found. Try refreshing the page.</p>
                  <Button 
                    onClick={fetchSystemDesigns} 
                    className="mt-4"
                    $variant="secondary"
                  >
                    Refresh Questions
                  </Button>
                </div>
              ) : (
                questions.map((question) => (
                  <div
                    key={question.id}
                    className={cn(
                      'p-4 rounded-lg border border-border transition-colors cursor-pointer',
                      selectedQuestionId === question.id 
                        ? 'bg-accent border-primary' 
                        : 'hover:bg-accent/50'
                    )}
                    onClick={() => setSelectedQuestionId(question.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            updateSystemDesignStatus(question.id, getNextStatus(question.status) as any)
                          }}
                          className="hover:opacity-70 transition-opacity"
                          title={`Click to change status from ${question.status} to ${getNextStatus(question.status)}`}
                        >
                          {getStatusIcon(question.status)}
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">
                            {question.title}
                          </h4>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            getStatusColor(question.status)
                          )}>
                            {question.status.replace('_', ' ')}
                          </span>
                          <span className={cn(
                            'px-2 py-1 rounded-full text-xs font-medium',
                            getExpertiseColor(question.expertise)
                          )}>
                            {question.expertise}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {question.description}
                        </p>
                        {question.notes && (
                          <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                            <strong>Notes:</strong> {question.notes}
                          </div>
                        )}
                      </div>
                      <Button
                        $variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditNotes(question.id)
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Notes Editor */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notes</h3>
              {editingNotes && (
                <Button onClick={handleSaveNotes}>
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              )}
            </div>
            
            {selectedQuestionData ? (
              <div>
                <h4 className="font-medium text-foreground mb-2">
                  {selectedQuestionData.title}
                </h4>
                {editingNotes ? (
                  <textarea
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    placeholder="Add your notes about this system design question..."
                    className="w-full h-64 p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {selectedQuestionData.description}
                    </p>
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {selectedQuestionData.notes || 'No notes yet. Click edit to add notes.'}
                    </div>
                    <Button
                      $variant="ghost"
                      onClick={() => setEditingNotes(true)}
                      className="w-full"
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Notes
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a question to view and edit notes</p>
              </div>
            )}
          </Card>

          {/* Progress Charts */}
          <div className="space-y-6 mt-6">
            <ProgressChart 
              data={getProgressData(questions)} 
              type="pie" 
              title="Status Overview" 
            />
            <ProgressChart 
              data={getExpertiseData(questions)} 
              type="pie" 
              title="Expertise Level" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}