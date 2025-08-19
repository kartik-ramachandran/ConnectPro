"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Camera,
  MapPin,
  Save,
  Upload,
  CheckCircle,
  X,
  Building2,
  Home,
  Settings,
  FileText,
} from "lucide-react"
import { MainNav } from "@/components/main-nav" // Import the new MainNav
import { SpeechToTextInput } from "@/components/speech-to-text-input" // Import the new component

export default function InspectionFormPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Property Details
    propertyType: "Single Family",
    bedrooms: "",
    bathrooms: "",
    squareFeet: "",
    yearBuilt: "",
    lotSize: "",
    condition: "",
    occupancy: "",

    // Exterior
    exteriorMaterial: "",
    roofType: "",
    roofCondition: "",
    foundationType: "",
    foundationCondition: "",

    // Interior
    flooringType: "",
    kitchenCondition: "",
    bathroomCondition: "",
    hvacType: "",
    hvacCondition: "",

    // Additional Features
    garage: "",
    pool: false,
    fireplace: false,
    deck: false,
    fence: false,

    // Notes
    generalNotes: "",
    repairNeeds: "",
    marketComparisons: "",
  })

  const [photos, setPhotos] = useState<
    Array<{
      id: string
      file: File
      category: string
      caption: string
      location?: { lat: number; lng: number }
    }>
  >([])

  const [completedSections, setCompletedSections] = useState<string[]>([])

  // Calculate progress
  const totalSections = 5
  const progress = (completedSections.length / totalSections) * 100

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoadingLocation(false)
        },
      )
    } else {
      setIsLoadingLocation(false)
    }
  }

  const handlePhotoUpload = (category: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("data-category", category)
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const category = event.target.getAttribute("data-category") || "general"

    if (files) {
      Array.from(files).forEach((file) => {
        const newPhoto = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          file,
          category,
          caption: "",
          location: currentLocation || undefined,
        }
        setPhotos((prev) => [...prev, newPhoto])
      })
    }
  }

  const removePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
  }

  const updatePhotoCaption = (photoId: string, caption: string) => {
    setPhotos((prev) => prev.map((photo) => (photo.id === photoId ? { ...photo, caption } : photo)))
  }

  const saveDraft = () => {
    // Save form data to localStorage or send to server
    localStorage.setItem(
      `inspection-draft-${params.id}`,
      JSON.stringify({
        formData,
        photos: photos.map((p) => ({ ...p, file: null })), // Don't store file objects
        completedSections,
        lastSaved: new Date().toISOString(),
      }),
    )
    alert("Draft saved successfully!")
  }

  const submitForm = () => {
    // Validate form and submit
    if (completedSections.length < totalSections) {
      alert("Please complete all required sections before submitting.")
      return
    }

    // Submit form logic here
    alert("Inspection form submitted successfully!")
    router.push("/dashboard/jobs/my-jobs")
  }

  const photoCategories = [
    "Front Exterior",
    "Rear Exterior",
    "Side Exteriors",
    "Living Areas",
    "Kitchen",
    "Bathrooms",
    "Bedrooms",
    "Garage/Parking",
    "Additional Features",
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav /> {/* Use the new MainNav component */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => router.push(`/dashboard/jobs/${params.id}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Job</span>
            </Button>
            <span className="text-neutral-300">|</span>
            <h1 className="text-lg font-semibold md:text-2xl">Property Inspection</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-secondary-900">123 Oak Street, Beverly Hills, CA 90210</h2>
            <Badge className="bg-primary-100 text-primary-800">JOB-{params.id}</Badge>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-secondary-600">Progress: {Math.round(progress)}%</span>
            <Progress value={progress} className="flex-1 max-w-md" />
            <Button variant="outline" size="sm" onClick={getCurrentLocation} disabled={isLoadingLocation}>
              <MapPin className="mr-2 h-4 w-4" />
              {isLoadingLocation ? "Getting Location..." : "Get GPS Location"}
            </Button>
          </div>
          {currentLocation && (
            <div className="text-xs text-secondary-500">
              Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
            </div>
          )}
        </div>

        {/* Form Tabs */}
        <Tabs defaultValue="property" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="property" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Property
            </TabsTrigger>
            <TabsTrigger value="exterior" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Exterior
            </TabsTrigger>
            <TabsTrigger value="interior" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Interior
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </TabsTrigger>
          </TabsList>

          {/* Property Details Tab */}
          <TabsContent value="property">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
                <CardDescription>Basic property information and characteristics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, propertyType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family">Single Family</SelectItem>
                        <SelectItem value="Condominium">Condominium</SelectItem>
                        <SelectItem value="Townhouse">Townhouse</SelectItem>
                        <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                        <SelectItem value="Mobile Home">Mobile Home</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input // Keep as regular Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="Number of bedrooms"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input // Keep as regular Input
                      id="bathrooms"
                      type="number"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                      placeholder="Number of bathrooms"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="squareFeet">Square Feet</Label>
                    <Input // Keep as regular Input
                      id="squareFeet"
                      type="number"
                      value={formData.squareFeet}
                      onChange={(e) => setFormData((prev) => ({ ...prev, squareFeet: e.target.value }))}
                      placeholder="Total square footage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input // Keep as regular Input
                      id="yearBuilt"
                      type="number"
                      value={formData.yearBuilt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, yearBuilt: e.target.value }))}
                      placeholder="Year property was built"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lotSize">Lot Size</Label>
                    <SpeechToTextInput // Use SpeechToTextInput
                      id="lotSize"
                      value={formData.lotSize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, lotSize: value }))}
                      placeholder="Lot size (e.g., 0.25 acres)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Overall Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, condition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupancy">Occupancy</Label>
                    <Select
                      value={formData.occupancy}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, occupancy: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select occupancy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner Occupied">Owner Occupied</SelectItem>
                        <SelectItem value="Tenant Occupied">Tenant Occupied</SelectItem>
                        <SelectItem value="Vacant">Vacant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exterior Tab */}
          <TabsContent value="exterior">
            <Card>
              <CardHeader>
                <CardTitle>Exterior Features</CardTitle>
                <CardDescription>External property characteristics and condition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exteriorMaterial">Exterior Material</Label>
                    <Select
                      value={formData.exteriorMaterial}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, exteriorMaterial: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Brick">Brick</SelectItem>
                        <SelectItem value="Stucco">Stucco</SelectItem>
                        <SelectItem value="Wood Siding">Wood Siding</SelectItem>
                        <SelectItem value="Vinyl Siding">Vinyl Siding</SelectItem>
                        <SelectItem value="Stone">Stone</SelectItem>
                        <SelectItem value="Concrete Block">Concrete Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roofType">Roof Type</Label>
                    <Select
                      value={formData.roofType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, roofType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select roof type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asphalt Shingle">Asphalt Shingle</SelectItem>
                        <SelectItem value="Tile">Tile</SelectItem>
                        <SelectItem value="Metal">Metal</SelectItem>
                        <SelectItem value="Slate">Slate</SelectItem>
                        <SelectItem value="Wood Shake">Wood Shake</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roofCondition">Roof Condition</Label>
                    <Select
                      value={formData.roofCondition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, roofCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundationType">Foundation Type</Label>
                    <Select
                      value={formData.foundationType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, foundationType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select foundation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Slab">Slab</SelectItem>
                        <SelectItem value="Crawl Space">Crawl Space</SelectItem>
                        <SelectItem value="Full Basement">Full Basement</SelectItem>
                        <SelectItem value="Partial Basement">Partial Basement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foundationCondition">Foundation Condition</Label>
                    <Select
                      value={formData.foundationCondition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, foundationCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="garage">Garage</Label>
                    <Select
                      value={formData.garage}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, garage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select garage type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="1-Car Attached">1-Car Attached</SelectItem>
                        <SelectItem value="2-Car Attached">2-Car Attached</SelectItem>
                        <SelectItem value="3-Car Attached">3-Car Attached</SelectItem>
                        <SelectItem value="1-Car Detached">1-Car Detached</SelectItem>
                        <SelectItem value="2-Car Detached">2-Car Detached</SelectItem>
                        <SelectItem value="Carport">Carport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Additional Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pool"
                        checked={formData.pool}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, pool: checked as boolean }))}
                      />
                      <Label htmlFor="pool">Pool</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fireplace"
                        checked={formData.fireplace}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({ ...prev, fireplace: checked as boolean }))
                        }
                      />
                      <Label htmlFor="fireplace">Fireplace</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="deck"
                        checked={formData.deck}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, deck: checked as boolean }))}
                      />
                      <Label htmlFor="deck">Deck/Patio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fence"
                        checked={formData.fence}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, fence: checked as boolean }))}
                      />
                      <Label htmlFor="fence">Fence</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interior Tab */}
          <TabsContent value="interior">
            <Card>
              <CardHeader>
                <CardTitle>Interior Features</CardTitle>
                <CardDescription>Internal property characteristics and systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="flooringType">Primary Flooring</Label>
                    <Select
                      value={formData.flooringType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, flooringType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select flooring" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hardwood">Hardwood</SelectItem>
                        <SelectItem value="Laminate">Laminate</SelectItem>
                        <SelectItem value="Tile">Tile</SelectItem>
                        <SelectItem value="Carpet">Carpet</SelectItem>
                        <SelectItem value="Vinyl">Vinyl</SelectItem>
                        <SelectItem value="Concrete">Concrete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kitchenCondition">Kitchen Condition</Label>
                    <Select
                      value={formData.kitchenCondition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, kitchenCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bathroomCondition">Bathroom Condition</Label>
                    <Select
                      value={formData.bathroomCondition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, bathroomCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hvacType">HVAC Type</Label>
                    <Select
                      value={formData.hvacType}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hvacType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select HVAC type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Central Air/Heat">Central Air/Heat</SelectItem>
                        <SelectItem value="Window Units">Window Units</SelectItem>
                        <SelectItem value="Heat Pump">Heat Pump</SelectItem>
                        <SelectItem value="Radiant Heat">Radiant Heat</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hvacCondition">HVAC Condition</Label>
                    <Select
                      value={formData.hvacCondition}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, hvacCondition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <Card>
              <CardHeader>
                <CardTitle>Property Photos</CardTitle>
                <CardDescription>Capture photos for each category to document the property</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {photoCategories.map((category) => {
                    const categoryPhotos = photos.filter((p) => p.category === category)
                    return (
                      <div key={category} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-secondary-900">{category}</h3>
                          <Badge variant="outline">{categoryPhotos.length}</Badge>
                        </div>

                        <Button variant="outline" className="w-full mb-3" onClick={() => handlePhotoUpload(category)}>
                          <Camera className="mr-2 h-4 w-4" />
                          Add Photos
                        </Button>

                        <div className="space-y-2">
                          {categoryPhotos.map((photo) => (
                            <div key={photo.id} className="flex items-center gap-2 p-2 bg-neutral-50 rounded">
                              <img
                                src={URL.createObjectURL(photo.file) || "/placeholder.svg"}
                                alt={photo.caption || "Property photo"}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <SpeechToTextInput // Use SpeechToTextInput for photo captions
                                  placeholder="Add caption..."
                                  value={photo.caption}
                                  onValueChange={(value) => updatePhotoCaption(photo.id, value)}
                                  className="text-xs"
                                />
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removePhoto(photo.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Document observations, repairs needed, and market comparisons</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="generalNotes">General Observations</Label>
                  <SpeechToTextInput // Use SpeechToTextInput
                    id="generalNotes"
                    isTextArea
                    value={formData.generalNotes}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, generalNotes: value }))}
                    placeholder="General observations about the property..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repairNeeds">Repair Needs</Label>
                  <SpeechToTextInput // Use SpeechToTextInput
                    id="repairNeeds"
                    isTextArea
                    value={formData.repairNeeds}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, repairNeeds: value }))}
                    placeholder="List any repairs or maintenance issues observed..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="marketComparisons">Market Comparisons</Label>
                  <SpeechToTextInput // Use SpeechToTextInput
                    id="marketComparisons"
                    isTextArea
                    value={formData.marketComparisons}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, marketComparisons: value }))}
                    placeholder="Notes about comparable properties in the area..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Submit Section */}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-secondary-600">
              {completedSections.length} of {totalSections} sections completed
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={submitForm} className="bg-primary-600 hover:bg-primary-700 text-white">
              <Upload className="mr-2 h-4 w-4" />
              Submit Inspection
            </Button>
          </div>
        </div>
      </main>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
    </div>
  )
}
