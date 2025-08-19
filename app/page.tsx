import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  TrendingUp,
  Shield,
  Users,
  CheckCircle,
  UserPlus,
  Settings,
  Rocket,
  BriefcaseBusiness,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const pricingTiers = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Ideal for individual valuers or small teams",
      features: [
        "Basic Data Collection Workflow",
        "Onsite w/ Offline Mode",
        "Job Statuses and Tracking",
        "Basic Log in",
        "Basic User Management (R&P) up to 3 users",
        "Data Export",
        "Basic Dashboard",
        "Valuer Postcode coverage",
        "Valocity Bank Integrations",
        "Notifications - Configurable",
        "Self Onboarding",
        "Basic Roll up Stats",
        "My Jobs - Todays Schedule",
        "Custom Form Builder",
        "Custom Report Builder",
        "Field Preset Commentary",
        "Basic Auto Calculation Fields",
        "AI Support Agent",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "Perfect for growing teams",
      features: [
        "All of Starter plus:",
        "Automated Data Entry",
        "All Property Type Support",
        "Team Management & Smart Scheduling",
        "AI Powered Data & Analytics Page",
        "AI Email Agent Integration",
        "Advanced Roll up Stats (inc Team Stats)",
        "Voice to Text Field Notes",
        "Route Optimisation (Travelling Sales Man)",
        "Data Commercialisation Marketplace",
        "Advanced & Custom Auto Calculation Fields",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For large organisations",
      features: [
        "All of Professional plus:",
        "AI Visual Workflow Builder",
        "Market Data Source Integration (Comparables, Sales Data)",
        "White-label options",
        "Automated Quote, Billing & Invoicing - Client Management Module",
        "Country/Area Entity Management",
        "AI Powered Predictive Analytics",
        "Property Research Panel",
        "Major Bank Integrations",
        "AR sketching (iOS)",
        "Dedicated Account Manager",
        "Custom Training Programs",
      ],
      popular: false,
    },
  ]

  const features = [
    {
      icon: Building2,
      title: "Comprehensive Property Analysis",
      description:
        "Advanced algorithms analyze market data, comparable sales, and property characteristics for accurate valuations.",
    },
    {
      icon: TrendingUp,
      title: "Real-time Market Insights",
      description: "Stay ahead with live market trends, price movements, and investment opportunities in your area.",
    },
    {
      icon: Shield,
      title: "Certified Accuracy",
      description:
        "Our valuations meet industry standards with 95% accuracy rate, trusted by professionals nationwide.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Access to certified appraisers and real estate professionals for complex valuation needs.",
    },
  ]

  const howItWorksSteps = [
    {
      icon: UserPlus,
      title: "1. Create Your Account",
      description: "Sign up in minutes to access your personalized dashboard and begin your journey.",
    },
    {
      icon: Settings,
      title: "2. Configure Your Workspace",
      description: "Tailor forms, reports, and workflows to match your specific business needs and processes.",
    },
    {
      icon: BriefcaseBusiness,
      title: "3. Manage Jobs & Teams",
      description: "Efficiently assign tasks, track progress, and collaborate with your team in real-time.",
    },
    {
      icon: Rocket,
      title: "4. Boost Productivity",
      description: "Leverage AI-powered tools and automation to streamline operations and enhance accuracy.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-secondary-800">Valocity Connect</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-secondary-600 hover:text-primary-600 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            <Link href="#about" className="text-secondary-600 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/login" className="text-secondary-600 hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link href="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-primary-100 text-primary-700 border-primary-200">
            Trusted by 10,000+ Valuation Professionals
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
            A tool for professionals offering services in
            <span className="text-primary-600"> Property</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
            Whether you're a legal team conveyancing or a valuation firm performing assessments, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 text-lg bg-transparent"
            >
              View Demo
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-secondary-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Everything you need for accurate valuations</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge technology with industry expertise to deliver the most
              reliable property valuations in the market.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-neutral-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary-100 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl text-secondary-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary-600 text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-neutral-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">How It Works</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              {"Get started in minutes and see the difference our platform can make for your business."}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={index} className="border-neutral-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary-100 rounded-full w-fit">
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-xl text-secondary-800">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-secondary-600 text-center">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-neutral-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Choose the perfect plan for your business</h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Flexible pricing options designed to scale with your business, from individual agents to large
              enterprises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`relative ${tier.popular ? "border-primary-500 shadow-xl scale-105" : "border-neutral-200"}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary-600 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-secondary-800">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-secondary-900">{tier.price}</span>
                    <span className="text-secondary-600">{tier.period}</span>
                  </div>
                  <CardDescription className="text-secondary-600 mt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-8 ${
                      tier.popular
                        ? "bg-primary-600 hover:bg-primary-700 text-white"
                        : "bg-white border border-primary-600 text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to transform your property valuations?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Connect for accurate, reliable property valuations. Start your
            free trial today.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-50 px-8 py-3 text-lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-darkNavy-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-bold">Valocity Connect</span>
              </div>
              <p className="text-secondary-400">
                The most trusted property valuation platform for real estate professionals.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-secondary-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-secondary-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-secondary-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
            <p>&copy; 2025 Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
