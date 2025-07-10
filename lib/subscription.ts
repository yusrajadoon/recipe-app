export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
  popular?: boolean
}

export interface UserSubscription {
  id: string
  userId: string
  planId: string
  status: "active" | "cancelled" | "expired" | "trial"
  startDate: string
  endDate: string
  cancelAtPeriodEnd: boolean
}

// Subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: ["Access to free video lessons", "Basic recipes", "Community access", "Limited downloads"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 9.99,
    interval: "month",
    features: [
      "All free features",
      "Access to premium video lessons",
      "Exclusive recipes",
      "Unlimited downloads",
      "Ad-free experience",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "premium-yearly",
    name: "Premium Yearly",
    price: 99.99,
    interval: "year",
    features: [
      "All premium features",
      "2 months free",
      "Exclusive masterclasses",
      "Personal cooking consultation",
      "Early access to new content",
    ],
  },
  {
    id: "pro",
    name: "Pro Chef",
    price: 19.99,
    interval: "month",
    features: [
      "All premium features",
      "Advanced technique videos",
      "Business cooking tips",
      "Supplier recommendations",
      "Professional networking",
      "Custom meal planning",
    ],
  },
]

// Mock user subscriptions
const userSubscriptions: UserSubscription[] = [
  {
    id: "sub1",
    userId: "user1",
    planId: "premium",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    cancelAtPeriodEnd: false,
  },
]

export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
  const subscription = userSubscriptions.find((sub) => sub.userId === userId)
  return Promise.resolve(subscription || null)
}

export async function createSubscription(userId: string, planId: string): Promise<UserSubscription> {
  const plan = subscriptionPlans.find((p) => p.id === planId)
  if (!plan) throw new Error("Plan not found")

  const startDate = new Date()
  const endDate = new Date()

  if (plan.interval === "month") {
    endDate.setMonth(endDate.getMonth() + 1)
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1)
  }

  const newSubscription: UserSubscription = {
    id: Date.now().toString(),
    userId,
    planId,
    status: "active",
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
    cancelAtPeriodEnd: false,
  }

  userSubscriptions.push(newSubscription)
  return Promise.resolve(newSubscription)
}

export async function cancelSubscription(subscriptionId: string): Promise<UserSubscription> {
  const subscription = userSubscriptions.find((sub) => sub.id === subscriptionId)
  if (!subscription) throw new Error("Subscription not found")

  subscription.cancelAtPeriodEnd = true
  return Promise.resolve(subscription)
}

export function hasAccess(userSubscription: UserSubscription | null, contentType: "free" | "premium" | "pro"): boolean {
  if (contentType === "free") return true
  if (!userSubscription || userSubscription.status !== "active") return false

  const plan = subscriptionPlans.find((p) => p.id === userSubscription.planId)
  if (!plan) return false

  if (contentType === "premium") {
    return ["premium", "premium-yearly", "pro"].includes(plan.id)
  }

  if (contentType === "pro") {
    return plan.id === "pro"
  }

  return false
}
