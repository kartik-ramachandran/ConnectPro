"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Calendar,
  DollarSign,
  MapPin,
  Search,
  FileText,
  BarChart3,
  Plus,
  User,
  Clock,
  XCircle,
  Users,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CreateJobForm } from "@/components/create-job-form"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock property data, aligning with job data structure for consistency
const mockProperties = [
  {
    id: "PROP-001",
    address: "123 Oak Street, Beverly Hills, CA 90210",
    propertyType: "Single Family",
    lender: "First National Bank",
    fee: "$450", // Using fee as value for search results
    dueDate: "2024-06-05",
    status: "Completed",
    priority: "High",
    distance: "5.2 miles",
    createdAt: "2024-05-29",
    teamMember: "Alice Johnson",
  },
  {
    id: "PROP-002",
    address: "456 Pine Avenue, Santa Monica, CA 90401",
    propertyType: "Condominium",
    lender: "Pacific Mortgage",
    fee: "$350",
    dueDate: "2024-06-08",
    status: "In Progress",
    priority: "Medium",
    distance: "8.7 miles",
    createdAt: "2024-05-28",
    teamMember: "Bob Smith",
  },
  {
    id: "PROP-003",
    address: "789 Maple Drive, Pasadena, CA 91101",
    propertyType: "Townhouse",
    lender: "Golden State Lending",
    fee: "$400",
    dueDate: "2024-06-03",
    status: "Assigned",
    priority: "High",
    distance: "12.3 miles",
    createdAt: "2024-05-27",
    teamMember: "Charlie Brown",
  },
  {
    id: "PROP-004",
    address: "321 Elm Street, Long Beach, CA 90802",
    propertyType: "Single Family",
    lender: "First National Bank",
    fee: "$425",
    dueDate: "2024-06-10",
    status: "Available",
    priority: "Low",
    distance: "15.8 miles",
    createdAt: "2024-05-26",
    teamMember: "Diana Prince",
  },
  {
    id: "PROP-005",
    address: "555 Willow Lane, Glendale, CA 91204",
    propertyType: "Multi-Family",
    lender: "Pacific Mortgage",
    fee: "$500",
    dueDate: "2024-06-02",
    status: "Completed",
    priority: "High",
    distance: "9.4 miles",
    createdAt: "2024-05-25",
    teamMember: "Eve Adams",
  },
  {
    id: "PROP-006",
    address: "888 Cedar Court, Burbank, CA 91502",
    propertyType: "Single Family",
    lender: "Golden State Lending",
    fee: "$375",
    dueDate: "2024-06-07",
    status: "In Progress",
    priority: "Medium",
    distance: "7.1 miles",
    createdAt: "2024-05-24",
    teamMember: "Frank White",
  },
  {
    id: "PROP-007",
    address: "101 Palm Street, San Diego, CA 92101",
    propertyType: "Condominium",
    lender: "Coastal Credit Union",
    fee: "$300",
    dueDate: "2024-06-15",
    status: "Available",
    priority: "Low",
    distance: "1.5 miles",
    createdAt: "2024-06-01",
    teamMember: "Grace Lee",
  },
  {
    id: "PROP-008",
    address: "202 Ocean Drive, Malibu, CA 90265",
    propertyType: "Luxury Estate",
    lender: "Elite Wealth Management",
    fee: "$1500",
    dueDate: "2024-06-20",
    status: "Pending Review",
    priority: "High",
    distance: "25.0 miles",
    createdAt: "2024-05-30",
    teamMember: "Harry Potter",
  },
]

