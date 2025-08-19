"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useState, useEffect, useMemo } from "react" // Added useEffect, useMemo
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  Copy,
  FileText,
  AlertTriangle,
  ChevronRight,
  GripVertical,
  PlusCircle,
} from "lucide-react"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import Link from "next/link"

import {
  DndProvider,
  DraggableItem,
  SortableItem,
  DroppableArea,
  DragOverlayWrapper,
} from "@/components/ui/dnd-kit-components"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable" // Added SortableContext
import { type Active, type DragEndEvent, type UniqueIdentifier, rectIntersection } from "@dnd-kit/core" // Added rectIntersection
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Define the FormSection type
interface FormSection {
  id: string
  name: string
}

// Define the FormTemplate type
interface FormTemplate {
  id: string
  name: string
  lenderName: string
  propertyType: string
  fields: FormField[]
  createdAt: string
  updatedAt: string
  hasConflict: boolean
}

// Define the FormField type
interface FormField {
  id: string
  type: "text" | "number" | "textarea" | "select" | "checkbox" | "date" | "photo" | "location"
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  sectionId: string
  description?: string
  conditionalLogic?: {
    targetFieldId: string
    condition: "equals" | "not_equals" | "greater_than" | "less_than" | "is_checked" | "is_not_checked"
    value: string | number | boolean
    action: "show" | "hide"
  }[]
  validationRules?: {
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
  }
  customClassName?: string
  isNewlyMandated?: boolean
}

interface Report {
  id: string
  name: string
  lender: string
  propertyType: string
  lastModified: string
}

const mockReports: Report[] = [
  {
    id: "report-001",
    name: "Standard Residential Valuation",
    lender: "First National Bank",
    propertyType: "Single Family Home",
    lastModified: "2024-05-20",
  },
  {
    id: "report-002",
    name: "Commercial Property Appraisal",
    lender: "Global Capital Group",
    propertyType: "Commercial Building",
    lastModified: "2024-06-10",
  },
  {
    id: "report-003",
    name: "Multi-Family Income Analysis",
    lender: "Community Credit Union",
    propertyType: "Multi-Family Dwelling",
    lastModified: "2024-06-01",
  },
  {
    id: "report-004",
    name: "Luxury Estate Valuation",
    lender: "Elite Wealth Management",
    propertyType: "Luxury Estate",
    lastModified: "2024-05-15",
  },
]

// Update presetFields to use sectionId
const presetFields: FormField[] = [
  // Property Details Section
  {
    id: "bedrooms",
    type: "number",
    label: "Number of Bedrooms",
    placeholder: "Enter number of bedrooms",
    required: true,
    sectionId: "property_details",
    description: "Total number of bedrooms in the property",
  },
  {
    id: "bathrooms",
    type: "number",
    label: "Number of Bathrooms",
    placeholder: "Enter number of bathrooms (e.g., 2.5)",
    required: true,
    sectionId: "property_details",
    description: "Total number of bathrooms including half baths",
  },
  {
    id: "square_feet",
    type: "number",
    label: "Total Square Footage",
    placeholder: "Enter total square feet",
    required: true,
    sectionId: "property_details",
    description: "Total living area in square feet",
  },
  {
    id: "year_built",
    type: "number",
    label: "Year Built",
    placeholder: "Enter year property was built",
    required: true,
    sectionId: "property_details",
    description: "Year the property was originally constructed",
  },
  {
    id: "lot_size",
    type: "text",
    label: "Lot Size",
    placeholder: "Enter lot size (e.g., 0.25 acres, 7,500 sq ft)",
    required: false,
    sectionId: "property_details",
    description: "Size of the property lot",
  },
  {
    id: "property_condition",
    type: "select",
    label: "Overall Property Condition",
    required: true,
    options: ["Excellent", "Good", "Average", "Fair", "Poor"],
    sectionId: "property_details",
    description: "Overall condition assessment of the property",
  },
  {
    id: "occupancy_status",
    type: "select",
    label: "Occupancy Status",
    required: true,
    options: ["Owner Occupied", "Tenant Occupied", "Vacant"],
    sectionId: "property_details",
    description: "Current occupancy status of the property",
  },

  // Exterior Features Section
  {
    id: "exterior_material",
    type: "select",
    label: "Primary Exterior Material",
    required: true,
    options: ["Brick", "Stucco", "Wood Siding", "Vinyl Siding", "Stone", "Concrete Block", "Other"],
    sectionId: "exterior_features",
    description: "Primary material used for exterior walls",
  },
  {
    id: "roof_type",
    type: "select",
    label: "Roof Type",
    required: true,
    options: ["Asphalt Shingle", "Tile", "Metal", "Slate", "Wood Shake", "Other"],
    sectionId: "exterior_features",
    description: "Type of roofing material",
  },
  {
    id: "roof_condition",
    type: "select",
    label: "Roof Condition",
    required: true,
    options: ["Excellent", "Good", "Average", "Fair", "Poor"],
    sectionId: "exterior_features",
    description: "Current condition of the roof",
  },
  {
    id: "garage_type",
    type: "select",
    label: "Garage/Parking",
    required: false,
    options: [
      "None",
      "1-Car Attached",
      "2-Car Attached",
      "3-Car Attached",
      "1-Car Attached",
      "2-Car Detached",
      "Carport",
    ],
    sectionId: "exterior_features",
    description: "Type and size of garage or parking",
  },

  // Interior Features Section
  {
    id: "flooring_type",
    type: "select",
    label: "Primary Flooring Type",
    required: true,
    options: ["Hardwood", "Laminate", "Tile", "Carpet", "Vinyl", "Concrete", "Mixed"],
    sectionId: "interior_features",
    description: "Primary flooring material throughout the property",
  },
  {
    id: "kitchen_condition",
    type: "select",
    label: "Kitchen Condition",
    required: true,
    options: ["Excellent", "Good", "Average", "Fair", "Poor"],
    sectionId: "interior_features",
    description: "Overall condition of the kitchen",
  },
  {
    id: "bathroom_condition",
    type: "select",
    label: "Bathroom Condition",
    required: true,
    options: ["Excellent", "Good", "Average", "Fair", "Poor"],
    sectionId: "interior_features",
    description: "Overall condition of bathrooms",
  },

  // Systems & Utilities Section
  {
    id: "hvac_type",
    type: "select",
    label: "HVAC System Type",
    required: true,
    options: ["Central Air/Heat", "Window Units", "Heat Pump", "Radiant Heat", "None"],
    sectionId: "systems_utilities",
    description: "Type of heating and cooling system",
  },
  {
    id: "hvac_condition",
    type: "select",
    label: "HVAC System Condition",
    required: true,
    options: ["Excellent", "Good", "Average", "Fair", "Poor"],
    sectionId: "systems_utilities",
    description: "Current condition of HVAC system",
  },

  // Additional Features Section
  {
    id: "pool",
    type: "checkbox",
    label: "Swimming Pool",
    required: false,
    sectionId: "additional_features",
    description: "Property has a swimming pool",
  },
  {
    id: "fireplace",
    type: "checkbox",
    label: "Fireplace",
    required: false,
    sectionId: "additional_features",
    description: "Property has one or more fireplaces",
  },
  {
    id: "photo_upload",
    type: "photo",
    label: "Property Photo",
    required: true,
    sectionId: "photos",
    description: "Upload a photo of the property",
  },
  {
    id: "current_location",
    type: "location",
    label: "Current Location",
    required: false,
    sectionId: "location_details",
    description: "Capture the current location of the inspection",
  },

  // Notes Section
  {
    id: "repair_needs",
    type: "textarea",
    label: "Repair Needs & Issues",
    placeholder: "List any repairs or maintenance issues observed...",
    required: false,
    sectionId: "notes_observations",
    description: "Document any repairs or maintenance issues",
  },
  {
    id: "general_notes",
    type: "textarea",
    label: "General Observations",
    placeholder: "Additional observations about the property...",
    required: false,
    sectionId: "notes_observations",
    description: "General notes and observations about the property",
  },
]

