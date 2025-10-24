"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Coins, Flame, Trophy, Loader2 } from "lucide-react"

interface RankingUser {
  rank: number
  username: string
  avatar: string
  videos: number
  streak: number
  earnings: number
  niniScore: number
  verified: boolean
}

export function SocialRanking() {
  const [users, setUsers] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRanking()
  }, [])

  const fetchRanking = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ranking')
      const result = await response.json()

      if (result.success) {
        setUsers(result.data)
        setError(null)
      } else {
        setError(result.error || 'Error al cargar el ranking')
      }
    } catch (err) {
      setError('Error al conectar con el servidor')
      console.error('Error fetching ranking:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Cargando ranking...</p>
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive/50">
        <div className="text-center">
          <p className="text-destructive mb-3">{error}</p>
          <Button onClick={fetchRanking} size="sm">
            Reintentar
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
          Ranking NINI
        </h2>
        <p className="text-sm text-muted-foreground">Creadores destacados de la comunidad</p>
      </div>

      {/* Top 3 Podium */}
      {users.length >= 3 && (
        <div className="flex justify-center items-end gap-2 mb-6">
          {[users[1], users[0], users[2]].map((user, index) => {
            if (!user) return null
            const actualPosition = [2, 1, 3][index]
            const heights = ["h-16", "h-20", "h-12"]
            const bgColors = [
              "bg-gradient-to-br from-gray-300 to-gray-500",
              "bg-gradient-to-br from-yellow-300 to-yellow-600",
              "bg-gradient-to-br from-amber-600 to-amber-800",
            ]
            const textSizes = ["text-2xl", "text-3xl", "text-xl"]

            return (
              <div key={user.rank} className="text-center">
                <div
                  className={`w-16 ${heights[index]} ${bgColors[index]} rounded-t-lg flex items-end justify-center pb-2 ${index === 1 ? "animate-pulse" : ""}`}
                >
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className={`${textSizes[index]} rounded-full w-12 h-12 object-cover`}
                  />
                </div>
                <div
                  className={`${index === 1 ? "bg-yellow-500" : index === 0 ? "bg-gray-500" : "bg-amber-700"} text-white text-xs py-1 px-2 rounded-b ${index === 1 ? "font-bold" : ""}`}
                >
                  {actualPosition}°
                </div>
                <p className={`text-xs ${index === 1 ? "font-bold" : "font-medium"} mt-1 truncate max-w-[64px]`}>
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                  <Trophy className="w-3 h-3" />
                  {user.niniScore}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Full Leaderboard */}
      <Card className="p-4">
        <div className="space-y-3">
          {users.map((user, index) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 p-3 rounded-lg transition-all bg-card/50 hover:bg-card/80"
            >
              {/* Rank */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index === 0
                    ? "bg-yellow-500 text-white"
                    : index === 1
                      ? "bg-gray-400 text-white"
                      : index === 2
                        ? "bg-amber-600 text-white"
                        : "bg-muted text-muted-foreground"
                }`}
              >
                {user.rank}
              </div>

              {/* Avatar */}
              <img
                src={user.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{user.username}</p>
                  {user.verified && <Badge variant="secondary" className="text-xs">✓</Badge>}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    {user.videos}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {user.streak} días
                  </span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    {user.earnings}
                  </span>
                </div>
              </div>

              {/* NINI Score */}
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-primary" />
                  <p className="font-bold text-lg text-primary">{user.niniScore}</p>
                </div>
                <p className="text-xs text-muted-foreground">NINI Score</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {users.length === 0 && !loading && (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No hay usuarios en el ranking todavía</p>
        </Card>
      )}

      {/* Refresh Button */}
      <Button
        onClick={fetchRanking}
        className="w-full bg-gradient-to-r from-secondary to-accent"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Actualizando...
          </>
        ) : (
          'Actualizar Ranking'
        )}
      </Button>
    </div>
  )
}
