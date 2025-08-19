"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Calendar, MapPin, Briefcase, Filter, MoreHorizontal, PlusCircle } from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { CreateJobForm } from "@/components/create-job-form" // Import the new form component
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { InvoiceForm } from "@/components/invoice-form"

// Sample job data (moved inside component to allow state modification)
const initialJobs = [
  {
    id: "JOB-1001",
    address: "123 Oak Street, Beverly Hills, CA 90210",
    propertyType: "Single Family",
    lender: "First National Bank",
    lenderEmail: "sarah.johnson@firstnational.com", // Added lender email
    fee: "$450",
    dueDate: "2024-06-05",
    status: "Available",
    priority: "High",
    distance: "5.2 miles",
    createdAt: "2024-05-29",
    assignedTo: "John Doe", // Added assignedTo for consistency
  },
  {
    id: "JOB-1002",
    address: "456 Pine Avenue, Santa Monica, CA 90401",
    propertyType: "Condominium",
    lender: "Pacific Mortgage",
    lenderEmail: "info@pacificmortgage.com", // Added lender email
    fee: "$350",
    dueDate: "2024-06-08",
    status: "Completed", // Changed to Completed for demonstration
    priority: "Medium",
    distance: "8.7 miles",
    createdAt: "2024-05-28",
    assignedTo: "Jane Smith",
  },
  {
    id: "JOB-1003",
    address: "789 Maple Drive, Pasadena, CA 91101",
    propertyType: "Townhouse",
    lender: "Golden State Lending",
    lenderEmail: "contact@goldenstatelending.com", // Added lender email
    fee: "$400",
    dueDate: "2024-06-03",
    status: "Assigned",
    priority: "High",
    distance: "12.3 miles",
    createdAt: "2024-05-27",
    assignedTo: "Mike Johnson",
  },
  {
    id: "JOB-1004",
    address: "321 Elm Street, Long Beach, CA 90802",
    propertyType: "Single Family",
    lender: "First National Bank",
    lenderEmail: "sarah.johnson@firstnational.com", // Added lender email
    fee: "$425",
    dueDate: "2024-06-10",
    status: "Available",
    priority: "Low",
    distance: "15.8 miles",
    createdAt: "2024-05-26",
    assignedTo: "Sarah Lee",
  },
  {
    id: "JOB-1005",
    address: "555 Willow Lane, Glendale, CA 91204",
    propertyType: "Multi-Family",
    lender: "Pacific Mortgage",
    lenderEmail: "info@pacificmortgage.com", // Added lender email
    fee: "$500",
    dueDate: "2024-06-02",
    status: "Completed", // Changed to Completed for demonstration
    priority: "High",
    distance: "9.4 miles",
    createdAt: "2024-05-25",
    assignedTo: "John Doe",
  },
  {
    id: "JOB-1006",
    address: "888 Cedar Court, Burbank, CA 91502",
    propertyType: "Single Family",
    lender: "Golden State Lending",
    lenderEmail: "contact@goldenstatelending.com", // Added lender email
    fee: "$375",
    dueDate: "2024-06-07",
    status: "Available",
    priority: "Medium",
    distance: "7.1 miles",
    createdAt: "2024-05-24",
    assignedTo: "Jane Smith",
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs) // Use state for jobs
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [isCreateJobFormOpen, setIsCreateJobFormOpen] = useState(false) // State for dialog

  // New states for invoice dialog from jobs page
  const [isJobInvoiceDialogOpen, setIsJobInvoiceDialogOpen] = useState(false)
  const [selectedJobForInvoice, setSelectedJobForInvoice] = useState<(typeof initialJobs)[0] | null>(null)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.lender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const toggleSelectJob = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    } else {
      setSelectedJobs([...selectedJobs, jobId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(filteredJobs.map((job) => job.id))
    }
  }

  const handleSaveNewJob = (newJob: any) => {
    setJobs((prevJobs) => [newJob, ...prevJobs]) // Add new job to the top
  }

  const handleCreateInvoiceFromJob = (data: any) => {
    console.log("Invoice created from job:", selectedJobForInvoice?.id, data)
    // In a real application, you would send this data to your backend API,
    // potentially linking it to the job ID.
    setIsJobInvoiceDialogOpen(false)
    setSelectedJobForInvoice(null)
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
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Jobs Dashboard</h1>
          <Button size="sm" onClick={() => setIsCreateJobFormOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Job
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <Briefcase className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedJobs.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Bulk Actions
                    <Briefcase className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Accept Selected Jobs</DropdownMenuItem>
                  <DropdownMenuItem>Decline Selected Jobs</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Button variant="outline" size="sm" className="border-primary-600 text-primary-600 hover:bg-primary-50">
              <MapPin className="mr-2 h-4 w-4" />
              Map View
            </Button>
          </div>
        </div>

        {/* Jobs Table */}
        <Card className="border-neutral-200">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={filteredJobs.length > 0 && selectedJobs.length === filteredJobs.length}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all jobs"
                    />
                  </TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead className="hidden md:table-cell">Lender</TableHead>
                  <TableHead className="hidden md:table-cell">Fee</TableHead>
                  <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Priority</TableHead>
                  <TableHead className="hidden xl:table-cell">Assigned To</TableHead>
                  <TableHead className="w-[60px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-secondary-500">
                      No jobs found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={() => toggleSelectJob(job.id)}
                          aria-label={`Select job ${job.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <Link
                            href={`/dashboard/jobs/${job.id}`}
                            className="font-medium text-secondary-900 hover:text-primary-600"
                          >
                            {job.address}
                          </Link>
                          <div className="flex items-center gap-2 text-xs text-secondary-500">
                            <span>{job.id}</span>
                            <span>•</span>
                            <span>{job.propertyType}</span>
                            <span>•</span>
                            <span>{job.distance}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{job.lender}</TableCell>
                      <TableCell className="hidden md:table-cell">{job.fee}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-secondary-500" />
                          {job.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(job.status)}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge className={getPriorityBadgeClass(job.priority)}>{job.priority}</Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">{job.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/jobs/${job.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Accept Job</DropdownMenuItem>
                            <DropdownMenuItem>Decline Job</DropdownMenuItem>
                            {job.status === "Completed" && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedJobForInvoice(job)
                                  setIsJobInvoiceDialogOpen(true)
                                }}
                              >
                                Create Invoice
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <CreateJobForm
        isOpen={isCreateJobFormOpen}
        onClose={() => setIsCreateJobFormOpen(false)}
        onSave={handleSaveNewJob}
      />

      {/* Dialog for creating invoice from job */}
      {selectedJobForInvoice && (
        <Dialog open={isJobInvoiceDialogOpen} onOpenChange={setIsJobInvoiceDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Invoice for Job {selectedJobForInvoice.id}</DialogTitle>
              <DialogDescription>
                Generate an invoice for the completed job at {selectedJobForInvoice.address}.
              </DialogDescription>
            </DialogHeader>
            <InvoiceForm
              onSubmit={handleCreateInvoiceFromJob}
              initialData={{
                clientName: selectedJobForInvoice.lender,
                clientEmail: selectedJobForInvoice.lenderEmail || "",
                invoiceDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                lineItems: [
                  {
                    description: `Property Valuation for ${selectedJobForInvoice.address}`,
                    quantity: 1,
                    unitPrice: Number.parseFloat(selectedJobForInvoice.fee.replace(/[^0-9.-]+/g, "")),
                  },
                ],
                notes: `Invoice for job ID: ${selectedJobForInvoice.id}`,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
