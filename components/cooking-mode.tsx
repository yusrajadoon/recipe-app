"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChefHat,
  Clock,
  Users,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  X,
  Timer,
  Volume2,
  VolumeX,
} from "lucide-react"
import type { Recipe } from "@/lib/recipes"
import { useToast } from "@/hooks/use-toast"

interface CookingModeProps {
  recipe: Recipe
  onClose: () => void
}

export function CookingMode({ recipe, onClose }: CookingModeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>(
    new Array(recipe.ingredients.length).fill(false),
  )
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(recipe.instructions.length).fill(false))
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { toast } = useToast()

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            if (soundEnabled) {
              // Play notification sound
              try {
                const audio = new Audio("/notification.mp3")
                audio.play().catch(() => {
                  // Fallback if audio fails
                  toast({
                    title: "Timer Finished! 🔔",
                    description: "Time's up for this cooking step!",
                  })
                })
              } catch (error) {
                toast({
                  title: "Timer Finished! 🔔",
                  description: "Time's up for this cooking step!",
                })
              }
            }
            toast({
              title: "Timer Finished! 🔔",
              description: "Time's up for this cooking step!",
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timeLeft, soundEnabled, toast])

  const startTimer = (minutes: number) => {
    const totalSeconds = minutes * 60
    setTimeLeft(totalSeconds)
    setIsTimerRunning(true)
  }

  const pauseTimer = () => setIsTimerRunning(false)
  const resumeTimer = () => setIsTimerRunning(true)
  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients]
    newChecked[index] = !newChecked[index]
    setCheckedIngredients(newChecked)
  }

  const completeStep = (index: number) => {
    const newCompleted = [...completedSteps]
    newCompleted[index] = true
    setCompletedSteps(newCompleted)

    if (index === recipe.instructions.length - 1) {
      toast({
        title: "Recipe Complete! 🎉",
        description: "Congratulations! You've finished cooking this recipe.",
      })
    }
  }

  const nextStep = () => {
    if (currentStep < recipe.instructions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / recipe.instructions.length) * 100
  const ingredientsChecked = checkedIngredients.filter(Boolean).length
  const stepsCompleted = completedSteps.filter(Boolean).length

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Cooking Mode</h1>
                <p className="text-orange-100">{recipe.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/20"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                Step {currentStep + 1} of {recipe.instructions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="bg-white/20" />
          </div>
        </div>

        <div className="flex h-[calc(90vh-200px)]">
          {/* Left Panel - Ingredients & Timer */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
            {/* Recipe Info */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2">
                <Clock className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                <div className="text-xs font-semibold">{recipe.cookingTime}m</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-xs font-semibold">{recipe.servings}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                <CheckCircle className="w-4 h-4 text-green-500 mx-auto mb-1" />
                <div className="text-xs font-semibold">
                  {stepsCompleted}/{recipe.instructions.length}
                </div>
              </div>
            </div>

            {/* Timer */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="w-5 h-5 text-orange-500" />
                  Cooking Timer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold">{formatTime(timeLeft)}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => startTimer(5)} variant="outline" className="flex-1">
                    5m
                  </Button>
                  <Button size="sm" onClick={() => startTimer(10)} variant="outline" className="flex-1">
                    10m
                  </Button>
                  <Button size="sm" onClick={() => startTimer(15)} variant="outline" className="flex-1">
                    15m
                  </Button>
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={isTimerRunning ? pauseTimer : resumeTimer}
                    disabled={timeLeft === 0}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button size="sm" onClick={resetTimer} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients Checklist */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Ingredients ({ingredientsChecked}/{recipe.ingredients.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox
                      id={`ingredient-${index}`}
                      checked={checkedIngredients[index]}
                      onCheckedChange={() => toggleIngredient(index)}
                      className="mt-1"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={`text-sm cursor-pointer ${
                        checkedIngredients[index] ? "line-through text-gray-500" : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {ingredient}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Instructions */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto">
              {/* Current Step */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Step {currentStep + 1}</CardTitle>
                    <Badge
                      variant={completedSteps[currentStep] ? "default" : "secondary"}
                      className={completedSteps[currentStep] ? "bg-green-500" : ""}
                    >
                      {completedSteps[currentStep] ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed mb-6">{recipe.instructions[currentStep]}</p>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => completeStep(currentStep)}
                      disabled={completedSteps[currentStep]}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {completedSteps[currentStep] ? "Completed" : "Mark Complete"}
                    </Button>

                    {currentStep < recipe.instructions.length - 1 && (
                      <Button onClick={nextStep} variant="outline">
                        Next Step
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Step Navigation */}
              <div className="flex justify-between items-center mb-6">
                <Button onClick={prevStep} disabled={currentStep === 0} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <span className="text-sm text-gray-500">
                  Step {currentStep + 1} of {recipe.instructions.length}
                </span>

                <Button onClick={nextStep} disabled={currentStep === recipe.instructions.length - 1} variant="outline">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* All Steps Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        index === currentStep
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : completedSteps[index]
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                            completedSteps[index]
                              ? "bg-green-500 text-white"
                              : index === currentStep
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {completedSteps[index] ? "✓" : index + 1}
                        </div>
                        <p className={`text-sm ${completedSteps[index] ? "line-through text-gray-500" : ""}`}>
                          {instruction}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
