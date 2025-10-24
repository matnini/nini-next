"use client"

import { useState } from "react"

export function GamificationHUD() {
  const [xp, setXp] = useState(1250)
  const [level, setLevel] = useState(8)
  const [showXpGain, setShowXpGain] = useState(false)
  const [niniCoins, setNiniCoins] = useState(1850)

  const maxXp = level * 200
  const xpProgress = ((xp % 200) / 200) * 100

  const triggerXpGain = (amount: number) => {
    setXp((prev) => prev + amount)
    setShowXpGain(true)
    setTimeout(() => setShowXpGain(false), 2000)
  }

  return (
    <div className="relative">
      {/* XP Gain Notification */}
      {showXpGain && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold animate-bounce z-10">
          +10 XP
        </div>
      )}

      {/* Level and XP Display */}
      <div className="flex items-center gap-4 bg-card/30 backdrop-blur-md rounded-2xl p-4 border border-border/30">
        {/* Level Badge */}
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20 shadow-lg">
            <span className="text-lg font-bold text-primary">{level}</span>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/40">
            <span className="text-xs text-accent-foreground">💎</span>
          </div>
        </div>

        {/* XP Progress */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-foreground">Level {level}</span>
            <span className="text-xs text-muted-foreground">{xp % 200}/200 XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-500 ease-out animate-gradient"
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-3 h-3 bg-gradient-to-br from-yellow-400/60 to-amber-500/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-yellow-400/30">
              <span className="text-xs font-bold text-yellow-600">₦</span>
            </div>
            <span className="text-xs font-medium text-yellow-600">{niniCoins} Nini Coins</span>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="text-center">
          <div className="text-lg font-bold text-accent">🔥</div>
          <div className="text-xs text-muted-foreground">7 day</div>
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="flex gap-2 mt-3 justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
          <span className="text-xs">💎</span>
        </div>
        <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/20 shadow-sm">
          <span className="text-xs">⚡</span>
        </div>
        <div className="w-8 h-8 bg-muted/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-40 border border-muted/20">
          <span className="text-xs">🎯</span>
        </div>
      </div>

      {/* Hidden trigger for demo */}
      <button onClick={() => triggerXpGain(10)} className="absolute inset-0 opacity-0" aria-label="Trigger XP gain" />
    </div>
  )
}
