import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, Bell, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-muted">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full p-2">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">EduManage</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="border-border bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-5xl font-bold text-foreground leading-tight">
            Modern College Management
            <span className="text-primary block">Made Simple</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline academic operations with our comprehensive platform designed for students, teachers, and
            administrators.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-border bg-transparent">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">Everything You Need</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for modern educational institutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Student Management */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full p-3 w-fit">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-foreground">Student Management</CardTitle>
              <CardDescription>
                Comprehensive student profiles, enrollment tracking, and academic progress monitoring.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Course Management */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-secondary/10 rounded-full p-3 w-fit">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-foreground">Course Management</CardTitle>
              <CardDescription>Create and manage courses, assignments, and curriculum with ease.</CardDescription>
            </CardHeader>
          </Card>

          {/* Real-time Notifications */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-accent/10 rounded-full p-3 w-fit">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-foreground">Real-time Notifications</CardTitle>
              <CardDescription>Instant updates for assignments, grades, and important announcements.</CardDescription>
            </CardHeader>
          </Card>

          {/* Analytics Dashboard */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-primary/10 rounded-full p-3 w-fit">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-foreground">Analytics Dashboard</CardTitle>
              <CardDescription>
                Comprehensive insights into academic performance and institutional metrics.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Schedule Management */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-secondary/10 rounded-full p-3 w-fit">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-foreground">Schedule Management</CardTitle>
              <CardDescription>Automated timetable generation and class scheduling optimization.</CardDescription>
            </CardHeader>
          </Card>

          {/* Grade Management */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="bg-accent/10 rounded-full p-3 w-fit">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-foreground">Grade Management</CardTitle>
              <CardDescription>Streamlined grading system with automated calculations and reporting.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-border shadow-xl bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Institution?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of educational institutions already using EduManage to streamline their operations.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-border bg-transparent">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">EduManage</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 EduManage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
