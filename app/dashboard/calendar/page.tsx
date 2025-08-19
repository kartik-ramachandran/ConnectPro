"use client"

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Calendar, ChevronLeft, ChevronRight, Clock, MoreHorizontal } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isAvailabilityDialogOpen, setIsAvailabilityDialogOpen] = useState(false)

  // Sample job data
  const jobs = [
    {
      id: "1",
      title: "Property Inspection - 123 Oak St",
      date: new Date(2024, 0, 15),
      time: "9:00 AM",
      duration: "2 hours",
      type: "Inspection",
      status: "Scheduled",
      assignee: "John Doe",
      priority: "High",
    },
    {
      id: "2",
      title: "Valuation Report - 456 Pine Ave",
      date: new Date(2024, 0, 16),
      time: "2:00 PM",
      duration: "3 hours",
      type: "Valuation",
      status: "In Progress",
      assignee: "Jane Smith",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Market Analysis - Beverly Hills",
      date: new Date(2024, 0, 18),
      time: "10:00 AM",
      duration: "4 hours",
      type: "Analysis",
      status: "Scheduled",
      assignee: "Mike Johnson",
      priority: "Low",
    },
  ]

  const availability = [
    { date: new Date(2024, 0, 15), status: "Available" },
    { date: new Date(2024, 0, 16), status: "Busy" },
    { date: new Date(2024, 0, 17), status: "Available" },
    { date: new Date(2024, 0, 18), status: "Partially Available" },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const getJobsForDate = (date: Date) => {
    return jobs.filter((job) => job.date.toDateString() === date.toDateString())
  }

  const getAvailabilityForDate = (date: Date) => {
    const avail = availability.find((a) => a.date.toDateString() === date.toDateString())
    return avail?.status || "Available"
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav /> {/* Use the new MainNav component */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Calendar</h1>
          <div className="flex items-center gap-4">
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary-600 hover:bg-primary-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Job</DialogTitle>
                  <DialogDescription>Create a new job appointment on the calendar.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-title" className="text-right">
                      Title
                    </Label>
                    <Input id="job-title" className="col-span-3" placeholder="Property inspection..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-date" className="text-right">
                      Date
                    </Label>
                    <Input id="job-date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-time" className="text-right">
                      Time
                    </Label>
                    <Input id="job-time" type="time" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="valuation">Valuation</SelectItem>
                        <SelectItem value="analysis">Market Analysis</SelectItem>
                        <SelectItem value="meeting">Client Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="job-notes" className="text-right">
                      Notes
                    </Label>
                    <Textarea id="job-notes" className="col-span-3" placeholder="Additional details..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    Schedule Job
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAvailabilityDialogOpen} onOpenChange={setIsAvailabilityDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                  <Clock className="h-4 w-4 mr-2" />
                  Set Availability
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Set Availability</DialogTitle>
                  <DialogDescription>Configure your availability for scheduling.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avail-date" className="text-right">
                      Date
                    </Label>
                    <Input id="avail-date" type="date" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avail-status" className="text-right">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                        <SelectItem value="partial">Partially Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="avail-hours" className="text-right">
                      Hours
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input type="time" placeholder="Start time" />
                      <Input type="time" placeholder="End time" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    Save Availability
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="border-neutral-300">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-2xl font-bold text-secondary-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="border-neutral-300">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Available
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Busy
              </Badge>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Partially Available
              </Badge>
            </div>
          </div>

          {/* Calendar Grid */}
          <Card className="border-neutral-200">
            <CardContent className="p-0">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-neutral-200">
                {dayNames.map((day) => (
                  <div key={day} className="p-4 text-center font-medium text-secondary-600 bg-neutral-50">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7">
                {getDaysInMonth(currentDate).map((date, index) => {
                  if (!date) {
                    return <div key={index} className="h-32 border-r border-b border-neutral-200" />
                  }

                  const dayJobs = getJobsForDate(date)
                  const availability = getAvailabilityForDate(date)
                  const isToday = date.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={index}
                      className={`h-32 border-r border-b border-neutral-200 p-2 cursor-pointer hover:bg-neutral-50 ${
                        isToday ? "bg-primary-50" : ""
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isToday ? "text-primary-600" : "text-secondary-900"}`}>
                          {date.getDate()}
                        </span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            availability === "Available"
                              ? "bg-green-500"
                              : availability === "Busy"
                                ? "bg-red-500"
                                : availability === "Partially Available"
                                  ? "bg-yellow-500"
                                  : "bg-gray-300"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        {dayJobs.slice(0, 2).map((job) => (
                          <div
                            key={job.id}
                            className={`text-xs p-1 rounded truncate ${
                              job.type === "Inspection"
                                ? "bg-blue-100 text-blue-800"
                                : job.type === "Valuation"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {job.time} - {job.title.split(" - ")[0]}
                          </div>
                        ))}
                        {dayJobs.length > 2 && (
                          <div className="text-xs text-secondary-600">+{dayJobs.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Today's Agenda */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Today's Agenda</CardTitle>
                <CardDescription className="text-secondary-600">Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobs
                    .filter((job) => job.date.toDateString() === new Date().toDateString())
                    .map((job) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              job.priority === "High"
                                ? "bg-red-500"
                                : job.priority === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                          />
                          <div>
                            <p className="font-medium text-secondary-900 text-sm">{job.title}</p>
                            <p className="text-xs text-secondary-600">
                              {job.time} • {job.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={job.status === "Scheduled" ? "default" : "secondary"}
                            className={`text-xs ${
                              job.status === "Scheduled" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                            }`}
                          >
                            {job.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Job</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">Cancel Job</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  {jobs.filter((job) => job.date.toDateString() === new Date().toDateString()).length === 0 && (
                    <div className="text-center py-8 text-secondary-600">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-secondary-400" />
                      <p>No appointments scheduled for today</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Upcoming Deadlines</CardTitle>
                <CardDescription className="text-secondary-600">Important deadlines and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">Valuation Report Due</p>
                        <p className="text-xs text-secondary-600">456 Pine Avenue • Due in 2 days</p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 text-xs">Urgent</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">Market Analysis</p>
                        <p className="text-xs text-secondary-600">Beverly Hills Area • Due in 5 days</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-secondary-900 text-sm">Client Presentation</p>
                        <p className="text-xs text-secondary-600">Downtown Project • Due in 1 week</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 text-xs">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
