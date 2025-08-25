import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus } from "lucide-react"

export default function SchedulePage() {
  const scheduleData = [
    {
      id: 1,
      title: "Advanced Mathematics",
      time: "09:00 - 10:30",
      location: "Room 101",
      instructor: "Dr. Smith",
      type: "Lecture",
      day: "Monday",
    },
    {
      id: 2,
      title: "Physics Laboratory",
      time: "14:00 - 16:00",
      location: "Lab 205",
      instructor: "Prof. Johnson",
      type: "Lab",
      day: "Monday",
    },
    {
      id: 3,
      title: "Computer Science",
      time: "10:00 - 11:30",
      location: "Room 302",
      instructor: "Dr. Wilson",
      type: "Lecture",
      day: "Tuesday",
    },
    {
      id: 4,
      title: "Chemistry",
      time: "13:00 - 14:30",
      location: "Room 150",
      instructor: "Prof. Davis",
      type: "Lecture",
      day: "Wednesday",
    },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Your weekly class schedule</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {days.map((day) => (
          <Card key={day} className="border-border shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-card-foreground">{day}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {scheduleData
                .filter((item) => item.day === day)
                .map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-card-foreground">{item.title}</h4>
                      <Badge variant={item.type === "Lab" ? "secondary" : "default"} className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.instructor}</p>
                    </div>
                  </div>
                ))}
              {scheduleData.filter((item) => item.day === day).length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No classes scheduled</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Schedule */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
          <CardDescription>Your classes and events for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleData
              .filter((item) => item.day === "Monday") // Mock today as Monday
              .map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                  <div className="text-center">
                    <div className="text-sm font-medium text-card-foreground">{item.time.split(" - ")[0]}</div>
                    <div className="text-xs text-muted-foreground">{item.time.split(" - ")[1]}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.instructor}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                      <Badge variant={item.type === "Lab" ? "secondary" : "default"} className="text-xs">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
