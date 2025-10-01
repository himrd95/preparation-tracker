"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Code, 
  Palette, 
  Network, 
  LogOut,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "DSA", href: "/dsa", icon: Code },
  { name: "Frontend", href: "/frontend", icon: Palette },
  { name: "System Design", href: "/system-design", icon: Network },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex h-full w-64 flex-col glass-card border-r border-white border-opacity-20 shadow-2xl">
      <div className="flex h-16 items-center px-6 border-b border-white border-opacity-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <h1 className="text-xl font-bold text-white">PrepTracker</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "text-gray-600 hover:bg-white hover:bg-opacity-20 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "mr-2.5 h-5 w-5 transition-colors",
                isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white border-opacity-20 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut()}
          className="w-full justify-start bg-white bg-opacity-20 border-white border-opacity-30 text-gray-700 hover:bg-white hover:bg-opacity-30 hover:text-gray-900 transition-all duration-200 rounded-xl"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
