"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Users, Briefcase, CheckCircle, UserPlus, Star, Target, MoreHorizontal } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

export default function TeamPage() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  // Sample team data
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Senior Appraiser",
      status: "Active",
      workload: 85,
      completedJobs: 24,
      activeJobs: 6,
      rating: 4.8,
      joinDate: "2023-01-15",
      permissions: ["View", "Edit", "Approve"],
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Property Inspector",
      status: "Active",
      workload: 72,
      completedJobs: 18,
      activeJobs: 4,
      rating: 4.6,
      joinDate: "2023-03-20",
      permissions: ["View", "Edit"],
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Market Analyst",
      status: "Active",
      workload: 60,
      completedJobs: 15,
      activeJobs: 3,
      rating: 4.7,
      joinDate: "2023-06-10",
      permissions: ["View", "Edit"],
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Junior Appraiser",
      status: "Training",
      workload: 45,
      completedJobs: 8,
      activeJobs: 2,
      rating: 4.3,
      joinDate: "2023-11-01",
      permissions: ["View"],
    },
  ]

  const pendingJobs = [
    {
      id: "1",
      title: "Property Inspection - 789 Elm St",
      type: "Inspection",
      priority: "High",
      deadline: "2024-01-20",
      estimatedHours: 3,
    },
    {
      id: "2",
      title: "Market Analysis - Downtown",
      type: "Analysis",
      priority: "Medium",
      deadline: "2024-01-25",
      estimatedHours: 6,
    },
    {
      id: "3",
      title: "Valuation Report - 321 Oak Ave",
      type: "Valuation",
      priority: "High",
      deadline: "2024-01-22",
      estimatedHours: 4,
    },
  ]

  const teamStats = [
    {
      title: "Total Team Members",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Average Workload",
      value: "68%",
      change: "+5%",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      title: "Completed This Month",
      value: "89",
      change: "+12%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Team Rating",
      value: "4.6",
      change: "+0.2",
      changeType: "positive" as const,
      icon: Star,
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav /> {/* Use the new MainNav component */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Team Management</h1>
          <div className="flex items-center gap-4">
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Assign Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assign Job to Team Member</DialogTitle>
                  <DialogDescription>Select a team member and job to assign.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assign-job" className="text-right">
                      Job
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select job" />
                      </SelectTrigger>
                      <SelectContent>
                        {pendingJobs.map((job) => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assign-member" className="text-right">
                      Team Member
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers
                          .filter((member) => member.status === "Active")
                          .map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name} - {member.role}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="assign-deadline" className="text-right">
                      Deadline
                    </Label>
                    <Input id="assign-deadline" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    Assign Job
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>Send an invitation to join your team.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invite-email" className="text-right">
                      Email
                    </Label>
                    <Input id="invite-email" type="email" className="col-span-3" placeholder="colleague@example.com" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invite-role" className="text-right">
                      Role
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="senior-appraiser">Senior Appraiser</SelectItem>
                        <SelectItem value="appraiser">Appraiser</SelectItem>
                        <SelectItem value="junior-appraiser">Junior Appraiser</SelectItem>
                        <SelectItem value="inspector">Property Inspector</SelectItem>
                        <SelectItem value="analyst">Market Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="invite-permissions" className="text-right">
                      Permissions
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select permissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View Only</SelectItem>
                        <SelectItem value="edit">View & Edit</SelectItem>
                        <SelectItem value="approve">View, Edit & Approve</SelectItem>
                        <SelectItem value="admin">Full Admin Access</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    Send Invitation
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamStats.map((stat, index) => (
            <Card key={index} className="border-neutral-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary-600">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary-900">{stat.value}</div>
                <p className="text-xs text-secondary-600">
                  <span className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Members */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="text-secondary-900">Team Members</CardTitle>
            <CardDescription className="text-secondary-600">
              Manage your team members and their workload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={member.name} />
                      <AvatarFallback className="bg-primary-600 text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{member.name}</h3>
                      <p className="text-sm text-secondary-600">{member.role}</p>
                      <p className="text-xs text-secondary-500">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Workload */}
                    <div className="text-center">
                      <p className="text-xs text-secondary-600 mb-1">Workload</p>
                      <div className="flex items-center gap-2">
                        <Progress value={member.workload} className="w-16 h-2" />
                        <span className="text-sm font-medium text-secondary-900">{member.workload}%</span>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="text-center">
                      <p className="text-xs text-secondary-600 mb-1">Jobs</p>
                      <p className="text-sm font-medium text-secondary-900">
                        {member.completedJobs} / {member.activeJobs}
                      </p>
                      <p className="text-xs text-secondary-500">Done / Active</p>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <p className="text-xs text-secondary-600 mb-1">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-secondary-900">{member.rating}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <Badge
                        variant={member.status === "Active" ? "default" : "secondary"}
                        className={`${
                          member.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {member.status}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Assign Job</DropdownMenuItem>
                        <DropdownMenuItem>View Performance</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Remove from Team</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workload Distribution & Pending Assignments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workload Distribution */}
          <Card className="border-neutral-200">
            <CardHeader>
              <CardTitle className="text-secondary-900">Workload Distribution</CardTitle>
              <CardDescription className="text-secondary-600">Current workload across team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-900">{member.name}</span>
                      <span className="text-sm text-secondary-600">{member.workload}%</span>
                    </div>
                    <Progress
                      value={member.workload}
                      className={`h-2 ${
                        member.workload > 80 ? "bg-red-100" : member.workload > 60 ? "bg-yellow-100" : "bg-green-100"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Job Assignments */}
          <Card className="border-neutral-200">
            <CardHeader>
              <CardTitle className="text-secondary-900">Pending Assignments</CardTitle>
              <CardDescription className="text-secondary-600">
                Jobs waiting to be assigned to team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-secondary-900 text-sm">{job.title}</p>
                      <p className="text-xs text-secondary-600">
                        {job.type} • Due {job.deadline} • {job.estimatedHours}h estimated
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-xs ${
                          job.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : job.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {job.priority}
                      </Badge>
                      <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
                {pendingJobs.length === 0 && (
                  <div className="text-center py-8 text-secondary-600">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-secondary-400" />
                    <p>All jobs have been assigned</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
