"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import GradientStarsBackground from "@/components/gradient-stars-background"
import { DiscordIcon } from "@/components/icons/discord-icon"
import {
  Trophy,
  Flame,
  ArrowLeft,
  TrendingUp,
  Calendar,
  Eye,
  Instagram,
  Loader2,
  Users,
  Heart,
  Video,
} from "lucide-react"
import Link from "next/link"

interface UserProfileData {
  username: string
  displayName?: string
  avatar: string
  rank: number
  niniScore: number
  videosUploaded: number
  streak: number
  earnings: number
  category?: string
  joinDate: string
  verified: boolean
  autorTotalFollowers?: number | null
  autorTotalLikes?: number | null
  autorTotalVideos?: number | null
  recentSubmissions: {
    id: number
    questTitle: string
    shareUrl: string | null
    state: string
    createdAt: string
    rewards: {
      xp: number
      coins: number
    }[]
  }[]
}

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [userData, setUserData] = useState<UserProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserData(params.username)
  }, [params.username])

  const fetchUserData = async (user: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/profile/${user}`)
      const result = await response.json()

      if (result.success) {
        console.log('Profile data received:', result.data)
        setUserData(result.data)
        setError(null)
      } else {
        setError(result.error || 'Error al cargar el perfil')
        setUserData(null)
      }
    } catch (err) {
      setError('Error al conectar con el servidor')
      setUserData(null)
      console.error('Error fetching profile:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <div className="fixed inset-0 z-0">
          <GradientStarsBackground />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando perfil...</p>
          </div>
        </div>
      </>
    )
  }

  if (error || !userData) {
    return (
      <>
        <div className="fixed inset-0 z-0">
          <GradientStarsBackground />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Usuario no encontrado</h1>
            <p className="text-muted-foreground mb-8">
              {error || `El usuario @${params.username} no existe`}
            </p>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Ranking
              </Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 z-0">
        <GradientStarsBackground />
      </div>

      {/* Social Media Sidebar */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <a href="https://www.instagram.com/ninicreators/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <a href="https://discord.com/invite/p5e4gnHEPH" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <DiscordIcon className="w-5 h-5" />
          </a>
        </Button>
      </div>

      <div className="relative z-10 min-h-screen text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/5 backdrop-blur-sm border-b border-border/30">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <Button variant="ghost" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Link>
              </Button>

              <img src="/logonotnini.png" alt="NINI" className="w-10 h-10 object-contain" />

              <div className="w-10" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 py-12 lg:px-8 lg:py-16">
          <div className="max-w-5xl mx-auto">
            {/* Profile Header */}
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 mb-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.username}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-primary"
                  />
                  {userData.rank <= 3 && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-black">
                      {userData.rank === 1 ? "👑" : `#${userData.rank}`}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                    <h1 className="text-4xl lg:text-5xl font-black">@{userData.username}</h1>
                    {userData.category && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-muted text-muted-foreground">
                        {userData.category}
                      </div>
                    )}
                    {userData.verified && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary">
                        ✓ Verificado
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">
                        Rank <span className="font-bold text-foreground">#{userData.rank}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Desde{" "}
                        <span className="font-bold text-foreground">
                          {new Date(userData.joinDate).toLocaleDateString("es-ES", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <div className="text-3xl font-black text-primary mb-2">{userData.videosUploaded}</div>
                <div className="text-sm text-muted-foreground">Videos Subidos</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <div className="text-3xl font-black text-primary mb-2 flex items-center justify-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" />
                  {userData.streak}
                </div>
                <div className="text-sm text-muted-foreground">Racha Actual</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <div className="text-3xl font-black text-primary mb-2">{userData.earnings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">NINI Coins</div>
              </div>
            </div>

            {/* TikTok Stats Section */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Video className="w-6 h-6" />
                Estadísticas de TikTok
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div className="text-3xl font-black text-foreground">
                      {userData.autorTotalFollowers !== null && userData.autorTotalFollowers !== undefined
                        ? userData.autorTotalFollowers.toLocaleString()
                        : '—'}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Seguidores</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div className="text-3xl font-black text-foreground">
                      {userData.autorTotalLikes !== null && userData.autorTotalLikes !== undefined
                        ? userData.autorTotalLikes.toLocaleString()
                        : '—'}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Likes Totales</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Video className="w-5 h-5 text-primary" />
                    <div className="text-3xl font-black text-foreground">
                      {userData.autorTotalVideos !== null && userData.autorTotalVideos !== undefined
                        ? userData.autorTotalVideos.toLocaleString()
                        : '—'}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Videos en TikTok</div>
                </div>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-black mb-6">Misiones Recientes</h2>
              {userData.recentSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {userData.recentSubmissions.map((submission) => {
                    const totalRewards = submission.rewards.reduce(
                      (acc, r) => ({ xp: acc.xp + r.xp, coins: acc.coins + r.coins }),
                      { xp: 0, coins: 0 }
                    )
                    const stateColors: Record<string, string> = {
                      pending: 'bg-yellow-500/10 text-yellow-500',
                      approved: 'bg-green-500/10 text-green-500',
                      rejected: 'bg-red-500/10 text-red-500',
                    }
                    const stateLabels: Record<string, string> = {
                      pending: 'Pendiente',
                      approved: 'Aprobado',
                      rejected: 'Rechazado',
                    }

                    return (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{submission.questTitle}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${stateColors[submission.state] || stateColors.pending}`}>
                              {stateLabels[submission.state] || submission.state}
                            </span>
                            <span>
                              {new Date(submission.createdAt).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            {submission.shareUrl && (
                              <a
                                href={submission.shareUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-primary hover:underline"
                              >
                                <Eye className="w-3 h-3" />
                                Ver video
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex flex-col gap-1">
                          {totalRewards.xp > 0 && (
                            <div className="text-sm font-bold text-primary">+{totalRewards.xp} XP</div>
                          )}
                          {totalRewards.coins > 0 && (
                            <div className="text-sm font-bold text-primary">+{totalRewards.coins} coins</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No hay misiones completadas todavía
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="mt-8 bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-black mb-4">¿Querés estar en el ranking?</h2>
              <p className="text-muted-foreground mb-6">
                Empezá a subir videos y ganar dinero como @{userData.username}
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-6 font-black"
                asChild
              >
                <a href="https://wa.me/5491157342849?text=Hola!" target="_blank" rel="noopener noreferrer">
                  🚀 EMPEZAR AHORA
                </a>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
