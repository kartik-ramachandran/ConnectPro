import { PurchaserCard, mockPurchasers } from "@/components/purchaser-card"
import { MainNav } from "@/components/main-nav" // Import MainNav

export default function DataMarketplacePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNav /> {/* Add the MainNav component here */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Data Marketplace</h1>
            <p className="text-muted-foreground">
              Browse potential data purchasers and their specific data requirements. Connect with partners to
              commercialize your data assets.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPurchasers.map((purchaser) => (
              <PurchaserCard key={purchaser.id} purchaser={purchaser} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
