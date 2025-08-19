"use client"

import { useSearchParams } from "next/navigation" // Import useSearchParams
import { Separator } from "@/components/ui/separator"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, ChevronRight, Mail, Zap, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock Email Data
const mockEmails = [
  {
    id: "email-1",
    subject: "New Valuation Request - 123 Main St",
    sender: "lender@example.com",
    date: "2024-06-15",
    content:
      "Dear Valuer, please find attached details for a new valuation job at 123 Main St, Anytown, CA. Lender: ABC Bank. Due Date: 2024-06-25. Property Type: Single Family. Please confirm receipt.",
  },
  {
    id: "email-2",
    subject: "Urgent: Valuation for 456 Oak Ave",
    sender: "broker@example.com",
    date: "2024-06-14",
    content:
      "Hi team, we need a rush valuation for 456 Oak Ave, Othercity, NY. Client is XYZ Mortgage. Deadline is 2024-06-20. It's a condo.",
  },
  {
    id: "email-3",
    subject: "Meeting Reminder",
    sender: "calendar@example.com",
    date: "2024-06-13",
    content: "Reminder: Team meeting tomorrow at 10 AM.",
  },
  {
    id: "email-4",
    subject: "Follow-up on 789 Pine Ln",
    sender: "lender@example.com",
    date: "2024-06-12",
    content:
      "Just checking in on the valuation for 789 Pine Ln, Somewhere, TX. Lender: DEF Credit. Due Date: 2024-06-18. Thanks!",
  },
  {
    id: "email-5",
    subject: "Newsletter Subscription Confirmation",
    sender: "newsletter@example.com",
    date: "2024-06-11",
    content: "Thank you for subscribing to our newsletter!",
  },
]

