"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, PlusCircle, Trash2, DollarSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SpeechToTextInput } from "@/components/speech-to-text-input" // Import the new component

const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0.01, "Unit price must be positive"),
})

const formSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  clientEmail: z.string().email("Invalid email address"),
  invoiceDate: z.date({ required_error: "Invoice date is required" }),
  dueDate: z.date({ required_error: "Due date is required" }),
  lineItems: z.array(invoiceItemSchema).min(1, "At least one line item is required"),
  notes: z.string().optional(),
})

type InvoiceFormValues = z.infer<typeof formSchema>

interface InvoiceFormProps {
  initialData?: InvoiceFormValues & { id?: string; status?: string }
  onSubmit: (data: InvoiceFormValues) => void
  isEditMode?: boolean
}

export function InvoiceForm({ initialData, onSubmit, isEditMode = false }: InvoiceFormProps) {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      clientName: "",
      clientEmail: "",
      invoiceDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // Default to 30 days from now
      lineItems: [{ description: "", quantity: 1, unitPrice: 0 }],
      notes: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "lineItems",
  })

  const lineItems = form.watch("lineItems")
  const totalAmount = lineItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0)

  useEffect(() => {
    if (initialData) {
      form.reset({
        ...initialData,
        invoiceDate: initialData.invoiceDate ? new Date(initialData.invoiceDate) : new Date(),
        dueDate: initialData.dueDate ? new Date(initialData.dueDate) : new Date(),
      })
    }
  }, [initialData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <SpeechToTextInput // Use SpeechToTextInput
                    placeholder="e.g., Acme Corp"
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Email</FormLabel>
                <FormControl>
                  <Input // Keep as regular Input
                    type="email"
                    placeholder="e.g., client@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoiceDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-4">Line Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[20%]">Quantity</TableHead>
              <TableHead className="w-[20%]">Unit Price</TableHead>
              <TableHead className="w-[15%] text-right">Amount</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.description`}
                    render={({ field: itemField }) => (
                      <FormItem className="mb-0">
                        <FormControl>
                          <SpeechToTextInput // Use SpeechToTextInput
                            placeholder="e.g., Valuation Report"
                            value={itemField.value}
                            onValueChange={itemField.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.quantity`}
                    render={({ field: itemField }) => (
                      <FormItem className="mb-0">
                        <FormControl>
                          <Input // Keep as regular Input
                            type="number"
                            {...itemField}
                            onChange={(e) => itemField.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`lineItems.${index}.unitPrice`}
                    render={({ field: itemField }) => (
                      <FormItem className="mb-0">
                        <FormControl>
                          <Input // Keep as regular Input
                            type="number"
                            step="0.01"
                            {...itemField}
                            onChange={(e) => itemField.onChange(e.target.valueAsNumber)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="text-right font-medium">
                  $
                  {(
                    (form.getValues(`lineItems.${index}.quantity`) || 0) *
                    (form.getValues(`lineItems.${index}.unitPrice`) || 0)
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
          className="mt-4"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Line Item
        </Button>

        <div className="flex justify-end items-center gap-4 mt-6">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-extrabold text-primary-600 flex items-center">
            <DollarSign className="h-5 w-5 mr-1" />
            {totalAmount.toFixed(2)}
          </span>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <SpeechToTextInput // Use SpeechToTextInput
                  isTextArea
                  placeholder="Add any additional notes for the invoice..."
                  value={field.value || ""}
                  onValueChange={field.onChange}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white">
          {isEditMode ? "Update Invoice" : "Create Invoice"}
        </Button>
      </form>
    </Form>
  )
}
