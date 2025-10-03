'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Code, 
  Palette, 
  Network, 
  BarChart3,
  Target,
  BookOpen,
  X
} from 'lucide-react'
import { SidebarContainer, SidebarOverlay } from '@/components/ui/styled'
import { cn } from '@/lib/utils'
import { mockQuestions, mockProjects, mockSystemDesigns } from '@/lib/mock-data'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'DSA',
    href: '/dsa',
    icon: Code,
  },
  {
    name: 'Frontend',
    href: '/frontend',
    icon: Palette,
  },
  {
    name: 'System Design',
    href: '/system-design',
    icon: Network,
  },
]

const quickStats = [
  {
    name: 'Total Questions',
    value: mockQuestions.length.toString(),
    icon: BookOpen,
  },
  {
    name: 'Completed',
    value: mockQuestions.filter(q => q.status === 'DONE').length.toString(),
    icon: Target,
  },
  {
    name: 'Progress',
    value: `${Math.round((mockQuestions.filter(q => q.status === 'DONE').length / mockQuestions.length) * 100)}%`,
    icon: BarChart3,
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Menu</h2>
            <button
              onClick={onClose}
              className="md:hidden p-1 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Stats
            </h3>
            <div className="mt-2 space-y-2">
              {quickStats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{stat.name}</span>
                  </div>
                  <span className="text-sm font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarContainer>
    </>
  )
}
