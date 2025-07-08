import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ChefHat } from "lucide-react"
import { getRecipes } from "@/lib/recipes"
import { QuickSearch } from "@/components/quick-search"
import { FavoriteButton } from "@/components/favorite-button"
import { ShareButton } from "@/components/share-button"

export default async function HomePage() {
  const recipes = await getRecipes()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                MyRecipes
              </h1>
            </div>
            <Link href="/add">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Add Recipe
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Recipes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your next favorite dish from our curated collection of delicious recipes
          </p>
          <QuickSearch />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-blue-600">{recipes.length}</div>
              <div className="text-sm text-blue-600">Total Recipes</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((recipes.reduce((acc, recipe) => acc + recipe.rating, 0) / recipes.length) * 10) / 10}
              </div>
              <div className="text-sm text-green-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(recipes.reduce((acc, recipe) => acc + recipe.cookingTime, 0) / recipes.length)}
              </div>
              <div className="text-sm text-purple-600">Avg Cook Time (min)</div>
            </CardContent>
          </Card>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <Card
              key={recipe.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>{recipe.difficulty}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-black/70 text-white hover:bg-black/80">{recipe.category}</Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {recipe.title}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 text-sm leading-relaxed">{recipe.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookingTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {recipe.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0 space-y-2">
                <Link href={`/recipe/${recipe.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:border-orange-300 bg-transparent group-hover:shadow-md transition-all duration-300"
                  >
                    View Recipe
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <FavoriteButton recipe={recipe} />
                  <ShareButton recipe={recipe} />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="w-12 h-12 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first delicious recipe!</p>
            <Link href="/add">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
                Add Your First Recipe
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
