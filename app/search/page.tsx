import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Star, ChefHat, ArrowLeft, SearchIcon } from "lucide-react"
import { searchRecipes, getAllCategories, getAllTags } from "@/lib/recipes"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FavoriteButton } from "@/components/favorite-button"
import { ShareButton } from "@/components/share-button"

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
    difficulty?: string
    tags?: string
  }
}

async function SearchResults({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const category = searchParams.category || ""
  const difficulty = searchParams.difficulty || ""
  const tags = searchParams.tags ? searchParams.tags.split(",") : []

  let recipes = await searchRecipes(query)

  // Apply additional filters
  if (category) {
    recipes = recipes.filter((recipe) => recipe.category.toLowerCase() === category.toLowerCase())
  }

  if (difficulty) {
    recipes = recipes.filter((recipe) => recipe.difficulty.toLowerCase() === difficulty.toLowerCase())
  }

  if (tags.length > 0) {
    recipes = recipes.filter((recipe) =>
      tags.some((tag) => recipe.tags.some((recipeTag) => recipeTag.toLowerCase().includes(tag.toLowerCase()))),
    )
  }

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
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Filter Sidebar */}
      <div className="lg:col-span-1">
        <FilterSidebar
          categories={getAllCategories()}
          tags={getAllTags()}
          currentFilters={{
            category,
            difficulty,
            tags,
          }}
        />
      </div>

      {/* Search Results */}
      <div className="lg:col-span-3">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <SearchIcon className="w-6 h-6 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              {query ? `Search Results for "${query}"` : "All Recipes"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
            <span>
              Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
            </span>
            {category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Category: {category}
              </Badge>
            )}
            {difficulty && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Difficulty: {difficulty}
              </Badge>
            )}
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800">
                Tag: {tag}
              </Badge>
            ))}
          </div>

          {/* Search Bar */}
          <SearchBar initialQuery={query} />
        </div>

        {/* Results Grid */}
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                    {recipe.description}
                  </CardDescription>
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
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-6">
              {query
                ? `We couldn't find any recipes matching "${query}". Try different keywords or browse all recipes.`
                : "No recipes match your current filters. Try adjusting your search criteria."}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">Browse All Recipes</Button>
              </Link>
              <Link href="/search">
                <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Clear Filters
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MyRecipes
                </h1>
              </div>
            </div>
            <Link href="/add">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Add Recipe
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="text-center py-8">Loading search results...</div>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  )
}
