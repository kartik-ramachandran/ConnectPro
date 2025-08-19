"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Building2, ArrowLeft, ArrowRight, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { SpeechToTextInput } from "@/components/speech-to-text-input" // Import the new component

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Info
    companyName: "",
    companyType: "",
    licenseNumber: "",
    yearsInBusiness: "",

    // Contact Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Service Areas
    primaryState: "",
    serviceAreas: "",
    specializations: [],

    // Documents
    documents: [],

    // Terms
    agreeToTerms: false,
    agreeToMarketing: false,
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Company Information</h2>
              <p className="text-secondary-600">Tell us about your real estate business</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="companyName"
                  value={formData.companyName}
                  onValueChange={(value) => setFormData({ ...formData, companyName: value })}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyType">Company Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, companyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brokerage">Real Estate Brokerage</SelectItem>
                    <SelectItem value="appraisal">Appraisal Company</SelectItem>
                    <SelectItem value="individual">Individual Agent</SelectItem>
                    <SelectItem value="lender">Mortgage Lender</SelectItem>
                    <SelectItem value="investor">Real Estate Investor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onValueChange={(value) => setFormData({ ...formData, licenseNumber: value })}
                  placeholder="Enter license number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, yearsInBusiness: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-20">11-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Contact Details</h2>
              <p className="text-secondary-600">Your personal and account information</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="firstName"
                  value={formData.firstName}
                  onValueChange={(value) => setFormData({ ...formData, firstName: value })}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="lastName"
                  value={formData.lastName}
                  onValueChange={(value) => setFormData({ ...formData, lastName: value })}
                  placeholder="Enter your last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input // Keep as regular Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onValueChange={(value) => setFormData({ ...formData, phone: value })}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input // Keep as regular Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input // Keep as regular Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Service Areas</h2>
              <p className="text-secondary-600">Define your market coverage and specializations</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryState">Primary State *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, primaryState: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="IL">Illinois</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceAreas">Service Areas</Label>
                <SpeechToTextInput // Use SpeechToTextInput
                  id="serviceAreas"
                  isTextArea
                  value={formData.serviceAreas}
                  onValueChange={(value) => setFormData({ ...formData, serviceAreas: value })}
                  placeholder="List the cities, counties, or regions you serve (e.g., Los Angeles County, Orange County, San Diego)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Property Specializations</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Residential Single Family",
                    "Condominiums",
                    "Multi-family Properties",
                    "Commercial Properties",
                    "Land/Vacant Lots",
                    "Luxury Properties",
                    "Investment Properties",
                    "New Construction",
                  ].map((specialization) => (
                    <div key={specialization} className="flex items-center space-x-2">
                      <Checkbox
                        id={specialization}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              specializations: [...formData.specializations, specialization],
                            })
                          } else {
                            setFormData({
                              ...formData,
                              specializations: formData.specializations.filter((s) => s !== specialization),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={specialization} className="text-sm">
                        {specialization}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-2">Documents & Verification</h2>
              <p className="text-secondary-600">Upload required documents to verify your credentials</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-secondary-800 mb-2">Upload Documents</h3>
                <p className="text-secondary-600 mb-4">
                  Upload your real estate license, business registration, or other relevant documents
                </p>
                <Button variant="outline" className="border-primary-600 text-primary-600 hover:bg-primary-50">
                  Choose Files
                </Button>
                <p className="text-xs text-secondary-500 mt-2">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="#" className="text-primary-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary-600 hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToMarketing: checked as boolean })}
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm">
                    I would like to receive marketing communications and product updates
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-neutral-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Building2 className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-secondary-800">Connect</span>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Create Your Account</h1>
          <p className="text-secondary-600">Join thousands of real estate professionals using Connect</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-secondary-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-secondary-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="border-neutral-200 shadow-lg">
          <CardContent className="p-8">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-neutral-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="border-neutral-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                  disabled={!formData.agreeToTerms}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              ) : (
                <Button onClick={handleNext} className="bg-primary-600 hover:bg-primary-700 text-white">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-secondary-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