const lenders = ["National Bank", "Local Credit Union", "Investment Group"]
const propertyTypes = ["Single Family", "Condominium", "Commercial"]

const defaultSections: FormSection[] = [
  { id: "property_details", name: "Property Details" },
  { id: "exterior_features", name: "Exterior Features" },
  { id: "interior_features", name: "Interior Features" },
  { id: "systems_utilities", name: "Systems & Utilities" },
  { id: "additional_features", name: "Additional Features" },
  { id: "photos", name: "Photos" },
  { id: "location_details", name: "Location Details" },
  { id: "notes_observations", name: "Notes & Observations" },
]

export default function FormBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<FormTemplate | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false)

  // Form builder state
  const [templateName, setTemplateName] = useState("")
  const [selectedLender, setSelectedLender] = useState("")
  const [selectedPropertyType, setSelectedPropertyType] = useState("")

  // New state for sections and fields grouped by section
  const [sections, setSections] = useState<FormSection[]>(defaultSections)
  const [fieldsBySection, setFieldsBySection] = useState<Record<string, FormField[]>>({})

  const [activeDragItem, setActiveDragItem] = useState<Active | null>(null)
  const [isEditingSectionName, setIsEditingSectionName] = useState<string | null>(null) // ID of section being edited

  // Generate 9 mock templates (3 lenders * 3 property types) with some conflicts
  const [templates, setTemplates] = useState<FormTemplate[]>(() => {
    const generatedTemplates: FormTemplate[] = []
    let idCounter = 1
    lenders.forEach((lender) => {
      propertyTypes.forEach((propType) => {
        // Explicitly set up a conflicted template with newly mandated fields for demonstration
        if (lender === "National Bank" && propType === "Single Family") {
          const conflictedFields = [
            presetFields.find((f) => f.id === "hvac_type")!,
            presetFields.find((f) => f.id === "roof_condition")!,
          ].map((f) => ({ ...f, id: `${f.id}_${Date.now()}_mandated`, isNewlyMandated: true }))

          generatedTemplates.push({
            id: String(idCounter++),
            name: `${lender} - ${propType} Form`,
            lenderName: lender,
            propertyType: propType,
            fields: [
              presetFields.find((f) => f.id === "bedrooms")!,
              presetFields.find((f) => f.id === "square_feet")!,
              presetFields.find((f) => f.id === "property_condition")!,
              ...conflictedFields, // Add the newly mandated fields
            ].map((f) => ({ ...f, sectionId: f.sectionId || defaultSections[0].id })), // Ensure sectionId is set
            createdAt: "2024-05-20",
            updatedAt: "2024-05-25",
            hasConflict: true, // Explicitly set conflict for this one
          })
        } else {
          // Existing logic for other templates, with random conflicts
          generatedTemplates.push({
            id: String(idCounter++),
            name: `${lender} - ${propType} Form`,
            lenderName: lender,
            propertyType: propType,
            fields: [
              presetFields.find((f) => f.id === "bedrooms")!,
              presetFields.find((f) => f.id === "square_feet")!,
              presetFields.find((f) => f.id === "property_condition")!,
            ].map((f) => ({ ...f, sectionId: f.sectionId || defaultSections[0].id })), // Ensure sectionId is set
            createdAt: "2024-05-20",
            updatedAt: "2024-05-25",
            hasConflict: Math.random() < 0.3, // Randomly assign conflicts to others
          })
        }
      })
    })
    return generatedTemplates
  })

  // Calculate total conflicts
  const totalConflicts = useMemo(() => {
    return templates.filter((template) => template.hasConflict).length
  }, [templates])

  // Helper to find a field across all sections
  const findField = (id: UniqueIdentifier) => {
    for (const sectionId in fieldsBySection) {
      const field = fieldsBySection[sectionId].find((f) => f.id === id)
      if (field) return { field, sectionId }
    }
    return null
  }

  // Helper to find a section
  const findSection = (id: UniqueIdentifier) => {
    return sections.find((s) => s.id === id)
  }

  // Initialize sections and fieldsBySection when selectedTemplate changes
  useEffect(() => {
    if (selectedTemplate) {
      const uniqueSectionIds = new Set(selectedTemplate.fields.map((f) => f.sectionId))
      const newSections: FormSection[] = []

      // Add default sections first, maintaining their order if they exist in the template
      defaultSections.forEach((ds) => {
        if (uniqueSectionIds.has(ds.id)) {
          newSections.push(ds)
          uniqueSectionIds.delete(ds.id) // Remove from set to track remaining custom sections
        }
      })

      // Add any remaining unique sections (custom ones from the template)
      uniqueSectionIds.forEach((id) => {
        // Check if it's truly a new custom section or just a default one not yet added
        if (!newSections.some((s) => s.id === id)) {
          newSections.push({ id, name: `Custom Section ${id.substring(0, 4)}` }) // Generate a name for custom sections
        }
      })
      setSections(newSections)

      const grouped: Record<string, FormField[]> = {}
      selectedTemplate.fields.forEach((field) => {
        if (!grouped[field.sectionId]) {
          grouped[field.sectionId] = []
        }
        grouped[field.sectionId].push(field)
      })
      setFieldsBySection(grouped)
    } else {
      // New template or no template selected
      setSections(defaultSections)
      setFieldsBySection({})
    }
  }, [selectedTemplate])

  const createNewTemplate = () => {
    setSelectedTemplate(null)
    setTemplateName("")
    setSelectedLender("")
    setSelectedPropertyType("")
    setSections(defaultSections) // Reset to default sections
    setFieldsBySection({}) // Clear all fields
    setIsEditing(true)
    setIsPreviewing(false)
  }

  const editTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template)
    setTemplateName(template.name)
    setSelectedLender(template.lenderName)
    setSelectedPropertyType(template.propertyType)

    // Initialize sections and fieldsBySection from template
    const uniqueSectionIds = new Set(template.fields.map((f) => f.sectionId))
    const newSections: FormSection[] = []
    defaultSections.forEach((ds) => {
      if (uniqueSectionIds.has(ds.id)) {
        newSections.push(ds)
        uniqueSectionIds.delete(ds.id)
      }
    })
    uniqueSectionIds.forEach((id) => {
      if (!newSections.some((s) => s.id === id)) {
        newSections.push({ id, name: `Custom Section ${id.substring(0, 4)}` })
      }
    })
    setSections(newSections)

    const grouped: Record<string, FormField[]> = {}
    template.fields.forEach((field) => {
      if (!grouped[field.sectionId]) {
        grouped[field.sectionId] = []
      }
      grouped[field.sectionId].push(field)
    })
    setFieldsBySection(grouped)

    setIsEditing(true)
    setIsPreviewing(false)
  }

  const previewTemplate = (template: FormTemplate) => {
    setSelectedTemplate(template)
    setTemplateName(template.name)
    setSelectedLender(template.lenderName)
    setSelectedPropertyType(template.propertyType)

    // Initialize sections and fieldsBySection from template for preview
    const uniqueSectionIds = new Set(template.fields.map((f) => f.sectionId))
    const newSections: FormSection[] = []
    defaultSections.forEach((ds) => {
      if (uniqueSectionIds.has(ds.id)) {
        newSections.push(ds)
        uniqueSectionIds.delete(ds.id)
      }
    })
    uniqueSectionIds.forEach((id) => {
      if (!newSections.some((s) => s.id === id)) {
        newSections.push({ id, name: `Custom Section ${id.substring(0, 4)}` })
      }
    })
    setSections(newSections)

    const grouped: Record<string, FormField[]> = {}
    template.fields.forEach((field) => {
      if (!grouped[field.sectionId]) {
        grouped[field.sectionId] = []
      }
      grouped[field.sectionId].push(field)
    })
    setFieldsBySection(grouped)

    setIsEditing(false)
    setIsPreviewing(true)
  }

  // Helper to update a field
  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFieldsBySection((prev) => {
      const newFieldsBySection = { ...prev }
      for (const sectionId in newFieldsBySection) {
        const fieldIndex = newFieldsBySection[sectionId].findIndex((f) => f.id === fieldId)
        if (fieldIndex !== -1) {
          const updatedField = { ...newFieldsBySection[sectionId][fieldIndex], ...updates }
          // If sectionId is changed, move the field
          if (updates.sectionId && updates.sectionId !== sectionId) {
            newFieldsBySection[sectionId] = newFieldsBySection[sectionId].filter((f) => f.id !== fieldId)
            if (!newFieldsBySection[updates.sectionId]) {
              newFieldsBySection[updates.sectionId] = []
            }
            newFieldsBySection[updates.sectionId].push(updatedField) // Add to end of new section
          } else {
            newFieldsBySection[sectionId][fieldIndex] = updatedField
          }
          return newFieldsBySection
        }
      }
      return prev
    })
  }

  // Helper to delete a field
  const deleteField = (fieldId: string) => {
    setFieldsBySection((prev) => {
      const newFieldsBySection = { ...prev }
      for (const sectionId in newFieldsBySection) {
        newFieldsBySection[sectionId] = newFieldsBySection[sectionId].filter((f) => f.id !== fieldId)
      }
      return newFieldsBySection
    })
  }

  const updateSectionName = (sectionId: string, newName: string) => {
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, name: newName } : s)))
  }

  const addSection = () => {
    const newSectionId = `custom_section_${Date.now()}`
    setSections((prev) => [...prev, { id: newSectionId, name: "New Custom Section" }])
    setFieldsBySection((prev) => ({ ...prev, [newSectionId]: [] })) // Initialize empty array for new section
  }

  const deleteSection = (sectionIdToDelete: string) => {
    if (sections.length === 1) {
      alert("Cannot delete the last section.")
      return
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section? All fields within it will be moved to the first available section.",
    )
    if (!confirmDelete) return

    setSections((prev) => prev.filter((s) => s.id !== sectionIdToDelete))

    setFieldsBySection((prev) => {
      const newFieldsBySection = { ...prev }
      const fieldsToMove = newFieldsBySection[sectionIdToDelete] || []
      delete newFieldsBySection[sectionIdToDelete]

      // Move fields to the first remaining section
      const firstRemainingSectionId = sections.find((s) => s.id !== sectionIdToDelete)?.id
      if (firstRemainingSectionId) {
        newFieldsBySection[firstRemainingSectionId] = [
          ...(newFieldsBySection[firstRemainingSectionId] || []),
          ...fieldsToMove.map((f) => ({ ...f, sectionId: firstRemainingSectionId })),
        ]
      } else {
        // Fallback, though should not be reached if sections.length > 1
        console.warn("No remaining section to move fields to after deleting a section.")
      }
      return newFieldsBySection
    })
  }

  const saveTemplate = () => {
    if (!templateName || !selectedLender || !selectedPropertyType) {
      alert("Please fill in Template Name, Lender, and Property Type.")
      return
    }

    // Flatten fieldsBySection back into a single array for saving
    const flattenedFields: FormField[] = sections.flatMap((section) => fieldsBySection[section.id] || [])

    const newTemplate: FormTemplate = {
      id: selectedTemplate?.id || String(Date.now()),
      name: templateName,
      lenderName: selectedLender,
      propertyType: selectedPropertyType,
      fields: flattenedFields,
      createdAt: selectedTemplate?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      hasConflict: false,
    }

    setTemplates((prevTemplates) => {
      if (selectedTemplate) {
        // Update existing
        return prevTemplates.map((t) => (t.id === newTemplate.id ? newTemplate : t))
      } else {
        // Add new
        return [...prevTemplates, newTemplate]
      }
    })

    alert("Template saved successfully!")
    setIsEditing(false)
    setSelectedTemplate(null) // Clear selected template after saving
  }

  const resolveConflict = (templateId: string) => {
    setTemplates((prevTemplates) => prevTemplates.map((t) => (t.id === templateId ? { ...t, hasConflict: false } : t)))
    alert("Conflict marked as resolved. Please review the template if necessary.")
  }

  const renderFieldPreview = (field: FormField) => {
    const baseProps = {
      placeholder: field.placeholder || `Enter ${field.label.toLowerCase()}...`,
      disabled: isPreviewing,
    }

    switch (field.type) {
      case "text":
        return <Input {...baseProps} />
      case "number":
        return <Input type="number" {...baseProps} />
      case "textarea":
        return <Textarea {...baseProps} rows={3} />
      case "select":
        return (
          <Select disabled={isPreviewing}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={field.id} disabled={isPreviewing} />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        )
      case "date":
        return <Input type="date" {...baseProps} />
      case "photo":
        return (
          <div className="flex items-center justify-center h-24 w-full border border-dashed rounded-md text-sm text-muted-foreground">
            {isPreviewing ? "Photo Input (Preview)" : "Click to upload photo"}
          </div>
        )
      case "location":
        return (
          <div className="flex items-center justify-center h-10 w-full border border-dashed rounded-md text-sm text-muted-foreground">
            {isPreviewing ? "Location Input (Preview)" : "Capture Location"}
          </div>
        )
      default:
        return <Input {...baseProps} />
    }
  }

  // DND Logic
  const onDragStart = (event: Active) => {
    setActiveDragItem(event)
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDragItem(null)

    if (!over) return

    const isPresetField = active.data?.current?.type === "presetField"
    const isSection = active.data?.current?.type === "section"
    const isFormField = active.data?.current?.type === "formField"

    // 1. Handle Preset Field Drag (from left panel to form canvas)
    if (isPresetField) {
      const presetField = active.data?.current?.field as FormField
      if (!presetField) return

      let targetSectionId: string | undefined = undefined

      // Case 1: Dropped directly on a SortableItem representing a section
      if (over.data?.current?.type === "section") {
        targetSectionId = over.id as string
      }
      // Case 2: Dropped on a SortableItem representing an existing form field
      else if (over.data?.current?.type === "formField") {
        const overFieldData = findField(over.id)
        targetSectionId = overFieldData?.sectionId
      }
      // Case 3: Dropped on a DroppableArea (main canvas or an empty section's droppable area)
      else if (over.data?.current?.type === "droppableArea") {
        // If it's the main canvas, default to the first section
        if (over.id === "form-canvas" && sections.length > 0) {
          targetSectionId = sections[0].id
        }
        // If it's a section's DroppableArea, use its ID
        else if (sections.some((s) => s.id === over.id)) {
          targetSectionId = over.id as string
        }
      }

      // Fallback: If no specific target was found but sections exist, default to the first section
      if (!targetSectionId && sections.length > 0) {
        targetSectionId = sections[0].id
      } else if (!targetSectionId) {
        console.error("No valid target section found for dropped preset field.")
        return
      }

      const newField: FormField = {
        ...presetField,
        id: `${presetField.id}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        isNewlyMandated: false,
        sectionId: targetSectionId,
      }

      setFieldsBySection((prev) => ({
        ...prev,
        [targetSectionId]: [...(prev[targetSectionId] || []), newField],
      }))
      return
    }

    // 2. Handle Section Drag (reordering sections)
    if (isSection) {
      const oldIndex = sections.findIndex((s) => s.id === active.id)
      const newIndex = sections.findIndex((s) => s.id === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        setSections((prev) => arrayMove(prev, oldIndex, newIndex))
      }
      return
    }

    // 3. Handle Form Field Drag (within or between sections)
    if (isFormField) {
      const activeFieldData = findField(active.id)
      if (!activeFieldData) return // Should not happen

      const { field: activeField, sectionId: activeSectionId } = activeFieldData

      const overFieldData = findField(over.id)
      const overSection = findSection(over.id)

      if (overFieldData) {
        // Dropped on another field
        const { field: overField, sectionId: overSectionId } = overFieldData

        if (activeSectionId === overSectionId) {
          // Reorder within same section
          setFieldsBySection((prev) => {
            const currentFields = [...(prev[activeSectionId] || [])]
            const oldIndex = currentFields.findIndex((f) => f.id === active.id)
            const newIndex = currentFields.findIndex((f) => f.id === over.id)
            const newFields = arrayMove(currentFields, oldIndex, newIndex)
            return { ...prev, [activeSectionId]: newFields }
          })
        } else {
          // Move between different sections
          setFieldsBySection((prev) => {
            const newPrev = { ...prev }
            // Remove from old section
            newPrev[activeSectionId] = newPrev[activeSectionId].filter((f) => f.id !== active.id)
            // Add to new section at the position of overField
            const targetFields = [...(newPrev[overSectionId] || [])]
            const overIndex = targetFields.findIndex((f) => f.id === over.id)
            targetFields.splice(overIndex, 0, { ...activeField, sectionId: overSectionId })
            newPrev[overSectionId] = targetFields
            return newPrev
          })
        }
      } else if (overSection) {
        // Dropped on a section container (e.g., empty section)
        const targetSectionId = overSection.id
        setFieldsBySection((prev) => {
          const newPrev = { ...prev }
          newPrev[activeSectionId] = newPrev[activeSectionId].filter((f) => f.id !== active.id)
          newPrev[targetSectionId] = [
            ...(newPrev[targetSectionId] || []),
            { ...activeField, sectionId: targetSectionId },
          ]
          return newPrev
        })
      }
      return
    }
  }

  const getActiveDragItemContent = () => {
    if (!activeDragItem) return null

    // Added safe navigation for activeDragItem.data
    if (activeDragItem.data?.current?.type === "presetField") {
      const field = activeDragItem.data.current.field as FormField
      return (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>{field.label}</span>
        </div>
      )
    }

    // Check if it's a section being dragged
    const section = findSection(activeDragItem.id)
    if (section) {
      return (
        <div className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <span>{section.name}</span>
        </div>
      )
    }

    // Otherwise, it's a form field
    const fieldData = findField(activeDragItem.id)
    if (fieldData) {
      return (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>{fieldData.field.label}</span>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Form Builder</h1>
          <Button onClick={createNewTemplate} className="bg-primary-600 hover:bg-primary-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>

        {totalConflicts > 0 && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md flex items-center gap-3"
            role="alert"
          >
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <div>
              <p className="font-bold">Conflict Alert!</p>
              <p>{totalConflicts} template(s) require your attention due to potential external changes.</p>
            </div>
          </div>
        )}

        {!isEditing && !isPreviewing ? (
          /* Template List View - Grouped by Lender */
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Form Templates by Lender</h2>
              <p className="text-secondary-600">
                Manage inspection form templates, organized by lender and property type.
              </p>
            </div>

            {lenders.map((lender) => (
              <Card key={lender} className="border-neutral-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold">{lender}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        createNewTemplate()
                        setSelectedLender(lender) // Pre-select lender when adding new form for this lender
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Form
                    </Button>
                  </div>
                  <CardDescription>Templates for various property types under {lender}.</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {propertyTypes.map((propType) => {
                      const template = templates.find((t) => t.lenderName === lender && t.propertyType === propType) // Use 'templates' directly
                      const hasConflict = template?.hasConflict || false
                      return (
                        <Card
                          key={`${lender}-${propType}`}
                          className={`border-neutral-200 ${hasConflict ? "border-yellow-500 ring-2 ring-yellow-200" : ""}`}
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {propType}
                                {hasConflict && (
                                  <Badge variant="destructive" className="bg-yellow-500 text-white">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Conflict
                                  </Badge>
                                )}
                              </CardTitle>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <GripVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {template ? (
                                    <>
                                      <DropdownMenuItem onClick={() => editTemplate(template)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => previewTemplate(template)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                      </DropdownMenuItem>
                                      {hasConflict && (
                                        <DropdownMenuItem
                                          onClick={() => resolveConflict(template.id)}
                                          className="text-yellow-600"
                                        >
                                          <AlertTriangle className="mr-2 h-4 w-4" />
                                          Resolve Conflict
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuItem>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Duplicate
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete
                                      </DropdownMenuItem>
                                    </>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        createNewTemplate()
                                        setSelectedLender(lender)
                                        setSelectedPropertyType(propType)
                                      }}
                                    >
                                      <Plus className="mr-2 h-4 w-4" />
                                      Create New
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <CardDescription>
                              {template ? (
                                <>
                                  {template.fields.length} fields • Updated {template.updatedAt}
                                </>
                              ) : (
                                <span className="text-red-500">No template created yet.</span>
                              )}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-2">
                              {template ? (
                                <>
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
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white"
                                  onClick={() => {
                                    createNewTemplate()
                                    setSelectedLender(lender)
                                    setSelectedPropertyType(propType)
                                  }}
                                >
                                  <Plus className="mr-2 h-4 w-4" />
                                  Create Form
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Form Builder/Preview View */
          <div className="space-y-6 flex-1 flex flex-col">
            {/* Builder Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-secondary-900">
                  {isPreviewing ? "Preview Template" : "Form Builder"}
                </h2>
                <p className="text-secondary-600">
                  {isPreviewing
                    ? "Preview how the form will appear to users"
                    : "Design your inspection form template using standardized fields"}
                </p>
                <div className="flex items-center gap-2 text-sm text-secondary-700 mt-1">
                  <span>Lender: {selectedLender}</span>
                  <span>•</span>
                  <span>Property Type: {selectedPropertyType}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setIsPreviewing(false)
                    setSelectedTemplate(null) // Clear selected template
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

            <ResizablePanelGroup direction="horizontal" className="flex-1 rounded-lg border">
              {/* Field Library - Only show when editing */}
              {isEditing && (
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="hidden lg:block">
                  <Card className="h-full border-none rounded-none">
                    <CardHeader>
                      <CardTitle className="text-lg">Standardized Fields</CardTitle>
                      <CardDescription>Drag and drop fields to your template</CardDescription>
                    </CardHeader>
                    <CardContent className="max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                      <div className="space-y-4">
                        {Object.entries(
                          presetFields.reduce(
                            (acc, field) => {
                              const sectionName = defaultSections.find((s) => s.id === field.sectionId)?.name || "Other"
                              if (!acc[sectionName]) {
                                acc[sectionName] = []
                              }
                              acc[sectionName].push(field)
                              return acc
                            },
                            {} as Record<string, FormField[]>,
                          ),
                        ).map(([sectionName, fields]) => (
                          <div key={sectionName} className="space-y-2">
                            <h4 className="font-medium text-sm text-secondary-700 border-b border-neutral-200 pb-1 flex items-center justify-between">
                              {sectionName} <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </h4>
                            <div className="space-y-1">
                              {fields.map((field) => (
                                <DraggableItem key={field.id} id={field.id} data={{ field, type: "presetField" }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start text-xs h-auto p-2 cursor-grab"
                                  >
                                    <div className="text-left flex-1">
                                      <div className="font-medium">{field.label}</div>
                                      {field.required && (
                                        <Badge variant="outline" className="text-xs mt-1">
                                          Required
                                        </Badge>
                                      )}
                                    </div>
                                  </Button>
                                </DraggableItem>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ResizablePanel>
              )}

              {isEditing && <ResizableHandle withHandle />}

              {/* Form Canvas */}
              <ResizablePanel defaultSize={isEditing ? 75 : 100}>
                <Card className="h-full border-none rounded-none">
                  <CardHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          <Label htmlFor="lender">Lender</Label>
                          <Select
                            value={selectedLender}
                            onValueChange={setSelectedLender}
                            disabled={isPreviewing || (selectedTemplate !== null && selectedLender !== "")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select lender" />
                            </SelectTrigger>
                            <SelectContent>
                              {lenders.map((lender) => (
                                <SelectItem key={lender} value={lender}>
                                  {lender}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="propertyType">Property Type</Label>
                          <Select
                            value={selectedPropertyType}
                            onValueChange={setSelectedPropertyType}
                            disabled={isPreviewing || (selectedTemplate !== null && selectedPropertyType !== "")}
                          >
                            <SelectTrigger>
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
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[calc(100vh-250px)] overflow-y-auto">
                    <DndProvider
                      onDragEnd={onDragEnd}
                      onDragStart={onDragStart}
                      items={sections.map((s) => s.id)} // Top-level sortable items are sections
                      collisionDetection={rectIntersection} // Use rectIntersection for multi-container
                    >
                      <DroppableArea id="form-canvas" className="p-4 bg-neutral-50 rounded-md">
                        {sections.length === 0 && Object.keys(fieldsBySection).length === 0 ? (
                          <div className="text-center py-12 text-secondary-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
                            <p>No sections or fields added yet</p>
                            {isEditing && (
                              <p className="text-sm">
                                Drag and drop standardized fields from the left or add a new section to get started
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-6">
                            {sections.map((section) => (
                              <SortableItem
                                key={section.id}
                                id={section.id}
                                data={{ type: "section" }}
                                className="!p-0 !shadow-none !border-none !bg-transparent"
                              >
                                <div className="flex-1 space-y-4">
                                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                                    {isEditing && isEditingSectionName === section.id ? (
                                      <Input
                                        value={section.name}
                                        onChange={(e) => updateSectionName(section.id, e.target.value)}
                                        onBlur={() => setIsEditingSectionName(null)}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            setIsEditingSectionName(null)
                                          }
                                        }}
                                        className="text-lg font-semibold text-secondary-900 flex-1"
                                      />
                                    ) : (
                                      <h3 className="text-lg font-semibold text-secondary-900 flex-1">
                                        {section.name}
                                      </h3>
                                    )}
                                    {isEditing && (
                                      <div className="flex items-center gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setIsEditingSectionName(section.id)}
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => deleteSection(section.id)}
                                          disabled={sections.length === 1}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  <SortableContext
                                    items={fieldsBySection[section.id]?.map((f) => f.id) || []}
                                    strategy={verticalListSortingStrategy}
                                  >
                                    <DroppableArea id={section.id} className="min-h-[50px] p-2">
                                      {" "}
                                      {/* Each section is a droppable area for fields */}
                                      {(fieldsBySection[section.id] || []).length === 0 && isEditing ? (
                                        <div className="text-center py-4 text-secondary-400 text-sm">
                                          Drag fields here or from the left panel
                                        </div>
                                      ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                          {(fieldsBySection[section.id] || []).map((field) => (
                                            <SortableItem
                                              key={field.id}
                                              id={field.id}
                                              data={{ type: "formField", field }}
                                              className={field.customClassName}
                                            >
                                              <div
                                                className={cn(
                                                  "flex-1 space-y-2 relative",
                                                  field.isNewlyMandated &&
                                                    "border-2 border-blue-500 shadow-md bg-blue-50 rounded-md p-4 -m-2",
                                                )}
                                              >
                                                <div className="flex items-center justify-between">
                                                  <Label className="flex items-center gap-2">
                                                    {field.label}
                                                    {field.required && <span className="text-red-500">*</span>}
                                                  </Label>
                                                  {isEditing && (
                                                    <div className="flex items-center gap-1">
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => {
                                                          setSelectedField(field)
                                                          setIsFieldDialogOpen(true)
                                                        }}
                                                      >
                                                        <Edit className="h-3 w-3" />
                                                      </Button>
                                                      <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteField(field.id)}
                                                      >
                                                        <Trash2 className="h-3 w-3" />
                                                      </Button>
                                                    </div>
                                                  )}
                                                </div>
                                                {renderFieldPreview(field)}
                                                {field.description && (
                                                  <p className="text-xs text-secondary-500">{field.description}</p>
                                                )}
                                                {field.conditionalLogic && field.conditionalLogic.length > 0 && (
                                                  <Badge variant="secondary" className="text-xs mt-1">
                                                    Conditional
                                                  </Badge>
                                                )}
                                                {field.validationRules &&
                                                  Object.keys(field.validationRules).length > 0 && (
                                                    <Badge variant="secondary" className="text-xs mt-1">
                                                      Validated
                                                    </Badge>
                                                  )}
                                              </div>
                                            </SortableItem>
                                          ))}
                                        </div>
                                      )}
                                    </DroppableArea>
                                  </SortableContext>
                                </div>
                              </SortableItem>
                            ))}
                            {isEditing && (
                              <Button variant="outline" className="w-full mt-4" onClick={addSection}>
                                <Plus className="mr-2 h-4 w-4" /> Add New Section
                              </Button>
                            )}
                          </div>
                        )}
                      </DroppableArea>
                      <DragOverlayWrapper active={activeDragItem}>{getActiveDragItemContent()}</DragOverlayWrapper>
                    </DndProvider>
                  </CardContent>
                </Card>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}

        {/* Reports List Section - Added from app/dashboard/reports/page.tsx */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-neutral-200">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Report Templates</h1>
            <p className="text-secondary-600">Manage and create your custom report templates.</p>
          </div>
          <Link href="/dashboard/reports/new/edit">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Report
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockReports.length === 0 ? (
            <div className="col-span-full text-center py-12 text-secondary-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-neutral-400" />
              <p>No reports found. Create your first report template!</p>
            </div>
          ) : (
            mockReports.map((report) => (
              <Card key={report.id} className="flex flex-col justify-between border-neutral-200">
                <CardHeader>
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <CardDescription>
                    <span className="font-medium">Lender:</span> {report.lender}
                    <br />
                    <span className="font-medium">Property Type:</span> {report.propertyType}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <div className="text-sm text-secondary-500">Last Modified: {report.lastModified}</div>
                  <Link href={`/dashboard/reports/${report.id}/edit`}>
                    <Button variant="outline" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Report
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
      {/* Field Configuration Dialog */}
      <Dialog open={isFieldDialogOpen} onOpenChange={setIsFieldDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configure Field: {selectedField?.label}</DialogTitle>
            <DialogDescription>Customize the properties for this standardized field</DialogDescription>
          </DialogHeader>
          {selectedField && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fieldLabel">Field Label</Label>
                <Input
                  id="fieldLabel"
                  value={selectedField.label}
                  onChange={(e) => updateField(selectedField.id, { label: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldPlaceholder">Placeholder Text</Label>
                <Input
                  id="fieldPlaceholder"
                  value={selectedField.placeholder || ""}
                  onChange={(e) => updateField(selectedField.id, { placeholder: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldSection">Section</Label>
                <Select
                  value={selectedField.sectionId} // Use sectionId
                  onValueChange={(value) => updateField(selectedField.id, { sectionId: value })} // Update sectionId
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map(
                      (
                        section, // Use sections state for options
                      ) => (
                        <SelectItem key={section.id} value={section.id}>
                          {section.name}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>

              {selectedField.type === "select" && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {selectedField.options?.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(selectedField.options || [])]
                            newOptions[index] = e.target.value
                            updateField(selectedField.id, { options: newOptions })
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = selectedField.options?.filter((_, i) => i !== index)
                            updateField(selectedField.id, { options: newOptions })
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [
                          ...(selectedField.options || []),
                          `Option ${(selectedField.options?.length || 0) + 1}`,
                        ]
                        updateField(selectedField.id, { options: newOptions })
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={selectedField.required}
                  onCheckedChange={(checked) => updateField(selectedField.id, { required: checked })}
                />
                <Label htmlFor="required">Required Field</Label>
              </div>

              <Accordion type="multiple" className="w-full">
                <AccordionItem value="validation">
                  <AccordionTrigger>Validation Rules</AccordionTrigger>
                  <AccordionContent className="space-y-3 p-2">
                    {selectedField.type === "text" || selectedField.type === "textarea" ? (
                      <>
                        <div className="space-y-1">
                          <Label htmlFor="minLength">Min Length</Label>
                          <Input
                            id="minLength"
                            type="number"
                            value={selectedField.validationRules?.minLength || ""}
                            onChange={(e) =>
                              updateField(selectedField.id, {
                                validationRules: {
                                  ...selectedField.validationRules,
                                  minLength: Number.parseInt(e.target.value) || undefined,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="maxLength">Max Length</Label>
                          <Input
                            id="maxLength"
                            type="number"
                            value={selectedField.validationRules?.maxLength || ""}
                            onChange={(e) =>
                              updateField(selectedField.id, {
                                validationRules: {
                                  ...selectedField.validationRules,
                                  maxLength: Number.parseInt(e.target.value) || undefined,
                                },
                              })
                            }
                          />
                        </div>
                      </>
                    ) : null}

                    {selectedField.type === "number" ? (
                      <>
                        <div className="space-y-1">
                          <Label htmlFor="min">Min Value</Label>
                          <Input
                            id="min"
                            type="number"
                            value={selectedField.validationRules?.min || ""}
                            onChange={(e) =>
                              updateField(selectedField.id, {
                                validationRules: {
                                  ...selectedField.validationRules,
                                  min: Number.parseFloat(e.target.value) || undefined,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="max">Max Value</Label>
                          <Input
                            id="max"
                            type="number"
                            value={selectedField.validationRules?.max || ""}
                            onChange={(e) =>
                              updateField(selectedField.id, {
                                validationRules: {
                                  ...selectedField.validationRules,
                                  max: Number.parseFloat(e.target.value) || undefined,
                                },
                              })
                            }
                          />
                        </div>
                      </>
                    ) : null}

                    <div className="space-y-1">
                      <Label htmlFor="pattern">Regex Pattern (Advanced)</Label>
                      <Input
                        id="pattern"
                        value={selectedField.validationRules?.pattern || ""}
                        placeholder="e.g., ^[A-Za-z]+$"
                        onChange={(e) =>
                          updateField(selectedField.id, {
                            validationRules: {
                              ...selectedField.validationRules,
                              pattern: e.target.value || undefined,
                            },
                          })
                        }
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="conditional-logic">
                  <AccordionTrigger>Conditional Logic</AccordionTrigger>
                  <AccordionContent className="space-y-3 p-2">
                    {selectedField.conditionalLogic?.map((logic, index) => (
                      <Card key={index} className="p-3 border-neutral-200">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedLogic = selectedField.conditionalLogic?.filter((_, i) => i !== index)
                              updateField(selectedField.id, { conditionalLogic: updatedLogic })
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Label>Show/Hide based on:</Label>
                          <Select
                            value={logic.targetFieldId}
                            onValueChange={(val) => {
                              const updatedLogic = [...(selectedField.conditionalLogic || [])]
                              updatedLogic[index] = { ...logic, targetFieldId: val }
                              updateField(selectedField.id, { conditionalLogic: updatedLogic })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select target field" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(fieldsBySection)
                                .flat() // Get all fields
                                .filter((f) => f.id !== selectedField.id)
                                .map((field) => (
                                  <SelectItem key={field.id} value={field.id}>
                                    {field.label}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>

                          <Select
                            value={logic.condition}
                            onValueChange={(val) => {
                              const updatedLogic = [...(selectedField.conditionalLogic || [])]
                              updatedLogic[index] = { ...logic, condition: val as any }
                              updateField(selectedField.id, { conditionalLogic: updatedLogic })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">Equals</SelectItem>
                              <SelectItem value="not_equals">Not Equals</SelectItem>
                              {["text", "number"].includes(
                                Object.values(fieldsBySection)
                                  .flat()
                                  .find((f) => f.id === logic.targetFieldId)?.type || "",
                              ) && (
                                <>
                                  <SelectItem value="greater_than">Greater Than</SelectItem>
                                  <SelectItem value="less_than">Less Than</SelectItem>
                                </>
                              )}
                              {Object.values(fieldsBySection)
                                .flat()
                                .find((f) => f.id === logic.targetFieldId)?.type === "checkbox" && (
                                <>
                                  <SelectItem value="is_checked">Is Checked</SelectItem>
                                  <SelectItem value="is_not_checked">Is Not Checked</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>

                          {!["is_checked", "is_not_checked"].includes(logic.condition) && (
                            <Input
                              value={logic.value as string}
                              placeholder="Value"
                              onChange={(e) => {
                                const updatedLogic = [...(selectedField.conditionalLogic || [])]
                                updatedLogic[index] = { ...logic, value: e.target.value }
                                updateField(selectedField.id, { conditionalLogic: updatedLogic })
                              }}
                            />
                          )}

                          <Select
                            value={logic.action}
                            onValueChange={(val) => {
                              const updatedLogic = [...(selectedField.conditionalLogic || [])]
                              updatedLogic[index] = { ...logic, action: val as any }
                              updateField(selectedField.id, { conditionalLogic: updatedLogic })
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="show">Show</SelectItem>
                              <SelectItem value="hide">Hide</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateField(selectedField.id, {
                          conditionalLogic: [
                            ...(selectedField.conditionalLogic || []),
                            { targetFieldId: "", condition: "equals", value: "", action: "show" },
                          ],
                        })
                      }
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Rule
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="styling-options">
                  <AccordionTrigger>Styling Options</AccordionTrigger>
                  <AccordionContent className="space-y-3 p-2">
                    <div className="space-y-1">
                      <Label htmlFor="customClassName">Custom CSS Classes</Label>
                      <Input
                        id="customClassName"
                        value={selectedField.customClassName || ""}
                        placeholder="e.g., col-span-2 text-lg"
                        onChange={(e) =>
                          updateField(selectedField.id, { customClassName: e.target.value || undefined })
                        }
                      />
                      <p className="text-xs text-muted-foreground">Apply custom Tailwind CSS classes.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFieldDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsFieldDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
