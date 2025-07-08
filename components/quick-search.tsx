"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, Users } from "lucide-react"
import type { Recipe } from "@/lib/recipes"

export function QuickSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Recipe[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchRecipes = async () => {
      if (query.trim().length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const recipes = await response.json()
        setResults(recipes.slice(0, 5)) // Show only top 5 results
        setIsOpen(true)
      } catch (error) {
        console.error("Search failed:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchRecipes, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Quick search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            className="pl-10 pr-4 h-10 border-2 border-orange-200 focus:border-orange-400 rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </form>

      {/* Quick Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-12 left-0 right-0 z-50 shadow-2xl border-0 bg-white/95 backdrop-blur-md max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Searching...</div>
            ) : results.length > 0 ? (
              <>
                {results.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipe/${recipe.id}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{recipe.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{recipe.cookingTime}m</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{recipe.servings}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {recipe.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="border-t mt-2 pt-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-2 text-center text-orange-600 hover:text-orange-700 text-sm font-medium"
                  >
                    View all results for "{query}"
                  </Link>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-gray-500">No recipes found for "{query}"</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
