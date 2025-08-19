"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Send, Save, Download, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

// Sample report data
const reportData = {
  id: "RPT-1001",
  jobId: "JOB-1001",
  propertyAddress: "123 Oak Street, Beverly Hills, CA 90210",
  templateName: "Standard Residential Report",
  status: "Ready for Submission",
  createdAt: "2024-05-29",

  // Lender information
  lender: {
    name: "First National Bank",
    contact: "Sarah Johnson",
    email: "sarah.johnson@firstnational.com",
    phone: "(310) 555-1234",
    address: "456 Financial Plaza, Los Angeles, CA 90017",
    submissionPortal: "https://portal.firstnational.com/submissions",
    requirements: [
      "Property valuation report in PDF format",
      "High-resolution property photos",
      "Comparable sales analysis",
      "Inspector certification",
      "Signed disclosure forms",
    ],
  },
}

// Submission checklist items
const checklistItems = [
  {
    id: "report_complete",
    label: "Report is complete and accurate",
    description: "All required sections have been filled out",
    required: true,
    completed: true,
  },
  {
    id: "photos_attached",
    label: "Property photos attached",
    description: "All required property photos are included",
    required: true,
    completed: true,
  },
  {
    id: "data_verified",
    label: "Data has been verified",
    description: "All property data has been double-checked for accuracy",
    required: true,
    completed: true,
  },
  {
    id: "comparable_sales",
    label: "Comparable sales analysis included",
    description: "Recent comparable sales have been analyzed and included",
    required: true,
    completed: false,
  },
  {
    id: "inspector_signature",
    label: "Inspector signature obtained",
    description: "Report has been signed by certified inspector",
    required: true,
    completed: true,
  },
  {
    id: "quality_review",
    label: "Quality review completed",
    description: "Report has passed internal quality review",
    required: false,
    completed: true, // Changed to true for demonstration
  },
  {
    id: "backup_saved",
    label: "Backup copy saved",
    description: "A copy of the report has been saved to local storage",
    required: false,
    completed: true,
  },
]

export default function ReportSubmissionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [checklist, setChecklist] = useState(checklistItems)
  const [submissionNotes, setSubmissionNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [submissionProgress, setSubmissionProgress] = useState(0)

  const toggleChecklistItem = (itemId: string) => {
    setChecklist(checklist.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)))
  }

  const requiredItemsCompleted = checklist.filter((item) => item.required && item.completed).length
  const totalRequiredItems = checklist.filter((item) => item.required).length
  const allRequiredCompleted = requiredItemsCompleted === totalRequiredItems

  const handleSubmit = async () => {
    if (!allRequiredCompleted) {
      alert("Please complete all required checklist items before submitting.")
      return
    }

    setIsSubmitting(true)
    setSubmissionProgress(0)

    // Simulate submission progress
    const progressInterval = setInterval(() => {
      setSubmissionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsSubmitting(false)
          setIsConfirmDialogOpen(false)

          // Show success and redirect
          setTimeout(() => {
            alert("Report submitted successfully!")
            router.push("/dashboard/jobs/my-jobs")
          }, 500)

          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSaveCopy = () => {
    // Simulate saving a copy
    alert("Report copy saved to your local files!")
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Ready for Submission":
        return "bg-green-100 text-green-800"
      case "Submitted":
        return "bg-blue-100 text-blue-800"
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
              onClick={() => router.push(`/dashboard/reports/preview/${params.id}`)}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Preview</span>
            </Button>
            <span className="text-neutral-300">|</span>
            <h1 className="text-lg font-semibold md:text-2xl">Submit Report</h1>
          </div>
        </div>

        {/* Report Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-secondary-900">{reportData.propertyAddress}</h1>
                <Badge className={getStatusBadgeClass(reportData.status)}>{reportData.status}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <span>{reportData.id}</span>
                <span>•</span>
                <span>{reportData.templateName}</span>
                <span>•</span>
                <span>Created: {reportData.createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submission Checklist */}
          <div className="lg:col-span-2">
            <Card className="border-neutral-200 mb-6">
              <CardHeader>
                <CardTitle className="text-secondary-900">Submission Checklist</CardTitle>
                <CardDescription>Complete all required items before submitting the report</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={(requiredItemsCompleted / totalRequiredItems) * 100} className="flex-1" />
                  <span className="text-sm text-secondary-600">
                    {requiredItemsCompleted}/{totalRequiredItems} required items completed
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        item.completed
                          ? "bg-green-50 border-green-200"
                          : item.required
                            ? "bg-red-50 border-red-200"
                            : "bg-neutral-50 border-neutral-200"
                      }`}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={item.id} className="font-medium text-secondary-900">
                            {item.label}
                          </Label>
                          {item.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                          {item.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {item.required && !item.completed && <AlertCircle className="h-4 w-4 text-red-600" />}
                        </div>
                        <p className="text-sm text-secondary-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submission Notes */}
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Submission Notes</CardTitle>
                <CardDescription>Add any additional notes or comments for the lender</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="Enter any additional notes or special instructions for the lender..."
                  rows={4}
                />
              </CardContent>
            </Card>
          </div>

          {/* Lender Information & Actions */}
          <div className="space-y-6">
            {/* Lender Details */}
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Lender Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Lender</p>
                  <p className="text-secondary-900">{reportData.lender.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-600">Contact Person</p>
                  <p className="text-secondary-900">{reportData.lender.contact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-600">Email</p>
                  <a
                    href={`mailto:${reportData.lender.email}`}
                    className="flex items-center text-primary-600 hover:underline"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    {reportData.lender.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-600">Phone</p>
                  <a
                    href={`tel:${reportData.lender.phone}`}
                    className="flex items-center text-primary-600 hover:underline"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {reportData.lender.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary-600">Address</p>
                  <div className="flex items-start">
                    <MapPin className="mr-2 h-4 w-4 text-secondary-500 mt-0.5" />
                    <p className="text-secondary-900">{reportData.lender.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Requirements */}
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Submission Requirements</CardTitle>
                <CardDescription>Lender-specific requirements for this submission</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {reportData.lender.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setIsConfirmDialogOpen(true)}
                disabled={!allRequiredCompleted || isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Send className="mr-2 h-4 w-4" />
                Submit to Lender
              </Button>
              <Button onClick={handleSaveCopy} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Copy
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>

            {!allRequiredCompleted && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Action Required</p>
                    <p className="text-xs text-yellow-600">
                      Complete all required checklist items to enable submission
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this report to {reportData.lender.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {isSubmitting && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-600">Submitting report...</span>
                <span className="text-sm font-medium">{submissionProgress}%</span>
              </div>
              <Progress value={submissionProgress} className="w-full" />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Report
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
