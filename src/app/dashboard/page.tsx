"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressChart, WeeklyProgressChart } from "@/components/charts/progress-chart"
import { QuoteWidget } from "@/components/layout/quote-widget"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target, TrendingUp, Clock } from "lucide-react"

// Mock data - in real app, this would come from API
const progressData = [
  { category: "DSA", completed: 45, total: 100, percentage: 45 },
  { category: "Frontend", completed: 30, total: 50, percentage: 60 },
  { category: "System Design", completed: 15, total: 40, percentage: 37.5 }
]

const weeklyData = [
  { week: "Week 1", dsa: 5, frontend: 3, systemDesign: 2 },
  { week: "Week 2", dsa: 8, frontend: 4, systemDesign: 3 },
  { week: "Week 3", dsa: 6, frontend: 6, systemDesign: 4 },
  { week: "Week 4", dsa: 10, frontend: 5, systemDesign: 3 },
]

const stats = [
  { label: "Total Problems", value: "90", icon: Target, color: "text-blue-600" },
  { label: "Completed", value: "60", icon: TrendingUp, color: "text-green-600" },
  { label: "Current Streak", value: "7 days", icon: Clock, color: "text-orange-600" },
  { label: "This Week", value: "12", icon: Calendar, color: "text-purple-600" },
]

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="space-y-10">
        {/* Modern Header */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative glass-card p-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                  Welcome back, {session?.user?.name || "User"}! 👋
                </h1>
                <p className="text-base md:text-lg text-white/90">
                  Ready to continue your preparation journey?
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-float">
                  <div className="text-6xl">🚀</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="group relative overflow-hidden glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white from-opacity-20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color.replace('text-', 'from-').replace('-600', '-500')} to-white to-opacity-20`}>
                    <stat.icon className={`h-6 w-6 text-white`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  </div>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold gradient-text mb-2">Progress Overview</h3>
                  <p className="text-gray-600">Your preparation progress across different categories</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <div className="text-white text-2xl">📊</div>
                </div>
              </div>
              <div className="h-80">
                <ProgressChart data={progressData} />
              </div>
            </div>
          </div>

          {/* Quote Widget */}
          <div>
            <QuoteWidget />
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="glass-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-2">Weekly Progress</h3>
              <p className="text-gray-600">Your activity over the past 4 weeks</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <div className="text-white text-2xl">📈</div>
            </div>
          </div>
          <div className="h-80">
            <WeeklyProgressChart data={weeklyData} />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {progressData.map((category, index) => (
            <div 
              key={category.category} 
              className="group glass-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold gradient-text">{category.category}</h3>
                <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-full">
                  {category.percentage}%
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-gray-800">{category.completed}/{category.total}</span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-opacity-20 to-transparent rounded-full h-4 animate-pulse-slow"></div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {category.total - category.completed} remaining
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

