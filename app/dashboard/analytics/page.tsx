"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  Download,
  Filter,
  DollarSign,
  Clock,
  Target,
  Award,
  Users,
  BriefcaseBusiness,
  Building,
  Scale,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [performanceMetric, setPerformanceMetric] = useState("revenue") // For chart customization
  const [jobTypeFilter, setJobTypeFilter] = useState("all") // For job type customization
  const [selectedClient, setSelectedClient] = useState("client-1") // For client data insights

  // Sample analytics data (extended for more mock data points)
  const performanceData = [
    { month: "Jan", revenue: 45000, jobs: 23, completion: 95, cost: 15000 },
    { month: "Feb", revenue: 52000, jobs: 28, completion: 92, cost: 17000 },
    { month: "Mar", revenue: 48000, jobs: 25, completion: 96, cost: 16000 },
    { month: "Apr", revenue: 61000, jobs: 32, completion: 94, cost: 20000 },
    { month: "May", revenue: 55000, jobs: 29, completion: 98, cost: 18000 },
    { month: "Jun", revenue: 67000, jobs: 35, completion: 93, cost: 22000 },
    { month: "Jul", revenue: 62000, jobs: 31, completion: 95, cost: 21000 },
    { month: "Aug", revenue: 70000, jobs: 38, completion: 91, cost: 23000 },
    { month: "Sep", revenue: 65000, jobs: 33, completion: 96, cost: 20500 },
    { month: "Oct", revenue: 72000, jobs: 40, completion: 94, cost: 24000 },
    { month: "Nov", revenue: 68000, jobs: 36, completion: 97, cost: 22000 },
    { month: "Dec", revenue: 75000, jobs: 42, completion: 95, cost: 25000 },
  ]

  const jobTypeData = [
    { name: "Inspections", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Valuations", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Market Analysis", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Consultations", value: 10, color: "hsl(var(--chart-4))" },
  ]

  const teamPerformanceData = [
    {
      id: 1,
      name: "John Doe",
      completed: 24,
      rating: 4.8,
      revenue: 18500,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Jane Smith",
      completed: 18,
      rating: 4.6,
      revenue: 14200,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Mike Johnson",
      completed: 15,
      rating: 4.7,
      revenue: 12800,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      completed: 8,
      rating: 4.3,
      revenue: 6400,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$328,000",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Last 30 days",
    },
    {
      title: "Jobs Completed",
      value: "154",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: BriefcaseBusiness,
      description: "Last 30 days",
    },
    {
      title: "Completion Rate",
      value: "94.8%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Target,
      description: "Average completion rate",
    },
    {
      title: "Avg. Response Time",
      value: "2.4 hrs",
      change: "-0.3 hrs",
      changeType: "positive" as const, // Negative change is positive for time
      icon: Clock,
      description: "Response to clients",
    },
    {
      title: "Client Satisfaction",
      value: "4.7/5",
      change: "+0.2",
      changeType: "positive" as const,
      icon: Award,
      description: "Average rating",
    },
    {
      title: "Active Team Members",
      value: "12",
      change: "0%",
      changeType: "neutral" as const,
      icon: Users,
      description: "Currently active",
    },
  ]

  // Mock Client Historical Data
  const mockClients = [
    {
      id: "client-1",
      name: "First National Bank",
      valuations: [
        { date: "2023-01-10", value: 500000, type: "Single Family", status: "Completed" },
        { date: "2023-02-15", value: 750000, type: "Multi-Family", status: "Completed" },
        { date: "2023-03-20", value: 400000, type: "Condominium", status: "Completed" },
        { date: "2023-04-05", value: 600000, type: "Single Family", status: "Completed" },
        { date: "2023-05-12", value: 900000, type: "Luxury Estate", status: "Completed" },
        { date: "2023-06-18", value: 480000, type: "Townhouse", status: "Completed" },
        { date: "2023-07-22", value: 550000, type: "Single Family", status: "Completed" },
        { date: "2023-08-01", value: 700000, type: "Multi-Family", status: "Completed" },
        { date: "2023-09-09", value: 420000, type: "Condominium", status: "Completed" },
        { date: "2023-10-14", value: 620000, type: "Single Family", status: "Completed" },
        { date: "2023-11-25", value: 880000, type: "Luxury Estate", status: "Completed" },
        { date: "2023-12-30", value: 510000, type: "Townhouse", status: "Completed" },
        { date: "2024-01-05", value: 530000, type: "Single Family", status: "Completed" },
        { date: "2024-02-10", value: 780000, type: "Multi-Family", status: "Completed" },
        { date: "2024-03-15", value: 410000, type: "Condominium", status: "Completed" },
        { date: "2024-04-20", value: 630000, type: "Single Family", status: "Completed" },
        { date: "2024-05-25", value: 920000, type: "Luxury Estate", status: "Completed" },
        { date: "2024-06-01", value: 490000, type: "Townhouse", status: "Completed" },
      ],
    },
    {
      id: "client-2",
      name: "Pacific Mortgage",
      valuations: [
        { date: "2023-03-01", value: 300000, type: "Condominium", status: "Completed" },
        { date: "2023-06-01", value: 450000, type: "Single Family", status: "Completed" },
        { date: "2023-09-01", value: 380000, type: "Townhouse", status: "Completed" },
        { date: "2023-12-01", value: 500000, type: "Multi-Family", status: "Completed" },
        { date: "2024-03-01", value: 320000, type: "Condominium", status: "Completed" },
        { date: "2024-06-05", value: 470000, type: "Single Family", status: "Completed" },
      ],
    },
    {
      id: "client-3",
      name: "Golden State Lending",
      valuations: [
        { date: "2023-01-20", value: 600000, type: "Single Family", status: "Completed" },
        { date: "2023-04-25", value: 700000, type: "Luxury Estate", status: "Completed" },
        { date: "2023-07-30", value: 550000, type: "Single Family", status: "Completed" },
        { date: "2023-10-05", value: 650000, type: "Multi-Family", status: "Completed" },
        { date: "2024-01-10", value: 580000, type: "Single Family", status: "Completed" },
        { date: "2024-04-15", value: 720000, type: "Luxury Estate", status: "Completed" },
      ],
    },
  ]

  const currentClientData = useMemo(() => {
    return mockClients.find((client) => client.id === selectedClient)
  }, [selectedClient])

  const clientKpis = useMemo(() => {
    if (!currentClientData) {
      return []
    }

    const totalValuations = currentClientData.valuations.length
    const totalRevenue = currentClientData.valuations.reduce((sum, val) => sum + val.value, 0)
    const averageValuationValue = totalValuations > 0 ? totalRevenue / totalValuations : 0

    const propertyTypeCounts = currentClientData.valuations.reduce(
      (acc, val) => {
        acc[val.type] = (acc[val.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    const mostCommonPropertyType = Object.entries(propertyTypeCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"

    return [
      {
        title: "Total Valuations",
        value: totalValuations.toLocaleString(),
        icon: BriefcaseBusiness,
        description: "for this client",
      },
      {
        title: "Total Revenue",
        value: `$${totalRevenue.toLocaleString()}`,
        icon: DollarSign,
        description: "from this client",
      },
      {
        title: "Avg. Valuation Value",
        value: `$${averageValuationValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        icon: Scale,
        description: "per valuation",
      },
      {
        title: "Most Common Type",
        value: mostCommonPropertyType,
        icon: Building,
        description: "for this client",
      },
    ]
  }, [currentClientData])

  const clientValuationsPerMonth = useMemo(() => {
    if (!currentClientData) return []

    const monthlyData: { [key: string]: number } = {}
    currentClientData.valuations.forEach((val) => {
      const month = new Date(val.date).toLocaleString("en-US", { year: "numeric", month: "short" })
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })

    // Sort by date for consistent chart display
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
      const dateA = new Date(a.replace(/(\w{3}) (\d{4})/, "1 $1 $2")) // Convert "Jan 2023" to "1 Jan 2023" for parsing
      const dateB = new Date(b.replace(/(\w{3}) (\d{4})/, "1 $1 $2"))
      return dateA.getTime() - dateB.getTime()
    })

    return sortedMonths.map((month) => ({
      month,
      valuations: monthlyData[month],
    }))
  }, [currentClientData])

  const exportData = () => {
    // Simulate data export
    const data = {
      dateRange,
      performance: performanceData,
      jobTypes: jobTypeData,
      teamPerformance: teamPerformanceData,
      kpis: kpiData,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${dateRange}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const performanceChartConfig = {
    revenue: {
      label: "Revenue ($)",
      color: "hsl(var(--chart-1))",
    },
    jobs: {
      label: "Jobs Completed",
      color: "hsl(var(--chart-2))",
    },
    cost: {
      label: "Operating Cost ($)",
      color: "hsl(var(--chart-3))",
    },
  } as const

  const jobTypeChartConfig = {
    inspections: {
      label: "Inspections",
      color: "hsl(var(--chart-1))",
    },
    valuations: {
      label: "Valuations",
      color: "hsl(var(--chart-2))",
    },
    analysis: {
      label: "Market Analysis",
      color: "hsl(var(--chart-3))",
    },
    consultations: {
      label: "Consultations",
      color: "hsl(var(--chart-4))",
    },
  } as const

  const teamMetricsChartConfig = {
    completed: {
      label: "Jobs Completed",
      color: "hsl(var(--chart-1))",
    },
    revenue: {
      label: "Revenue Generated",
      color: "hsl(var(--chart-2))",
    },
  } as const

  const clientValuationsChartConfig = {
    valuations: {
      label: "Valuations",
      color: "hsl(var(--chart-1))",
    },
  } as const

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <MainNav />
      <main className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-foreground">Analytics Overview</h1>
            <p className="text-muted-foreground text-sm">Gain insights into your platform's performance.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button onClick={exportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Key Metrics Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {kpiData.map((kpi, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                <kpi.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={`${kpi.changeType === "positive" ? "text-green-500" : kpi.changeType === "negative" ? "text-red-500" : "text-muted-foreground"} font-medium`}
                  >
                    {kpi.change}
                  </span>{" "}
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Performance Trends & Job Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Overall Performance</CardTitle>
                <CardDescription className="text-muted-foreground">Monthly trends in key metrics.</CardDescription>
              </div>
              <Select value={performanceMetric} onValueChange={setPerformanceMetric}>
                <SelectTrigger className="w-[160px] text-sm">
                  <SelectValue placeholder="Select Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="jobs">Jobs Completed</SelectItem>
                  <SelectItem value="completion">Completion Rate</SelectItem>
                  <SelectItem value="cost">Operating Cost</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <ChartContainer config={performanceChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                    <YAxis
                      yAxisId="left"
                      stroke={performanceChartConfig[performanceMetric]?.color}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                      className="text-xs"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey={performanceMetric}
                      stroke={performanceChartConfig[performanceMetric]?.color}
                      strokeWidth={2}
                      dot={false}
                      name={performanceChartConfig[performanceMetric]?.label}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Job Type Distribution */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Job Type Distribution</CardTitle>
                <CardDescription className="text-muted-foreground">Breakdown of job types completed.</CardDescription>
              </div>
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-[160px] text-sm">
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  <SelectItem value="current_month">Current Month</SelectItem>
                  <SelectItem value="last_month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <ChartContainer config={jobTypeChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={jobTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="name"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {jobTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend
                      align="right"
                      verticalAlign="middle"
                      layout="vertical"
                      iconType="circle"
                      wrapperStyle={{ paddingLeft: "20px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Client Data Insights Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Client Data Insights</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Analyze historical performance for specific clients.
                </CardDescription>
              </div>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-[200px] text-sm">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {currentClientData ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {clientKpis.map((kpi, index) => (
                      <Card key={index} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                          <kpi.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-xl font-bold text-foreground">{kpi.value}</div>
                          <p className="text-xs text-muted-foreground">{kpi.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Valuations per Month</h3>
                  <ChartContainer config={clientValuationsChartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={clientValuationsPerMonth}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                        <YAxis
                          stroke={clientValuationsChartConfig.valuations.color}
                          tickLine={false}
                          axisLine={false}
                          allowDecimals={false}
                          className="text-xs"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                          dataKey="valuations"
                          fill={clientValuationsChartConfig.valuations.color}
                          name="Valuations"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-6 text-right">
                    <Button onClick={() => console.log("Generating client report for:", selectedClient)}>
                      Generate Client Report
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-10">Please select a client to view insights.</div>
              )}
            </CardContent>
          </Card>

          {/* Team Performance Bar Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Team Performance Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Jobs completed and revenue generated by team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={teamMetricsChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} className="text-xs" />
                    <YAxis yAxisId="left" stroke={teamMetricsChartConfig.completed.color} className="text-xs" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke={teamMetricsChartConfig.revenue.color}
                      className="text-xs"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="completed"
                      fill={teamMetricsChartConfig.completed.color}
                      name="Jobs Completed"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="revenue"
                      fill={teamMetricsChartConfig.revenue.color}
                      name="Revenue ($)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Team Metrics Table */}
        <section className="grid grid-cols-1">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Detailed Team Metrics</CardTitle>
              <CardDescription className="text-muted-foreground">
                Comprehensive performance breakdown by team member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Team Member
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Jobs Completed
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Avg. Rating
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Revenue Generated
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                        Efficiency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {teamPerformanceData.map((member) => (
                      <tr key={member.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{member.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                          {member.completed}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="flex items-center gap-1">
                            <span className="text-foreground">{member.rating}</span>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(member.rating) ? "fill-current" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-muted-foreground">
                          ${member.revenue.toLocaleString()}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <Badge
                            className={`${
                              member.rating >= 4.7
                                ? "bg-green-100 text-green-800"
                                : member.rating >= 4.5
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.rating >= 4.7 ? "Excellent" : member.rating >= 4.5 ? "Good" : "Needs Improvement"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
