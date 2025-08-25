"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Upload, Calendar, MessageSquare } from "lucide-react"

interface QuickActionsProps {
  userRole: "student" | "teacher" | "admin"
}

export function QuickActions({ userRole }: QuickActionsProps) {
  const getActions = () => {
    switch (userRole) {
      case "student":
        return [
          { icon: Upload, label: "Submit Assignment", action: () => console.log("Submit assignment") },
          { icon: Calendar, label: "View Schedule", action: () => console.log("View schedule") },
          { icon: MessageSquare, label: "Contact Teacher", action: () => console.log("Contact teacher") },
        ]
      case "teacher":
        return [
          { icon: Plus, label: "Create Assignment", action: () => console.log("Create assignment") },
          { icon: Upload, label: "Upload Materials", action: () => console.log("Upload materials") },
          { icon: MessageSquare, label: "Message Students", action: () => console.log("Message students") },
        ]
      case "admin":
        return [
          { icon: Plus, label: "Add User", action: () => console.log("Add user") },
          { icon: Calendar, label: "Manage Schedule", action: () => console.log("Manage schedule") },
          { icon: Upload, label: "Import Data", action: () => console.log("Import data") },
        ]
      default:
        return []
    }
  }

  const actions = getActions()

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
        <CardDescription>Common tasks for your role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start gap-3 h-auto py-3 border-border bg-transparent hover:bg-accent hover:text-accent-foreground"
              onClick={action.action}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
