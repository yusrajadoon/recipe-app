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
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, Video, Users, Star, ChefHat } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CreateVideoPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    duration: "",
    difficulty: "",
    category: "",
    tags: "",
    isPremium: false,
    cookName: "",
    cookAvatar: "",
    recipeId: "",
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

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          thumbnail: formData.thumbnail || "/placeholder.svg?height=300&width=400",
          videoUrl: formData.videoUrl,
          duration: Number.parseInt(formData.duration) * 60, // Convert minutes to seconds
          difficulty: formData.difficulty || "Beginner",
          category: formData.category || "Cooking Basics",
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
          isPremium: formData.isPremium,
          cookId: "cook1", // Mock cook ID
          cookName: formData.cookName || "Chef User",
          cookAvatar: formData.cookAvatar || "/placeholder.svg",
          recipeId: formData.recipeId || undefined,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success! 🎉",
          description: "Your video lesson has been created successfully.",
        })
        router.push("/videos")
      } else {
        throw new Error("Failed to create video")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create video lesson. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/videos">
              <Button variant="ghost" size="sm" className="mr-4 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Videos
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Create Video Lesson</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Create New Video Lesson
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Share your cooking expertise with the community</p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-500" />
                  Basic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Video Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Perfect Pasta Carbonara Technique"
                      className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cooking Basics">Cooking Basics</SelectItem>
                        <SelectItem value="Italian Cuisine">Italian Cuisine</SelectItem>
                        <SelectItem value="Baking">Baking</SelectItem>
                        <SelectItem value="Quick Meals">Quick Meals</SelectItem>
                        <SelectItem value="Pastry">Pastry</SelectItem>
                        <SelectItem value="Knife Skills">Knife Skills</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what viewers will learn in this video lesson..."
                    rows={4}
                    className="border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Video Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-500" />
                  Video Details
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Video URL *
                    </Label>
                    <div className="relative">
                      <Input
                        id="videoUrl"
                        name="videoUrl"
                        type="url"
                        required
                        value={formData.videoUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/video.mp4"
                        className="h-12 pl-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                      />
                      <Upload className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Thumbnail URL
                    </Label>
                    <div className="relative">
                      <Input
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        value={formData.thumbnail}
                        onChange={handleInputChange}
                        placeholder="https://example.com/thumbnail.jpg"
                        className="h-12 pl-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                      />
                      <Upload className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Duration (minutes) *
                    </Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      required
                      min="1"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="15"
                      className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Difficulty *
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("difficulty", value)}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipeId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Related Recipe ID
                    </Label>
                    <Input
                      id="recipeId"
                      name="recipeId"
                      type="text"
                      value={formData.recipeId}
                      onChange={handleInputChange}
                      placeholder="Optional"
                      className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="pasta, italian, technique, cooking"
                    className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">Separate tags with commas</p>
                </div>
              </div>

              {/* Cook Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-green-500" />
                  Cook Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cookName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Your Name *
                    </Label>
                    <Input
                      id="cookName"
                      name="cookName"
                      type="text"
                      required
                      value={formData.cookName}
                      onChange={handleInputChange}
                      placeholder="Chef John Doe"
                      className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cookAvatar" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Profile Picture URL
                    </Label>
                    <Input
                      id="cookAvatar"
                      name="cookAvatar"
                      type="url"
                      value={formData.cookAvatar}
                      onChange={handleInputChange}
                      placeholder="https://example.com/profile.jpg"
                      className="h-12 border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Premium Settings */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-500" />
                  Access Settings
                </h3>

                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex-1">
                    <Label htmlFor="isPremium" className="text-sm font-medium text-gray-900 dark:text-white">
                      Premium Content
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Make this video available only to premium subscribers
                    </p>
                  </div>
                  <Switch
                    id="isPremium"
                    checked={formData.isPremium}
                    onCheckedChange={(checked) => handleSwitchChange("isPremium", checked)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Video...
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5 mr-2" />
                      Create Video Lesson
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
