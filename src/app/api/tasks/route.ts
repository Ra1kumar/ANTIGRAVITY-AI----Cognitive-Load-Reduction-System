import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore'

export async function GET() {
  try {
    const tasksRef = collection(db, 'tasks')
    const q = query(tasksRef, orderBy('created_at', 'desc'))
    const querySnapshot = await getDocs(q)

    const tasks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, deadline } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Analyze task with AI
    const analysisResponse = await fetch(`${request.nextUrl.origin}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })

    if (!analysisResponse.ok) {
      throw new Error('Failed to analyze task')
    }

    const analysis = await analysisResponse.json()

    const taskData = {
      title,
      description: description || '',
      deadline: deadline || null,
      priority_score: analysis.priority_score,
      estimated_effort: analysis.estimated_effort,
      category: analysis.category,
      burnout_risk: analysis.burnout_risk,
      user_id: 'default_user', // In a real app, this would come from auth
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const docRef = await addDoc(collection(db, 'tasks'), taskData)

    return NextResponse.json({
      id: docRef.id,
      ...taskData,
    })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}
