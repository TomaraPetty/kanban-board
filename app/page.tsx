"use client"

import { Button } from "@/components/ui/button"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useTheme } from "next-themes"
import { KanbanBoard, Task } from "@/components/KanbanBoard"
import { assignees } from "@/lib/data"

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
    assignee: assignees[0].name
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up user authentication with NextAuth.js",
    status: "in-progress" as const,
    assignee: assignees[1].name
  },
  {
    id: "3",
    title: "Write documentation",
    description: "Document the API endpoints and usage",
    status: "done" as const,
    assignee: assignees[2].name
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "todo" as const,
    assignee: assignees[3].name
  }
]

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeToggle />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
        <KanbanBoard tasks={sampleTasks as Task[]} />
      </main>
    </ThemeProvider>
  )
}