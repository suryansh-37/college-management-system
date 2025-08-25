"use client"
import { useEffect } from "react"
import { useNotifications } from "./notification-provider"
import { useToast } from "@/hooks/use-toast"

export function ToastNotifications() {
  const { notifications } = useNotifications()
  const { toast } = useToast()

  useEffect(() => {
    // Show toast for new notifications (only unread ones that are less than 5 seconds old)
    const recentNotifications = notifications.filter((n) => !n.read && Date.now() - n.createdAt.getTime() < 5000)

    recentNotifications.forEach((notification) => {
      const getToastVariant = (type: string) => {
        switch (type) {
          case "grade":
            return "default"
          case "assignment":
            return "default"
          case "reminder":
            return "destructive"
          default:
            return "default"
        }
      }

      toast({
        title: notification.title,
        description: notification.message,
        variant: getToastVariant(notification.type),
      })
    })
  }, [notifications, toast])

  return null
}
