"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Clock,
  Camera,
  Play,
  Pause,
  Upload,
  AlertTriangle,
  Briefcase,
  CheckCircle,
  TrendingUp,
  MapPin,
} from "lucide-react" // Added MapPin
import { MainNav } from "@/components/main-nav"

// Sample job data
const myJobs = [
  {
    id: "JOB-1003",
    address: "789 Maple Drive, Pasadena, CA 91101",
    propertyType: "Townhouse",
    lender: "Golden State Lending",
    fee: "$400",
    dueDate: "2024-06-03",
    status: "In Progress",
    priority: "High",
    progress: 65,
    photosUploaded: 8,
    photosRequired: 15,
    timeRemaining: "2 days",
    isOverdue: false,
    isPaused: false,
    latitude: 34.1478, // Mock latitude
    longitude: -118.1445, // Mock longitude
  },
  {
    id: "JOB-1007",
    address: "222 Birch Road, Sherman Oaks, CA 91403",
    propertyType: "Single Family",
    lender: "Pacific Mortgage",
    fee: "$425",
    dueDate: "2024-06-01",
    status: "In Progress",
    priority: "Medium",
    progress: 40,
    photosUploaded: 5,
    photosRequired: 12,
    timeRemaining: "12 hours",
    isOverdue: false,
    isPaused: false,
    latitude: 34.1578, // Mock latitude
    longitude: -118.4507, // Mock longitude
  },
  {
    id: "JOB-1008",
    address: "444 Redwood Lane, Studio City, CA 91604",
    propertyType: "Condominium",
    lender: "First National Bank",
    fee: "$350",
    dueDate: "2024-05-28",
    status: "Overdue",
    priority: "High",
    progress: 25,
    photosUploaded: 3,
    photosRequired: 10,
    timeRemaining: "Overdue by 1 day",
    isOverdue: true,
    isPaused: true,
    latitude: 34.1437, // Mock latitude
    longitude: -118.3937, // Mock longitude
  },
  {
    id: "JOB-1009",
    address: "777 Spruce Avenue, Encino, CA 91316",
    propertyType: "Single Family",
    lender: "Golden State Lending",
    fee: "$475",
    dueDate: "2024-06-08",
    status: "Assigned",
    priority: "Low",
    progress: 0,
    photosUploaded: 0,
    photosRequired: 14,
    timeRemaining: "7 days",
    isOverdue: false,
    isPaused: false,
    latitude: 34.1637, // Mock latitude
    longitude: -118.5007, // Mock longitude
  },
]

const completedJobs = [
  {
    id: "JOB-1000",
    address: "123 Main Street, Los Angeles, CA 90001",
    propertyType: "Single Family",
    lender: "First National Bank",
    fee: "$450",
    completedDate: "2024-05-25",
    status: "Completed",
  },
  {
    id: "JOB-0999",
    address: "456 Oak Avenue, Beverly Hills, CA 90210",
    propertyType: "Condominium",
    lender: "Pacific Mortgage",
    fee: "$400",
    completedDate: "2024-05-22",
    status: "Completed",
  },
]

// Helper function to convert lat/lng to pixel coordinates for a mock map
// This is a very simplified conversion for a fixed background image.
// Assumes a map image that covers a specific lat/lng range.
// For a real map, you'd use a map library's projection methods.
const mapBounds = {
  minLat: 34.0,
  maxLat: 34.3,
  minLng: -118.6,
  maxLng: -118.0,
  width: 800,
  height: 600, // Assumed dimensions of the map area
}

const getPixelCoordinates = (lat: number, lng: number) => {
  const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * mapBounds.width
  const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * mapBounds.height // Invert Y for top-left origin
  return { x, y }
}

