import { NextResponse } from "next/server"
import { subscriptionPlans } from "@/lib/subscription"

export async function GET() {
  try {
    return NextResponse.json(subscriptionPlans)
  } catch (error) {
    console.error("Error fetching subscription plans:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
