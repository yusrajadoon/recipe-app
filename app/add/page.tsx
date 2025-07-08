"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, ChefHat, Clock, Users, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AddRecipePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    cookingTime: "",
    servings: "",
    difficulty: "",
    category: "",
    ingredients: "",
    instructions: "",
    tags: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          image: formData.image || "/placeholder.svg?height=300&width=400",
          cookingTime: Number.parseInt(formData.cookingTime),
          servings: Number.parseInt(formData.servings),
          difficulty: formData.difficulty || "Medium",
          category: formData.category || "Main Course",
          rating: 4.5,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          ingredients: formData.ingredients.split("\n").filter((item) => item.trim()),
          instructions: formData.instructions.split("\n").filter((item) => item.trim()),
        }),
      })

      if (response.ok) {
        toast({
          title: "Success! 🎉",
          description: "Your delicious recipe has been added successfully.",
        })
        router.push("/")
      } else {
        throw new Error("Failed to add recipe")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add recipe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mr-4 hover:bg-orange-50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Recipes
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Add New Recipe</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Create New Recipe
            </CardTitle>
            <p className="text-gray-600 mt-2">Share your culinary masterpiece with the world</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Recipe Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Grandma's Chocolate Chip Cookies"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Category *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Appetizer">Appetizer</SelectItem>
                        <SelectItem value="Main Course">Main Course</SelectItem>
                        <SelectItem value="Dessert">Dessert</SelectItem>
                        <SelectItem value="Salad">Salad</SelectItem>
                        <SelectItem value="Soup">Soup</SelectItem>
                        <SelectItem value="Beverage">Beverage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your recipe in a few sentences..."
                    rows={3}
                    className="border-2 border-gray-200 focus:border-orange-400 transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                    Recipe Image URL
                  </Label>
                  <div className="relative">
                    <Input
                      id="image"
                      name="image"
                      type="url"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="https://example.com/delicious-food.jpg"
                      className="h-12 pl-12 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                    />
                    <Upload className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                  <p className="text-xs text-gray-500">Leave empty to use a placeholder image</p>
                </div>
              </div>

              {/* Recipe Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Recipe Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cookingTime" className="text-sm font-medium text-gray-700">
                      Cooking Time (minutes) *
                    </Label>
                    <Input
                      id="cookingTime"
                      name="cookingTime"
                      type="number"
                      required
                      min="1"
                      value={formData.cookingTime}
                      onChange={handleInputChange}
                      placeholder="30"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servings" className="text-sm font-medium text-gray-700">
                      Servings *
                    </Label>
                    <Input
                      id="servings"
                      name="servings"
                      type="number"
                      required
                      min="1"
                      value={formData.servings}
                      onChange={handleInputChange}
                      placeholder="4"
                      className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700">
                      Difficulty *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("difficulty", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-400">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="chocolate, cookies, dessert, baking"
                    className="h-12 border-2 border-gray-200 focus:border-orange-400 transition-colors"
                  />
                  <p className="text-xs text-gray-500">Separate tags with commas</p>
                </div>
              </div>

              {/* Ingredients and Instructions */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-500" />
                    Ingredients *
                  </h3>
                  <Textarea
                    id="ingredients"
                    name="ingredients"
                    required
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;1 tsp vanilla extract"
                    rows={10}
                    className="border-2 border-gray-200 focus:border-orange-400 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500">Enter each ingredient on a new line</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-purple-500" />
                    Instructions *
                  </h3>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    required
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Preheat oven to 350°F&#10;Mix dry ingredients in a bowl&#10;Add wet ingredients and stir&#10;Bake for 25-30 minutes"
                    rows={10}
                    className="border-2 border-gray-200 focus:border-orange-400 transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500">Enter each step on a new line</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Adding Recipe...
                    </>
                  ) : (
                    <>
                      <ChefHat className="w-5 h-5 mr-2" />
                      Add Recipe
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
