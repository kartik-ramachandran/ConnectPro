"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { InvoiceForm } from "@/components/invoice-form"
import { toast } from "@/components/ui/use-toast"

export default function CreateInvoicePage() {
  const router = useRouter()

  const handleCreateInvoice = (data: any) => {
    console.log("Creating invoice with data:", data)
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invoice Created!",
        description: `Invoice for ${data.clientName} has been successfully created.`,
      })
      router.push("/dashboard/invoicing") // Redirect to invoicing list
    }, 1000)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainNav />
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900">Invoice Details</CardTitle>
            <CardDescription className="text-gray-600">Fill in the details to generate a new invoice.</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceForm onSubmit={handleCreateInvoice} />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
