export interface VideoLesson {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  duration: number // in seconds
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  tags: string[]
  cookId: string
  cookName: string
  cookAvatar: string
  isPremium: boolean
  views: number
  likes: number
  createdAt: string
  recipeId?: string // Optional link to recipe
}

export interface Cook {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  specialties: string[]
  totalVideos: number
  totalSubscribers: number
  isVerified: boolean
  joinedAt: string
}

export interface Subscription {
  id: string
  userId: string
  plan: "free" | "premium" | "pro"
  status: "active" | "cancelled" | "expired"
  startDate: string
  endDate: string
  price: number
}

// Mock data for video lessons
const videoLessons: VideoLesson[] = [
  {
    id: "1",
    title: "Perfect Pasta Carbonara Technique",
    description:
      "Learn the authentic Italian technique for making creamy carbonara without cream. Master the art of tempering eggs and creating the perfect silky sauce.",
    thumbnail: "/images/video-thumbnails/carbonara.jpg",
    videoUrl: "https://example.com/videos/carbonara.mp4",
    duration: 480, // 8 minutes
    difficulty: "Intermediate",
    category: "Italian Cuisine",
    tags: ["pasta", "italian", "carbonara", "technique"],
    cookId: "cook1",
    cookName: "Chef Marco Romano",
    cookAvatar: "/images/cooks/marco.jpg",
    isPremium: true,
    views: 15420,
    likes: 1240,
    createdAt: "2024-01-15",
    recipeId: "4",
  },
  {
    id: "2",
    title: "Knife Skills Masterclass",
    description:
      "Essential knife techniques every home cook should know. From basic cuts to advanced julienne and chiffonade techniques.",
    thumbnail: "/images/video-thumbnails/knife-skills.jpg",
    videoUrl: "https://example.com/videos/knife-skills.mp4",
    duration: 720, // 12 minutes
    difficulty: "Beginner",
    category: "Cooking Basics",
    tags: ["knife skills", "basics", "technique", "safety"],
    cookId: "cook2",
    cookName: "Chef Sarah Johnson",
    cookAvatar: "/images/cooks/sarah.jpg",
    isPremium: false,
    views: 28350,
    likes: 2180,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Advanced Bread Making Techniques",
    description:
      "Master the art of artisan bread making with advanced fermentation techniques, shaping methods, and scoring patterns.",
    thumbnail: "/images/video-thumbnails/bread-making.jpg",
    videoUrl: "https://example.com/videos/bread-making.mp4",
    duration: 1200, // 20 minutes
    difficulty: "Advanced",
    category: "Baking",
    tags: ["bread", "baking", "fermentation", "artisan"],
    cookId: "cook3",
    cookName: "Chef David Baker",
    cookAvatar: "/images/cooks/david.jpg",
    isPremium: true,
    views: 9850,
    likes: 890,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    title: "Quick Weeknight Stir-Fry",
    description:
      "Learn how to create delicious and healthy stir-fries in under 15 minutes using simple ingredients and proper technique.",
    thumbnail: "/images/video-thumbnails/stir-fry.jpg",
    videoUrl: "https://example.com/videos/stir-fry.mp4",
    duration: 360, // 6 minutes
    difficulty: "Beginner",
    category: "Quick Meals",
    tags: ["stir-fry", "quick", "healthy", "asian"],
    cookId: "cook2",
    cookName: "Chef Sarah Johnson",
    cookAvatar: "/images/cooks/sarah.jpg",
    isPremium: false,
    views: 22100,
    likes: 1650,
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "French Pastry Fundamentals",
    description:
      "Master the basics of French pastry making including pâte brisée, pâte sucrée, and choux pastry techniques.",
    thumbnail: "/images/video-thumbnails/french-pastry.jpg",
    videoUrl: "https://example.com/videos/french-pastry.mp4",
    duration: 900, // 15 minutes
    difficulty: "Advanced",
    category: "Pastry",
    tags: ["french", "pastry", "baking", "technique"],
    cookId: "cook4",
    cookName: "Chef Marie Dubois",
    cookAvatar: "/images/cooks/marie.jpg",
    isPremium: true,
    views: 12300,
    likes: 980,
    createdAt: "2024-01-05",
  },
]

