export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookingTime: number
  servings: number
  ingredients: string[]
  instructions: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  rating: number
  tags: string[]
}

// Enhanced recipe data with real images and better content
const recipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Chocolate Chip Cookies",
    description:
      "Soft and chewy chocolate chip cookies that are perfect for any occasion. Made with brown butter for extra flavor and crispy edges.",
    image: "/images/cookies.jpg",
    cookingTime: 25,
    servings: 24,
    difficulty: "Easy",
    category: "Dessert",
    rating: 4.8,
    tags: ["cookies", "dessert", "chocolate", "baking"],
    ingredients: [
      "2¼ cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "¾ cup granulated sugar",
      "¾ cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a medium bowl, whisk together flour, baking soda, and salt.",
      "In a large bowl, cream together butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Gradually blend in the flour mixture.",
      "Stir in chocolate chips.",
      "Drop rounded tablespoons of dough onto ungreased cookie sheets.",
      "Bake for 9-11 minutes or until golden brown.",
      "Cool on baking sheet for 2 minutes before removing to wire rack.",
    ],
  },
  {
    id: "2",
    title: "Creamy Mushroom Risotto",
    description:
      "Rich and creamy Italian risotto with mixed mushrooms and parmesan cheese. A comforting dish perfect for dinner parties.",
    image: "/images/risotto.jpg",
    cookingTime: 45,
    servings: 4,
    difficulty: "Medium",
    category: "Main Course",
    rating: 4.6,
    tags: ["risotto", "italian", "mushroom", "creamy"],
    ingredients: [
      "1½ cups Arborio rice",
      "4 cups warm chicken broth",
      "1 lb mixed mushrooms, sliced",
      "1 medium onion, diced",
      "3 cloves garlic, minced",
      "½ cup white wine",
      "½ cup grated Parmesan cheese",
      "3 tbsp butter",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Heat olive oil in a large pan and sauté mushrooms until golden. Set aside.",
      "In the same pan, melt 1 tbsp butter and sauté onion until translucent.",
      "Add garlic and rice, stirring for 2 minutes until rice is lightly toasted.",
      "Pour in wine and stir until absorbed.",
      "Add warm broth one ladle at a time, stirring constantly until absorbed.",
      "Continue until rice is creamy and tender, about 20-25 minutes.",
      "Stir in mushrooms, remaining butter, and Parmesan cheese.",
      "Season with salt and pepper.",
      "Garnish with fresh parsley and serve immediately.",
    ],
  },
  {
    id: "3",
    title: "Fresh Garden Salad",
    description: "A vibrant and healthy salad with mixed greens, cherry tomatoes, and a homemade vinaigrette dressing.",
    image: "/images/salad.jpg",
    cookingTime: 15,
    servings: 4,
    difficulty: "Easy",
    category: "Salad",
    rating: 4.4,
    tags: ["salad", "healthy", "fresh", "vegetarian"],
    ingredients: [
      "6 cups mixed salad greens",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, sliced",
      "½ red onion, thinly sliced",
      "¼ cup olive oil",
      "2 tbsp balsamic vinegar",
      "1 tsp Dijon mustard",
      "1 tsp honey",
      "Salt and pepper to taste",
      "¼ cup crumbled feta cheese",
    ],
    instructions: [
      "Wash and dry all vegetables thoroughly.",
      "In a large bowl, combine mixed greens, cherry tomatoes, cucumber, and red onion.",
      "In a small bowl, whisk together olive oil, balsamic vinegar, Dijon mustard, and honey.",
      "Season dressing with salt and pepper.",
      "Drizzle dressing over salad and toss gently to coat.",
      "Top with crumbled feta cheese.",
      "Serve immediately.",
    ],
  },
  {
    id: "4",
    title: "Creamy Carbonara Pasta",
    description:
      "Authentic Italian carbonara with crispy pancetta, eggs, and parmesan cheese. Simple yet incredibly delicious.",
    image: "/images/pasta.jpg",
    cookingTime: 20,
    servings: 4,
    difficulty: "Medium",
    category: "Main Course",
    rating: 4.9,
    tags: ["pasta", "italian", "carbonara", "quick"],
    ingredients: [
      "400g spaghetti",
      "200g pancetta, diced",
      "4 large eggs",
      "100g Pecorino Romano cheese, grated",
      "2 cloves garlic, minced",
      "Black pepper to taste",
      "Salt for pasta water",
      "Fresh parsley for garnish",
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions.",
      "While pasta cooks, fry pancetta in a large pan until crispy.",
      "In a bowl, whisk together eggs, cheese, and black pepper.",
      "Reserve 1 cup pasta water before draining.",
      "Add hot pasta to the pan with pancetta.",
      "Remove from heat and quickly stir in egg mixture, adding pasta water as needed.",
      "Toss until creamy and well combined.",
      "Serve immediately with extra cheese and parsley.",
    ],
  },
  {
    id: "5",
    title: "Margherita Pizza",
    description:
      "Classic Neapolitan pizza with fresh mozzarella, basil, and tomato sauce. Perfect for pizza night at home.",
    image: "/images/pizza.jpg",
    cookingTime: 30,
    servings: 2,
    difficulty: "Medium",
    category: "Main Course",
    rating: 4.7,
    tags: ["pizza", "italian", "margherita", "homemade"],
    ingredients: [
      "1 pizza dough ball",
      "½ cup pizza sauce",
      "200g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Flour for dusting",
    ],
    instructions: [
      "Preheat oven to 500°F (260°C) with pizza stone if available.",
      "Roll out pizza dough on floured surface to desired thickness.",
      "Transfer to pizza pan or parchment paper.",
      "Spread sauce evenly, leaving border for crust.",
      "Add mozzarella slices and drizzle with olive oil.",
      "Season with salt and pepper.",
      "Bake for 10-12 minutes until crust is golden and cheese is bubbly.",
      "Top with fresh basil leaves before serving.",
    ],
  },
]

export async function getRecipes(): Promise<Recipe[]> {
  // Simulate async operation
  return Promise.resolve([...recipes])
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const recipe = recipes.find((r) => r.id === id)
  return Promise.resolve(recipe || null)
}

export async function addRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
  const newRecipe: Recipe = {
    ...recipe,
    id: Date.now().toString(),
  }
  recipes.push(newRecipe)
  return Promise.resolve(newRecipe)
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  if (!query.trim()) {
    return Promise.resolve([...recipes])
  }

  const searchTerm = query.toLowerCase().trim()
  const filtered = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      recipe.category.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm)) ||
      recipe.instructions.some((instruction) => instruction.toLowerCase().includes(searchTerm)),
  )
  return Promise.resolve(filtered)
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  const filtered = recipes.filter((recipe) => recipe.category.toLowerCase() === category.toLowerCase())
  return Promise.resolve(filtered)
}

export async function getRecipesByDifficulty(difficulty: string): Promise<Recipe[]> {
  const filtered = recipes.filter((recipe) => recipe.difficulty.toLowerCase() === difficulty.toLowerCase())
  return Promise.resolve(filtered)
}

export function getAllCategories(): string[] {
  return [...new Set(recipes.map((recipe) => recipe.category))]
}

export function getAllTags(): string[] {
  return [...new Set(recipes.flatMap((recipe) => recipe.tags))]
}
