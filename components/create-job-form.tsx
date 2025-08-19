"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for select options
const jobTypes = ["Appraisal", "BPO", "Review", "Desktop Valuation"]
const propertyTypes = ["Single Family", "Condominium", "Townhouse", "Multi-Family", "Commercial"]
const statuses = ["Available", "Assigned", "In Progress", "Completed", "Overdue"]
const priorities = ["High", "Medium", "Low"]
const lenders = ["First National Bank", "Pacific Mortgage", "Golden State Lending", "Union Bank"]
const teamMembers = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Lee"]

interface CreateJobFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: (job: any) => void
}

export function CreateJobForm({ isOpen, onClose, onSave }: CreateJobFormProps) {
  const [jobType, setJobType] = React.useState("")
  const [address, setAddress] = React.useState("")
  const [propertyType, setPropertyType] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [fee, setFee] = React.useState("")
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined)
  const [lender, setLender] = React.useState("")
  const [assignedTo, setAssignedTo] = React.useState("")
  const [priority, setPriority] = React.useState("")

  const handleSubmit = () => {
    const newJob = {
      id: `JOB-${Math.floor(Math.random() * 10000)}`, // Simple unique ID generation
      jobType,
      address,
      propertyType,
      status,
      fee: `$${fee}`, // Format fee
      dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : "",
      lender,
      assignedTo,
      priority,
      distance: `${(Math.random() * 20).toFixed(1)} miles`, // Mock distance
      createdAt: format(new Date(), "yyyy-MM-dd"),
    }
    onSave(newJob)
    onClose() // Close dialog after saving
    // Reset form fields
    setJobType("")
    setAddress("")
    setPropertyType("")
    setStatus("")
    setFee("")
    setDueDate(undefined)
    setLender("")
    setAssignedTo("")
    setPriority("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>Fill in the details below to create a new job.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jobType" className="text-right">
              Job Type
            </Label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 123 Main St, Anytown, CA 90210"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="propertyType" className="text-right">
              Property Type
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fee" className="text-right">
              Fee ($)
            </Label>
            <Input
              id="fee"
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 450"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("col-span-3 justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lender" className="text-right">
              Lender/Receiver
            </Label>
            <Select value={lender} onValueChange={setLender}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select lender" />
              </SelectTrigger>
              <SelectContent>
                {lenders.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="assignedTo" className="text-right">
              Assign To
            </Label>
            <Select value={assignedTo} onValueChange={setAssignedTo}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Create Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
