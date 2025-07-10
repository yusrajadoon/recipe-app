import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Video, Calendar, CheckCircle, Play, Clock, Eye, Heart, Crown, ChefHat } from "lucide-react"
import { notFound } from "next/navigation"
import { getCookById, getVideosByCook, formatDuration } from "@/lib/videos"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"

export default async function CookProfilePage({ params }: { params: { id: string } }) {
  const cook = await getCookById(params.id)

  if (!cook) {
    notFound()
  }

  const cookVideos = await getVideosByCook(cook.id)

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/cooks">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cooks
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
            <SimpleThemeToggle />
          </div>
        </div>
      </nav>

      {/* Cook Profile Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="relative">
                  <Image
                    src={cook.avatar || "/placeholder.svg"}
                    alt={cook.name}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                  {cook.isVerified && (
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{cook.name}</h1>
                    {cook.isVerified && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Verified Chef
                      </Badge>
                    )}
                  </div>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">{cook.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">{cook.totalVideos}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Videos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {cook.totalSubscribers.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {new Date(cook.joinedAt).getFullYear()}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Joined</div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {cook.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      <Users className="w-4 h-4 mr-2" />
                      Follow Chef
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Session
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cook's Videos */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Video Lessons by {cook.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {cookVideos.length} video{cookVideos.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {cookVideos.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent>
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">No Videos Yet</CardTitle>
              <CardDescription className="dark:text-gray-300">
                This chef hasn't uploaded any video lessons yet. Check back soon!
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cookVideos.map((video, index) => (
              <Card
                key={video.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-green-600 ml-1" />
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={getDifficultyColor(video.difficulty)}>{video.difficulty}</Badge>
                    {video.isPremium && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(video.duration)}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed dark:text-gray-300">
                    {video.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{video.likes.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {video.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link href={`/videos/${video.id}`} className="w-full">
                    <Button
                      className={`w-full transition-all duration-300 ${
                        video.isPremium
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                          : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                      }`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {video.isPremium ? "Watch Premium" : "Watch Free"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
