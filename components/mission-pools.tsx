"use client"

import { DollarSign, Eye, FileText, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

interface MissionPool {
  id: string
  brand: string
  logo: string
  budget: number
  budgetNiniCoins: number
  payPerView: number
  viewsThreshold: number
  scriptsAvailable: number
  category: string
  color: string
}

export default function MissionPools() {
  const { t } = useLanguage()

  const missions: MissionPool[] = [
    {
      id: "nini",
      brand: "NINI",
      logo: "/nini-logo.svg",
      budget: 2500,
      budgetNiniCoins: 2500,
      payPerView: 1,
      viewsThreshold: 1000,
      scriptsAvailable: 12,
      category: "Social Platform",
      color: "from-primary/20 to-primary/5",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto mb-16 px-4">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary">{t("activeMissions")}</span>
        </div>
        <h2 className="text-3xl lg:text-5xl font-black mb-3">{t("missionPoolsTitle")}</h2>
        <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">{t("missionPoolsSubtitle")}</p>
      </div>

      {/* Mission Cards Grid */}
      <div className="flex justify-center">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`bg-gradient-to-br ${mission.color} border-2 border-primary/20 rounded-2xl p-6 hover:scale-[1.02] transition-all cursor-pointer w-full max-w-md`}
          >
            {/* Brand Header */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src={mission.logo || "/placeholder.svg"}
                alt={mission.brand}
                className="w-16 h-16 rounded-xl object-contain bg-white p-2"
              />
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-1">{mission.brand}</h3>
                <span className="text-xs font-bold text-muted-foreground bg-background/50 px-2 py-1 rounded">
                  {mission.category}
                </span>
              </div>
            </div>

            {/* Budget Display */}
            <div className="bg-background/50 backdrop-blur-sm rounded-xl p-4 mb-4 border border-border/50">
              <div className="flex items-baseline gap-2 mb-1">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-3xl font-black text-primary">{mission.budget.toLocaleString()}</span>
                <span className="text-sm font-bold text-muted-foreground">USD</span>
              </div>
              <p className="text-xs text-muted-foreground">
                = {mission.budgetNiniCoins.toLocaleString()} {t("niniCoins")}
              </p>
            </div>

            {/* Mission Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("payPerViews")}</span>
                </div>
                <span className="text-sm font-bold">
                  ${mission.payPerView} / {mission.viewsThreshold.toLocaleString()} {t("views")}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("scriptsAvailable")}</span>
                </div>
                <span className="text-sm font-bold">
                  {mission.scriptsAvailable} {t("scripts")}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <Link href={`/mission/${mission.id}`}>
              <button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 px-4 rounded-lg transition-all hover:scale-[1.02]">
                {t("viewMission")}
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          💰 {t("totalPoolBudget")}:{" "}
          <span className="font-bold text-primary">
            ${missions.reduce((acc, m) => acc + m.budget, 0).toLocaleString()} USD
          </span>
        </p>
      </div>
    </div>
  )
}
