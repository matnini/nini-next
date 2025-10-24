"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Users, Eye } from "lucide-react"

interface Founder {
  id: number
  name: string
  avatar: string
  startupName: string
  revenue: number
  monthlyGrowth: number
  totalEffort: number // hours
  validatedVideos: number
  followers: number
  rank: number
  isUser?: boolean
  category: "saas" | "ecommerce" | "fintech" | "healthtech" | "edtech"
}

const founders: Founder[] = [
  {
    id: 1,
    name: "Sofia_Builder",
    avatar: "🚀",
    startupName: "EcoTrack",
    revenue: 15420,
    monthlyGrowth: 23.5,
    totalEffort: 340,
    validatedVideos: 12,
    followers: 1250,
    rank: 1,
    category: "saas",
  },
  {
    id: 2,
    name: "Marcus_Hustle",
    avatar: "💎",
    startupName: "FitAI",
    revenue: 12800,
    monthlyGrowth: 18.2,
    totalEffort: 280,
    validatedVideos: 8,
    followers: 890,
    rank: 2,
    category: "healthtech",
  },
  {
    id: 3,
    name: "Luna_Code",
    avatar: "⚡",
    startupName: "StudyBuddy",
    revenue: 9650,
    monthlyGrowth: 31.7,
    totalEffort: 220,
    validatedVideos: 15,
    followers: 670,
    rank: 3,
    category: "edtech",
  },
  {
    id: 4,
    name: "Tú",
    avatar: "🔥",
    startupName: "Mi Startup",
    revenue: 3200,
    monthlyGrowth: 45.8,
    totalEffort: 150,
    validatedVideos: 4,
    followers: 120,
    rank: 8,
    isUser: true,
    category: "saas",
  },
  {
    id: 5,
    name: "Alex_Fintech",
    avatar: "💰",
    startupName: "CryptoEasy",
    revenue: 8900,
    monthlyGrowth: 12.4,
    totalEffort: 310,
    validatedVideos: 6,
    followers: 540,
    rank: 4,
    category: "fintech",
  },
  {
    id: 6,
    name: "Zara_Commerce",
    avatar: "🛍️",
    startupName: "LocalMarket",
    revenue: 7200,
    monthlyGrowth: 28.1,
    totalEffort: 190,
    validatedVideos: 9,
    followers: 430,
    rank: 5,
    category: "ecommerce",
  },
  {
    id: 7,
    name: "Neo_Growth",
    avatar: "📈",
    startupName: "GrowthHack",
    revenue: 5800,
    monthlyGrowth: 22.3,
    totalEffort: 260,
    validatedVideos: 7,
    followers: 380,
    rank: 6,
    category: "saas",
  },
  {
    id: 8,
    name: "Maya_Health",
    avatar: "🏥",
    startupName: "WellnessApp",
    revenue: 4100,
    monthlyGrowth: 35.6,
    totalEffort: 180,
    validatedVideos: 11,
    followers: 290,
    rank: 7,
    category: "healthtech",
  },
]

const categoryColors = {
  saas: "bg-blue-500/20 text-blue-400",
  ecommerce: "bg-green-500/20 text-green-400",
  fintech: "bg-yellow-500/20 text-yellow-400",
  healthtech: "bg-red-500/20 text-red-400",
  edtech: "bg-purple-500/20 text-purple-400",
}

