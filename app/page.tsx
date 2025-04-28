"use client"

import Image from "next/image";
import { Dialog } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useTheme } from "next-themes"
import { KanbanBoard } from "@/components/KanbanBoard"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  )
}

const sampleTasks = [
  {
    id: "1",
    title: "Design new logo",
    description: "Create a modern and minimalist logo for the brand",
    status: "todo" as const,
    assignee: "John Doe"
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up user authentication with NextAuth.js",
    status: "in-progress" as const,
    assignee: "Jane Smith"
  },
  {
    id: "3",
    title: "Write documentation",
    description: "Document the API endpoints and usage",
    status: "done" as const,
  },
]

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
        <KanbanBoard tasks={sampleTasks} />
      </main>
    </ThemeProvider>
  )
}