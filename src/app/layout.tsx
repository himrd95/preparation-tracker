'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Sidebar } from '@/components/layout/sidebar'
import { CommandPalette } from '@/components/layout/command-palette'
import { QuoteWidget } from '@/components/layout/quote-widget'
import { MainContent } from '@/components/ui/styled'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { AuthGuard } from '@/components/auth/auth-guard'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Check if current path is an auth page
  const isAuthPage = pathname?.startsWith('/auth')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {isAuthPage ? (
            // For auth pages, render without AuthGuard and minimal layout
            <div className="min-h-screen">
              {children}
              <Toaster position="top-right" />
            </div>
          ) : (
            // For protected pages, use AuthGuard and full layout
            <AuthGuard>
              <div className="min-h-screen bg-background">
                <Navbar onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <MainContent $sidebarOpen={sidebarOpen}>
                  {children}
                </MainContent>
                <CommandPalette />
                <QuoteWidget />
                <Toaster position="top-right" />
              </div>
            </AuthGuard>
          )}
        </Providers>
      </body>
    </html>
  )
}
