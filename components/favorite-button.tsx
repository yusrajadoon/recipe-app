"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { FavoritesManager } from "@/lib/favorites"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  recipe: {
    id: string
    title: string
    image: string
  }
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
}

export function FavoriteButton({ recipe, variant = "outline", size = "sm", showText = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsFavorite(FavoritesManager.isFavorite(recipe.id))
  }, [recipe.id])

  const handleToggleFavorite = async () => {
    setIsLoading(true)

    try {
      const newFavoriteState = FavoritesManager.toggleFavorite(recipe)
      setIsFavorite(newFavoriteState)

      toast({
        title: newFavoriteState ? "Added to Favorites! ❤️" : "Removed from Favorites",
        description: newFavoriteState
          ? `${recipe.title} has been saved to your favorites.`
          : `${recipe.title} has been removed from your favorites.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`transition-all duration-300 ${
        isFavorite ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100" : "hover:bg-red-50 hover:border-red-200"
      }`}
    >
      <Heart
        className={`w-4 h-4 transition-all duration-300 ${
          isFavorite ? "fill-red-500 text-red-500" : ""
        } ${showText ? "mr-2" : ""}`}
      />
      {showText && (isFavorite ? "Saved" : "Save Recipe")}
    </Button>
  )
}
