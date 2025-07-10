import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Users, Star, ChefHat, Play } from "lucide-react"
import { notFound } from "next/navigation"
import { getRecipeById } from "@/lib/recipes"
import { FavoriteButton } from "@/components/favorite-button"
import { ShareButton } from "@/components/share-button"
import { PrintRecipe } from "@/components/print-recipe"
import { CookingTimer } from "@/components/cooking-timer"

export default async function RecipeDetailsPage({ params }: { params: { id: string } }) {
  const recipe = await getRecipeById(params.id)

  if (!recipe) {
    notFound()
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-orange-50 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Recipes
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <FavoriteButton recipe={recipe} showText />
              <ShareButton recipe={recipe} showText />
              <PrintRecipe recipe={recipe} showText />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Recipe Image and Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden shadow-2xl border-0 sticky top-24">
              <div className="aspect-square relative">
                <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                  <Badge className="bg-black/70 text-white">{recipe.category}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{recipe.rating}</span>
                    <span className="text-gray-500 text-sm">rating</span>
                  </div>
                  <ChefHat className="w-6 h-6 text-orange-500" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center mb-6">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <Clock className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900">{recipe.cookingTime}</div>
                    <div className="text-sm text-gray-600">minutes</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900">{recipe.servings}</div>
                    <div className="text-sm text-gray-600">servings</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 h-12">
                    <Play className="w-5 h-5 mr-2" />
                    Start Cooking
                  </Button>
                  <div className="grid grid-cols-3 gap-2">
                    <FavoriteButton recipe={recipe} />
                    <ShareButton recipe={recipe} />
                    <PrintRecipe recipe={recipe} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cooking Timer */}
            <CookingTimer defaultTime={recipe.cookingTime} />
          </div>

          {/* Recipe Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Title and Description */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">{recipe.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{recipe.description}</p>
            </div>

            {/* Ingredients */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">I</span>
                  </div>
                  Ingredients
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors group"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  Instructions
                </h2>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors group">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                          {instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
