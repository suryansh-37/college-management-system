"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Filter, Mail, Phone, GraduationCap, Award, MessageSquare } from "lucide-react"

// This page is for teachers to manage their students
export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCourse, setFilterCourse] = useState("all")

  const studentsData = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@university.edu",
      studentId: "STU001234",
      phone: "+1 (555) 123-4567",
      courses: ["MATH301", "MATH101"],
      currentGrade: "A-",
      attendance: 95,
      assignments: { submitted: 8, total: 10 },
      lastActive: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@university.edu",
      studentId: "STU001235",
      phone: "+1 (555) 234-5678",
      courses: ["MATH301"],
      currentGrade: "B+",
      attendance: 88,
      assignments: { submitted: 7, total: 10 },
      lastActive: "2024-01-14",
      status: "active",
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@university.edu",
      studentId: "STU001236",
      phone: "+1 (555) 345-6789",
      courses: ["MATH101"],
      currentGrade: "A",
      attendance: 98,
      assignments: { submitted: 6, total: 6 },
      lastActive: "2024-01-15",
      status: "active",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@university.edu",
      studentId: "STU001237",
      phone: "+1 (555) 456-7890",
      courses: ["MATH301", "MATH101"],
      currentGrade: "B",
      attendance: 82,
      assignments: { submitted: 6, total: 10 },
      lastActive: "2024-01-12",
      status: "at-risk",
    },
  ]

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = filterCourse === "all" || student.courses.includes(filterCourse)
    return matchesSearch && matchesCourse
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
      case "at-risk":
        return <Badge variant="destructive">At Risk</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600"
    if (grade.startsWith("B")) return "text-blue-600"
    if (grade.startsWith("C")) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground">Manage and track your students' progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-border bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Email All
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Users className="h-4 w-4 mr-2" />
            Export List
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">{studentsData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {studentsData.filter((s) => s.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {studentsData.filter((s) => s.status === "at-risk").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {Math.round(studentsData.reduce((sum, s) => sum + s.attendance, 0) / studentsData.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Select value={filterCourse} onValueChange={setFilterCourse}>
          <SelectTrigger className="w-48 bg-input border-border">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="MATH301">Advanced Mathematics</SelectItem>
            <SelectItem value="MATH101">Calculus I</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground">{student.studentId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(student.status)}
                      <Badge className={`font-medium ${getGradeColor(student.currentGrade)}`} variant="outline">
                        {student.currentGrade}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {student.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      Attendance: {student.attendance}%
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="h-4 w-4" />
                      Assignments: {student.assignments.submitted}/{student.assignments.total}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Courses:</span>
                      <div className="flex gap-1">
                        {student.courses.map((course) => (
                          <Badge key={course} variant="secondary" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-border bg-transparent">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="border-border bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <Card className="border-border shadow-lg">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "No students available for the selected filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
