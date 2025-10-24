import { Button } from "@/components/ui/button"
import GradientStarsBackground from "@/components/gradient-stars-background"
import {
  Trophy,
  Flame,
  ArrowLeft,
  TrendingUp,
  Calendar,
  Eye,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

interface UserProfileData {
  username: string
  avatar: string
  rank: number
  niniScore: number
  videosUploaded: number
  streak: number
  earnings: number
  bestStreak: number
  totalViews: number
  joinDate: string
  trend: "up" | "down" | "same"
  rankChange: number
  recentVideos: {
    id: number
    title: string
    views: number
    earnings: number
    uploadDate: string
  }[]
}

// Mock data - en producción esto vendría de una API/base de datos
const getUserData = (username: string): UserProfileData | null => {
  const users: Record<string, UserProfileData> = {
    viral_queen: {
      username: "viral_queen",
      avatar: "/nato-desatado.png",
      rank: 1,
      niniScore: 98,
      videosUploaded: 127,
      streak: 45,
      earnings: 12847.5,
      bestStreak: 52,
      totalViews: 2847563,
      joinDate: "2024-01-15",
      trend: "up",
      rankChange: 2,
      recentVideos: [
        { id: 1, title: "Morning Routine 2025", views: 45678, earnings: 234.5, uploadDate: "2025-01-04" },
        { id: 2, title: "Tech Setup Tour", views: 38921, earnings: 198.3, uploadDate: "2025-01-03" },
        { id: 3, title: "Day in My Life", views: 52341, earnings: 267.8, uploadDate: "2025-01-02" },
      ],
    },
    meme_king: {
      username: "meme_king",
      avatar: "/byron-pixel.png",
      rank: 2,
      niniScore: 96,
      videosUploaded: 115,
      streak: 38,
      earnings: 10234.8,
      bestStreak: 45,
      totalViews: 1923456,
      joinDate: "2024-02-01",
      trend: "same",
      rankChange: 0,
      recentVideos: [
        { id: 1, title: "Meme Compilation #47", views: 67890, earnings: 345.2, uploadDate: "2025-01-04" },
        { id: 2, title: "Funny Moments", views: 45123, earnings: 230.1, uploadDate: "2025-01-03" },
        { id: 3, title: "Best Memes 2025", views: 78234, earnings: 398.7, uploadDate: "2025-01-02" },
      ],
    },
    content_master: {
      username: "content_master",
      avatar: "/byron-mecha.png",
      rank: 3,
      niniScore: 94,
      videosUploaded: 98,
      streak: 42,
      earnings: 9876.3,
      bestStreak: 48,
      totalViews: 1654321,
      joinDate: "2024-01-20",
      trend: "up",
      rankChange: 1,
      recentVideos: [
        { id: 1, title: "Content Strategy 2025", views: 34567, earnings: 176.4, uploadDate: "2025-01-04" },
        { id: 2, title: "How I Edit Videos", views: 29876, earnings: 152.3, uploadDate: "2025-01-03" },
        { id: 3, title: "My Workflow", views: 41234, earnings: 210.2, uploadDate: "2025-01-02" },
      ],
    },
  }

  return users[username] || null
}

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const userData = getUserData(username)

  if (!userData) {
    return (
      <>
        <div className="fixed inset-0 z-0">
          <GradientStarsBackground />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Usuario no encontrado</h1>
            <p className="text-muted-foreground mb-8">El usuario @{username} no existe</p>
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
          <a href="https://instagram.com/nini" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <a href="https://twitter.com/nini" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <a href="https://youtube.com/@nini" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-background/80 backdrop-blur-sm border border-border hover:border-primary hover:bg-primary/10 transition-all"
          asChild
        >
          <a href="https://discord.gg/nini" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <MessageCircle className="w-5 h-5" />
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
                    {userData.trend !== "same" && (
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                          userData.trend === "up" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        <TrendingUp className={`w-4 h-4 ${userData.trend === "down" ? "rotate-180" : ""}`} />
                        {userData.trend === "up" ? "+" : "-"}
                        {Math.abs(userData.rankChange)} posiciones
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
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

                  <div className="text-6xl lg:text-7xl font-black text-primary mb-2">{userData.niniScore}</div>
                  <div className="text-sm text-muted-foreground">NINI Score</div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                <div className="text-3xl font-black text-primary mb-2">${userData.earnings.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Ganancias Totales</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                <div className="text-3xl font-black text-primary mb-2 flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  {(userData.totalViews / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Vistas Totales</div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Mejor Racha</span>
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div className="text-3xl font-black">{userData.bestStreak} días</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Promedio por Video</span>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl font-black text-primary">
                  ${(userData.earnings / userData.videosUploaded).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Recent Videos */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="text-2xl font-black mb-6">Videos Recientes</h2>
              <div className="space-y-4">
                {userData.recentVideos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{video.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {video.views.toLocaleString()} vistas
                        </span>
                        <span>
                          {new Date(video.uploadDate).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-primary">${video.earnings.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
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
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
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
