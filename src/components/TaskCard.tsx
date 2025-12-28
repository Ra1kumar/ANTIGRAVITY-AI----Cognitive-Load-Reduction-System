'use client'

import { useState } from 'react'
import { Edit2, Trash2, Save, X } from 'lucide-react'
import { Task } from '@/lib/types'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  const getPriorityColor = (score: number) => {
    if (score >= 8) return 'text-red-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                placeholder="Task title..."
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
                className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                placeholder="Task description..."
              />
            </div>
          ) : (
            <div>
              <h4 className="text-white font-medium mb-1">{task.title}</h4>
              {task.description && (
                <p className="text-gray-300 text-sm mb-2">{task.description}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
            <span>Priority: <span className={getPriorityColor(task.priority_score)}>{task.priority_score}/10</span></span>
            <span>Effort: {task.estimated_effort}h</span>
            <span>Risk: <span className={getBurnoutColor(task.burnout_risk)}>{task.burnout_risk}</span></span>
            {task.deadline && (
              <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="p-1 text-green-400 hover:text-green-300"
                title="Save"
              >
                <Save size={16} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-400 hover:text-gray-300"
                title="Cancel"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-400 hover:text-blue-300"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-red-400 hover:text-red-300"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
