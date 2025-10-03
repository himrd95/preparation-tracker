'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Code, Palette, Network, TrendingUp, Target, Calendar } from 'lucide-react'
import { GlassCard, Card } from '@/components/ui/styled'
import { ProgressChart, StreakChart } from '@/components/charts/progress-chart'
import { DashboardSkeleton } from '@/components/ui/skeleton'
import toast from 'react-hot-toast'

interface Question {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  [key: string]: any
}

interface Project {
  id: string
  title: string
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD'
  [key: string]: any
}

interface SystemDesign {
  id: string
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  [key: string]: any
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [questions, setQuestions] = useState<Question[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [systemDesigns, setSystemDesigns] = useState<SystemDesign[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [questionsRes, projectsRes, systemDesignsRes] = await Promise.all([
        fetch('/api/questions'),
        fetch('/api/projects'),
        fetch('/api/system-design')
      ])

      if (questionsRes.ok) {
        const questionsData = await questionsRes.json()
        setQuestions(questionsData)
      }
      
      if (projectsRes.ok) {
        const projectsData = await projectsRes.json()
        setProjects(projectsData)
      }
      
      if (systemDesignsRes.ok) {
        const systemDesignsData = await systemDesignsRes.json()
        setSystemDesigns(systemDesignsData)
      }
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const quickEntryCards = [
    {
      title: 'DSA Problems',
      description: 'Track your data structures and algorithms progress',
      href: '/dsa',
      icon: Code,
      color: 'from-blue-500 to-blue-600',
      stats: { 
        total: questions.length, 
        completed: questions.filter(q => q.status === 'DONE').length 
      }
    },
    {
      title: 'Frontend',
      description: 'Master React, Next.js, and modern web development',
      href: '/frontend',
      icon: Palette,
      color: 'from-purple-500 to-purple-600',
      stats: { 
        total: projects.length, 
        completed: projects.filter(p => p.status === 'COMPLETED').length 
      }
    },
    {
      title: 'System Design',
      description: 'Practice scalable system architecture and design',
      href: '/system-design',
      icon: Network,
      color: 'from-green-500 to-green-600',
      stats: { 
        total: systemDesigns.length, 
        completed: systemDesigns.filter(s => s.status === 'DONE').length 
      }
    }
  ]

  const progressData = [
    { 
      name: 'DSA', 
      value: questions.length > 0 ? Math.round((questions.filter(q => q.status === 'DONE').length / questions.length) * 100) : 0, 
      color: '#3B82F6' 
    },
    { 
      name: 'Frontend', 
      value: projects.length > 0 ? Math.round((projects.filter(p => p.status === 'COMPLETED').length / projects.length) * 100) : 0, 
      color: '#8B5CF6' 
    },
    { 
      name: 'System Design', 
      value: systemDesigns.length > 0 ? Math.round((systemDesigns.filter(s => s.status === 'DONE').length / systemDesigns.length) * 100) : 0, 
      color: '#10B981' 
    }
  ]

  const weeklyData = [
    { date: 'Mon', questions: 0, streak: 0 },
    { date: 'Tue', questions: 0, streak: 0 },
    { date: 'Wed', questions: 0, streak: 0 },
    { date: 'Thu', questions: 0, streak: 0 },
    { date: 'Fri', questions: 0, streak: 0 },
    { date: 'Sat', questions: 0, streak: 0 },
    { date: 'Sun', questions: 0, streak: 0 }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {getGreeting()}, {session?.user?.name || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Ready to level up your SDE2 preparation? Let's track your progress.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-2xl font-bold text-primary">3 days</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="text-2xl font-bold text-primary">{questions.length}</p>
          </div>
        </div>
      </div>

      {/* Quick Entry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickEntryCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <GlassCard className="group cursor-pointer">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {card.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {card.stats.completed}/{card.stats.total}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {card.stats.total > 0 ? Math.round((card.stats.completed / card.stats.total) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart 
          data={progressData} 
          type="pie" 
          title="Overall Progress" 
        />
        <StreakChart data={weeklyData} />
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium">Welcome to Preparation Tracker!</p>
              <p className="text-xs text-muted-foreground">Start by adding your first question or project</p>
            </div>
            <span className="text-xs text-muted-foreground">Just now</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
