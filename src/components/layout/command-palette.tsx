'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Command } from 'cmdk'
import { 
  Search, 
  LayoutDashboard, 
  Code, 
  Palette, 
  Network,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const commands = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'View your progress overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'dsa',
    name: 'DSA Problems',
    description: 'Manage your DSA questions',
    href: '/dsa',
    icon: Code,
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Track frontend learning progress',
    href: '/frontend',
    icon: Palette,
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Practice system design questions',
    href: '/system-design',
    icon: Network,
  },
]

interface CommandPaletteProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        handleOpenChange(!isOpen)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [isOpen])

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  // Expose the open function globally for navbar button
  useEffect(() => {
    (window as any).openCommandPalette = () => handleOpenChange(true)
  }, [])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => handleOpenChange(false)} />
      )}
      <Command.Dialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        className={cn(
          'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'bg-background border border-border rounded-lg shadow-lg',
          'animate-in fade-in-0 zoom-in-95 duration-200'
        )}
      >
        <div className="flex items-center border-b border-border px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Command.Input
            placeholder="Search commands..."
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            onClick={() => handleOpenChange(false)}
            className="ml-2 h-4 w-4 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-1">
          <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>
          <Command.Group>
            {commands.map((command) => (
              <Command.Item
                key={command.id}
                value={command.name}
                onSelect={() => {
                  router.push(command.href)
                  handleOpenChange(false)
                }}
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <command.icon className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{command.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {command.description}
                  </span>
                </div>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
    </>
  )
}
