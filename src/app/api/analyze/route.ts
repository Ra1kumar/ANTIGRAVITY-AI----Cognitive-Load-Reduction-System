import { NextRequest, NextResponse } from 'next/server'
import { analyzeTask } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const analysis = await analyzeTask(title, description)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Error analyzing task:', error)
    return NextResponse.json({ error: 'Failed to analyze task' }, { status: 500 })
  }
}
