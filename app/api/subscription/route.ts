import { type NextRequest, NextResponse } from "next/server"
import { getUserSubscription, createSubscription, subscriptionPlans } from "@/lib/subscription"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const subscription = await getUserSubscription(userId)
    return NextResponse.json(subscription)
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, planId } = body

    if (!userId || !planId) {
      return NextResponse.json({ error: "User ID and Plan ID are required" }, { status: 400 })
    }

    const plan = subscriptionPlans.find((p) => p.id === planId)
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan ID" }, { status: 400 })
    }

    const subscription = await createSubscription(userId, planId)
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
