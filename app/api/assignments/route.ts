import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const teacherId = searchParams.get("teacherId")

    let assignments = []

    if (studentId) {
      assignments = await dbOperations.getAssignmentsByStudent(Number.parseInt(studentId))
    } else if (teacherId) {
      assignments = await dbOperations.getAssignmentsByTeacher(Number.parseInt(teacherId))
    }

    return NextResponse.json(assignments)
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real implementation, you would validate the input and create the assignment
    console.log("[v0] Creating assignment:", body)

    return NextResponse.json({ message: "Assignment created successfully", id: Date.now() })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
