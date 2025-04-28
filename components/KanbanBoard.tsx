"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { UserIcon } from "lucide-react"
import { useState } from "react"

interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
  assignee?: string
}

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks: initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const handleAssigneeChange = (taskId: string, newAssignee: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignee: newAssignee } 
          : task
      )
    )
  }

  const todoTasks = tasks.filter(task => task.status === 'todo')
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress')
  const doneTasks = tasks.filter(task => task.status === 'done')

  return (
    <div className="flex gap-4 p-4 h-full">
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todoTasks.map(task => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                      )}
                    </div>
                    <Select 
                      value={task.assignee || "unassigned"} 
                      onValueChange={(value) => handleAssigneeChange(task.id, value === "unassigned" ? "" : value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {task.assignee && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Assigned to: {task.assignee}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressTasks.map(task => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                      )}
                    </div>
                    <Select 
                      value={task.assignee || "unassigned"} 
                      onValueChange={(value) => handleAssigneeChange(task.id, value === "unassigned" ? "" : value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {task.assignee && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Assigned to: {task.assignee}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Done</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doneTasks.map(task => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-500">{task.description}</p>
                      )}
                    </div>
                    <Select 
                      value={task.assignee || "unassigned"} 
                      onValueChange={(value) => handleAssigneeChange(task.id, value === "unassigned" ? "" : value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        <SelectItem value="John Doe">John Doe</SelectItem>
                        <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {task.assignee && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Assigned to: {task.assignee}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 