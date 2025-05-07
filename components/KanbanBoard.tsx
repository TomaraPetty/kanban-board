"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TaskDialog } from "@/components/task-dialog"
import { TaskDropdown } from "@/components/task-dropdown"
import { v4 as uuidv4 } from "uuid"
import { assignees } from "@/lib/data"
import Image from "next/image"

export interface Task {
  id: string
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
}

interface TaskFormValues {
  title: string
  description: string
  assignee: string
}

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks: initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskFormValues | null>(null)
  const [createStatus, setCreateStatus] = useState<'todo' | 'in-progress' | 'done'>('todo')

  const handleAssigneeChange = (taskId: string, newAssignee: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, assignee: newAssignee } 
          : task
      )
    )
  }

  const handleCreateTask = (status: 'todo' | 'in-progress' | 'done') => {
    setCreateStatus(status)
    setEditingTask(null)
    setIsDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask({
      title: task.title,
      description: task.description,
      assignee: task.assignee,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const handleSubmit = (data: TaskFormValues) => {
    if (editingTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.title === editingTask.title && 
          task.description === editingTask.description && 
          task.assignee === editingTask.assignee
            ? { ...task, ...data }
            : task
        )
      )
    } else {
      const newTask: Task = {
        id: uuidv4(),
        ...data,
        status: createStatus,
      }
      setTasks(prevTasks => [...prevTasks, newTask])
    }
    setIsDialogOpen(false)
    setEditingTask(null)
  }

  const todoTasks = tasks.filter(task => task.status === 'todo')
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress')
  const doneTasks = tasks.filter(task => task.status === 'done')

  const renderTaskCard = (task: Task) => {
    const assignee = assignees.find(a => a.name === task.assignee)
    
    return (
      <Card key={task.id} className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-500">{task.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Select 
              value={task.assignee || "unassigned"} 
              onValueChange={(value) => handleAssigneeChange(task.id, value === "unassigned" ? "" : value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Assign to...">
                  {task.assignee && assignee && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={assignee.avatar}
                        alt={assignee.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span>{assignee.name}</span>
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {assignees.map(assignee => (
                  <SelectItem key={assignee.id} value={assignee.name}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={assignee.avatar}
                        alt={assignee.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span>{assignee.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <TaskDropdown 
              onEdit={() => handleEditTask(task)} 
              onDelete={() => handleDeleteTask(task.id)} 
            />
          </div>
        </div>
        {task.assignee && assignee && (
          <div className="flex items-center gap-2 mt-2">
            <Image
              src={assignee.avatar}
              alt={assignee.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <p className="text-sm text-muted-foreground">
              Assigned to: {assignee.name}
            </p>
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="flex gap-4 p-4 h-full">
      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Todo</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCreateTask('todo')}>
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todoTasks.map(renderTaskCard)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>In Progress</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCreateTask('in-progress')}>
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgressTasks.map(renderTaskCard)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Done</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleCreateTask('done')}>
              Add Task
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doneTasks.map(renderTaskCard)}
            </div>
          </CardContent>
        </Card>
      </div>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editingTask}
        onSubmit={handleSubmit}
      />
    </div>
  )
} 