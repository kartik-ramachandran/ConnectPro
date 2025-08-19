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
} from "@/components/ui/dialog"
import { ArrowLeft, Edit, Download, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

// Sample report data
const reportData = {
  id: "RPT-1001",
  jobId: "JOB-1001",
  propertyAddress: "123 Oak Street, Beverly Hills, CA 90210",
  templateName: "Standard Residential Report",
  status: "Draft",
  createdAt: "2024-05-29",
  lastModified: "2024-05-29 14:30",

  // Property data
  propertyData: {
    property_address: "123 Oak Street, Beverly Hills, CA 90210",
    property_type: "Single Family",
    bedrooms: "4",
    bathrooms: "3.5",
    square_feet: "2,850",
    year_built: "1998",
    lot_size: "0.25 acres",
    inspection_date: "May 29, 2024",
    inspector_name: "John Doe",
    estimated_value: "$1,250,000",
    value_per_sqft: "$439",
    property_condition: "Good",
    market_trend: "Stable",
    repair_needs:
      "Minor cosmetic updates recommended for kitchen and master bathroom. Exterior paint touch-ups needed on south-facing wall.",
    general_notes:
      "Well-maintained property in desirable neighborhood. Recent HVAC system upgrade. Hardwood floors in excellent condition throughout main living areas.",
  },

  // Lender information
  lender: {
    name: "First National Bank",
    contact: "Sarah Johnson",
    email: "sarah.johnson@firstnational.com",
    phone: "(310) 555-1234",
    address: "456 Financial Plaza, Los Angeles, CA 90017",
  },
}

export default function ReportPreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isRegenerateDialogOpen, setIsRegenerateDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)

  const handleEditTemplate = () => {
    router.push("/dashboard/reports/templates")
  }

  const handleRegenerate = () => {
    setIsRegenerateDialogOpen(false)
    // Simulate regeneration
    alert("Report regenerated successfully!")
  }

  const handleApprove = () => {
    setIsApprovalDialogOpen(false)
    router.push(`/dashboard/reports/submit/${params.id}`)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Ready":
        return "bg-green-100 text-green-800"
      case "Submitted":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  // Render the actual report content
  const renderReportContent = () => {
    return (
      <div className="bg-white p-8 shadow-sm border border-neutral-200 rounded-lg max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-secondary-900 mb-2">PROPERTY VALUATION REPORT</h1>
          <div className="text-sm text-secondary-600 space-y-1">
            <p>Property Address: {reportData.propertyData.property_address}</p>
            <p>Inspection Date: {reportData.propertyData.inspection_date}</p>
            <p>Inspector: {reportData.propertyData.inspector_name}</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4 border-b border-neutral-200 pb-2">
            Executive Summary
          </h2>
          <p className="text-secondary-700 leading-relaxed">
            This report provides a comprehensive valuation analysis for the subject property located at{" "}
            {reportData.propertyData.property_address}. The property is a {reportData.propertyData.property_type} with{" "}
            {reportData.propertyData.bedrooms} bedrooms and {reportData.propertyData.bathrooms} bathrooms, totaling{" "}
            {reportData.propertyData.square_feet} square feet. Based on our analysis, the estimated market value is{" "}
            {reportData.propertyData.estimated_value}.
          </p>
        </div>

        {/* Property Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4 border-b border-neutral-200 pb-2">
            Property Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-600">Property Type:</span>
                <span className="font-medium">{reportData.propertyData.property_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Bedrooms:</span>
                <span className="font-medium">{reportData.propertyData.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Bathrooms:</span>
                <span className="font-medium">{reportData.propertyData.bathrooms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Square Feet:</span>
                <span className="font-medium">{reportData.propertyData.square_feet}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-600">Year Built:</span>
                <span className="font-medium">{reportData.propertyData.year_built}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Lot Size:</span>
                <span className="font-medium">{reportData.propertyData.lot_size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Condition:</span>
                <span className="font-medium">{reportData.propertyData.property_condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Market Trend:</span>
                <span className="font-medium">{reportData.propertyData.market_trend}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Valuation Summary */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4 border-b border-neutral-200 pb-2">
            Valuation Summary
          </h2>
          <div className="bg-primary-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-secondary-600 text-sm">Estimated Market Value</p>
                <p className="text-2xl font-bold text-primary-600">{reportData.propertyData.estimated_value}</p>
              </div>
              <div className="text-center">
                <p className="text-secondary-600 text-sm">Value per Square Foot</p>
                <p className="text-2xl font-bold text-primary-600">{reportData.propertyData.value_per_sqft}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Inspection Notes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4 border-b border-neutral-200 pb-2">
            Inspection Observations
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-secondary-800 mb-2">General Notes</h3>
              <p className="text-secondary-700">{reportData.propertyData.general_notes}</p>
            </div>
            <div>
              <h3 className="font-medium text-secondary-800 mb-2">Repair Needs</h3>
              <p className="text-secondary-700">{reportData.propertyData.repair_needs}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-neutral-200 text-center text-sm text-secondary-500">
          <p>Report generated by Connect • {reportData.createdAt}</p>
          <p>Inspector: {reportData.propertyData.inspector_name}</p>
        </div>
      </div>
    )
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
              onClick={() => router.push("/dashboard/jobs/my-jobs")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Jobs</span>
            </Button>
            <span className="text-neutral-300">|</span>
            <h1 className="text-lg font-semibold md:text-2xl">Report Preview</h1>
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
                <span>Last modified: {reportData.lastModified}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              <Button variant="outline" onClick={handleEditTemplate}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Template
              </Button>
              <Button variant="outline" onClick={() => setIsRegenerateDialogOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button
                className="bg-primary-600 hover:bg-primary-700 text-white"
                onClick={() => setIsApprovalDialogOpen(true)}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve for Submission
              </Button>
            </div>
          </div>
        </div>

        {/* Report Content */}
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="preview">Report Preview</TabsTrigger>
            <TabsTrigger value="data">Source Data</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
          </TabsList>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Report Preview</CardTitle>
                <CardDescription>Preview of the generated report with real property data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-50 p-4 rounded-lg">{renderReportContent()}</div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Source Data</CardTitle>
                <CardDescription>Raw data used to generate this report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-secondary-800 mb-3">Property Information</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(reportData.propertyData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-secondary-600 capitalize">{key.replace(/_/g, " ")}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-secondary-800 mb-3">Lender Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Lender:</span>
                        <span className="font-medium">{reportData.lender.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Contact:</span>
                        <span className="font-medium">{reportData.lender.contact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Email:</span>
                        <span className="font-medium">{reportData.lender.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Phone:</span>
                        <span className="font-medium">{reportData.lender.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Validation Tab */}
          <TabsContent value="validation">
            <Card className="border-neutral-200">
              <CardHeader>
                <CardTitle className="text-secondary-900">Report Validation</CardTitle>
                <CardDescription>Quality checks and validation results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">All required fields completed</p>
                      <p className="text-sm text-green-600">All mandatory data fields have been filled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Data validation passed</p>
                      <p className="text-sm text-green-600">All data values are within expected ranges</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Template formatting correct</p>
                      <p className="text-sm text-green-600">Report follows the selected template structure</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Photos pending review</p>
                      <p className="text-sm text-yellow-600">Some property photos may need quality review</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      {/* Regenerate Dialog */}
      <Dialog open={isRegenerateDialogOpen} onOpenChange={setIsRegenerateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regenerate Report</DialogTitle>
            <DialogDescription>
              This will regenerate the report with the latest data and template. Any manual changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRegenerateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRegenerate}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Report for Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this report for submission? Once approved, it will be ready to send to
              the lender.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-primary-600 hover:bg-primary-700 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve & Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
