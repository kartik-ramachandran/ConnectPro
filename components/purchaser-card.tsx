import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Purchaser {
  id: string
  name: string
  dataNeeds: string
  timeFrame: string
  region: string
  description: string
}

export function PurchaserCard({ purchaser }: { purchaser: Purchaser }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{purchaser.name}</CardTitle>
        <CardDescription>{purchaser.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center">
            <span className="font-semibold w-24">Data Needs:</span>
            <Badge variant="secondary">{purchaser.dataNeeds}</Badge>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Time Frame:</span>
            <span>{purchaser.timeFrame}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24">Region:</span>
            <span>{purchaser.region}</span>
          </div>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button className="w-full">View Details</Button>
      </div>
    </Card>
  )
}

export const mockPurchasers: Purchaser[] = [
  {
    id: "1",
    name: "Global Analytics Inc.",
    dataNeeds: "Real Estate Transaction Data",
    timeFrame: "Jan 2022 - Dec 2023",
    region: "North America, Europe",
    description: "Seeking comprehensive real estate transaction data for market analysis and trend prediction.",
  },
  {
    id: "2",
    name: "Market Insights Co.",
    dataNeeds: "Retail Sales Data",
    timeFrame: "Q1 2023 - Present",
    region: "United States (California, New York)",
    description: "Interested in granular retail sales data to understand consumer behavior in key urban areas.",
  },
  {
    id: "3",
    name: "Urban Development Group",
    dataNeeds: "Demographic and Census Data",
    timeFrame: "2010 - 2020 (Census Data)",
    region: "Global (Focus on developing nations)",
    description: "Requires historical demographic and census data for urban planning and infrastructure projects.",
  },
  {
    id: "4",
    name: "HealthTech Solutions",
    dataNeeds: "Healthcare Patient Demographics",
    timeFrame: "Last 5 years",
    region: "United Kingdom",
    description: "Looking for anonymized patient demographic data to improve healthcare service delivery models.",
  },
  {
    id: "5",
    name: "Agri-Innovate Corp.",
    dataNeeds: "Agricultural Yield Data",
    timeFrame: "Seasonal (Past 3 growing seasons)",
    region: "Midwest US, Brazil",
    description: "Seeking agricultural yield data to optimize crop management and predict future harvests.",
  },
  {
    id: "6",
    name: "FinTech Innovations",
    dataNeeds: "Financial Market Data",
    timeFrame: "Last 12 months",
    region: "Global",
    description: "Requires real-time and historical financial market data for algorithmic trading strategies.",
  },
  {
    id: "7",
    name: "Environmental Research Org.",
    dataNeeds: "Climate Change Data",
    timeFrame: "1990 - Present",
    region: "Arctic, Coastal Regions",
    description: "Seeking long-term climate data for environmental impact assessments and research.",
  },
]
