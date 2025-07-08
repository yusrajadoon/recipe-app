"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  initialQuery?: string
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("q", query.trim())
      router.push(`/search?${params.toString()}`)
    } else {
      router.push("/search")
    }
  }

  const clearSearch = () => {
    setQuery("")
    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")
    router.push(`/search?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      clearSearch()
    }
  }

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search recipes, ingredients, or categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-20 h-12 text-lg border-2 border-orange-200 focus:border-orange-400 rounded-full shadow-lg"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {query && (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-4 h-8"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}
