"use client"

export interface FavoriteRecipe {
  id: string
  title: string
  image: string
  addedAt: Date
}

// Client-side favorites management
export class FavoritesManager {
  private static STORAGE_KEY = "myrecipes_favorites"

  static getFavorites(): FavoriteRecipe[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static addFavorite(recipe: Omit<FavoriteRecipe, "addedAt">): void {
    const favorites = this.getFavorites()
    const exists = favorites.find((fav) => fav.id === recipe.id)

    if (!exists) {
      const newFavorite: FavoriteRecipe = {
        ...recipe,
        addedAt: new Date(),
      }
      favorites.push(newFavorite)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites))
    }
  }

  static removeFavorite(recipeId: string): void {
    const favorites = this.getFavorites()
    const filtered = favorites.filter((fav) => fav.id !== recipeId)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
  }

  static isFavorite(recipeId: string): boolean {
    const favorites = this.getFavorites()
    return favorites.some((fav) => fav.id === recipeId)
  }

  static toggleFavorite(recipe: Omit<FavoriteRecipe, "addedAt">): boolean {
    if (this.isFavorite(recipe.id)) {
      this.removeFavorite(recipe.id)
      return false
    } else {
      this.addFavorite(recipe)
      return true
    }
  }
}
