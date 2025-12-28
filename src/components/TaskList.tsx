'use client'

import { TaskCard } from './TaskCard'
import { Task } from '@/lib/types'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const categorizedTasks = {
    'Do Now': tasks.filter(task => task.category === 'Do Now'),
    'Do Later': tasks.filter(task => task.category === 'Do Later'),
    'Delegate / Drop': tasks.filter(task => task.category === 'Delegate / Drop'),
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Your Tasks</h2>

      {Object.entries(categorizedTasks).map(([category, categoryTasks]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${
              category === 'Do Now' ? 'bg-red-400' :
              category === 'Do Later' ? 'bg-yellow-400' : 'bg-green-400'
            }`}></span>
            {category} ({categoryTasks.length})
          </h3>

          {categoryTasks.length === 0 ? (
            <div className="bg-white/5 rounded-lg p-6 text-center">
              <p className="text-gray-400">No tasks in this category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {categoryTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="bg-white/5 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-2">No tasks yet</p>
          <p className="text-sm text-gray-500">Add your first task to get started with AI-powered organization</p>
        </div>
      )}
    </div>
  )
}
