import type React from "react"
import type { Metadata } from "next/types"
import { Quicksand, Open_Sans } from "next/font/google" // Import both fonts
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SupportChatbot } from "@/components/support-chatbot"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand", // Define CSS variable for Quicksand
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans", // Define CSS variable for Open Sans
})

export const metadata: Metadata = {
  title: "Property Valuation Platform",
  description: "AI-powered property valuation and management platform",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quicksand.variable} ${openSans.variable}`} // Apply font variables to html
    >
      <body className="font-sans">
        {" "}
        {/* Apply font-sans to body, which now uses Open Sans */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <SupportChatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
