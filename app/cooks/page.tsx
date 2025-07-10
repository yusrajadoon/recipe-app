import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Video, ChefHat, CheckCircle } from "lucide-react"
import { getCooks } from "@/lib/videos"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"

export default async function CooksPage() {
  const cooks = await getCooks()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
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
                <Link
                  href="/videos"
                  className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  Video Lessons
                </Link>
                <Link href="/cooks" className="text-orange-600 dark:text-orange-400 font-medium">
                  Cooks
                </Link>
              </div>
            </div>
            <SimpleThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Expert Chefs
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn from professional chefs and culinary experts who share their knowledge through video lessons
          </p>
        </div>
      </section>

      {/* Cooks Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cooks.map((cook, index) => (
            <Card
              key={cook.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <Image
                    src={cook.avatar || "/placeholder.svg"}
                    alt={cook.name}
                    width={80}
                    height={80}
                    className="rounded-full mx-auto"
                  />
                  {cook.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {cook.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {cook.bio}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {cook.specialties.slice(0, 2).map((specialty) => (
                      <Badge
                        key={specialty}
                        variant="secondary"
                        className="text-xs dark:bg-gray-700 dark:text-gray-300"
                      >
                        {specialty}
                      </Badge>
                    ))}
                    {cook.specialties.length > 2 && (
                      <Badge variant="secondary" className="text-xs dark:bg-gray-700 dark:text-gray-300">
                        +{cook.specialties.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <Video className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">{cook.totalVideos}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Videos</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {cook.totalSubscribers.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href={`/cooks/${cook.id}`} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 dark:hover:from-green-900/20 dark:hover:to-blue-900/20 hover:border-green-300 dark:hover:border-green-600 bg-transparent transition-all duration-300"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
