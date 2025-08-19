"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { InvoiceForm } from "@/components/invoice-form"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"
import { Loader2, Send, Download, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock invoice data (same as in invoicing/page.tsx for consistency)
const mockInvoices = [
  {
    id: "INV-001",
    clientName: "Acme Corp",
    clientEmail: "acme@example.com",
    amount: 1250.0,
    status: "Paid",
    dueDate: "2024-07-01",
    invoiceDate: "2024-06-15",
    items: [
      { description: "Property Valuation Report - 123 Main St", quantity: 1, unitPrice: 750.0 },
      { description: "Market Analysis Report - Q2 2024", quantity: 1, unitPrice: 500.0 },
    ],
    notes: "Payment received via bank transfer.",
  },
  {
    id: "INV-002",
    clientName: "Global Investments",
    clientEmail: "global@example.com",
    amount: 890.0,
    status: "Pending",
    dueDate: "2024-07-10",
    invoiceDate: "2024-06-20",
    items: [{ description: "Condominium Appraisal - 456 Oak Ave", quantity: 1, unitPrice: 890.0 }],
    notes: "",
  },
  {
    id: "INV-003",
    clientName: "City Developers",
    clientEmail: "citydev@example.com",
    amount: 675.0,
    status: "Overdue",
    dueDate: "2024-06-01",
    invoiceDate: "2024-05-15",
    items: [{ description: "Townhouse Valuation - 789 Maple Dr", quantity: 1, unitPrice: 675.0 }],
    notes: "Follow up required.",
  },
  {
    id: "INV-004",
    clientName: "Green Valley Realty",
    clientEmail: "greenvalley@example.com",
    amount: 425.0,
    status: "Draft",
    dueDate: "2024-07-20",
    invoiceDate: "2024-06-25",
    items: [{ description: "Single Family Home Appraisal - 321 Elm St", quantity: 1, unitPrice: 425.0 }],
    notes: "Awaiting client confirmation.",
  },
  {
    id: "INV-005",
    clientName: "Summit Financial",
    clientEmail: "summit@example.com",
    amount: 2100.0,
    status: "Paid",
    dueDate: "2024-06-25",
    invoiceDate: "2024-06-10",
    items: [{ description: "Luxury Villa Valuation - 987 Birch Ln", quantity: 1, unitPrice: 2100.0 }],
    notes: "Client paid in full.",
  },
]

export default function InvoiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const invoiceId = params.id as string

  const [invoice, setInvoice] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate fetching invoice data
    setLoading(true)
    const foundInvoice = mockInvoices.find((inv) => inv.id === invoiceId)
    if (foundInvoice) {
      setInvoice(foundInvoice)
    } else {
      toast({
        title: "Invoice Not Found",
        description: `No invoice found with ID: ${invoiceId}`,
        variant: "destructive",
      })
      router.push("/dashboard/invoicing") // Redirect if not found
    }
    setLoading(false)
  }, [invoiceId, router])

  const handleUpdateInvoice = (data: any) => {
    setIsSubmitting(true)
    console.log("Updating invoice with data:", data)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invoice Updated!",
        description: `Invoice ${invoiceId} has been successfully updated.`,
      })
      setIsSubmitting(false)
      // In a real app, you'd update the mockInvoices array or refetch
      setInvoice({ ...invoice, ...data }) // Optimistically update local state
    }, 1000)
  }

  const handleSendInvoice = () => {
    setIsSubmitting(true)
    toast({
      title: "Sending Invoice...",
      description: `Attempting to send invoice ${invoiceId} to ${invoice?.clientEmail}.`,
    })
    setTimeout(() => {
      toast({
        title: "Invoice Sent!",
        description: `Invoice ${invoiceId} sent successfully to ${invoice?.clientEmail}.`,
      })
      setIsSubmitting(false)
      // Update status to 'Sent' or 'Pending' if it was 'Draft'
      setInvoice((prev: any) => ({ ...prev, status: prev.status === "Draft" ? "Pending" : prev.status }))
    }, 1500)
  }

  const handleMarkAsPaid = () => {
    setIsSubmitting(true)
    toast({
      title: "Marking as Paid...",
      description: `Marking invoice ${invoiceId} as paid.`,
    })
    setTimeout(() => {
      toast({
        title: "Invoice Marked as Paid!",
        description: `Invoice ${invoiceId} is now marked as paid.`,
      })
      setIsSubmitting(false)
      setInvoice((prev: any) => ({ ...prev, status: "Paid" }))
    }, 1000)
  }

  const handleDownloadPdf = () => {
    toast({
      title: "Downloading Invoice",
      description: `Simulating download of invoice ${invoiceId}.`,
    })
    // In a real app, trigger a PDF generation/download
  }

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
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-muted/40">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <p className="mt-2 text-muted-foreground">Loading invoice details...</p>
      </div>
    )
  }

  if (!invoice) {
    return null // Should be handled by the redirect in useEffect
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainNav />
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Invoice: {invoice.id}</h1>
          <div className="flex items-center gap-2">
            <Badge className={getStatusBadgeClass(invoice.status)}>{invoice.status}</Badge>
            <Button variant="outline" onClick={handleDownloadPdf} disabled={isSubmitting}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            {invoice.status !== "Paid" && (
              <Button onClick={handleMarkAsPaid} disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Mark as Paid
              </Button>
            )}
            {invoice.status === "Draft" ||
              (invoice.status === "Pending" && (
                <Button onClick={handleSendInvoice} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Send Invoice
                </Button>
              ))}
          </div>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Edit Invoice Details</CardTitle>
            <CardDescription className="text-gray-600">Modify the invoice details below.</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceForm initialData={invoice} onSubmit={handleUpdateInvoice} isEditMode={true} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
