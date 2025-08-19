"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { DropdownMenuContent } from "@/components/ui/dropdown-menu"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DropdownMenu } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Eye, Save, Copy, Trash2, Type, ImageIcon, Table, BarChart3, FileText } from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav

interface ReportTemplate {
  id: string
  name: string
  description: string
  propertyTypes: string[]
  sections: ReportSection[]
  createdAt: string
  updatedAt: string
  isDefault: boolean
}

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

// Sample templates
const sampleTemplates: ReportTemplate[] = [
  {
    id: "1",
    name: "Standard Residential Report",
    description: "Comprehensive report for single family homes and condominiums",
    propertyTypes: ["Single Family", "Condominium"],
    sections: [
      {
        id: "header",
        title: "Property Valuation Report",
        type: "text",
        content:
          "PROPERTY VALUATION REPORT\n\nProperty Address: {{property_address}}\nInspection Date: {{inspection_date}}\nInspector: {{inspector_name}}",
        dataFields: ["property_address", "inspection_date", "inspector_name"],
        styling: { fontSize: "18px", fontWeight: "bold", alignment: "center", margin: "20px" },
      },
      {
        id: "summary",
        title: "Executive Summary",
        type: "text",
        content:
          "This report provides a comprehensive valuation analysis for the subject property located at {{property_address}}. The property is a {{property_type}} with {{bedrooms}} bedrooms and {{bathrooms}} bathrooms, totaling {{square_feet}} square feet.",
        dataFields: ["property_address", "property_type", "bedrooms", "bathrooms", "square_feet"],
        styling: { fontSize: "12px", fontWeight: "normal", alignment: "left", margin: "10px" },
      },
    ],
    createdAt: "2024-05-20",
    updatedAt: "2024-05-25",
    isDefault: true,
  },
  {
    id: "2",
    name: "Commercial Property Report",
    description: "Detailed report template for commercial properties",
    propertyTypes: ["Commercial"],
    sections: [
      {
        id: "header",
        title: "Commercial Property Analysis",
        type: "text",
        content:
          "COMMERCIAL PROPERTY VALUATION\n\nSubject Property: {{property_address}}\nAnalysis Date: {{inspection_date}}",
        dataFields: ["property_address", "inspection_date"],
        styling: { fontSize: "20px", fontWeight: "bold", alignment: "center", margin: "25px" },
      },
    ],
    createdAt: "2024-05-18",
    updatedAt: "2024-05-22",
    isDefault: false,
  },
]

export default function ReportTemplateBuilderPage() {
  const [templates, setTemplates] = useState<ReportTemplate[]>(sampleTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [selectedSection, setSelectedSection] = useState<ReportSection | null>(null)

  // Template editing state
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sections, setSections] = useState<ReportSection[]>([])

  const createNewTemplate = () => {
    setSelectedTemplate(null)
    setTemplateName("")
    setTemplateDescription("")
    setSelectedPropertyTypes([])
    setSections([])
    setIsEditing(true)
    setIsPreviewing(false)
  }

  const editTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setTemplateName(template.name)
    setTemplateDescription(template.description)
    setSelectedPropertyTypes(template.propertyTypes)
    setSections([...template.sections])
    setIsEditing(true)
    setIsPreviewing(false)
  }

  const previewTemplate = (template: ReportTemplate) => {
    setSelectedTemplate(template)
    setTemplateName(template.name)
    setTemplateDescription(template.description)
    setSelectedPropertyTypes(template.propertyTypes)
    setSections([...template.sections])
    setIsEditing(false)
    setIsPreviewing(true)
  }

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
    }
  }

  const saveTemplate = () => {
    const newTemplate: ReportTemplate = {
      id: selectedTemplate?.id || Date.now().toString(),
      name: templateName,
      description: templateDescription,
      propertyTypes: selectedPropertyTypes,
      sections,
      createdAt: selectedTemplate?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      isDefault: selectedTemplate?.isDefault || false,
    }

    if (selectedTemplate) {
      setTemplates(templates.map((t) => (t.id === selectedTemplate.id ? newTemplate : t)))
    } else {
      setTemplates([...templates, newTemplate])
    }

    alert("Template saved successfully!")
    setIsEditing(false)
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
        inspection_date: "May 29, 2024",
        inspector_name: "John Doe",
        estimated_value: "$1,250,000",
        property_condition: "Good",
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
      <MainNav /> {/* Use the new MainNav component */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Report Template Builder</h1>
          <Button onClick={createNewTemplate} className="bg-primary-600 hover:bg-primary-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>

        {!isEditing && !isPreviewing ? (
          /* Template List View */
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Report Templates</h2>
              <p className="text-secondary-600">
                Create and manage report templates with dynamic data binding and custom layouts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-neutral-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {template.name}
                          {template.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">{template.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" /> {/* Changed from ChevronDown to Edit */}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => editTemplate(template)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => previewTemplate(template)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-secondary-600">Property Types</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.propertyTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-secondary-600">
                          {template.sections.length} sections • Updated {template.updatedAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => previewTemplate(template)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                          onClick={() => editTemplate(template)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Template Builder/Preview View */
          <div className="space-y-6">
            {/* Builder Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">
                  {isPreviewing ? "Preview Template" : "Template Builder"}
                </h2>
                <p className="text-secondary-600">
                  {isPreviewing
                    ? "Preview how the report will appear with sample data"
                    : "Design your report template with dynamic data binding"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setIsPreviewing(false)
                  }}
                >
                  Back to Templates
                </Button>
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
                    <Button onClick={saveTemplate} className="bg-primary-600 hover:bg-primary-700 text-white">
                      <Save className="mr-2 h-4 w-4" />
                      Save Template
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
                    Edit Template
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
                          <CardDescription>Drag elements to build your report</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => addSection("text")}
                            >
                              <Type className="mr-2 h-4 w-4" />
                              Text Block
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => addSection("data")}
                            >
                              <BarChart3 className="mr-2 h-4 w-4" />
                              Data Field
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => addSection("image")}
                            >
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Image
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => addSection("table")}
                            >
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
                                      onClick={() => {
                                        if (selectedSection) {
                                          insertDataField(field.id)
                                        } else {
                                          alert("Please select a section first")
                                        }
                                      }}
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

              {/* Template Canvas */}
              <div className={isEditing ? "lg:col-span-3" : "lg:col-span-4"}>
                <Card className="border-neutral-200">
                  <CardHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="templateName">Template Name</Label>
                          <Input
                            id="templateName"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Enter template name"
                            disabled={isPreviewing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="templateDescription">Description</Label>
                          <Input
                            id="templateDescription"
                            value={templateDescription}
                            onChange={(e) => setTemplateDescription(e.target.value)}
                            placeholder="Enter template description"
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
                              selectedSection?.id === section.id
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
          </div>
        )}
      </main>
    </div>
  )
}
