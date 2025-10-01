"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const COLORS = {
  dsa: "#3B82F6",
  frontend: "#10B981", 
  systemDesign: "#F59E0B"
}

interface ProgressChartProps {
  data: {
    category: string
    completed: number
    total: number
    percentage: number
  }[]
}

export function ProgressChart({ data }: ProgressChartProps) {
  const pieData = data.map(item => ({
    name: item.category,
    value: item.percentage,
    completed: item.completed,
    total: item.total
  }))

  const colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"]

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, "Progress"]}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

interface WeeklyProgressProps {
  data: {
    week: string
    dsa: number
    frontend: number
    systemDesign: number
  }[]
}

export function WeeklyProgressChart({ data }: WeeklyProgressProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="week" 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#64748b' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
              fontSize: '14px',
              fontWeight: '500'
            }}
          />
          <Bar 
            dataKey="dsa" 
            fill="url(#dsaGradient)" 
            name="DSA" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="frontend" 
            fill="url(#frontendGradient)" 
            name="Frontend" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="systemDesign" 
            fill="url(#systemGradient)" 
            name="System Design" 
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="dsaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
            <linearGradient id="frontendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f093fb" />
              <stop offset="100%" stopColor="#f5576c" />
            </linearGradient>
            <linearGradient id="systemGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4facfe" />
              <stop offset="100%" stopColor="#00f2fe" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

