'use client'

import { Task } from '@/lib/types'

interface BurnoutIndicatorProps {
  tasks: Task[]
}

export function BurnoutIndicator({ tasks }: BurnoutIndicatorProps) {
  const calculateBurnoutRisk = () => {
    const totalTasks = tasks.length
    const highPriorityTasks = tasks.filter(task => task.priority_score >= 8).length
    const urgentTasks = tasks.filter(task => {
      if (!task.deadline) return false
      const deadline = new Date(task.deadline)
      const now = new Date()
      const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntilDeadline <= 3
    }).length

    const highPriorityRatio = totalTasks > 0 ? highPriorityTasks / totalTasks : 0
    const urgentRatio = totalTasks > 0 ? urgentTasks / totalTasks : 0
    const riskScore = (highPriorityRatio * 0.6) + (urgentRatio * 0.4) + (totalTasks / 20) * 0.2

    if (riskScore >= 0.7) return { level: 'high', score: riskScore }
    if (riskScore >= 0.4) return { level: 'medium', score: riskScore }
    return { level: 'low', score: riskScore }
  }

  const { level, score } = calculateBurnoutRisk()

  const getRiskColor = () => {
    switch (level) {
      case 'high': return 'burnout-high'
      case 'medium': return 'burnout-medium'
      case 'low': return 'burnout-low'
      default: return 'burnout-low'
    }
  }

  const getRiskIcon = () => {
    switch (level) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      case 'low': return '🟢'
      default: return '🟢'
    }
  }

  return (
    <div className={`burnout-indicator ${getRiskColor()}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-2xl">{getRiskIcon()}</span>
        Burnout Risk
      </h3>

      <div className="space-y-3">
        <div className="text-center">
          <div className="text-3xl font-bold mb-1">
            {level.toUpperCase()}
          </div>
          <div className="text-sm opacity-80">
            Risk Score: {(score * 100).toFixed(0)}%
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Tasks:</span>
            <span>{tasks.length}</span>
          </div>
          <div className="flex justify-between">
            <span>High Priority:</span>
            <span>{tasks.filter(task => task.priority_score >= 8).length}</span>
          </div>
          <div className="flex justify-between">
            <span>Urgent (≤3 days):</span>
            <span>{tasks.filter(task => {
              if (!task.deadline) return false
              const deadline = new Date(task.deadline)
              const now = new Date()
              const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
              return daysUntilDeadline <= 3
            }).length}</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded bg-white/10 text-xs">
          {level === 'high' && (
            <p>⚠️ High burnout risk detected. Consider delegating tasks or taking a break.</p>
          )}
          {level === 'medium' && (
            <p>⚡ Moderate burnout risk. Monitor your workload and prioritize rest.</p>
          )}
          {level === 'low' && (
            <p>✅ Low burnout risk. Your workload appears manageable.</p>
          )}
        </div>
      </div>
    </div>
  )
}
