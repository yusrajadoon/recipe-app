import { type NextRequest, NextResponse } from "next/server"
import { getRecipes, addRecipe } from "@/lib/recipes"

export async function GET() {
  const recipes = await getRecipes()
  return NextResponse.json(recipes)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newRecipe = await addRecipe({
      title: body.title,
      description: body.description,
      image: body.image || "/placeholder.svg?height=300&width=400",
      cookingTime: body.cookingTime,
      servings: body.servings,
      ingredients: body.ingredients,
      instructions: body.instructions,
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
