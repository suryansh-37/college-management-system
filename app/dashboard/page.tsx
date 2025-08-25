"use client"
import { DashboardCard } from "@/components/dashboard/dashboard-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Users,
  Calendar,
  Award,
  Clock,
  TrendingUp,
  Bell,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react"

// Mock user role - in a real app, this would come from authentication context
const userRole = "student" // Change this to test different roles: "student" | "teacher" | "admin"

export default function DashboardPage() {
  const getStatsCards = () => {
    switch (userRole) {
      case "student":
        return [
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
      case "teacher":
        return [
          {
            title: "My Classes",
            value: "4",
            icon: <BookOpen className="h-4 w-4" />,
            description: "Active this semester",
          },
          {
            title: "Total Students",
            value: "127",
            icon: <Users className="h-4 w-4" />,
            trend: { value: 8.3, isPositive: true },
          },
          {
            title: "Pending Grades",
            value: "23",
            icon: <FileText className="h-4 w-4" />,
            description: "Assignments to grade",
          },
          {
            title: "Class Average",
            value: "85%",
            icon: <TrendingUp className="h-4 w-4" />,
            trend: { value: 3.2, isPositive: true },
          },
        ]
      case "admin":
        return [
          {
            title: "Total Students",
            value: "2,847",
            icon: <Users className="h-4 w-4" />,
            trend: { value: 12.5, isPositive: true },
          },
          {
            title: "Active Courses",
            value: "156",
            icon: <BookOpen className="h-4 w-4" />,
            description: "This semester",
          },
          {
            title: "Faculty Members",
            value: "89",
            icon: <Users className="h-4 w-4" />,
            trend: { value: 4.1, isPositive: true },
          },
          {
            title: "System Usage",
            value: "97%",
            icon: <TrendingUp className="h-4 w-4" />,
            trend: { value: 1.8, isPositive: true },
          },
        ]
      default:
        return []
    }
  }

  const getRecentActivity = () => {
    switch (userRole) {
      case "student":
        return [
          { type: "assignment", title: "Math Assignment #3 submitted", time: "2 hours ago", status: "success" },
          { type: "grade", title: "Physics Quiz - Grade: A-", time: "1 day ago", status: "success" },
          { type: "announcement", title: "New course material uploaded", time: "2 days ago", status: "info" },
          { type: "reminder", title: "Chemistry Lab due tomorrow", time: "3 days ago", status: "warning" },
        ]
      case "teacher":
        return [
          { type: "grade", title: "Graded 15 assignments", time: "1 hour ago", status: "success" },
          { type: "announcement", title: "Posted new lecture notes", time: "3 hours ago", status: "info" },
          { type: "student", title: "New student enrolled in CS101", time: "1 day ago", status: "info" },
          { type: "assignment", title: "Created new assignment", time: "2 days ago", status: "success" },
        ]
      case "admin":
        return [
          { type: "user", title: "5 new users registered", time: "30 minutes ago", status: "success" },
          { type: "system", title: "System backup completed", time: "2 hours ago", status: "success" },
          { type: "report", title: "Monthly report generated", time: "1 day ago", status: "info" },
          { type: "alert", title: "Server maintenance scheduled", time: "2 days ago", status: "warning" },
        ]
      default:
        return []
    }
  }

  const statsCards = getStatsCards()
  const recentActivity = getRecentActivity()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Bell className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {userRole === "student" ? "John" : userRole === "teacher" ? "Professor Smith" : "Admin"}!
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your {userRole} account today.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          View Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
              <CardDescription>Your latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "warning"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions userRole={userRole} />
        </div>
      </div>

      {/* Upcoming Events */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-card-foreground">Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next few days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Mathematics Lecture", time: "Today, 10:00 AM", location: "Room 101" },
              { title: "Physics Lab", time: "Tomorrow, 2:00 PM", location: "Lab 205" },
              { title: "Chemistry Assignment Due", time: "Friday, 11:59 PM", location: "Online" },
            ].map((event, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card">
                <h4 className="font-medium text-card-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{event.time}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
