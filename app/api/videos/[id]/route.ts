import { type NextRequest, NextResponse } from "next/server"
import { getVideoById } from "@/lib/videos"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const video = await getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error("Error fetching video:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const video = await getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Update video logic would go here
    // For now, just return the updated video
    const updatedVideo = { ...video, ...body }

    return NextResponse.json(updatedVideo)
  } catch (error) {
    console.error("Error updating video:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const video = await getVideoById(params.id)

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 })
    }

    // Delete video logic would go here

    return NextResponse.json({ message: "Video deleted successfully" })
  } catch (error) {
    console.error("Error deleting video:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