// Mock AI Analysis Function
const mockAIAnalyzeEmail = (emailContent: string) => {
  const jobs = []
  if (emailContent.includes("123 Main St") && emailContent.includes("ABC Bank")) {
    jobs.push({
      id: "job-mock-1",
      address: "123 Main St, Anytown, CA",
      lender: "ABC Bank",
      dueDate: "2024-06-25",
      status: "New",
    })
  }
  if (emailContent.includes("456 Oak Ave") && emailContent.includes("XYZ Mortgage")) {
    jobs.push({
      id: "job-mock-2",
      address: "456 Oak Ave, Othercity, NY",
      lender: "XYZ Mortgage",
      dueDate: "2024-06-20",
      status: "New",
    })
  }
  if (emailContent.includes("789 Pine Ln") && emailContent.includes("DEF Credit")) {
    jobs.push({
      id: "job-mock-3",
      address: "789 Pine Ln, Somewhere, TX",
      lender: "DEF Credit",
      dueDate: "2024-06-18",
      status: "New",
    })
  }
  return jobs
}

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const initialSection = searchParams.get("section") || "general"
  const [activeSection, setActiveSection] = useState(initialSection)
  const [isConnectedToEmailProvider, setIsConnectedToEmailProvider] = useState(false)
  const [emailApiKey, setEmailApiKey] = useState("")
  const [identifiedJobs, setIdentifiedJobs] = useState<any[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [showConnectDialog, setShowConnectDialog] = useState(false) // Dedicated state for connect dialog
  const [showEmailContentDialog, setShowEmailContentDialog] = useState(false)
  const [currentEmailContent, setCurrentEmailContent] = useState("")

  // Determine overall connection status
  const isFullyConnected = isConnectedToEmailProvider && emailApiKey.length > 0

  const settingsSections = [
    { id: "general", title: "General", description: "Manage your application's general preferences." },
    { id: "profile", title: "Profile", description: "Update your personal information." },
    { id: "security", title: "Security", description: "Manage your account security settings." },
    { id: "notifications", title: "Notifications", description: "Configure your notification preferences." },
    { id: "billing", title: "Billing", description: "Manage your subscription and payment methods." },
    // Removed Integrations from here as it's now in MainNav
  ]

  const handleConnectEmail = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnectedToEmailProvider(true)
      setEmailApiKey("sk-mock-api-key-12345") // Simulate saving the API key
      setIsConnecting(false)
      setShowConnectDialog(false) // Close connect dialog on successful connection
    }, 1500) // Simulate connection delay
  }

  const handleDisconnectEmail = () => {
    setIsConnectedToEmailProvider(false)
    setEmailApiKey("")
    setIdentifiedJobs([]) // Clear identified jobs on disconnect
  }

  const handleRunAIAnalysis = () => {
    const allIdentifiedJobs: any[] = []
    mockEmails.forEach((email) => {
      const jobs = mockAIAnalyzeEmail(email.content)
      allIdentifiedJobs.push(...jobs)
    })
    setIdentifiedJobs(allIdentifiedJobs)
  }

  const handleCreateJob = (job: any) => {
    alert(`Mock: Creating job for ${job.address} with lender ${job.lender}`)
    // In a real app, you'd send this data to your backend to create a job
  }

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <Card id="general">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your application's general preferences.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="appName">App Name</Label>
                <Input id="appName" defaultValue="Connect Professional" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-fit">Save Changes</Button>
            </CardContent>
          </Card>
        )
      case "profile":
        return (
          <Card id="profile">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <Label htmlFor="avatar">Profile Picture</Label>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Upload className="h-4 w-4" />
                    Upload New Photo
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john@example.com" disabled />
              </div>
              <Button className="w-fit">Update Profile</Button>
            </CardContent>
          </Card>
        )
      case "security":
        return (
          <Card id="security">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button className="w-fit">Change Password</Button>
              <div className="flex items-center justify-between">
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <Switch id="twoFactorAuth" />
              </div>
            </CardContent>
          </Card>
        )
      case "notifications":
        return (
          <Card id="notifications">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inAppNotifications">In-App Notifications</Label>
                <Switch id="inAppNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <Switch id="marketingEmails" />
              </div>
            </CardContent>
          </Card>
        )
      case "billing":
        return (
          <Card id="billing">
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription and payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Plan</Label>
                <p className="text-sm text-muted-foreground">Professional Plan (Monthly)</p>
              </div>
              <Button className="w-fit">Manage Subscription</Button>
              <div className="grid gap-2">
                <Label>Payment Method</Label>
                <p className="text-sm text-muted-foreground">Visa ending in 1234</p>
              </div>
              <Button variant="outline" className="w-fit">
                Update Payment Method
              </Button>
            </CardContent>
          </Card>
        )
      case "integrations":
        return (
          <div className="grid gap-6">
            <Card id="integrations">
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect with third-party services.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Google Drive</h3>
                    <p className="text-sm text-muted-foreground">Sync documents and files.</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Slack</h3>
                    <p className="text-sm text-muted-foreground">Receive real-time notifications.</p>
                  </div>
                  <Button variant="destructive">Disconnect</Button>
                </div>
              </CardContent>
            </Card>

            {/* New Email Integration Card */}
            <Card id="email-integration">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" /> Email Integration (AI Powered)
                </CardTitle>
                <CardDescription>Connect your email to automatically identify valuation jobs using AI.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Connect Email Provider</h3>
                    <p className="text-sm text-muted-foreground">
                      {isConnectedToEmailProvider ? "Connected to Gmail" : "Not connected"}
                    </p>
                  </div>
                  {isFullyConnected ? (
                    <Button variant="destructive" onClick={handleDisconnectEmail}>
                      <XCircle className="h-4 w-4 mr-2" /> Disconnect
                    </Button>
                  ) : (
                    // Use showConnectDialog for this specific dialog
                    <Dialog open={showConnectDialog || isConnecting} onOpenChange={setShowConnectDialog}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setShowConnectDialog(true)} disabled={isConnecting}>
                          {isConnecting ? "Connecting..." : "Connect"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Connect Email Provider & AI Service</DialogTitle>
                          <DialogDescription>
                            This is a mockup. Simulate connecting your email and providing an AI API key.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="emailProvider" className="text-right">
                              Provider
                            </Label>
                            <Select defaultValue="gmail">
                              <SelectTrigger id="emailProvider" className="col-span-3">
                                <SelectValue placeholder="Select an email provider" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gmail">Google Mail</SelectItem>
                                <SelectItem value="outlook">Outlook 365</SelectItem>
                                <SelectItem value="other">Other (IMAP/POP3)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="emailAddress" className="text-right">
                              Email
                            </Label>
                            <Input id="emailAddress" defaultValue="your.email@example.com" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="apiKey" className="text-right">
                              AI Service API Key
                            </Label>
                            <Input
                              id="apiKey"
                              type="password"
                              placeholder="Enter your AI service API key"
                              className="col-span-3"
                              value={emailApiKey}
                              onChange={(e) => setEmailApiKey(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleConnectEmail} disabled={isConnecting || emailApiKey.length === 0}>
                            {isConnecting ? "Connecting..." : "Simulate Connect"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {isFullyConnected && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">AI Service Status</h3>
                        <p className="text-sm text-muted-foreground">
                          {emailApiKey ? `Connected with API Key: ${emailApiKey.substring(0, 4)}...` : "Not configured"}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(emailApiKey ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800")}
                      >
                        {emailApiKey ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="grid gap-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Incoming Emails (Mock)
                      </h3>
                      <p className="text-sm text-muted-foreground">Simulated incoming emails for AI analysis.</p>
                      <Button onClick={handleRunAIAnalysis} className="w-fit">
                        <Zap className="h-4 w-4 mr-2" /> Run AI Analysis
                      </Button>
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Sender</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockEmails.map((email) => (
                              <TableRow key={email.id}>
                                <TableCell className="font-medium">{email.subject}</TableCell>
                                <TableCell>{email.sender}</TableCell>
                                <TableCell>{email.date}</TableCell>
                                <TableCell className="text-right">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentEmailContent(email.content)}
                                      >
                                        View Content
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                      <DialogHeader>
                                        <DialogTitle>{email.subject}</DialogTitle>
                                        <DialogDescription>
                                          From: {email.sender} | Date: {email.date}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="max-h-[400px] overflow-y-auto p-4 border rounded-md bg-muted/20 text-sm">
                                        <p className="whitespace-pre-wrap">{currentEmailContent}</p>
                                      </div>
                                      <DialogFooter>
                                        <Button onClick={() => setShowEmailContentDialog(false)}>Close</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid gap-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> Identified Valuation Jobs
                      </h3>
                      <p className="text-sm text-muted-foreground">Jobs extracted by the AI LLM from your emails.</p>
                      {identifiedJobs.length === 0 ? (
                        <div className="text-center py-4 text-muted-foreground">
                          No valuation jobs identified yet. Click "Run AI Analysis" above.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Address</TableHead>
                                <TableHead>Lender</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {identifiedJobs.map((job) => (
                                <TableRow key={job.id}>
                                  <TableCell className="font-medium">{job.address}</TableCell>
                                  <TableCell>{job.lender}</TableCell>
                                  <TableCell>{job.dueDate}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">{job.status}</Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm" onClick={() => handleCreateJob(job)}>
                                      Create Job
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <nav className="flex flex-col gap-2 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
            {settingsSections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "justify-between px-4 py-2 text-left",
                  activeSection === section.id && "bg-muted hover:bg-muted",
                )}
              >
                {section.title}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </nav>

          {/* Settings Content */}
          <div className="grid gap-6">{renderSection()}</div>
        </div>
        {/* This Dialog is specifically for viewing email content */}
        <Dialog open={showEmailContentDialog} onOpenChange={setShowEmailContentDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Email Content</DialogTitle>
              <DialogDescription>Full content of the selected email.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[400px] overflow-y-auto p-4 border rounded-md bg-muted/20 text-sm">
              <p className="whitespace-pre-wrap">{currentEmailContent}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowEmailContentDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
