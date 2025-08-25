import { type NextRequest, NextResponse } from "next/server"
import { dbOperations } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get("studentId")
    const teacherId = searchParams.get("teacherId")

    let courses = []

    if (studentId) {
      courses = await dbOperations.getCoursesByStudent(Number.parseInt(studentId))
    } else if (teacherId) {
      courses = await dbOperations.getCoursesByTeacher(Number.parseInt(teacherId))
    } else {
      // Return all courses (admin view)
      courses = []
    }

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // In a real implementation, you would validate the input and create the course
    console.log("[v0] Creating course:", body)

    return NextResponse.json({ message: "Course created successfully", id: Date.now() })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
