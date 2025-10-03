'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card } from '@/components/ui/styled'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface ProgressChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  type?: 'pie' | 'bar'
  title?: string
}

export function ProgressChart({ data, type = 'pie', title }: ProgressChartProps) {
  return (
    <Card className="p-6">
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

interface StreakChartProps {
  data: Array<{
    date: string
    questions: number
    streak: number
  }>
}

export function StreakChart({ data }: StreakChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="questions" fill="#8884d8" name="Questions Solved" />
            <Bar dataKey="streak" fill="#00C49F" name="Current Streak" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
