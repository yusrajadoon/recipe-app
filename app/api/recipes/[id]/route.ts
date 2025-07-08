import { type NextRequest, NextResponse } from "next/server"
import { getRecipeById } from "@/lib/recipes"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 })
  }

  return NextResponse.json(recipe)
}
