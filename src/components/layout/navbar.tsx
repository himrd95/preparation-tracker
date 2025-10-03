'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Search, Sun, Moon, User, LogOut, Settings, Menu, ChevronDown, ArrowLeft } from 'lucide-react'
import { NavbarContainer, Button } from '@/components/ui/styled'
import { cn } from '@/lib/utils'

interface NavbarProps {
  onMenuToggle: () => void
  sidebarOpen?: boolean
}

export function Navbar({ onMenuToggle, sidebarOpen = false }: NavbarProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [isCommandOpen, setIsCommandOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setIsCommandOpen(true)
    }
  }

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <NavbarContainer onKeyDown={handleKeyDown}>
      <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition-all duration-300"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-in-out",
                  sidebarOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                )}
                style={{ color: 'white' }} 
              />
              <ArrowLeft 
                className={cn(
                  "absolute inset-0 transition-all duration-300 ease-in-out",
                  sidebarOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                )}
                style={{ color: 'white' }} 
              />
            </div>
          </button>
        <h1 className="text-xl font-bold text-foreground">Preparation Tracker</h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          $variant="ghost"
          onClick={() => {
            if ((window as any).openCommandPalette) {
              (window as any).openCommandPalette()
            }
          }}
          className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

          <button
            onClick={() => {
              console.log('Current theme before toggle:', theme)
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg relative transition-all duration-300"
            style={{ width: '2.5rem', height: '2.5rem' }}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Sun 
                className={cn(
                  "absolute transition-all duration-500 ease-in-out w-5 h-5",
                  theme === 'light' ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-180 scale-0"
                )}
                style={{ color: 'white' }} 
              />
              <Moon 
                className={cn(
                  "absolute transition-all duration-500 ease-in-out w-5 h-5",
                  theme === 'dark' ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
                )}
                style={{ color: 'white' }} 
              />
            </div>
            <span className="sr-only">Toggle theme</span>
          </button>

        {session ? (
          <div className="relative" ref={profileMenuRef}>
            <Button
              $variant="ghost"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 h-9 px-2"
            >
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <span className="text-sm font-medium hidden sm:block">{session.user?.name || 'User'}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    // Add settings functionality here
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={() => signIn()}>
            <User className="h-4 w-4" />
            <span className="hidden sm:block">Sign In</span>
          </Button>
        )}
      </div>
    </NavbarContainer>
  )
}
