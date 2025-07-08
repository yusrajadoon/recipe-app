"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Pause, RotateCcw, Timer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CookingTimerProps {
  defaultTime?: number // in minutes
}

export function CookingTimer({ defaultTime = 25 }: CookingTimerProps) {
  const [minutes, setMinutes] = useState(defaultTime)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(defaultTime * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(defaultTime * 60)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            // Timer finished
            toast({
              title: "Timer Finished! 🔔",
              description: "Your cooking time is up!",
            })
            // Play notification sound if available
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Cooking Timer", {
                body: "Your cooking time is up!",
                icon: "/favicon.ico",
              })
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, toast])

  const startTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true)
      // Request notification permission
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission()
      }
    }
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(totalSeconds)
  }

  const setCustomTime = () => {
    const newTotalSeconds = minutes * 60 + seconds
    setTotalSeconds(newTotalSeconds)
    setTimeLeft(newTotalSeconds)
    setIsRunning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Timer className="w-5 h-5 text-orange-500" />
          Cooking Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Timer Display */}
        <div className="text-center">
          <div className="text-4xl font-bold font-mono text-gray-900 mb-2">{formatTime(timeLeft)}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer Controls */}
        <div className="flex justify-center gap-2">
          <Button
            onClick={isRunning ? pauseTimer : startTimer}
            disabled={timeLeft === 0}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            onClick={resetTimer}
            variant="outline"
            className="hover:bg-orange-50 hover:border-orange-200 bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Custom Time Input */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="minutes" className="text-xs">
              Minutes
            </Label>
            <Input
              id="minutes"
              type="number"
              min="0"
              max="999"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="h-8 text-sm"
            />
          </div>
          <div>
            <Label htmlFor="seconds" className="text-xs">
              Seconds
            </Label>
            <Input
              id="seconds"
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
              className="h-8 text-sm"
            />
          </div>
        </div>

        <Button
          onClick={setCustomTime}
          variant="outline"
          size="sm"
          className="w-full text-xs hover:bg-blue-50 hover:border-blue-200 bg-transparent"
        >
          Set Custom Time
        </Button>
      </CardContent>
    </Card>
  )
}
