"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { NotificationProvider } from "@/components/notifications/notification-provider"
import { NotificationDropdown } from "@/components/notifications/notification-dropdown"
import { ToastNotifications } from "@/components/notifications/toast-notifications"
import { Toaster } from "@/components/ui/toaster"

// Mock user data - in a real app, this would come from authentication context
const mockUser = {
  name: "John Doe",
  email: "john.doe@university.edu",
  role: "student" as const, // Change this to test different roles: "student" | "teacher" | "admin"
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(mockUser)

  // In a real app, you would fetch user data here
  useEffect(() => {
    // Simulate fetching user data
    console.log("[v0] Loading user data:", user)
  }, [user])

  return (
    <NotificationProvider>
      <div className="flex h-screen bg-background">
        <Sidebar userRole={user.role} userName={user.name} userEmail={user.email} />
        <main className="flex-1 overflow-auto">
          <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-end px-6 py-3">
              <NotificationDropdown />
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
      <ToastNotifications />
      <Toaster />
    </NotificationProvider>
  )
}