export function SocialRanking() {
  const [sortBy, setSortBy] = useState<"revenue" | "growth" | "effort">("revenue")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredFounders = founders
    .filter((f) => selectedCategory === "all" || f.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "revenue":
          return b.revenue - a.revenue
        case "growth":
          return b.monthlyGrowth - a.monthlyGrowth
        case "effort":
          return b.totalEffort - a.totalEffort
        default:
          return a.rank - b.rank
      }
    })

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}k`
    }
    return `$${revenue}`
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
          Ranking de Revenue
        </h2>
        <p className="text-sm text-muted-foreground">Founders reales generando dinero real</p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={sortBy === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("revenue")}
            className="flex-shrink-0 text-xs"
          >
            <DollarSign className="w-3 h-3 mr-1" />
            Revenue
          </Button>
          <Button
            variant={sortBy === "growth" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("growth")}
            className="flex-shrink-0 text-xs"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Crecimiento
          </Button>
          <Button
            variant={sortBy === "effort" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("effort")}
            className="flex-shrink-0 text-xs"
          >
            ⚡ Esfuerzo
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="flex-shrink-0 text-xs"
          >
            Todas
          </Button>
          {Object.keys(categoryColors).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex-shrink-0 text-xs capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 mb-6">
        {filteredFounders.slice(0, 3).map((founder, index) => {
          const positions = [1, 0, 2] // 2nd, 1st, 3rd
          const actualIndex = positions[index]
          const heights = ["h-16", "h-20", "h-12"]
          const bgColors = [
            "bg-gradient-to-br from-gray-300 to-gray-500",
            "bg-gradient-to-br from-yellow-300 to-yellow-600",
            "bg-gradient-to-br from-amber-600 to-amber-800",
          ]
          const textSizes = ["text-2xl", "text-3xl", "text-xl"]

          return (
            <div key={founder.id} className="text-center">
              <div
                className={`w-16 ${heights[actualIndex]} ${bgColors[actualIndex]} rounded-t-lg flex items-end justify-center pb-2 ${actualIndex === 1 ? "animate-pulse-glow" : ""}`}
              >
                <span className={textSizes[actualIndex]}>{founder.avatar}</span>
              </div>
              <div
                className={`${actualIndex === 1 ? "bg-yellow-500" : actualIndex === 0 ? "bg-gray-500" : "bg-amber-700"} text-white text-xs py-1 px-2 rounded-b ${actualIndex === 1 ? "font-bold" : ""}`}
              >
                {actualIndex + 1}°
              </div>
              <p className={`text-xs ${actualIndex === 1 ? "font-bold" : "font-medium"} mt-1`}>{founder.name}</p>
              <p className="text-xs text-muted-foreground">{formatRevenue(founder.revenue)}/mes</p>
            </div>
          )
        })}
      </div>

      {/* Full Leaderboard */}
      <Card className="p-4">
        <div className="space-y-3">
          {filteredFounders.map((founder, index) => (
            <div
              key={founder.id}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                founder.isUser
                  ? "bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30"
                  : "bg-card/50 hover:bg-card/80"
              }`}
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
                {index + 1}
              </div>

              {/* Avatar */}
              <div className="text-2xl">{founder.avatar}</div>

              {/* Founder Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${founder.isUser ? "text-accent" : ""}`}>{founder.name}</p>
                  {founder.isUser && <Badge className="text-xs">Tú</Badge>}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground">{founder.startupName}</span>
                  <Badge className={`text-xs ${categoryColors[founder.category]}`}>{founder.category}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />+{founder.monthlyGrowth}%
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {founder.followers}
                  </span>
                  <span>⚡ {founder.totalEffort}h</span>
                </div>
              </div>

              {/* Revenue & Actions */}
              <div className="text-right">
                <p className="font-bold text-sm text-green-400">{formatRevenue(founder.revenue)}</p>
                <p className="text-xs text-muted-foreground">por mes</p>
                <div className="flex gap-1 mt-1">
                  <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                  {!founder.isUser && (
                    <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                      Seguir
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* User Stats Card */}
      {founders.find((f) => f.isUser) && (
        <Card className="border-accent/30 bg-gradient-to-r from-accent/5 to-secondary/5">
          <div className="p-4">
            <h3 className="font-bold text-sm mb-3">Tu Progreso</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-accent">
                  {formatRevenue(founders.find((f) => f.isUser)!.revenue)}
                </div>
                <div className="text-xs text-muted-foreground">Revenue mensual</div>
              </div>
              <div>
                <div className="text-lg font-bold text-secondary">#{founders.find((f) => f.isUser)!.rank}</div>
                <div className="text-xs text-muted-foreground">Posición global</div>
              </div>
            </div>
            <Button className="w-full mt-3 bg-gradient-to-r from-secondary to-accent text-xs">
              Actualizar Revenue
            </Button>
          </div>
        </Card>
      )}

      {/* Connect Button */}
      <Button className="w-full bg-gradient-to-r from-secondary to-accent">
        <Users className="w-4 h-4 mr-2" />
        Conectar con Founders
      </Button>
    </div>
  )
}
