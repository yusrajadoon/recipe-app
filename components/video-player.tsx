"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react"

interface VideoPlayerProps {
  videoUrl: string
  thumbnail: string
}

export function VideoPlayer({ videoUrl, thumbnail }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div
      className="relative w-full h-full bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full">
          <Image src={thumbnail || "/placeholder.svg"} alt="Video thumbnail" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button
              onClick={handlePlay}
              size="lg"
              className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-black hover:text-black shadow-2xl"
            >
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full">
          {/* Mock video player */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8" />
              </div>
              <p className="text-lg font-medium">Video Playing</p>
              <p className="text-sm text-gray-300 mt-2">This is a demo player</p>
            </div>
          </div>

          {/* Video Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button onClick={handlePlay} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button onClick={handleMute} size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                <span className="text-white text-sm">0:00 / 8:30</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="w-full bg-white/30 rounded-full h-1">
                <div className="bg-red-500 h-1 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
