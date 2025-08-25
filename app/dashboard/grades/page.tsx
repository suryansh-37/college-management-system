"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Award, TrendingUp, TrendingDown, Minus, BookOpen, Calendar } from "lucide-react"

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState("Fall 2024")

  const gradesData = [
    {
      id: 1,
      course: "Advanced Mathematics",
      courseCode: "MATH301",
      instructor: "Dr. Smith",
      credits: 3,
      currentGrade: "A-",
      percentage: 91.5,
      assignments: [
        { name: "Problem Set #1", grade: 95, maxPoints: 100, date: "2024-01-05" },
        { name: "Problem Set #2", grade: 88, maxPoints: 100, date: "2024-01-12" },
        { name: "Midterm Exam", grade: 92, maxPoints: 150, date: "2024-01-20" },
      ],
      trend: "up",
    },
    {
      id: 2,
      course: "Physics Laboratory",
      courseCode: "PHYS205",
      instructor: "Prof. Johnson",
      credits: 2,
      currentGrade: "B+",
      percentage: 87.3,
      assignments: [
        { name: "Lab Report #1", grade: 85, maxPoints: 100, date: "2024-01-08" },
        { name: "Lab Report #2", grade: 90, maxPoints: 100, date: "2024-01-15" },
        { name: "Practical Exam", grade: 87, maxPoints: 120, date: "2024-01-22" },
      ],
      trend: "up",
    },
    {
      id: 3,
      course: "Computer Science Fundamentals",
      courseCode: "CS101",
      instructor: "Dr. Wilson",
      credits: 4,
      currentGrade: "A",
      percentage: 94.2,
      assignments: [
        { name: "Programming Assignment #1", grade: 98, maxPoints: 100, date: "2024-01-03" },
        { name: "Programming Assignment #2", grade: 92, maxPoints: 150, date: "2024-01-10" },
        { name: "Quiz #1", grade: 95, maxPoints: 50, date: "2024-01-17" },
      ],
      trend: "stable",
    },
    {
      id: 4,
      course: "English Literature",
      courseCode: "ENG201",
      instructor: "Prof. Davis",
      credits: 3,
      currentGrade: "B",
      percentage: 83.7,
      assignments: [
        { name: "Essay #1", grade: 88, maxPoints: 100, date: "2024-01-05" },
        { name: "Reading Quiz #1", grade: 82, maxPoints: 50, date: "2024-01-12" },
        { name: "Midterm Essay", grade: 81, maxPoints: 150, date: "2024-01-19" },
      ],
      trend: "down",
    },
  ]

  const calculateGPA = () => {
    const totalPoints = gradesData.reduce((sum, course) => {
      const gradePoints = getGradePoints(course.currentGrade)
      return sum + gradePoints * course.credits
    }, 0)
    const totalCredits = gradesData.reduce((sum, course) => sum + course.credits, 0)
    return (totalPoints / totalCredits).toFixed(2)
  }

  const getGradePoints = (grade: string) => {
    const gradeMap: { [key: string]: number } = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0.0,
    }
    return gradeMap[grade] || 0.0
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance and progress</p>
        </div>
        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger className="w-48 bg-input border-border">
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Fall 2024">Fall 2024</SelectItem>
            <SelectItem value="Spring 2024">Spring 2024</SelectItem>
            <SelectItem value="Summer 2024">Summer 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GPA Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Current GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{calculateGPA()}</div>
            <p className="text-xs text-muted-foreground mt-1">Out of 4.0</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {gradesData.reduce((sum, course) => sum + course.credits, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This semester</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">
              {(gradesData.reduce((sum, course) => sum + course.percentage, 0) / gradesData.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-card-foreground">{gradesData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Course Grades</h2>
        {gradesData.map((course) => (
          <Card key={course.id} className="border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-card-foreground">{course.course}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.courseCode} • {course.instructor} • {course.credits} Credits
                  </CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(course.trend)}
                  <Badge className={`text-lg font-bold ${getGradeColor(course.percentage)}`} variant="outline">
                    {course.currentGrade}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Grade Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className={`font-medium ${getGradeColor(course.percentage)}`}>{course.percentage}%</span>
                </div>
                <Progress value={course.percentage} className="h-2" />
              </div>

              {/* Recent Assignments */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-card-foreground">Recent Assignments</h4>
                <div className="space-y-2">
                  {course.assignments.map((assignment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-card-foreground">{assignment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(assignment.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${getGradeColor((assignment.grade / assignment.maxPoints) * 100)}`}
                        >
                          {assignment.grade}/{assignment.maxPoints}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {((assignment.grade / assignment.maxPoints) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 border-border bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Course
                </Button>
                <Button variant="outline" className="border-border bg-transparent">
                  <Calendar className="h-4 w-4 mr-2" />
                  Grade History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
