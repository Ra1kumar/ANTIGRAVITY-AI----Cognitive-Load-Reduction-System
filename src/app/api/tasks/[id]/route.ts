import { NextRequest, NextResponse } from 'next/server'
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Task } from '@/lib/types'

// PUT /api/tasks/[id] - Update a task
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const taskRef = doc(db, 'tasks', id)
    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    await updateDoc(taskRef, updateData)

    // Fetch the updated task
    const updatedDoc = await getDoc(taskRef)
    if (!updatedDoc.exists()) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    const updatedTask: Task = {
      id: updatedDoc.id,
      ...updatedDoc.data()
    } as Task

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const taskRef = doc(db, 'tasks', id)
    await deleteDoc(taskRef)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}
