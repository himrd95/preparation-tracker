'use client'

import { useState, useEffect } from 'react'
import { Plus, ExternalLink, CheckCircle, Circle, Clock, BookOpen, Code2, Edit } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui/styled'
import { ProgressChart } from '@/components/charts/progress-chart'
import { FrontendSkeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const roadmapTopics = [
  {
    id: '1',
    name: 'React Fundamentals',
    description: 'Components, JSX, Props, State',
    status: 'completed',
    resources: [
      { name: 'React Docs', url: 'https://react.dev' },
      { name: 'React Tutorial', url: 'https://react.dev/learn' }
    ]
  },
  {
    id: '2',
    name: 'Next.js',
    description: 'App Router, SSR, SSG, API Routes',
    status: 'in-progress',
    resources: [
      { name: 'Next.js Docs', url: 'https://nextjs.org/docs' },
      { name: 'Next.js Learn', url: 'https://nextjs.org/learn' }
    ]
  },
  {
    id: '3',
    name: 'TypeScript',
    description: 'Types, Interfaces, Generics',
    status: 'todo',
    resources: [
      { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs' }
    ]
  },
  {
    id: '4',
    name: 'Styling',
    description: 'CSS Modules, Styled Components, Tailwind',
    status: 'todo',
    resources: [
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/docs' }
    ]
  },
  {
    id: '5',
    name: 'State Management',
    description: 'Context API, Zustand, React Query',
    status: 'todo',
    resources: [
      { name: 'React Query', url: 'https://tanstack.com/query/latest' }
    ]
  },
  {
    id: '6',
    name: 'Performance',
    description: 'Optimization, Bundle Analysis, Core Web Vitals',
    status: 'todo',
    resources: [
      { name: 'Web Vitals', url: 'https://web.dev/vitals' }
    ]
  },
  {
    id: '7',
    name: 'Testing',
    description: 'Jest, React Testing Library, Playwright',
    status: 'todo',
    resources: [
      { name: 'Testing Library', url: 'https://testing-library.com' }
    ]
  },
  {
    id: '8',
    name: 'System Design',
    description: 'Architecture Patterns, Scalability',
    status: 'todo',
    resources: [
      { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer' }
    ]
  }
]

interface Project {
  id: string
  progressId: string | null
  title: string
  description?: string
  repoLink?: string
  liveDemo?: string
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED'
  complexity: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  techStack: string[]
  notes?: string
  createdAt: string
  updatedAt: string
}

// Calculate progress data from actual projects
const getProgressData = (projects: Project[]) => {
  const techStats = projects.reduce((acc, project) => {
    project.techStack.forEach(tech => {
      if (!acc[tech]) {
        acc[tech] = { total: 0, completed: 0 }
      }
      acc[tech].total++
      if ((project.status || 'PLANNED') === 'COMPLETED') {
        acc[tech].completed++
      }
    })
    return acc
  }, {} as Record<string, { total: number; completed: number }>)

  const colors = ['#61DAFB', '#000000', '#3178C6', '#06B6D4', '#FF6B6B', '#4ECDC4', '#8B5CF6', '#10B981']
  
  return Object.entries(techStats).map(([tech, stats], index) => ({
    name: tech,
    value: stats.completed,
    total: stats.total,
    color: colors[index % colors.length]
  }))
}

export default function FrontendPage() {
  const [selectedTab, setSelectedTab] = useState<'roadmap' | 'projects'>('roadmap')
  const [projects, setProjects] = useState<Project[]>([])
  const [topics, setTopics] = useState<typeof roadmapTopics>([])
  const [loading, setLoading] = useState(true)
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesText, setNotesText] = useState('')

  // Fetch projects and topics from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchProjects(), fetchRoadmapTopics()])
      setLoading(false)
    }
    loadData()
  }, [])

  const fetchProjects = async () => {
    try {
      console.log('🔍 Fetching projects from API...')
      const response = await fetch('/api/projects')
      console.log('📡 API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Projects received:', data.length)
        console.log('📋 Sample project:', data[0])
        setProjects(data)
      } else {
        const errorData = await response.json()
        console.error('❌ API Error:', errorData)
        toast.error('Failed to fetch projects')
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      toast.error('Error fetching projects')
    }
  }

  const fetchRoadmapTopics = async () => {
    try {
      console.log('🔍 Fetching roadmap topics from API...')
      const response = await fetch('/api/roadmap-topics')
      console.log('📡 Roadmap API Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Roadmap topics received:', data.length)
        console.log('📋 Sample roadmap topic:', data[0])
        setTopics(data)
      } else {
        const errorData = await response.json()
        console.error('❌ Roadmap API Error:', errorData)
        toast.error('Failed to fetch roadmap topics')
      }
    } catch (error) {
      console.error('❌ Roadmap fetch error:', error)
      toast.error('Error fetching roadmap topics')
    }
  }

  const updateProjectStatus = async (projectId: string, newStatus: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED') => {
    try {
      console.log('🔄 Updating project status:', { projectId, newStatus })
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          projectId: projectId,
          status: newStatus 
        }),
      })

      console.log('📡 Update response status:', response.status)
      if (response.ok) {
        const updatedProject = await response.json()
        console.log('✅ Updated project:', updatedProject)
        setProjects(prev => 
          prev.map(p => p.id === projectId ? updatedProject : p)
        )
        toast.success('Status updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('❌ Update failed:', errorData)
        toast.error('Failed to update status')
      }
    } catch (error) {
      console.error('❌ Update error:', error)
      toast.error('Error updating status')
    }
  }

  const updateProjectNotes = async (projectId: string, notes: string) => {
    try {
      console.log('📝 Updating project notes:', { projectId, notes })
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          projectId: projectId,
          notes: notes 
        }),
      })

      console.log('📡 Notes update response status:', response.status)
      if (response.ok) {
        const updatedProject = await response.json()
        console.log('✅ Updated project with notes:', updatedProject)
        setProjects(prev => 
          prev.map(p => p.id === projectId ? updatedProject : p)
        )
        setEditingNotes(null)
        setNotesText('')
        toast.success('Notes updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('❌ Notes update failed:', errorData)
        toast.error('Failed to update notes')
      }
    } catch (error) {
      console.error('❌ Notes update error:', error)
      toast.error('Error updating notes')
    }
  }

  const startEditingNotes = (projectId: string, currentNotes: string) => {
    setEditingNotes(projectId)
    setNotesText(currentNotes || '')
  }

  const cancelEditingNotes = () => {
    setEditingNotes(null)
    setNotesText('')
  }

  const updateTopicStatus = async (topicId: string, newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      console.log('🔄 Updating topic status:', { topicId, newStatus })
      const response = await fetch(`/api/roadmap-topics/${topicId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topicId: topicId,
          status: newStatus 
        }),
      })

      console.log('📡 Topic update response status:', response.status)
      if (response.ok) {
        const updatedTopic = await response.json()
        console.log('✅ Updated topic:', updatedTopic)
        setTopics(prev => 
          prev.map(topic => topic.id === topicId ? updatedTopic : topic)
        )
        toast.success('Topic status updated successfully!')
      } else {
        const errorData = await response.json()
        console.error('❌ Topic update failed:', errorData)
        toast.error('Failed to update topic status')
      }
    } catch (error) {
      console.error('❌ Topic update error:', error)
      toast.error('Error updating topic status')
    }
  }

  const getNextTopicStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'todo':
        return 'in-progress'
      case 'in-progress':
        return 'completed'
      case 'completed':
        return 'todo'
      default:
        return 'todo'
    }
  }

  const getProjectStatusIcon = (status: string) => {
    const statusValue = status || 'PLANNED'
    switch (statusValue) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'IN_PROGRESS':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getProjectStatusColor = (status: string) => {
    const statusValue = status || 'PLANNED'
    switch (statusValue) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100'
      case 'IN_PROGRESS':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    const statusValue = status || 'todo'
    switch (statusValue) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    const statusValue = status || 'todo'
    switch (statusValue) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'BEGINNER':
        return 'text-green-600 bg-green-100'
      case 'INTERMEDIATE':
        return 'text-yellow-600 bg-yellow-100'
      case 'ADVANCED':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  const getNextStatus = (currentStatus: string) => {
    const status = currentStatus || 'PLANNED'
    switch (status) {
      case 'PLANNED':
        return 'IN_PROGRESS'
      case 'IN_PROGRESS':
        return 'COMPLETED'
      case 'COMPLETED':
        return 'PLANNED'
      default:
        return 'PLANNED'
    }
  }

  if (loading) {
    return <FrontendSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Frontend Development</h1>
          <p className="text-muted-foreground mt-2">
            Master modern frontend technologies and build amazing projects
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Topics Learned</p>
              <p className="text-xl font-bold">{topics.filter(t => t.status === 'completed').length}/{topics.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Projects Done</p>
              <p className="text-xl font-bold">{projects.filter(p => (p.status || 'PLANNED') === 'COMPLETED').length}</p>
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
              <p className="text-xl font-bold">{projects.filter(p => (p.status || 'PLANNED') === 'IN_PROGRESS').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Code2 className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tech Stack</p>
              <p className="text-xl font-bold">{new Set(projects.flatMap(p => p.techStack)).size}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <button
          onClick={() => setSelectedTab('roadmap')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            selectedTab === 'roadmap'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Learning Roadmap
        </button>
        <button
          onClick={() => setSelectedTab('projects')}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            selectedTab === 'projects'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Projects
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {selectedTab === 'roadmap' ? (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Learning Roadmap</h3>
              <div className="space-y-4">
                {topics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => updateTopicStatus(topic.id, getNextTopicStatus(topic.status) as any)}
                        className="hover:opacity-70 transition-opacity"
                        title={`Click to change status from ${topic.status} to ${getNextTopicStatus(topic.status)}`}
                      >
                        {getStatusIcon(topic.status)}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-foreground">{topic.name}</h4>
                        <span className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getStatusColor(topic.status)
                        )}>
                          {topic.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {topic.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {topic.resources.map((resource) => (
                          <a
                            key={resource.name}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {resource.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-6">Projects</h3>
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No projects found. Try refreshing the page.</p>
                    <Button 
                      onClick={fetchProjects} 
                      className="mt-4"
                      $variant="secondary"
                    >
                      Refresh Projects
                    </Button>
                  </div>
                ) : (
                  projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <button
                              onClick={() => updateProjectStatus(project.id, getNextStatus(project.status || 'PLANNED') as any)}
                              className="hover:opacity-70 transition-opacity"
                              title={`Click to change status from ${project.status || 'PLANNED'} to ${getNextStatus(project.status || 'PLANNED')}`}
                            >
                              {getProjectStatusIcon(project.status || 'PLANNED')}
                            </button>
                            <h4 className="font-medium text-foreground">
                              {project.title}
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs font-medium',
                              getProjectStatusColor(project.status || 'PLANNED')
                            )}>
                              {(project.status || 'PLANNED').replace('_', ' ')}
                            </span>
                            <span className={cn(
                              'px-2 py-1 rounded-full text-xs font-medium',
                              getComplexityColor(project.complexity)
                            )}>
                              {project.complexity}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        {project.repoLink && (
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Repository
                          </a>
                        )}
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live Demo
                          </a>
                        )}
                        <button
                          onClick={() => startEditingNotes(project.id, project.notes || '')}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit className="h-3 w-3" />
                          Notes
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      {/* Notes Section */}
                      {editingNotes === project.id ? (
                        <div className="mt-3 p-3 bg-muted rounded-lg">
                          <Input
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder="Add notes about this project..."
                            className="mb-2"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => updateProjectNotes(project.id, notesText)}
                              $variant="primary"
                              className="text-xs px-3 py-1"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={cancelEditingNotes}
                              $variant="secondary"
                              className="text-xs px-3 py-1"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        project.notes && (
                          <div className="mt-3 p-3 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">{project.notes}</p>
                          </div>
                        )
                      )}
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Progress Chart */}
        <div>
          <ProgressChart 
            data={getProgressData(projects)} 
            type="bar" 
            title="Tech Stack Progress" 
          />
        </div>
      </div>
    </div>
  )
}