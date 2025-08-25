"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Users, Calendar, Clock, Search, Plus, Filter } from "lucide-react"
import Link from "next/link"

// Mock user role - in a real app, this would come from authentication context
const userRole = "student" // Change this to test different roles: "student" | "teacher" | "admin"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSemester, setFilterSemester] = useState("all")

  const coursesData = {
    student: [
      {
        id: 1,
        title: "Advanced Mathematics",
        code: "MATH301",
        instructor: "Dr. Smith",
        credits: 3,
        semester: "Fall 2024",
        enrolled: 45,
        capacity: 50,
        schedule: "MWF 9:00-10:00 AM",
        progress: 75,
        grade: "A-",
        status: "enrolled",
      },
      {
        id: 2,
        title: "Physics Laboratory",
        code: "PHYS205",
        instructor: "Prof. Johnson",
        credits: 2,
        semester: "Fall 2024",
        enrolled: 30,
        capacity: 32,
        schedule: "T 2:00-5:00 PM",
        progress: 60,
        grade: "B+",
        status: "enrolled",
      },
      {
        id: 3,
        title: "Computer Science Fundamentals",
        code: "CS101",
        instructor: "Dr. Wilson",
        credits: 4,
        semester: "Fall 2024",
        enrolled: 120,
        capacity: 150,
        schedule: "TTh 10:00-11:30 AM",
        progress: 85,
        grade: "A",
        status: "enrolled",
      },
    ],
    teacher: [
      {
        id: 1,
        title: "Advanced Mathematics",
        code: "MATH301",
        instructor: "Dr. Smith",
        credits: 3,
        semester: "Fall 2024",
        enrolled: 45,
        capacity: 50,
        schedule: "MWF 9:00-10:00 AM",
        assignments: 8,
        pendingGrades: 12,
        status: "active",
      },
      {
        id: 2,
        title: "Calculus I",
        code: "MATH101",
        instructor: "Dr. Smith",
        credits: 4,
        semester: "Fall 2024",
        enrolled: 85,
        capacity: 100,
        schedule: "MWF 11:00-12:00 PM",
        assignments: 6,
        pendingGrades: 5,
        status: "active",
      },
    ],
    admin: [
      {
        id: 1,
        title: "Advanced Mathematics",
        code: "MATH301",
        instructor: "Dr. Smith",
        credits: 3,
        semester: "Fall 2024",
        enrolled: 45,
        capacity: 50,
        department: "Mathematics",
        status: "active",
      },
      {
        id: 2,
        title: "Physics Laboratory",
        code: "PHYS205",
        instructor: "Prof. Johnson",
        credits: 2,
        semester: "Fall 2024",
        enrolled: 30,
        capacity: 32,
        department: "Physics",
        status: "active",
      },
    ],
  }

  const courses = coursesData[userRole] || []

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = filterSemester === "all" || course.semester === filterSemester
    return matchesSearch && matchesSemester
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enrolled":
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "completed":
        return <Badge variant="secondary">Completed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {userRole === "student" ? "My Courses" : userRole === "teacher" ? "My Classes" : "All Courses"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "student"
              ? "Track your enrolled courses and progress"
              : userRole === "teacher"
                ? "Manage your teaching assignments"
                : "Manage all courses in the system"}
          </p>
        </div>
        {(userRole === "teacher" || userRole === "admin") && (
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            {userRole === "teacher" ? "Create Class" : "Add Course"}
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Select value={filterSemester} onValueChange={setFilterSemester}>
          <SelectTrigger className="w-48 bg-input border-border">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            <SelectItem value="Fall 2024">Fall 2024</SelectItem>
            <SelectItem value="Spring 2024">Spring 2024</SelectItem>
            <SelectItem value="Summer 2024">Summer 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium text-muted-foreground">
                    {course.code} • {course.credits} Credits
                  </CardDescription>
                </div>
                {getStatusBadge(course.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Instructor */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {course.instructor}
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {course.schedule}
              </div>

              {/* Enrollment */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {course.enrolled}/{course.capacity} Students
              </div>

              {/* Role-specific content */}
              {userRole === "student" && (
                <>
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-card-foreground">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  {/* Current Grade */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Current Grade</span>
                    <Badge variant="outline" className="font-medium">
                      {course.grade}
                    </Badge>
                  </div>
                </>
              )}

              {userRole === "teacher" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Assignments</span>
                    <p className="font-medium text-card-foreground">{course.assignments}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pending Grades</span>
                    <p className="font-medium text-card-foreground">{course.pendingGrades}</p>
                  </div>
                </div>
              )}

              {userRole === "admin" && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {course.department} Department
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Link href={`/dashboard/courses/${course.id}`} className="flex-1">
                  <Button variant="outline" className="w-full border-border bg-transparent hover:bg-accent">
                    View Details
                  </Button>
                </Link>
                {userRole === "student" && (
                  <Link href={`/dashboard/assignments?course=${course.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Assignments</Button>
                  </Link>
                )}
                {userRole === "teacher" && (
                  <Link href={`/dashboard/grading?course=${course.id}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Grade</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Card className="border-border shadow-lg">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "No courses available for the selected filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
