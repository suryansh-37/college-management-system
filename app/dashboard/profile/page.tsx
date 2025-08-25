"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Phone, Calendar, MapPin, Edit, Save, Camera, Award, BookOpen, Star } from "lucide-react"

// Mock user role and data - in a real app, this would come from authentication context
const userRole = "student" // Change this to test different roles: "student" | "teacher" | "admin"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    // Common fields
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1999-05-15",
    address: "123 University Ave, College Town, ST 12345",
    bio: "Passionate about mathematics and computer science. Always eager to learn new concepts and apply them in real-world scenarios.",

    // Student-specific fields
    studentId: "STU001234",
    major: "Computer Science",
    minor: "Mathematics",
    year: "Junior",
    gpa: 3.85,
    expectedGraduation: "2025-05-15",
    advisor: "Dr. Smith",

    // Teacher-specific fields
    employeeId: "EMP005678",
    department: "Mathematics",
    position: "Associate Professor",
    office: "Math Building, Room 205",
    officeHours: "MWF 2:00-4:00 PM",
    researchInterests: "Applied Mathematics, Numerical Analysis, Machine Learning",
    education: "Ph.D. in Mathematics, MIT (2010)",
  })

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("[v0] Saving profile data:", profileData)
    setIsEditing(false)
    // In a real app, this would make an API call to save the data
  }

  const studentAchievements = [
    { title: "Dean's List", semester: "Fall 2023", description: "Academic excellence recognition" },
    { title: "Mathematics Competition Winner", date: "2023-10-15", description: "1st place in regional competition" },
    { title: "Programming Contest", date: "2023-09-20", description: "Top 10 finish in state competition" },
  ]

  const teacherAchievements = [
    { title: "Excellence in Teaching Award", year: "2023", description: "University-wide recognition" },
    { title: "Research Grant", year: "2022", description: "$50,000 NSF grant for numerical analysis research" },
    { title: "Published Paper", year: "2023", description: "Journal of Applied Mathematics" },
  ]

  const courseHistory = [
    { code: "MATH301", title: "Advanced Mathematics", semester: "Fall 2023", grade: "A-" },
    { code: "CS201", title: "Data Structures", semester: "Fall 2023", grade: "A" },
    { code: "MATH201", title: "Calculus II", semester: "Spring 2023", grade: "B+" },
    { code: "CS101", title: "Programming Fundamentals", semester: "Spring 2023", grade: "A" },
  ]

  const teachingHistory = [
    { code: "MATH301", title: "Advanced Mathematics", semester: "Fall 2023", students: 45 },
    { code: "MATH101", title: "Calculus I", semester: "Fall 2023", students: 85 },
    { code: "MATH201", title: "Calculus II", semester: "Spring 2023", students: 67 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture and Basic Info */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/diverse-user-avatars.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {userRole === "student" ? `${profileData.major} Student` : `${profileData.position}`}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    {userRole === "student" ? profileData.studentId : profileData.employeeId}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="lg:col-span-2 border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">Contact Information</CardTitle>
                <CardDescription>Your contact details and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Information Tab */}
        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Details */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  {userRole === "student" ? "Academic Information" : "Professional Information"}
                </CardTitle>
                <CardDescription>
                  {userRole === "student" ? "Your academic progress and details" : "Your professional background"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userRole === "student" ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Select
                          value={profileData.major}
                          onValueChange={(value) => handleInputChange("major", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Computer Science">Computer Science</SelectItem>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Engineering">Engineering</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minor">Minor</Label>
                        <Select
                          value={profileData.minor}
                          onValueChange={(value) => handleInputChange("minor", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">Mathematics</SelectItem>
                            <SelectItem value="Statistics">Statistics</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                            <SelectItem value="None">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year">Academic Year</Label>
                        <Select
                          value={profileData.year}
                          onValueChange={(value) => handleInputChange("year", value)}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Freshman">Freshman</SelectItem>
                            <SelectItem value="Sophomore">Sophomore</SelectItem>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="advisor">Academic Advisor</Label>
                        <Input
                          id="advisor"
                          value={profileData.advisor}
                          onChange={(e) => handleInputChange("advisor", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedGraduation">Expected Graduation</Label>
                      <Input
                        id="expectedGraduation"
                        type="date"
                        value={profileData.expectedGraduation}
                        onChange={(e) => handleInputChange("expectedGraduation", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    {/* GPA Display */}
                    <div className="space-y-2">
                      <Label>Current GPA</Label>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-primary">{profileData.gpa}</div>
                        <div className="flex-1">
                          <Progress value={(profileData.gpa / 4.0) * 100} className="h-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">/ 4.0</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          value={profileData.department}
                          onChange={(e) => handleInputChange("department", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={profileData.position}
                          onChange={(e) => handleInputChange("position", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="office">Office</Label>
                        <Input
                          id="office"
                          value={profileData.office}
                          onChange={(e) => handleInputChange("office", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officeHours">Office Hours</Label>
                        <Input
                          id="officeHours"
                          value={profileData.officeHours}
                          onChange={(e) => handleInputChange("officeHours", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={profileData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="researchInterests">Research Interests</Label>
                      <Textarea
                        id="researchInterests"
                        value={profileData.researchInterests}
                        onChange={(e) => handleInputChange("researchInterests", e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Course/Teaching History */}
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">
                  {userRole === "student" ? "Course History" : "Teaching History"}
                </CardTitle>
                <CardDescription>
                  {userRole === "student" ? "Your completed and current courses" : "Your teaching assignments"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(userRole === "student" ? courseHistory : teachingHistory).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-card-foreground">{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.code} • {item.semester}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {userRole === "student" ? (
                          <Badge variant="outline" className="font-medium">
                            {(item as any).grade}
                          </Badge>
                        ) : (
                          <div className="text-sm text-muted-foreground">{(item as any).students} students</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Award className="h-5 w-5" />
                {userRole === "student" ? "Academic Achievements" : "Professional Achievements"}
              </CardTitle>
              <CardDescription>
                {userRole === "student"
                  ? "Your academic accomplishments and recognitions"
                  : "Your professional accomplishments and recognitions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(userRole === "student" ? studentAchievements : teacherAchievements).map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-card">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-card-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {(achievement as any).semester || (achievement as any).date || (achievement as any).year}
                      </p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Assignment Reminders</p>
                    <p className="text-sm text-muted-foreground">Get reminded about upcoming assignments</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Grade Updates</p>
                    <p className="text-sm text-muted-foreground">Notify when grades are posted</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg">
              <CardHeader>
                <CardTitle className="text-card-foreground">Privacy Settings</CardTitle>
                <CardDescription>Control your profile visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Contact Information</p>
                    <p className="text-sm text-muted-foreground">Allow others to see your contact info</p>
                  </div>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-card-foreground">Academic Information</p>
                    <p className="text-sm text-muted-foreground">Show academic details to classmates</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
