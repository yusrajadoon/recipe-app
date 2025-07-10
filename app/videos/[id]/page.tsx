import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, Clock, Eye, Heart, Crown, Share2, Download, BookOpen, ChefHat } from "lucide-react"
import { notFound } from "next/navigation"
import { getVideoById, formatDuration, getVideosByCook } from "@/lib/videos"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"
import { VideoPlayer } from "@/components/video-player"
import { SubscriptionGate } from "@/components/subscription-gate"

export default async function VideoDetailsPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)

  if (!video) {
    notFound()
  }

  const relatedVideos = await getVideosByCook(video.cookId)
  const otherVideos = relatedVideos.filter((v) => v.id !== video.id).slice(0, 3)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/videos">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Videos
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MyRecipes
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <SimpleThemeToggle />
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="overflow-hidden shadow-2xl border-0 bg-white dark:bg-gray-800">
              <div className="aspect-video relative">
                {video.isPremium ? (
                  <SubscriptionGate>
                    <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail} />
                  </SubscriptionGate>
                ) : (
                  <VideoPlayer videoUrl={video.videoUrl} thumbnail={video.thumbnail} />
                )}
              </div>
            </Card>

            {/* Video Info */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
                      {video.isPremium && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                      <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                        {video.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {video.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(video.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{video.likes.toLocaleString()} likes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardDescription className="text-base leading-relaxed dark:text-gray-300">
                  {video.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Cook Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6">
                  <Image
                    src={video.cookAvatar || "/placeholder.svg"}
                    alt={video.cookName}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{video.cookName}</h3>
                    <p className="text-gray-600 dark:text-gray-300">Professional Chef</p>
                  </div>
                  <Button variant="outline">Follow</Button>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Related Recipe */}
                {video.recipeId && (
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Related Recipe</h4>
                    <Link href={`/recipe/${video.recipeId}`}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Recipe Details
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* More from this Cook */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">More from {video.cookName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {otherVideos.map((relatedVideo) => (
                  <Link key={relatedVideo.id} href={`/videos/${relatedVideo.id}`}>
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                      <div className="relative w-20 h-14 flex-shrink-0">
                        <Image
                          src={relatedVideo.thumbnail || "/placeholder.svg"}
                          alt={relatedVideo.title}
                          fill
                          className="object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {relatedVideo.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDuration(relatedVideo.duration)}
                          </span>
                          {relatedVideo.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {!video.isPremium && (
              <Card className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Crown className="w-5 h-5" />
                    Unlock Premium Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-100 mb-4">
                    Get access to exclusive premium video lessons and advanced cooking techniques.
                  </p>
                  <Link href="/subscription">
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">Upgrade Now</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
