import { VideoTestPanel } from "@/components/video-test-panel"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChefHat } from "lucide-react"

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  MyRecipes - Test Panel
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Feature Testing Dashboard</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Use this panel to verify that all video lessons and subscription features are working correctly
          </p>
        </div>

        <VideoTestPanel />

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/videos">
            <Button
              variant="outline"
              className="w-full h-16 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <div className="text-center">
                <div className="font-semibold">Videos</div>
                <div className="text-sm text-gray-500">Browse lessons</div>
              </div>
            </Button>
          </Link>
          <Link href="/videos/create">
            <Button variant="outline" className="w-full h-16 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <div className="text-center">
                <div className="font-semibold">Create Video</div>
                <div className="text-sm text-gray-500">Upload lesson</div>
              </div>
            </Button>
          </Link>
          <Link href="/subscription">
            <Button
              variant="outline"
              className="w-full h-16 bg-transparent hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            >
              <div className="text-center">
                <div className="font-semibold">Subscription</div>
                <div className="text-sm text-gray-500">View plans</div>
              </div>
            </Button>
          </Link>
          <Link href="/cooks">
            <Button
              variant="outline"
              className="w-full h-16 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <div className="text-center">
                <div className="font-semibold">Cooks</div>
                <div className="text-sm text-gray-500">Browse chefs</div>
              </div>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
