"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FileText, Calendar, Clock, Upload, Plus, Search, Filter, CheckCircle, AlertCircle } from "lucide-react"

// Mock user role - in a real app, this would come from authentication context
const userRole = "student" // Change this to test different roles: "student" | "teacher" | "admin"

export default function AssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const assignmentsData = {
    student: [
      {
        id: 1,
        title: "Calculus Problem Set #3",
        course: "Advanced Mathematics",
        courseCode: "MATH301",
        dueDate: "2024-01-15",
        dueTime: "11:59 PM",
        status: "pending",
        points: 100,
        description: "Complete problems 1-20 from Chapter 5",
        submitted: false,
        grade: null,
      },
      {
        id: 2,
        title: "Lab Report: Pendulum Motion",
        course: "Physics Laboratory",
        courseCode: "PHYS205",
        dueDate: "2024-01-18",
        dueTime: "5:00 PM",
        status: "pending",
        points: 75,
        description: "Analyze pendulum motion data and write a comprehensive report",
        submitted: false,
        grade: null,
      },
      {
        id: 3,
        title: "Programming Assignment #2",
        course: "Computer Science Fundamentals",
        courseCode: "CS101",
        dueDate: "2024-01-10",
        dueTime: "11:59 PM",
        status: "graded",
        points: 150,
        description: "Implement a binary search algorithm",
        submitted: true,
        grade: 142,
      },
      {
        id: 4,
        title: "Essay: Modern Literature",
        course: "English Literature",
        courseCode: "ENG201",
        dueDate: "2024-01-05",
        dueTime: "11:59 PM",
        status: "graded",
        points: 100,
        description: "Write a 1500-word essay on modern literary themes",
        submitted: true,
        grade: 88,
      },
    ],
    teacher: [
      {
        id: 1,
        title: "Calculus Problem Set #3",
        course: "Advanced Mathematics",
        courseCode: "MATH301",
        dueDate: "2024-01-15",
        dueTime: "11:59 PM",
        status: "active",
        points: 100,
        submissions: 32,
        totalStudents: 45,
        graded: 15,
      },
      {
        id: 2,
        title: "Midterm Exam",
        course: "Advanced Mathematics",
        courseCode: "MATH301",
        dueDate: "2024-01-20",
        dueTime: "2:00 PM",
        status: "active",
        points: 200,
        submissions: 0,
        totalStudents: 45,
        graded: 0,
      },
    ],
  }

  const assignments = assignmentsData[userRole] || []

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || assignment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string, submitted?: boolean) => {
    if (userRole === "student") {
      switch (status) {
        case "pending":
          return (
            <Badge variant="outline" className="text-yellow-600 border-yellow-200">
              Pending
            </Badge>
          )
        case "submitted":
          return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Submitted</Badge>
        case "graded":
          return <Badge className="bg-green-100 text-green-800 border-green-200">Graded</Badge>
        case "overdue":
          return <Badge variant="destructive">Overdue</Badge>
        default:
          return <Badge variant="secondary">{status}</Badge>
      }
    } else {
      switch (status) {
        case "active":
          return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
        case "draft":
          return <Badge variant="outline">Draft</Badge>
        case "closed":
          return <Badge variant="secondary">Closed</Badge>
        default:
          return <Badge variant="secondary">{status}</Badge>
      }
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {userRole === "student" ? "My Assignments" : "Assignments"}
          </h1>
          <p className="text-muted-foreground">
            {userRole === "student" ? "Track your assignments and submissions" : "Manage and grade student assignments"}
          </p>
        </div>
        {userRole === "teacher" && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Create a new assignment for your students</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assignment Title</Label>
                    <Input id="title" placeholder="Enter assignment title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math301">Advanced Mathematics</SelectItem>
                        <SelectItem value="math101">Calculus I</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points</Label>
                    <Input id="points" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Assignment description and instructions" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Assignment</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-input border-border"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 bg-input border-border">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {userRole === "student" ? (
              <>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="graded">Graded</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="border-border shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getStatusIcon(
                    isOverdue(assignment.dueDate) && !assignment.submitted ? "overdue" : assignment.status,
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-card-foreground mb-1">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {assignment.course} ({assignment.courseCode})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(
                        isOverdue(assignment.dueDate) && userRole === "student" && !assignment.submitted
                          ? "overdue"
                          : assignment.status,
                        assignment.submitted,
                      )}
                      <Badge variant="outline" className="text-xs">
                        {assignment.points} pts
                      </Badge>
                    </div>
                  </div>

                  {assignment.description && (
                    <p className="text-sm text-muted-foreground mb-4">{assignment.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Due: {new Date(assignment.dueDate).toLocaleDateString()} at {assignment.dueTime}
                      </div>
                      {userRole === "student" && assignment.grade && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Grade: {assignment.grade}/{assignment.points}
                        </div>
                      )}
                      {userRole === "teacher" && (
                        <div className="flex items-center gap-4">
                          <span>
                            Submissions: {assignment.submissions}/{assignment.totalStudents}
                          </span>
                          <span>Graded: {assignment.graded}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {userRole === "student" && !assignment.submitted && assignment.status === "pending" && (
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          <Upload className="h-4 w-4 mr-2" />
                          Submit
                        </Button>
                      )}
                      {userRole === "teacher" && (
                        <Button variant="outline" className="border-border bg-transparent">
                          View Submissions
                        </Button>
                      )}
                      <Button variant="outline" className="border-border bg-transparent">
                        View Details
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
      {filteredAssignments.length === 0 && (
        <Card className="border-border shadow-lg">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No assignments found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "No assignments available for the selected filters"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
