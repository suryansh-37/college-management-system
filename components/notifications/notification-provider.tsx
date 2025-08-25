"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Notification {
  id: string
  title: string
  message: string
  type: "grade" | "assignment" | "announcement" | "message" | "reminder" | "system"
  priority: "high" | "medium" | "low"
  read: boolean
  createdAt: Date
  userId?: string
  courseId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Assignment Graded",
    message: "Your Mathematics Assignment #3 has been graded. Grade: A-",
    type: "grade",
    priority: "high",
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "2",
    title: "New Course Material",
    message: "New lecture notes have been uploaded for Physics 101",
    type: "announcement",
    priority: "medium",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
  {
    id: "3",
    title: "Assignment Due Reminder",
    message: "Chemistry Lab Report is due tomorrow at 11:59 PM",
    type: "reminder",
    priority: "high",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
      read: false,
    }
    setNotifications((prev) => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  // Simulate real-time notifications
  useEffect(() => {
    const simulateNotifications = () => {
      const notificationTypes = [
        {
          title: "New Assignment Posted",
          message: "A new assignment has been posted for Computer Science 101",
          type: "assignment" as const,
          priority: "medium" as const,
        },
        {
          title: "Grade Updated",
          message: "Your quiz grade has been updated in Physics Lab",
          type: "grade" as const,
          priority: "high" as const,
        },
        {
          title: "Class Announcement",
          message: "Tomorrow's lecture has been moved to Room 205",
          type: "announcement" as const,
          priority: "medium" as const,
        },
        {
          title: "New Message",
          message: "You have a new message from Prof. Johnson",
          type: "message" as const,
          priority: "medium" as const,
        },
      ]

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
      addNotification(randomNotification)
    }

    // Add a new notification every 30 seconds (for demo purposes)
    const interval = setInterval(simulateNotifications, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
