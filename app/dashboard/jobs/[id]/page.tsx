"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, MapPin, FileText, Check, X, AlertCircle, Phone, Mail, ExternalLink } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

// Sample job data
const jobDetails = {
  id: "JOB-1001",
  address: "123 Oak Street, Beverly Hills, CA 90210",
  propertyType: "Single Family",
  lender: "First National Bank",
  lenderContact: {
    name: "Sarah Johnson",
    email: "sarah.johnson@firstnational.com",
    phone: "(310) 555-1234",
  },
  fee: "$450",
  dueDate: "2024-06-05",
  status: "Available",
  priority: "High",
  distance: "5.2 miles",
  createdAt: "2024-05-29",
  propertyDetails: {
    bedrooms: 4,
    bathrooms: 3.5,
    squareFeet: 2850,
    yearBuilt: 1998,
    lotSize: "0.25 acres",
    propertyClass: "Residential",
    occupancy: "Owner Occupied",
  },
  requirements: [
    { id: 1, name: "Exterior Photos (All Sides)", required: true },
    { id: 2, name: "Interior Photos (All Rooms)", required: true },
    { id: 3, name: "Comparable Properties Analysis", required: true },
    { id: 4, name: "Neighborhood Assessment", required: true },
    { id: 5, name: "Property Condition Report", required: true },
    { id: 6, name: "Market Trend Analysis", required: false },
    { id: 7, name: "Previous Appraisal Review", required: false },
  ],
  specialInstructions:
    "Please note that this property has a gated entrance. The access code is 1234. The homeowner has requested at least 24 hours notice before inspection. There is a dog on the premises that will be secured during inspection.",
  photos: [
    { id: 1, url: "/placeholder.svg?height=200&width=300", caption: "Front Exterior" },
    { id: 2, url: "/placeholder.svg?height=200&width=300", caption: "Back Yard" },
    { id: 3, url: "/placeholder.svg?height=200&width=300", caption: "Living Room" },
    { id: 4, url: "/placeholder.svg?height=200&width=300", caption: "Kitchen" },
  ],
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false)
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] = useState(false)
  const [declineReason, setDeclineReason] = useState("scheduling")
  const [declineComment, setDeclineComment] = useState("")

  const handleAcceptJob = () => {
    // Handle job acceptance logic
    router.push("/dashboard/jobs/my-jobs")
  }

  const handleDeclineJob = () => {
    // Handle job decline logic
    setIsDeclineDialogOpen(false)
    router.push("/dashboard/jobs")
  }

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

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav /> {/* Use the new MainNav component */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => router.push("/dashboard/jobs")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Jobs</span>
            </Button>
            <span className="text-neutral-300">|</span>
            <h1 className="text-lg font-semibold md:text-2xl">Job Details</h1>
          </div>
        </div>

        {/* Job Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-secondary-900">{jobDetails.address}</h1>
                <Badge className={getStatusBadgeClass(jobDetails.status)}>{jobDetails.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <span>{jobDetails.id}</span>
                <span>•</span>
                <span>{jobDetails.propertyType}</span>
                <span>•</span>
                <span>{jobDetails.distance}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white">
                    <Check className="mr-2 h-4 w-4" />
                    Accept Job
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Accept Job</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to accept this job? It will be added to your queue.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAcceptDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAcceptJob}>Accept Job</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isDeclineDialogOpen} onOpenChange={setIsDeclineDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <X className="mr-2 h-4 w-4" />
                    Decline Job
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Decline Job</DialogTitle>
                    <DialogDescription>Please provide a reason for declining this job.</DialogDescription>
                  </DialogHeader>
                  <RadioGroup value={declineReason} onValueChange={setDeclineReason}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduling" id="scheduling" />
                      <Label htmlFor="scheduling">Scheduling Conflict</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="distance" id="distance" />
                      <Label htmlFor="distance">Distance Too Far</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fee" id="fee" />
                      <Label htmlFor="fee">Fee Too Low</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expertise" id="expertise" />
                      <Label htmlFor="expertise">Outside Area of Expertise</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                  <Textarea
                    placeholder="Additional comments (optional)"
                    className="mt-4"
                    value={declineComment}
                    onChange={(e) => setDeclineComment(e.target.value)}
                  />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDeclineDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeclineJob}>
                      Decline Job
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => router.push(`/dashboard/jobs/${params.id}/inspect`)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Start Inspection
              </Button>
            </div>
          </div>
        </div>

        {/* Job Details Tabs */}
        <Tabs defaultValue="details">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Property Details */}
              <Card className="border-neutral-200 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-secondary-900">Property Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Property Type</p>
                      <p className="text-secondary-900">{jobDetails.propertyType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Year Built</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.yearBuilt}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Bedrooms</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.bedrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Bathrooms</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.bathrooms}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Square Feet</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.squareFeet}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Lot Size</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.lotSize}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Property Class</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.propertyClass}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-secondary-600">Occupancy</p>
                      <p className="text-secondary-900">{jobDetails.propertyDetails.occupancy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Info */}
              <Card className="border-neutral-200">
                <CardHeader>
                  <CardTitle className="text-secondary-900">Job Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Job ID</p>
                    <p className="text-secondary-900">{jobDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Fee</p>
                    <p className="text-secondary-900 font-semibold">{jobDetails.fee}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Due Date</p>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-secondary-500" />
                      <p className="text-secondary-900">{jobDetails.dueDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Priority</p>
                    <Badge className={getPriorityBadgeClass(jobDetails.priority)}>{jobDetails.priority}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Created</p>
                    <p className="text-secondary-900">{jobDetails.createdAt}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Special Instructions */}
              <Card className="border-neutral-200 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-secondary-900">Special Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
                      <p className="text-secondary-800">{jobDetails.specialInstructions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Lender Information */}
              <Card className="border-neutral-200">
                <CardHeader>
                  <CardTitle className="text-secondary-900">Lender Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Lender</p>
                    <p className="text-secondary-900">{jobDetails.lender}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Contact</p>
                    <p className="text-secondary-900">{jobDetails.lenderContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Contact Email</p>
                    <a
                      href={`mailto:${jobDetails.lenderContact.email}`}
                      className="flex items-center text-primary-600 hover:underline"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {jobDetails.lenderContact.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-600">Contact Phone</p>
                    <a
                      href={`tel:${jobDetails.lenderContact.phone}`}
                      className="flex items-center text-primary-600 hover:underline"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {jobDetails.lenderContact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Requirements Tab */}
          <TabsContent value="requirements" className="space-y-6">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Job Requirements</CardTitle>
                <CardDescription>The following items are required for this valuation job.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobDetails.requirements.map((req) => (
                    <div
                      key={req.id}
                      className="flex items-center justify-between border-b border-neutral-200 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-3 ${req.required ? "bg-red-500" : "bg-neutral-400"}`}
                        ></div>
                        <span className="text-secondary-900">{req.name}</span>
                      </div>
                      <Badge variant="outline" className={req.required ? "border-red-500 text-red-700" : ""}>
                        {req.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Property Photos</CardTitle>
                <CardDescription>Reference photos of the property for valuation purposes.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {jobDetails.photos.map((photo) => (
                    <div key={photo.id} className="group relative overflow-hidden rounded-md border border-neutral-200">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt={photo.caption}
                        className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-xs text-white">{photo.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Property Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-neutral-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                    <p className="text-secondary-600">{jobDetails.address}</p>
                    <Button className="mt-4">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