export default function DashboardPage() {
  const [isCreateJobFormOpen, setIsCreateJobFormOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from local storage on component mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentPropertySearches")
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  // Save recent searches to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentPropertySearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query && !recentSearches.includes(query)) {
      setRecentSearches((prevSearches) => {
        const newSearches = [query, ...prevSearches.filter((s) => s !== query)].slice(0, 5) // Keep last 5 searches
        return newSearches
      })
    }
  }

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
  }

  const handleClearRecentSearch = (queryToRemove: string) => {
    setRecentSearches((prevSearches) => prevSearches.filter((s) => s !== queryToRemove))
  }

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return []
    const lowerCaseQuery = searchQuery.toLowerCase()
    return mockProperties.filter(
      (property) =>
        property.address.toLowerCase().includes(lowerCaseQuery) ||
        property.id.toLowerCase().includes(lowerCaseQuery) ||
        property.lender.toLowerCase().includes(lowerCaseQuery),
    )
  }, [searchQuery])

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
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-neutral-100 text-neutral-800"
    }
  }

  const stats = [
    {
      title: "Total Valuations",
      value: "1,247",
      change: "+12%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "from last month",
    },
    {
      title: "Valuations This Month",
      value: "89",
      change: "+23%",
      changeType: "positive" as const,
      icon: Calendar,
      description: "compared to previous month",
    },
    {
      title: "Avg. Property Value",
      value: "$485,000",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "year-over-year increase",
    },
    {
      title: "Active Markets",
      value: "12",
      change: "+2",
      changeType: "positive" as const,
      icon: MapPin,
      description: "new markets added",
    },
  ]

  const recentValuations = [
    {
      id: "1",
      address: "123 Oak Street, Beverly Hills, CA",
      value: "$1,250,000",
      status: "Completed",
      date: "2024-01-15",
      type: "Single Family",
      assignedTo: "Alice Johnson",
      avatar: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "2",
      address: "456 Pine Avenue, Santa Monica, CA",
      value: "$890,000",
      status: "In Progress",
      date: "2024-01-14",
      type: "Condominium",
      assignedTo: "Bob Williams",
      avatar: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "3",
      address: "789 Maple Drive, Pasadena, CA",
      value: "$675,000",
      status: "Completed",
      date: "2024-01-13",
      type: "Townhouse",
      assignedTo: "Charlie Brown",
      avatar: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "4",
      address: "321 Elm Street, Long Beach, CA",
      value: "$425,000",
      status: "Pending Review",
      date: "2024-01-12",
      type: "Single Family",
      assignedTo: "Diana Prince",
      avatar: "/placeholder.svg?height=24&width=24",
    },
    {
      id: "5",
      address: "987 Birch Lane, Malibu, CA",
      value: "$2,100,000",
      status: "Completed",
      date: "2024-01-11",
      type: "Luxury Villa",
      assignedTo: "Eve Adams",
      avatar: "/placeholder.svg?height=24&width=24",
    },
  ]

  const tasksOverview = [
    {
      title: "Pending Valuations",
      count: 3,
      total: 10,
      progress: 30,
      description: "Valuations awaiting your action.",
      link: "/dashboard/jobs/my-jobs",
    },
    {
      title: "New Market Reports",
      count: 2,
      total: 5,
      progress: 40,
      description: "Fresh insights available for review.",
      link: "/dashboard/analytics",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainNav />
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button
            className="bg-primary-600 hover:bg-primary-700 text-white"
            onClick={() => setIsCreateJobFormOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Valuation
          </Button>
        </div>

        {/* Welcome & Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold">Welcome back, Kotter!</CardTitle>
              <CardDescription className="text-primary-100 text-lg mt-2">
                Here's a quick overview of your valuation activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasksOverview.map((task, index) => (
                <div key={index} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                  <p className="text-primary-100 mb-2">{task.description}</p>
                  <Progress
                    value={task.progress}
                    className="h-2 bg-primary-500 [&::-webkit-progress-bar]:bg-white/20 [&::-webkit-progress-value]:bg-white"
                  />
                  <div className="flex justify-between text-sm text-primary-100 mt-1">
                    <span>
                      {task.count} of {task.total} completed
                    </span>
                    <Button variant="link" className="text-white hover:text-primary-100 p-0 h-auto" asChild>
                      <Link href={task.link}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">Jump into common tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex-col justify-center items-center border-gray-300 text-gray-700 shadow-sm hover:border-primary-600 hover:text-primary-600 hover:shadow-md transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/jobs/my-jobs">
                    <FileText className="h-7 w-7 mb-2" />
                    <span className="text-sm font-medium">Generate Report</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col justify-center items-center border-gray-300 text-gray-700 shadow-sm hover:border-primary-600 hover:text-primary-600 hover:shadow-md transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/analytics">
                    <BarChart3 className="h-7 w-7 mb-2" />
                    <span className="text-sm font-medium">Market Analysis</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex-col justify-center items-center border-gray-300 text-gray-700 shadow-sm hover:border-primary-600 hover:text-primary-600 hover:shadow-md transition-all duration-200"
                  asChild
                >
                  <Link href="/dashboard/team">
                    <Users className="h-7 w-7 mb-2" />
                    <span className="text-sm font-medium">Team Management</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <stat.icon className="h-5 w-5 text-primary-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500">
                  <span
                    className={`${stat.changeType === "positive" ? "text-green-600" : "text-red-600"} font-semibold`}
                  >
                    {stat.change}
                  </span>{" "}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Valuations / Property Search Section */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">
                {searchQuery ? "Property Search Results" : "Recent Valuations"}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {searchQuery ? `Properties matching "${searchQuery}"` : "Your latest property valuation requests"}
              </CardDescription>
            </div>
            {!searchQuery && (
              <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                View All Valuations
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {/* Search Input within this card */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search by address, property ID, or lender..."
                className="w-full pl-10 pr-4 py-2 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchQuery)
                  }
                }}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setSearchQuery("")}
                >
                  <XCircle className="h-5 w-5" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>

            {/* Recent Searches (conditional) */}
            {recentSearches.length > 0 && !searchQuery && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-secondary-900 mb-2">Recent Searches:</h4>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((query, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer flex items-center gap-1 pr-1"
                      onClick={() => handleRecentSearchClick(query)}
                    >
                      <Clock className="h-3 w-3" />
                      {query}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 rounded-full text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleClearRecentSearch(query)
                        }}
                      >
                        <XCircle className="h-3 w-3" />
                        <span className="sr-only">Remove search</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Conditional rendering for search results or recent valuations table */}
            {searchQuery ? (
              filteredProperties.length === 0 ? (
                <div className="text-center py-8 text-secondary-500">No properties found matching your search.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="rounded-tl-lg">Address</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead className="rounded-tr-lg text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProperties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                            <Link href={`/dashboard/jobs/${property.id}`} className="hover:text-primary-600">
                              {property.address}
                            </Link>
                          </TableCell>
                          <TableCell>{property.propertyType}</TableCell>
                          <TableCell className="font-semibold">{property.fee}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src="/placeholder.svg?height=24&width=24" alt={property.teamMember} />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <span>{property.teamMember}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className={getStatusBadgeClass(property.status)}>{property.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="rounded-tl-lg">Address</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead className="rounded-tr-lg text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentValuations.map((valuation) => (
                      <TableRow key={valuation.id}>
                        <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {valuation.address}
                        </TableCell>
                        <TableCell>{valuation.type}</TableCell>
                        <TableCell className="font-semibold">{valuation.value}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={valuation.avatar || "/placeholder.svg"} alt={valuation.assignedTo} />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span>{valuation.assignedTo}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={valuation.status === "Completed" ? "default" : "secondary"}
                            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                              valuation.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : valuation.status === "In Progress"
                                  ? "bg-primary-100 text-primary-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {valuation.status}
                          </Badge>
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
      <CreateJobForm
        isOpen={isCreateJobFormOpen}
        onClose={() => setIsCreateJobFormOpen(false)}
        onSave={() => {
          console.log("New valuation form closed from dashboard.")
        }}
      />
    </div>
  )
}
