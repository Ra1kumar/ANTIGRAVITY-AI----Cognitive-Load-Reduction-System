export interface Task {
  id: string
  title: string
  description?: string
  deadline?: string
  priority_score: number
  estimated_effort: number
  category: 'Do Now' | 'Do Later' | 'Delegate / Drop'
  burnout_risk: 'low' | 'medium' | 'high'
  user_id: string
  created_at: string
  updated_at: string
}

export interface TaskInput {
  title: string
  description?: string
  deadline?: string
}

export interface BurnoutMetrics {
  totalTasks: number
  highPriorityTasks: number
  urgentTasks: number
  riskLevel: 'low' | 'medium' | 'high'
}

export interface TaskAnalysis {
  category: 'Do Now' | 'Do Later' | 'Delegate / Drop'
  priority_score: number
  estimated_effort: number
  burnout_risk: 'low' | 'medium' | 'high'
  reasoning: string
}
