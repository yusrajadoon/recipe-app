import { type NextRequest, NextResponse } from "next/server"
import { searchRecipes } from "@/lib/recipes"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") || ""

  try {
    const recipes = await searchRecipes(query)
    return NextResponse.json(recipes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to search recipes" }, { status: 500 })
  }
}
