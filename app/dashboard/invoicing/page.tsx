"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, DollarSign } from "lucide-react" // Removed Plus and CheckCircle as they are no longer needed for this button
import { MainNav } from "@/components/main-nav"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog" // Removed DialogTrigger as the button is gone
import { InvoiceForm } from "@/components/invoice-form"

// Mock invoice data (kept for the main list display)
const mockInvoices = [
  {
    id: "INV-001",
    clientName: "Acme Corp",
    amount: 1250.0,
    status: "Paid",
    dueDate: "2024-07-01",
    invoiceDate: "2024-06-15",
    items: [
      { description: "Property Valuation Report - 123 Main St", quantity: 1, unitPrice: 750.0 },
      { description: "Market Analysis Report - Q2 2024", quantity: 1, unitPrice: 500.0 },
    ],
  },
  {
    id: "INV-002",
    clientName: "Global Investments",
    amount: 890.0,
    status: "Pending",
    dueDate: "2024-07-10",
    invoiceDate: "2024-06-20",
    items: [{ description: "Condominium Appraisal - 456 Oak Ave", quantity: 1, unitPrice: 890.0 }],
  },
  {
    id: "INV-003",
    clientName: "City Developers",
    amount: 675.0,
    status: "Overdue",
    dueDate: "2024-06-01",
    invoiceDate: "2024-05-15",
    items: [{ description: "Townhouse Valuation - 789 Maple Dr", quantity: 1, unitPrice: 675.0 }],
  },
  {
    id: "INV-004",
    clientName: "Green Valley Realty",
    amount: 425.0,
    status: "Draft",
    dueDate: "2024-07-20",
    invoiceDate: "2024-06-25",
    items: [{ description: "Single Family Home Appraisal - 321 Elm St", quantity: 1, unitPrice: 425.0 }],
  },
  {
    id: "INV-005",
    clientName: "Summit Financial",
    amount: 2100.0,
    status: "Paid",
    dueDate: "2024-06-25",
    invoiceDate: "2024-06-10",
    items: [{ description: "Luxury Villa Valuation - 987 Birch Ln", quantity: 1, unitPrice: 2100.0 }],
  },
]

// Mock completed jobs data for selection (still needed for the job-specific invoice creation)
const mockCompletedJobs = [
  {
    id: "JOB-1002",
    address: "456 Pine Avenue, Santa Monica, CA 90401",
    propertyType: "Condominium",
    lender: "Pacific Mortgage",
    lenderEmail: "info@pacificmortgage.com",
    fee: "$350",
    dueDate: "2024-06-08",
    status: "Completed",
    priority: "Medium",
    distance: "8.7 miles",
    createdAt: "2024-05-28",
    assignedTo: "Jane Smith",
  },
  {
    id: "JOB-1005",
    address: "555 Willow Lane, Glendale, CA 91204",
    propertyType: "Multi-Family",
    lender: "Pacific Mortgage",
    lenderEmail: "info@pacificmortgage.com",
    fee: "$500",
    dueDate: "2024-06-02",
    status: "Completed",
    priority: "High",
    distance: "9.4 miles",
    createdAt: "2024-05-25",
    assignedTo: "John Doe",
  },
  {
    id: "JOB-1007",
    address: "101 Ocean View Dr, Malibu, CA 90265",
    propertyType: "Luxury Home",
    lender: "Coastal Bank",
    lenderEmail: "loans@coastalbank.com",
    fee: "$1200",
    dueDate: "2024-06-15",
    status: "Completed",
    priority: "High",
    distance: "20.1 miles",
    createdAt: "2024-06-01",
    assignedTo: "Sarah Lee",
  },
]

export default function InvoicingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  // Removed isSelectJobDialogOpen and setIsSelectJobDialogOpen as the button is gone
  const [isCreateInvoiceFromJobDialogOpen, setIsCreateInvoiceFromJobDialogOpen] = useState(false)
  const [selectedJobForInvoiceCreation, setSelectedJobForInvoiceCreation] = useState<
    (typeof mockCompletedJobs)[0] | null
  >(null)
  // Removed jobSearchQuery as the job selection dialog is gone

  const filteredInvoices = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase()
    return mockInvoices.filter(
      (invoice) =>
        invoice.id.toLowerCase().includes(lowerCaseQuery) ||
        invoice.clientName.toLowerCase().includes(lowerCaseQuery) ||
        invoice.status.toLowerCase().includes(lowerCaseQuery) ||
        invoice.items.some((item) => item.description.toLowerCase().includes(lowerCaseQuery)),
    )
  }, [searchQuery])

  // Removed filteredCompletedJobs as the job selection dialog is gone

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Draft":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  const handleCreateInvoice = (data: any) => {
    console.log("New Invoice Data:", data)
    // In a real application, you would send this data to your backend API
    setIsCreateInvoiceFromJobDialogOpen(false)
    setSelectedJobForInvoiceCreation(null)
    // You might want to add the new invoice to the mockInvoices state here
    // to see it immediately in the list, but for simplicity, we'll keep mockInvoices static.
  }

  // Removed handleSelectJob as the job selection dialog is gone

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainNav />
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          {/* The DialogTrigger and Button for "Create New Invoice" are removed from here */}
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">All Invoices</CardTitle>
            <CardDescription className="text-gray-600">Manage your client invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search by invoice ID, client name, or item description..."
                className="w-full pl-10 pr-4 py-2 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {filteredInvoices.length === 0 ? (
              <div className="text-center py-8 text-secondary-500">No invoices found matching your search.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="rounded-tl-lg">Invoice ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="rounded-tr-lg text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                          <Link href={`/dashboard/invoicing/${invoice.id}`} className="hover:text-primary-600">
                            {invoice.id}
                          </Link>
                        </TableCell>
                        <TableCell>{invoice.clientName}</TableCell>
                        <TableCell className="font-semibold">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {invoice.amount.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <Badge className={getStatusBadgeClass(invoice.status)}>{invoice.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialog for creating invoice from selected job (still needed for job-specific invoice creation) */}
      {selectedJobForInvoiceCreation && (
        <Dialog open={isCreateInvoiceFromJobDialogOpen} onOpenChange={setIsCreateInvoiceFromJobDialogOpen}>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Invoice for Job {selectedJobForInvoiceCreation.id}</DialogTitle>
              <DialogDescription>
                Generate an invoice for the completed job at {selectedJobForInvoiceCreation.address}.
              </DialogDescription>
            </DialogHeader>
            <InvoiceForm
              onSubmit={handleCreateInvoice}
              initialData={{
                clientName: selectedJobForInvoiceCreation.lender,
                clientEmail: selectedJobForInvoiceCreation.lenderEmail || "",
                invoiceDate: new Date(),
                dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
                lineItems: [
                  {
                    description: `Property Valuation for ${selectedJobForInvoiceCreation.address} (Job ID: ${selectedJobForInvoiceCreation.id})`,
                    quantity: 1,
                    unitPrice: Number.parseFloat(selectedJobForInvoiceCreation.fee.replace(/[^0-9.-]+/g, "")),
                  },
                ],
                notes: `Invoice for job ID: ${selectedJobForInvoiceCreation.id}`,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
