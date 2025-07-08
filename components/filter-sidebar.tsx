"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Filter, X } from "lucide-react"

interface FilterSidebarProps {
  categories: string[]
  tags: string[]
  currentFilters: {
    category?: string
    difficulty?: string
    tags: string[]
  }
}

export function FilterSidebar({ categories, tags, currentFilters }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (key === "tags") {
      const currentTags = params.get("tags")?.split(",").filter(Boolean) || []
      if (currentTags.includes(value)) {
        const newTags = currentTags.filter((tag) => tag !== value)
        if (newTags.length > 0) {
          params.set("tags", newTags.join(","))
        } else {
          params.delete("tags")
        }
      } else {
        params.set("tags", [...currentTags, value].join(","))
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }

    router.push(`/search?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("difficulty")
    params.delete("tags")
    router.push(`/search?${params.toString()}`)
  }

  const hasActiveFilters = currentFilters.category || currentFilters.difficulty || currentFilters.tags.length > 0

  return (
    <Card className="sticky top-24 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5 text-orange-500" />
          Filters
        </CardTitle>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-auto justify-start"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={currentFilters.category === category ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter("category", category)}
                className={`w-full justify-start text-left ${
                  currentFilters.category === category
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "hover:bg-orange-50 text-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Difficulty Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Difficulty</h4>
          <div className="space-y-2">
            {["Easy", "Medium", "Hard"].map((difficulty) => (
              <Button
                key={difficulty}
                variant={currentFilters.difficulty === difficulty ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter("difficulty", difficulty)}
                className={`w-full justify-start text-left ${
                  currentFilters.difficulty === difficulty
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "hover:bg-orange-50 text-gray-700"
                }`}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Tags Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={currentFilters.tags.includes(tag) ? "default" : "secondary"}
                className={`cursor-pointer transition-colors ${
                  currentFilters.tags.includes(tag)
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "hover:bg-orange-100 text-gray-700"
                }`}
                onClick={() => updateFilter("tags", tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
