"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import GradientStarsBackground from "@/components/gradient-stars-background"
import MissionPools from "@/components/mission-pools"
import { TermsModal } from "@/components/terms-modal"
import { useLanguage } from "@/contexts/language-context"
import {
  Trophy,
  Menu,
  X,
  Instagram,
  MessageCircle,
  Globe,
} from "lucide-react"

interface LeaderboardUser {
  rank: number
  username: string
  avatar: string
  niniScore: number
  videosUploaded: number
  streak: number
  earnings: number
  trend: "up" | "down" | "same"
  rankChange: number
}

interface UserProfile {
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
}

export default function Home() {
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"leaderboard" | "profile">(
    "leaderboard",
  )
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  useEffect(() => {
    fetchRanking()
  }, [])

  const fetchRanking = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ranking')
      const result = await response.json()

      if (result.success && result.data) {
        // Transform API data to match LeaderboardUser format
        const transformedData: LeaderboardUser[] = result.data.map((user: any) => ({
          rank: user.rank,
          username: user.username,
          avatar: user.avatar,
          niniScore: user.niniScore,
          videosUploaded: user.videos,
          streak: user.streak,
          earnings: user.earnings,
          trend: "same" as const,
          rankChange: 0,
        }))
        setLeaderboardData(transformedData)
      }
    } catch (error) {
      console.error('Error fetching ranking:', error)
    } finally {
      setLoading(false)
    }
  }


  const [userProfile] = useState<UserProfile>({
    username: "tu_usuario",
    avatar: "/placeholder.svg?height=200&width=200",
    rank: 156,
    niniScore: 67,
    videosUploaded: 23,
    streak: 12,
    earnings: 847.5,
    bestStreak: 18,
    totalViews: 45678,
    joinDate: "2024-01-15",
  })

  const shareProfile = () => {
    const shareText = `Estoy en el puesto #${userProfile.rank} del ranking NINI\n\nScore: ${userProfile.niniScore}\nVideos: ${userProfile.videosUploaded}\nGanancias: $${userProfile.earnings.toFixed(2)}\nRacha: ${userProfile.streak} días`

    if (navigator.share) {
      navigator.share({ title: "Mi perfil NINI", text: shareText }).catch(() => {})
    } else {
      navigator.clipboard.writeText(shareText)
      alert("Perfil copiado al portapapeles")
    }
  }

  const renderLeaderboard = () => (
    <div className="min-h-screen px-4 py-12 lg:px-8 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-primary">2,246 {t("liveCreators")}</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
            {t("heroTitle")}
            <br />
            <span className="text-primary">{t("heroTitleHighlight")}</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{t("heroSubtitle")}</p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-6 font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              asChild
            >
              <a href="https://wa.me/5491157342849?text=Hola!" target="_blank" rel="noopener noreferrer">
                {t("startNow")}
              </a>
            </Button>
          </div>
        </div>

        <MissionPools />

        <>
            {leaderboardData.some((user) => user.rank <= 3) && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto items-stretch">
                {leaderboardData
                  .filter((user) => user.rank <= 3)
                  .map((user) => (
                    <a
                      key={user.rank}
                      href={`/profile/${user.username}`}
                      className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all cursor-pointer h-full"
                    >
                      <div className="flex flex-col items-center text-center">
                        {user.rank === 1 && (
                          <div className="mb-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                            <span className="text-xs font-black text-primary">👑 #1</span>
                          </div>
                        )}
                        {user.rank === 2 && (
                          <div className="mb-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                            <span className="text-xs font-black text-primary">🥈 #2</span>
                          </div>
                        )}
                        {user.rank === 3 && (
                          <div className="mb-3 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                            <span className="text-xs font-black text-primary">🥉 #3</span>
                          </div>
                        )}

                        <div className="text-4xl font-black mb-4 text-primary">{user.rank}</div>

                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.username}
                          className="w-16 h-16 rounded-full mb-4 border-2 border-primary"
                        />

                        <h3 className="text-lg font-bold mb-2">{user.username}</h3>

                        <div className="w-full space-y-2 text-sm">
                          <div className="flex justify-between items-center py-2 border-t border-border">
                            <span className="text-muted-foreground">Videos</span>
                            <span className="font-bold">{user.videosUploaded}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-t border-border">
                            <span className="text-muted-foreground">Ganancias</span>
                            <span className="font-bold text-primary">${user.earnings.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            )}

            {leaderboardData.some((user) => user.rank > 3) && (
              <div className="px-4 max-w-3xl mx-auto space-y-3 mb-16">
                <h2 className="text-2xl font-black mb-6">{t("top10")}</h2>
                {leaderboardData
                  .filter((user) => user.rank > 3)
                  .map((user) => (
                    <a
                      key={user.rank}
                      href={`/profile/${user.username}`}
                      className="bg-card border border-border rounded-lg p-3 lg:p-4 hover:border-primary transition-all flex items-center gap-3 lg:gap-4 cursor-pointer overflow-hidden"
                    >
                      <div className="text-xl lg:text-2xl font-black w-8 lg:w-12 text-muted-foreground flex-shrink-0">
                        {user.rank}
                      </div>

                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.username}
                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm lg:text-base font-bold truncate">{user.username}</h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs text-muted-foreground">
                          <span className="whitespace-nowrap">
                            {t("videos")}: <span className="text-foreground font-bold">{user.videosUploaded}</span>
                          </span>
                          <span className="text-primary font-bold whitespace-nowrap">
                            ${user.earnings.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
              </div>
            )}
        </>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border-2 border-primary rounded-2xl p-6 lg:p-12">
            <h2 className="text-3xl lg:text-5xl font-black mb-8 text-center">{t("faqTitle")}</h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-background/50">
                <AccordionTrigger className="text-left font-bold text-base lg:text-lg hover:text-primary">
                  {t("faq1Question")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                  {t("faq1Answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-background/50">
                <AccordionTrigger className="text-left font-bold text-base lg:text-lg hover:text-primary">
                  {t("faq2Question")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                  {t("faq2Answer")}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-background/50">
                <AccordionTrigger className="text-left font-bold text-base lg:text-lg hover:text-primary">
                  {t("faq3Question")}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm lg:text-base">
                  {t("faq3Answer")}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-background border-2 border-primary rounded-2xl p-8 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-tight">{t("finalCtaTitle")}</h2>

                <p className="text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  {t("finalCtaSubtitle")}
                </p>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-6 font-black shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    asChild
                  >
                    <a href="https://wa.me/5491157342849?text=Hola!" target="_blank" rel="noopener noreferrer">
                      {t("joinNow")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="fixed inset-0 z-0">
        <GradientStarsBackground />
      </div>

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
            <MessageCircle className="w-5 h-5" />
          </a>
        </Button>
      </div>

      <div className="relative z-10 min-h-screen text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/5 backdrop-blur-sm border-b border-border/30">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-3">
                <img src="/logonotnini.png" alt="NINI" className="w-16 h-16 object-contain" />
              </div>

              <div className="hidden lg:flex items-center gap-2">
                <Button
                  onClick={() => setActiveTab("leaderboard")}
                  variant={activeTab === "leaderboard" ? "default" : "ghost"}
                  className="font-bold"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {t("ranking")}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLanguage(language === "es" ? "en" : "es")}
                  className="ml-2"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </div>

              <Button
                className="lg:hidden"
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {mobileMenuOpen && (
              <div className="lg:hidden mt-4 space-y-2">
                <Button
                  onClick={() => {
                    setActiveTab("leaderboard")
                    setMobileMenuOpen(false)
                  }}
                  variant={activeTab === "leaderboard" ? "default" : "ghost"}
                  className="w-full justify-start font-bold"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {t("ranking")}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setLanguage(language === "es" ? "en" : "es")}
                  className="w-full justify-start font-bold"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "es" ? "English" : "Español"}
                </Button>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-bold text-muted-foreground mb-2 px-3">{t("follow")}</p>
                  <div className="flex items-center gap-3 px-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a
                        href="https://www.instagram.com/ninicreators/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-9 h-9 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href="https://discord.com/invite/p5e4gnHEPH" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                        <MessageCircle className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main>
          {activeTab === "leaderboard" && renderLeaderboard()}
        </main>

        {/* Footer Section */}
        <footer className="relative z-10 border-t border-border/30 bg-background/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logonotnini.png" alt="NINI" className="w-12 h-12 object-contain" />
                </div>
                <p className="text-sm text-muted-foreground mb-6 max-w-md">{t("footerTagline")}</p>

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a
                      href="https://www.instagram.com/ninicreators/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 hover:bg-primary/10 hover:text-primary"
                    asChild
                  >
                    <a href="https://discord.com/invite/p5e4gnHEPH" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Links Section */}
              <div>
                <h3 className="text-sm font-black mb-4">{t("footerAbout")}</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("aboutUs")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("howItWorks")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("faq")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("contact")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-black mb-4">{t("footerLegal")}</h3>
                <ul className="space-y-3">
                  <li>
                    <button
                      onClick={() => setTermsModalOpen(true)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {t("terms")}
                    </button>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("privacy")}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {t("help")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border/30">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground text-center lg:text-left">
                  © {new Date().getFullYear()} NINI. {t("footerRights")}
                </p>
                <p className="text-xs text-muted-foreground text-center lg:text-right">
                  {t("footerMadeWith")} ❤️ {t("footerBy")}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <TermsModal open={termsModalOpen} onOpenChange={setTermsModalOpen} />
    </>
  )
}
