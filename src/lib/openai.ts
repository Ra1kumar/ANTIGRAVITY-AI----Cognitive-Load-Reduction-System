import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface TaskAnalysis {
  category: 'Do Now' | 'Do Later' | 'Delegate / Drop'
  priority_score: number
  estimated_effort: number
  burnout_risk: 'low' | 'medium' | 'high'
  reasoning: string
}

export async function analyzeTask(taskText: string, deadline?: string): Promise<TaskAnalysis> {
  const deadlineInfo = deadline ? `Deadline: ${deadline}` : 'No deadline specified'

  const prompt = `
Analyze this task and provide a JSON response with the following structure:
{
  "category": "Do Now" | "Do Later" | "Delegate / Drop",
  "priority_score": number (1-10, where 10 is highest priority),
  "estimated_effort": number (estimated hours to complete),
  "burnout_risk": "low" | "medium" | "high",
  "reasoning": "brief explanation of the analysis"
}

Task: ${taskText}
${deadlineInfo}

Consider:
- Urgency based on deadline
- Complexity and required effort
- Potential for delegation
- Impact on workload and stress levels
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that analyzes tasks for cognitive load reduction. Provide objective, helpful analysis in the specified JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 300,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    const analysis = JSON.parse(response.trim())

    // Validate the response structure
    if (!analysis.category || !analysis.priority_score || !analysis.estimated_effort || !analysis.burnout_risk || !analysis.reasoning) {
      throw new Error('Invalid response structure')
    }

    return analysis as TaskAnalysis
  } catch (error) {
    console.error('Error analyzing task:', error)
    // Return default values if analysis fails
    return {
      category: 'Do Later',
      priority_score: 5,
      estimated_effort: 2,
      burnout_risk: 'medium',
      reasoning: 'Analysis failed, using default values'
    }
  }
}
