"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Eye, Save, Trash2, Type, ImageIcon, Table, BarChart3, FileText } from "lucide-react"
import { MainNav } from "@/components/main-nav"

interface ReportSection {
  id: string
  title: string
  type: "text" | "data" | "image" | "table" | "chart"
  content: string
  dataFields: string[]
  styling: {
    fontSize: string
    fontWeight: string
    alignment: string
    margin: string
  }
}

interface DataField {
  id: string
  label: string
  type: string
  category: string
}

// Available data fields for binding
const availableDataFields: DataField[] = [
  // Property Information
  { id: "property_address", label: "Property Address", type: "text", category: "Property Information" },
  { id: "property_type", label: "Property Type", type: "text", category: "Property Information" },
  { id: "bedrooms", label: "Bedrooms", type: "number", category: "Property Information" },
  { id: "bathrooms", label: "Bathrooms", type: "number", category: "Property Information" },
  { id: "square_feet", label: "Square Feet", type: "number", category: "Property Information" },
  { id: "year_built", label: "Year Built", type: "number", category: "Property Information" },
  { id: "lot_size", label: "Lot Size", type: "text", category: "Property Information" },

  // Valuation Data
  { id: "estimated_value", label: "Estimated Value", type: "currency", category: "Valuation Data" },
  { id: "value_per_sqft", label: "Value per Sq Ft", type: "currency", category: "Valuation Data" },
  { id: "market_trend", label: "Market Trend", type: "text", category: "Valuation Data" },
  { id: "comparable_sales", label: "Comparable Sales", type: "table", category: "Valuation Data" },

  // Inspection Details
  { id: "inspection_date", label: "Inspection Date", type: "date", category: "Inspection Details" },
  { id: "inspector_name", label: "Inspector Name", type: "text", category: "Inspection Details" },
  { id: "property_condition", label: "Property Condition", type: "text", category: "Inspection Details" },
  { id: "repair_needs", label: "Repair Needs", type: "text", category: "Inspection Details" },

  // Photos
  { id: "exterior_photos", label: "Exterior Photos", type: "image", category: "Photos" },
  { id: "interior_photos", label: "Interior Photos", type: "image", category: "Photos" },
  { id: "kitchen_photos", label: "Kitchen Photos", type: "image", category: "Photos" },
  { id: "bathroom_photos", label: "Bathroom Photos", type: "image", category: "Photos" },
]

// Sample sections for the builder
const sampleReportSections: ReportSection[] = [
  {
    id: "header",
    title: "Report Title",
    type: "text",
    content: "REPORT FOR: {{property_address}}\nDate: {{inspection_date}}",
    dataFields: ["property_address", "inspection_date"],
    styling: { fontSize: "18px", fontWeight: "bold", alignment: "center", margin: "20px" },
  },
  {
    id: "intro",
    title: "Introduction",
    type: "text",
    content: "This report details the valuation of the property at {{property_address}}.",
    dataFields: ["property_address"],
    styling: { fontSize: "12px", fontWeight: "normal", alignment: "left", margin: "10px" },
  },
]