export default function MyJobsPage() {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-blue-100 text-blue-800"
      case "Assigned":
        return "bg-purple-100 text-purple-800"
      case "In Progress":
        return "bg-primary-100 text-primary-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  const getProgressColor = (job: (typeof myJobs)[0]) => {
    if (job.isOverdue) return "bg-red-500"
    if (job.progress < 30) return "bg-yellow-500"
    if (job.progress < 70) return "bg-primary-500"
    return "bg-green-500"
  }

  const getTimeRemainingClass = (job: (typeof myJobs)[0]) => {
    if (job.isOverdue) return "text-red-600 font-medium"
    if (job.timeRemaining.includes("hours")) return "text-yellow-600 font-medium"
    return "text-secondary-600"
  }

  // Filter jobs that have coordinates and are not completed/overdue (for "today's jobs")
  const jobsForMap = myJobs.filter(
    (job) => job.latitude && job.longitude && !job.isOverdue && job.status !== "Completed",
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">My Jobs</h1>
        </div>

        {/* Map Section */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="text-secondary-900">Today's Job Locations</CardTitle>
            <CardDescription>Visual overview of your assigned jobs for the day.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              {/* This is a placeholder for a map image. In a real app, you'd use a map library. */}
              <img
                src="https://placehold.co/800x400" // External placeholder for reliability
                alt="Map of job locations"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Job Markers */}
              {jobsForMap.map((job, index) => {
                const { x, y } = getPixelCoordinates(job.latitude!, job.longitude!)
                return (
                  <div
                    key={job.id}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${x}px`, top: `${y}px`, transform: "translate(-50%, -100%)" }} // Center marker base
                  >
                    <MapPin className="h-8 w-8 text-red-500 drop-shadow-md" />
                    <span className="text-xs font-medium text-darkNavy bg-white px-1 rounded-sm shadow-sm whitespace-nowrap">
                      {index + 1}
                    </span>
                  </div>
                )
              })}
              {/* Mock Route Line (simplified TSP visualization) */}
              <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${mapBounds.width} ${mapBounds.height}`}>
                {jobsForMap.length > 1 &&
                  jobsForMap.map((job, index) => {
                    if (index === 0) return null
                    const prevJob = jobsForMap[index - 1]
                    const start = getPixelCoordinates(prevJob.latitude!, prevJob.longitude!)
                    const end = getPixelCoordinates(job.latitude!, job.longitude!)
                    return (
                      <line
                        key={`line-${index}`}
                        x1={start.x}
                        y1={start.y}
                        x2={end.x}
                        y2={end.y}
                        stroke="#1AA0AE" // Primary color for the route
                        strokeWidth="3"
                        strokeDasharray="5,5"
                      />
                    )
                  })}
              </svg>
              <div className="absolute bottom-2 left-2 bg-white p-2 rounded-md shadow-md text-sm text-darkNavy">
                <p className="font-semibold">Mock Route Overview</p>
                <p>This map visually represents job locations and a possible route.</p>
                <p className="text-xs text-gray-500">
                  Note: This is a mock-up and does not perform actual TSP calculation or routing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-secondary-900">{myJobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{myJobs.filter((job) => job.isOverdue).length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-secondary-900">
                    {Math.round(myJobs.reduce((acc, job) => acc + job.progress, 0) / myJobs.length)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedJobs.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Jobs */}
        <Card className="border-neutral-200 mb-6">
          <CardHeader>
            <CardTitle className="text-secondary-900">Active Jobs</CardTitle>
            <CardDescription>Your current job queue with progress tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myJobs.map((job) => (
                <div
                  key={job.id}
                  className={`border rounded-lg p-4 ${
                    job.isOverdue ? "border-red-200 bg-red-50" : "border-neutral-200"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-secondary-900">{job.address}</h3>
                        <Badge className={getStatusBadgeClass(job.status)}>{job.status}</Badge>
                        {job.isOverdue && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Overdue
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-secondary-600 mb-3">
                        <span>{job.id}</span>
                        <span>•</span>
                        <span>{job.propertyType}</span>
                        <span>•</span>
                        <span>{job.lender}</span>
                        <span>•</span>
                        <span className="font-medium">{job.fee}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-secondary-600">Progress</span>
                          <span className="font-medium text-secondary-900">{job.progress}%</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Camera className="h-4 w-4 text-secondary-500" />
                              <span className="text-secondary-600">
                                {job.photosUploaded}/{job.photosRequired} photos
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-secondary-500" />
                              <span className={getTimeRemainingClass(job)}>{job.timeRemaining}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.status === "Assigned" && (
                        <Button
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                          onClick={() => (window.location.href = `/dashboard/jobs/${job.id}/inspect`)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Start Inspection
                        </Button>
                      )}
                      {job.status === "In Progress" && !job.isPaused && (
                        <>
                          <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photos
                          </Button>
                          <Button variant="outline">
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </Button>
                        </>
                      )}
                      {job.isPaused && (
                        <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                          <Play className="mr-2 h-4 w-4" />
                          Resume
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Briefcase className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Progress</DropdownMenuItem>
                          <DropdownMenuItem>Contact Lender</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Cancel Job</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Jobs */}
        <Card className="border-neutral-200">
          <CardHeader>
            <CardTitle className="text-secondary-900">Recently Completed</CardTitle>
            <CardDescription>Your recently finished jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-secondary-900">{job.address}</p>
                    <div className="flex items-center gap-2 text-sm text-secondary-600">
                      <span>{job.id}</span>
                      <span>•</span>
                      <span>{job.propertyType}</span>
                      <span>•</span>
                      <span>Completed {job.completedDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-secondary-900">{job.fee}</p>
                    <Badge className="bg-green-100 text-green-800">Completed</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
