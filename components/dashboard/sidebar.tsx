"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  Home,
  BookOpen,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  ClipboardList,
  Award,
} from "lucide-react"

interface SidebarProps {
  userRole: "student" | "teacher" | "admin"
  userName: string
  userEmail: string
}

export function Sidebar({ userRole, userName, userEmail }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const getNavigationItems = () => {
    const commonItems = [
      { icon: Home, label: "Dashboard", href: "/dashboard" },
      { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
      { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    ]

    const roleSpecificItems = {
      student: [
        { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
        { icon: ClipboardList, label: "Assignments", href: "/dashboard/assignments" },
        { icon: Award, label: "Grades", href: "/dashboard/grades" },
        { icon: User, label: "Profile", href: "/dashboard/profile" },
      ],
      teacher: [
        { icon: BookOpen, label: "My Classes", href: "/dashboard/classes" },
        { icon: Users, label: "Students", href: "/dashboard/students" },
        { icon: ClipboardList, label: "Assignments", href: "/dashboard/assignments" },
        { icon: Award, label: "Grading", href: "/dashboard/grading" },
        { icon: User, label: "Profile", href: "/dashboard/profile" },
      ],
      admin: [
        { icon: Users, label: "Users", href: "/dashboard/users" },
        { icon: BookOpen, label: "Courses", href: "/dashboard/courses" },
        { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
        { icon: FileText, label: "Reports", href: "/dashboard/reports" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
      ],
    }

    return [...commonItems, ...roleSpecificItems[userRole]]
  }

  const navigationItems = getNavigationItems()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-sidebar-primary rounded-full p-2">
              <GraduationCap className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">EduManage</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userName}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate capitalize">{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    isCollapsed && "justify-center px-2",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "justify-center px-2",
          )}
          onClick={() => {
            // Handle logout
            window.location.href = "/auth/login"
          }}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </Button>
      </div>
    </div>
  )
}