// Mock data for cooks
const cooks: Cook[] = [
  {
    id: "cook1",
    name: "Chef Marco Romano",
    email: "marco@example.com",
    avatar: "/images/cooks/marco.jpg",
    bio: "Italian cuisine specialist with 15 years of experience in Michelin-starred restaurants.",
    specialties: ["Italian Cuisine", "Pasta Making", "Wine Pairing"],
    totalVideos: 24,
    totalSubscribers: 15600,
    isVerified: true,
    joinedAt: "2023-06-15",
  },
  {
    id: "cook2",
    name: "Chef Sarah Johnson",
    email: "sarah@example.com",
    avatar: "/images/cooks/sarah.jpg",
    bio: "Home cooking expert focused on quick, healthy, and family-friendly recipes.",
    specialties: ["Quick Meals", "Healthy Cooking", "Family Recipes"],
    totalVideos: 18,
    totalSubscribers: 22400,
    isVerified: true,
    joinedAt: "2023-08-20",
  },
  {
    id: "cook3",
    name: "Chef David Baker",
    email: "david@example.com",
    avatar: "/images/cooks/david.jpg",
    bio: "Master baker specializing in artisan breads and traditional baking techniques.",
    specialties: ["Bread Making", "Artisan Baking", "Fermentation"],
    totalVideos: 12,
    totalSubscribers: 8900,
    isVerified: true,
    joinedAt: "2023-09-10",
  },
  {
    id: "cook4",
    name: "Chef Marie Dubois",
    email: "marie@example.com",
    avatar: "/images/cooks/marie.jpg",
    bio: "French pastry chef with expertise in classical French techniques and modern innovations.",
    specialties: ["French Pastry", "Desserts", "Chocolate Work"],
    totalVideos: 16,
    totalSubscribers: 11200,
    isVerified: true,
    joinedAt: "2023-07-05",
  },
]

// API Functions
export async function getVideoLessons(): Promise<VideoLesson[]> {
  return Promise.resolve([...videoLessons])
}

export async function getVideoById(id: string): Promise<VideoLesson | null> {
  const video = videoLessons.find((v) => v.id === id)
  return Promise.resolve(video || null)
}

export async function getVideosByCategory(category: string): Promise<VideoLesson[]> {
  const filtered = videoLessons.filter((v) => v.category.toLowerCase() === category.toLowerCase())
  return Promise.resolve(filtered)
}

export async function getVideosByCook(cookId: string): Promise<VideoLesson[]> {
  const filtered = videoLessons.filter((v) => v.cookId === cookId)
  return Promise.resolve(filtered)
}

export async function getPremiumVideos(): Promise<VideoLesson[]> {
  const filtered = videoLessons.filter((v) => v.isPremium)
  return Promise.resolve(filtered)
}

export async function getFreeVideos(): Promise<VideoLesson[]> {
  const filtered = videoLessons.filter((v) => !v.isPremium)
  return Promise.resolve(filtered)
}

export async function searchVideos(query: string): Promise<VideoLesson[]> {
  if (!query.trim()) {
    return Promise.resolve([...videoLessons])
  }

  const searchTerm = query.toLowerCase().trim()
  const filtered = videoLessons.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm) ||
      video.description.toLowerCase().includes(searchTerm) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      video.category.toLowerCase().includes(searchTerm) ||
      video.cookName.toLowerCase().includes(searchTerm),
  )
  return Promise.resolve(filtered)
}

export async function getCooks(): Promise<Cook[]> {
  return Promise.resolve([...cooks])
}

export async function getCookById(id: string): Promise<Cook | null> {
  const cook = cooks.find((c) => c.id === id)
  return Promise.resolve(cook || null)
}

export async function addVideoLesson(
  video: Omit<VideoLesson, "id" | "views" | "likes" | "createdAt">,
): Promise<VideoLesson> {
  const newVideo: VideoLesson = {
    ...video,
    id: Date.now().toString(),
    views: 0,
    likes: 0,
    createdAt: new Date().toISOString().split("T")[0],
  }
  videoLessons.push(newVideo)
  return Promise.resolve(newVideo)
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export function getVideoCategories(): string[] {
  return [...new Set(videoLessons.map((video) => video.category))]
}
