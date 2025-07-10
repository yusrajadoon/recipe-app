import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Clock, Eye, Heart, Crown, Search, Filter, ChefHat } from "lucide-react"
import { getVideoLessons, getVideoCategories, formatDuration } from "@/lib/videos"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"

export default async function VideosPage() {
  const videos = await getVideoLessons()
  const categories = getVideoCategories()

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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MyRecipes
                </h1>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Recipes
                </Link>
                <Link href="/videos" className="text-orange-600 dark:text-orange-400 font-medium">
                  Video Lessons
                </Link>
                <Link
                  href="/cooks"
                  className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Cooks
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <SimpleThemeToggle />
              <Link href="/subscription">
                <Button variant="outline" className="hidden sm:flex bg-transparent">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade
                </Button>
              </Link>
              <Link href="/videos/create">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Create Video
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Master Cooking with{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Video Lessons
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn from professional chefs with step-by-step video tutorials and advanced cooking techniques
          </p>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search video lessons..."
                  className="pl-10 h-12 text-lg border-2 border-gray-200 dark:border-gray-700 focus:border-purple-400 dark:focus:border-purple-500"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48 h-12 border-2 border-gray-200 dark:border-gray-700">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-48 h-12 border-2 border-gray-200 dark:border-gray-700">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{videos.length}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Total Videos</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {videos.filter((v) => !v.isPremium).length}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Free Videos</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {videos.filter((v) => v.isPremium).length}
              </div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">Premium Videos</div>
            </CardContent>
          </Card>
          <Card className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
            <CardContent className="p-0">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.round(videos.reduce((acc, video) => acc + video.duration, 0) / 60)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">Total Minutes</div>
            </CardContent>
          </Card>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
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
                    <Play className="w-8 h-8 text-purple-600 ml-1" />
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
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {video.title}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 text-sm leading-relaxed dark:text-gray-300">
                  {video.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Cook Info */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={video.cookAvatar || "/placeholder.svg"}
                    alt={video.cookName}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{video.cookName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{video.category}</p>
                  </div>
                </div>

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
                        : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
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
      </main>
    </div>
  )
}
