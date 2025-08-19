"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Settings } from "lucide-react"
import { topLevelMenuItems, adminMenuItems } from "@/lib/navigation"

export function MainNav() {
  const pathname = usePathname()
  const notifications = 3 // Sample notification count

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-darkNavy-700 bg-darkNavy-900 px-4 text-white md:px-6">
      {/* Logo and App Name */}
      <Link href="/dashboard" className="flex items-center gap-2 font-semibold text-white">
        <span className="text-lg">Connect Professional</span>
      </Link>

      {/* Main Navigation Links */}
      <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6">
        {topLevelMenuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            // Check if the current path matches the item's URL, or if it's the integrations link and the settings page is active
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === item.url ||
              (item.url.includes("settings?section=integrations") && pathname.includes("/dashboard/settings"))
                ? "text-primary"
                : "text-darkNavy-200"
            }`}
          >
            {item.title}
          </Link>
        ))}

        {/* Admin Menu Items (now direct links) */}
        {adminMenuItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              pathname.startsWith(item.url) ? "text-primary" : "text-darkNavy-200"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Right-aligned actions: Notifications and User Profile */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          {/* Removed asChild here to ensure clickability */}
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm" className="relative text-darkNavy-200 hover:text-white">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs p-0 flex items-center justify-center">
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Notifications ({notifications})</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications > 0 ? (
              <>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">New job assigned: 123 Main St</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Report for 456 Oak Ave is ready</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Team meeting reminder</span>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary">Mark all as read</DropdownMenuItem>
                <DropdownMenuItem className="justify-center text-destructive">Clear all notifications</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem className="text-center text-muted-foreground">No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          {/* Removed asChild here to ensure clickability */}
          <DropdownMenuTrigger>
            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="rounded-full bg-primary text-white">JD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="rounded-full bg-primary text-white">JD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">John Doe</span>
                  <span className="truncate text-xs text-muted-foreground">john@example.com</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