export default function ReportBuilderPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [sections, setSections] = useState<ReportSection[]>(sampleReportSections)
  const [isEditing, setIsEditing] = useState(true) // Start in editing mode
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [selectedSection, setSelectedSection] = useState<ReportSection | null>(null)
  const [reportTitle, setReportTitle] = useState(`Report ${id === "new" ? "New" : id}`)
  const [reportDescription, setReportDescription] = useState("A detailed property valuation report.")

  useEffect(() => {
    if (id !== "new") {
      // In a real app, you would fetch report data based on `id` here
      setReportTitle(`Editing Report ${id}`)
      setReportDescription(`Report details for ID: ${id}`)
      // setSections(fetchedSections)
    } else {
      setReportTitle("New Report")
      setReportDescription("A detailed property valuation report.")
      setSections(sampleReportSections) // Reset for new report
    }
  }, [id])

  const addSection = (type: ReportSection["type"]) => {
    const newSection: ReportSection = {
      id: Date.now().toString(),
      title: `New ${type} Section`,
      type,
      content: type === "text" ? "Enter your content here..." : "",
      dataFields: [],
      styling: {
        fontSize: "12px",
        fontWeight: "normal",
        alignment: "left",
        margin: "10px",
      },
    }
    setSections([...sections, newSection])
  }

  const updateSection = (sectionId: string, updates: Partial<ReportSection>) => {
    setSections(sections.map((section) => (section.id === sectionId ? { ...section, ...updates } : section)))
  }

  const deleteSection = (sectionId: string) => {
    setSections(sections.filter((section) => section.id !== sectionId))
    if (selectedSection?.id === sectionId) {
      setSelectedSection(null)
    }
  }

  const insertDataField = (fieldId: string) => {
    if (selectedSection) {
      const field = availableDataFields.find((f) => f.id === fieldId)
      if (field) {
        const updatedContent = selectedSection.content + ` {{${field.id}}}`
        const updatedDataFields = [...selectedSection.dataFields, field.id]
        updateSection(selectedSection.id, {
          content: updatedContent,
          dataFields: updatedDataFields,
        })
      }
    } else {
      alert("Please select a section first to insert a data field.")
    }
  }

  const saveReport = () => {
    // In a real application, this would save the report data to a backend
    alert(`Report ${id} saved successfully! (This is a mock-up)`)
    setIsEditing(false)
    setIsPreviewing(true)
  }

  const renderSectionPreview = (section: ReportSection) => {
    let content = section.content

    // Replace data field placeholders with sample data
    section.dataFields.forEach((fieldId) => {
      const sampleData: Record<string, string> = {
        property_address: "123 Oak Street, Beverly Hills, CA 90210",
        property_type: "Single Family",
        bedrooms: "4",
        bathrooms: "3.5",
        square_feet: "2,850",
        year_built: "1998",
        inspection_date: "June 13, 2025",
        inspector_name: "Jane Doe",
        estimated_value: "$1,500,000",
        property_condition: "Excellent",
      }

      content = content.replace(new RegExp(`{{${fieldId}}}`, "g"), sampleData[fieldId] || `[${fieldId}]`)
    })

    return (
      <div
        style={{
          fontSize: section.styling.fontSize,
          fontWeight: section.styling.fontWeight,
          textAlign: section.styling.alignment as any,
          margin: section.styling.margin,
          whiteSpace: "pre-line",
        }}
      >
        {content}
      </div>
    )
  }

  const groupedDataFields = availableDataFields.reduce(
    (acc, field) => {
      if (!acc[field.category]) {
        acc[field.category] = []
      }
      acc[field.category].push(field)
      return acc
    },
    {} as Record<string, DataField[]>,
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Builder Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">
              {isPreviewing ? "Preview Report" : `Report Builder: ${reportTitle}`}
            </h1>
            <p className="text-secondary-600">
              {isPreviewing ? "Review your report with sample data" : "Design and build your custom property reports"}
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setIsPreviewing(true)
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button onClick={saveReport} className="bg-primary-600 hover:bg-primary-700 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Save Report
                </Button>
              </>
            )}
            {isPreviewing && (
              <Button
                onClick={() => {
                  setIsEditing(true)
                  setIsPreviewing(false)
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Report
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel - Only show when editing */}
          {isEditing && (
            <div className="lg:col-span-1">
              <Tabs defaultValue="elements" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="elements">Elements</TabsTrigger>
                  <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>

                <TabsContent value="elements">
                  <Card className="border-neutral-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Add Elements</CardTitle>
                      <CardDescription>Add content blocks to your report</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("text")}>
                          <Type className="mr-2 h-4 w-4" />
                          Text Block
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("data")}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Data Field
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("image")}>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          Image
                        </Button>
                        <Button variant="outline" className="w-full justify-start" onClick={() => addSection("table")}>
                          <Table className="mr-2 h-4 w-4" />
                          Table
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="data">
                  <Card className="border-neutral-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Data Fields</CardTitle>
                      <CardDescription>Available data for binding</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[400px] overflow-y-auto">
                      <div className="space-y-4">
                        {Object.entries(groupedDataFields).map(([category, fields]) => (
                          <div key={category} className="space-y-2">
                            <h4 className="font-medium text-sm text-secondary-700 border-b border-neutral-200 pb-1">
                              {category}
                            </h4>
                            <div className="space-y-1">
                              {fields.map((field) => (
                                <Button
                                  key={field.id}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs h-auto p-2"
                                  onClick={() => insertDataField(field.id)}
                                >
                                  <div className="text-left">
                                    <div className="font-medium">{field.label}</div>
                                    <div className="text-xs text-secondary-500">{`{{${field.id}}}`}</div>
                                  </div>
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Report Canvas */}
          <div className={isEditing ? "lg:col-span-3" : "lg:col-span-4"}>
            <Card className="border-neutral-200">
              <CardHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportTitle">Report Title</Label>
                      <Input
                        id="reportTitle"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                        placeholder="Enter report title"
                        disabled={isPreviewing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reportDescription">Description</Label>
                      <Input
                        id="reportDescription"
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Enter report description"
                        disabled={isPreviewing}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {sections.length === 0 ? (
                  <div className="text-center py-12 text-secondary-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
                    <p>No sections added yet</p>
                    {isEditing && <p className="text-sm">Add elements from the panel to get started</p>}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sections.map((section, index) => (
                      <div
                        key={section.id}
                        className={`border rounded-lg p-4 ${
                          selectedSection?.id === section.id && isEditing
                            ? "border-primary-500 bg-primary-50"
                            : "border-neutral-200"
                        }`}
                        onClick={() => isEditing && setSelectedSection(section)}
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Input
                                value={section.title}
                                onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                className="font-medium"
                              />
                              <Button variant="ghost" size="sm" onClick={() => deleteSection(section.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              value={section.content}
                              onChange={(e) => updateSection(section.id, { content: e.target.value })}
                              placeholder="Enter content... Use {{field_name}} for dynamic data"
                              rows={4}
                            />
                            <div className="grid grid-cols-4 gap-2">
                              <Select
                                value={section.styling.fontSize}
                                onValueChange={(value) =>
                                  updateSection(section.id, {
                                    styling: { ...section.styling, fontSize: value },
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Font Size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10px">10px</SelectItem>
                                  <SelectItem value="12px">12px</SelectItem>
                                  <SelectItem value="14px">14px</SelectItem>
                                  <SelectItem value="16px">16px</SelectItem>
                                  <SelectItem value="18px">18px</SelectItem>
                                  <SelectItem value="20px">20px</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select
                                value={section.styling.fontWeight}
                                onValueChange={(value) =>
                                  updateSection(section.id, {
                                    styling: { ...section.styling, fontWeight: value },
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="normal">Normal</SelectItem>
                                  <SelectItem value="bold">Bold</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select
                                value={section.styling.alignment}
                                onValueChange={(value) =>
                                  updateSection(section.id, {
                                    styling: { ...section.styling, alignment: value },
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Align" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="left">Left</SelectItem>
                                  <SelectItem value="center">Center</SelectItem>
                                  <SelectItem value="right">Right</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                value={section.styling.margin}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    styling: { ...section.styling, margin: e.target.value },
                                  })
                                }
                                placeholder="Margin"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3 className="font-medium text-secondary-900 mb-2">{section.title}</h3>
                            {renderSectionPreview(section)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
