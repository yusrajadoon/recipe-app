import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChefHat } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-orange-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Recipe Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Sorry, we couldn't find the recipe you're looking for. It might have been removed or doesn't exist.
          </p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600">Back to Recipes</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
