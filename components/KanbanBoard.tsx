import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
}

interface KanbanBoardProps {
  tasks: Task[]
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
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
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-gray-500">{task.description}</p>
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
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-gray-500">{task.description}</p>
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
                  <h3 className="font-semibold">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-gray-500">{task.description}</p>
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