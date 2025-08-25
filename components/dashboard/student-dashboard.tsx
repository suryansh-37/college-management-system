"use client"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Calendar,
  Bell,
  Users,
  DollarSign,
  MapPin,
  MessageCircle,
  Target,
} from "lucide-react"

export function StudentDashboard() {
  const statsCards = [
    {
      title: "Enrolled Courses",
      value: "6",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Active this semester",
    },
    {
      title: "Assignments Due",
      value: "3",
      icon: <Clock className="h-4 w-4" />,
      description: "Next 7 days",
    },
    {
      title: "Current GPA",
      value: "3.8",
      icon: <Award className="h-4 w-4" />,
      trend: { value: 5.2, isPositive: true },
    },
    {
      title: "Attendance",
      value: "94%",
      icon: <CheckCircle className="h-4 w-4" />,
      trend: { value: 2.1, isPositive: true },
    },
  ]

  const upcomingAssignments = [
    { title: "Math Calculus Assignment", course: "MATH 201", dueDate: "Tomorrow", priority: "high" },
    { title: "Physics Lab Report", course: "PHYS 101", dueDate: "Friday", priority: "medium" },
    { title: "Chemistry Problem Set", course: "CHEM 150", dueDate: "Next Monday", priority: "low" },
  ]

  const recentGrades = [
    { course: "Physics Quiz", grade: "A-", points: "92/100", date: "2 days ago" },
    { course: "Math Midterm", grade: "B+", points: "87/100", date: "1 week ago" },
    { course: "Chemistry Lab", grade: "A", points: "95/100", date: "1 week ago" },
  ]

  const courseProgress = [
    { name: "Mathematics", progress: 75, grade: "A-" },
    { name: "Physics", progress: 68, grade: "B+" },
    { name: "Chemistry", progress: 82, grade: "A" },
    { name: "Computer Science", progress: 90, grade: "A" },
  ]

  const campusEvents = [
    { title: "Tech Symposium 2024", date: "Dec 15", location: "Main Auditorium", type: "Academic" },
    { title: "Winter Sports Meet", date: "Dec 20", location: "Sports Complex", type: "Sports" },
    { title: "Cultural Night", date: "Dec 22", location: "Student Center", type: "Cultural" },
  ]

  const discussionTopics = [
    { title: "Math 201 Study Group", replies: 12, lastActivity: "2h ago", course: "MATH 201" },
    { title: "Physics Lab Questions", replies: 8, lastActivity: "4h ago", course: "PHYS 101" },
    { title: "Chemistry Assignment Help", replies: 15, lastActivity: "1d ago", course: "CHEM 150" },
  ]

  const notifications = [
    {
      title: "Assignment Graded",
      message: "Your Physics Lab Report has been graded",
      time: "10 min ago",
      type: "grade",
    },
    {
      title: "New Announcement",
      message: "Class schedule updated for next week",
      time: "1h ago",
      type: "announcement",
    },
    { title: "Fee Reminder", message: "Semester fee payment due in 5 days", time: "2h ago", type: "fee" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's your academic progress and upcoming tasks.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent">
            <DollarSign className="h-4 w-4 mr-2" />
            Fees Paid
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            View Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards with Attendance Ring */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Personalized Course Cards */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Courses
              </CardTitle>
              <CardDescription>Your enrolled courses this semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseProgress.map((course, index) => (
                  <Card
                    key={index}
                    className="border border-muted hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-card-foreground">{course.name}</h4>
                        <Badge variant="outline" className="text-primary border-primary">
                          {course.grade}
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="h-2 mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{course.progress}% complete</span>
                        <span>Next: Assignment Due</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines Radar */}
        <div>
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Target className="h-5 w-5" />
                Deadline Radar
              </CardTitle>
              <CardDescription>Urgent tasks approaching</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingAssignments.map((assignment, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 border-l-4 border-l-primary">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-card-foreground">{assignment.title}</p>
                        <p className="text-xs text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge
                        variant={
                          assignment.priority === "high"
                            ? "destructive"
                            : assignment.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {assignment.priority}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-primary">{assignment.dueDate}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Push Notification Inbox */}
        <div>
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Recent updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "grade"
                              ? "bg-green-500"
                              : notification.type === "announcement"
                                ? "bg-blue-500"
                                : "bg-orange-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-card-foreground">{notification.title}</p>
                          <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Campus Events Carousel & Peer Discussion Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Events Carousel */}
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Campus Events
            </CardTitle>
            <CardDescription>Upcoming events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campusEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
                >
                  <div>
                    <h4 className="font-semibold text-card-foreground">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      {event.type}
                    </Badge>
                    <p className="text-sm font-medium text-primary">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Peer Discussion Board */}
        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-card-foreground flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Discussion Board
            </CardTitle>
            <CardDescription>Join peer discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {discussionTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-card-foreground">{topic.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {topic.course}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {topic.replies} replies
                    </span>
                    <span>{topic.lastActivity}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
