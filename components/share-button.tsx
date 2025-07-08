"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, Copy, Facebook, Twitter, Mail, Link } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShareButtonProps {
  recipe: {
    id: string
    title: string
    description: string
  }
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  showText?: boolean
}

export function ShareButton({ recipe, variant = "outline", size = "sm", showText = false }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const recipeUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/recipe/${recipe.id}`
  const shareText = `Check out this amazing recipe: ${recipe.title} - ${recipe.description}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recipeUrl)
      toast({
        title: "Link Copied! 📋",
        description: "Recipe link has been copied to your clipboard.",
      })
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(recipeUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setIsOpen(false)
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(recipeUrl)}`
    window.open(url, "_blank", "width=600,height=400")
    setIsOpen(false)
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Recipe: ${recipe.title}`)
    const body = encodeURIComponent(`${shareText}\n\n${recipeUrl}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
    setIsOpen(false)
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: shareText,
          url: recipeUrl,
        })
        setIsOpen(false)
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="hover:bg-blue-50 hover:border-blue-200">
          <Share2 className={`w-4 h-4 ${showText ? "mr-2" : ""}`} />
          {showText && "Share Recipe"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareNative} className="cursor-pointer">
          <Link className="w-4 h-4 mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
          <Facebook className="w-4 h-4 mr-2" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareViaEmail} className="cursor-pointer">
          <Mail className="w-4 h-4 mr-2" />
          Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
