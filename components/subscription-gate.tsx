"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Lock } from "lucide-react"

interface SubscriptionGateProps {
  children: React.ReactNode
}

export function SubscriptionGate({ children }: SubscriptionGateProps) {
  const [hasAccess] = useState(false) // Mock subscription status

  if (hasAccess) {
    return <>{children}</>
  }

  return (
    <div className="relative w-full h-full">
      {/* Blurred content */}
      <div className="filter blur-sm pointer-events-none">{children}</div>

      {/* Subscription overlay */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Premium Content</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              This video lesson is available to premium subscribers only
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Lock className="w-4 h-4" />
              <span>Exclusive premium content</span>
            </div>
            <Link href="/subscription">
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400">Start your 7-day free trial today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
