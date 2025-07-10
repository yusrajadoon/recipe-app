import { type NextRequest, NextResponse } from "next/server"
import { getVideoLessons, addVideoLesson } from "@/lib/videos"

export async function GET() {
  const videos = await getVideoLessons()
  return NextResponse.json(videos)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newVideo = await addVideoLesson({
      title: body.title,
      description: body.description,
      thumbnail: body.thumbnail || "/placeholder.svg?height=300&width=400",
      videoUrl: body.videoUrl,
      duration: body.duration,
      difficulty: body.difficulty || "Beginner",
      category: body.category || "Cooking Basics",
      tags: body.tags || [],
      cookId: body.cookId || "cook1",
      cookName: body.cookName || "Chef User",
      cookAvatar: body.cookAvatar || "/placeholder.svg",
      isPremium: body.isPremium || false,
      recipeId: body.recipeId,
    })

    return NextResponse.json(newVideo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
