"use client"

import { useState, useEffect } from "react"
import { Command } from "cmdk"
import { LayoutDashboard, Code, Palette, Network } from "lucide-react"
import { useRouter } from "next/navigation"

const commands = [
  {
    id: "dashboard",
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "dsa",
    name: "DSA Problems",
    href: "/dsa",
    icon: Code,
  },
  {
    id: "frontend",
    name: "Frontend Projects",
    href: "/frontend",
    icon: Palette,
  },
  {
    id: "system-design",
    name: "System Design",
    href: "/system-design",
    icon: Network,
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {commands.map((command) => (
            <Command.Item
              key={command.id}
              value={command.name}
              onSelect={() => {
                router.push(command.href)
                setOpen(false)
              }}
              className="flex items-center space-x-2"
            >
              <command.icon className="h-4 w-4" />
              <span>{command.name}</span>
            </Command.Item>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  )
}
