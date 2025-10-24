"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Clock, Target, Zap, Calendar } from "lucide-react"

interface EffortSession {
  id: string
  activity: string
  duration: number // in minutes
  timestamp: Date
  category: "planning" | "building" | "marketing" | "learning" | "networking"
  coins: number
}

interface DailyGoal {
  category: string
  targetMinutes: number
  currentMinutes: number
  icon: string
  color: string
}

export function EffortTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [currentActivity, setCurrentActivity] = useState("")
  const [currentCategory, setCurrentCategory] = useState<EffortSession["category"]>("building")
  const [sessionStart, setSessionStart] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sessions, setSessions] = useState<EffortSession[]>([])

  // Daily goals
  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([
    { category: "building", targetMinutes: 120, currentMinutes: 0, icon: "🔨", color: "bg-blue-500" },
    { category: "planning", targetMinutes: 60, currentMinutes: 0, icon: "📋", color: "bg-purple-500" },
    { category: "marketing", targetMinutes: 45, currentMinutes: 0, icon: "📢", color: "bg-pink-500" },
    { category: "learning", targetMinutes: 30, currentMinutes: 0, icon: "📚", color: "bg-green-500" },
    { category: "networking", targetMinutes: 30, currentMinutes: 0, icon: "🤝", color: "bg-yellow-500" },
  ])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTracking && sessionStart) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - sessionStart.getTime()) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking, sessionStart])

  // Update daily goals when sessions change
  useEffect(() => {
    const today = new Date().toDateString()
    const todaySessions = sessions.filter((s) => s.timestamp.toDateString() === today)

    setDailyGoals((prev) =>
      prev.map((goal) => ({
        ...goal,
        currentMinutes: todaySessions
          .filter((s) => s.category === goal.category)
          .reduce((sum, s) => sum + s.duration, 0),
      })),
    )
  }, [sessions])

  const startTracking = () => {
    if (!currentActivity.trim()) return
    setSessionStart(new Date())
    setIsTracking(true)
    setElapsedTime(0)
  }

  const stopTracking = () => {
    if (!sessionStart || !currentActivity.trim()) return

    const duration = Math.floor((Date.now() - sessionStart.getTime()) / 60000) // minutes
    const coins = Math.max(duration * 2, 5) // 2 coins per minute, minimum 5

    const newSession: EffortSession = {
      id: Date.now().toString(),
      activity: currentActivity,
      duration,
      timestamp: new Date(),
      category: currentCategory,
      coins,
    }

    setSessions((prev) => [newSession, ...prev])
    setIsTracking(false)
    setSessionStart(null)
    setCurrentActivity("")
    setElapsedTime(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalTimeToday = sessions
    .filter((s) => s.timestamp.toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.duration, 0)

  const totalCoinsToday = sessions
    .filter((s) => s.timestamp.toDateString() === new Date().toDateString())
    .reduce((sum, s) => sum + s.coins, 0)

  const weeklyStreak = calculateWeeklyStreak()

  function calculateWeeklyStreak(): number {
    const today = new Date()
    let streak = 0

    for (let i = 0; i < 7; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(today.getDate() - i)

      const dayHasActivity = sessions.some(
        (s) => s.timestamp.toDateString() === checkDate.toDateString() && s.duration >= 30,
      )

      if (dayHasActivity) {
        streak++
      } else if (i > 0) {
        break
      }
    }

    return streak
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">{totalTimeToday}</div>
            <div className="text-xs text-muted-foreground">min hoy</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{totalCoinsToday}</div>
            <div className="text-xs text-muted-foreground">coins hoy</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{weeklyStreak}</div>
            <div className="text-xs text-muted-foreground">días seguidos</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Timer */}
      <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Tracker de Esfuerzo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isTracking ? (
            <>
              <input
                type="text"
                placeholder="¿En qué vas a trabajar?"
                value={currentActivity}
                onChange={(e) => setCurrentActivity(e.target.value)}
                className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground"
              />

              <div className="flex gap-2 overflow-x-auto pb-2">
                {["building", "planning", "marketing", "learning", "networking"].map((category) => (
                  <Button
                    key={category}
                    variant={currentCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentCategory(category as EffortSession["category"])}
                    className="flex-shrink-0 text-xs capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <Button
                onClick={startTracking}
                disabled={!currentActivity.trim()}
                className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80"
              >
                <Play className="w-4 h-4 mr-2" />
                Empezar Sesión
              </Button>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-3xl font-bold text-accent">{formatTime(elapsedTime)}</div>
              <div className="text-sm text-muted-foreground">Trabajando en: {currentActivity}</div>
              <div className="text-xs text-accent">
                +{Math.max(Math.floor(elapsedTime / 60) * 2, 5)} coins estimados
              </div>
              <Button onClick={stopTracking} className="bg-red-500 hover:bg-red-600">
                <Pause className="w-4 h-4 mr-2" />
                Terminar Sesión
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Daily Goals */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5" />
            Metas Diarias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dailyGoals.map((goal) => {
            const progress = Math.min((goal.currentMinutes / goal.targetMinutes) * 100, 100)
            const isCompleted = goal.currentMinutes >= goal.targetMinutes

            return (
              <div key={goal.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>{goal.icon}</span>
                    <span className="capitalize">{goal.category}</span>
                    {isCompleted && (
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {goal.currentMinutes}/{goal.targetMinutes}min
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recent Sessions */}
      <Card className="border-secondary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Sesiones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <Zap className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aún no tienes sesiones registradas</p>
              <p className="text-xs">Empieza a trackear tu esfuerzo para ganar coins</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {sessions.slice(0, 10).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{session.activity}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <span className="capitalize">{session.category}</span>
                      <span>•</span>
                      <span>{session.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-accent">+{session.coins}</div>
                    <div className="text-xs text-muted-foreground">{session.duration}min</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
