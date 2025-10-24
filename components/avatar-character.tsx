"use client"

import { useState, useEffect } from "react"

interface Character {
  id: string
  name: string
  style: string
  hairColor: string
  skinColor: string
  eyeColor: string
  outfitColor: string
  personality: string
}

const characters: Character[] = [
  {
    id: "nini",
    name: "Nini",
    style: "Cosmic Explorer",
    hairColor: "from-blue-400 via-purple-500 to-pink-500",
    skinColor: "from-orange-300 via-orange-400 to-blue-300",
    eyeColor: "from-orange-500 to-amber-600",
    outfitColor: "from-blue-500 to-cyan-600",
    personality: "Energético y motivador",
  },
  {
    id: "zara",
    name: "Zara",
    style: "Nebula Wanderer",
    hairColor: "from-purple-400 via-pink-500 to-cyan-400",
    skinColor: "from-emerald-300 via-teal-400 to-purple-300",
    eyeColor: "from-emerald-500 to-green-600",
    outfitColor: "from-purple-500 to-pink-600",
    personality: "Rebelde y creativa",
  },
  {
    id: "kai",
    name: "Kai",
    style: "Stellar Sage",
    hairColor: "from-cyan-400 via-blue-500 to-indigo-500",
    skinColor: "from-yellow-300 via-amber-400 to-cyan-300",
    eyeColor: "from-cyan-500 to-blue-600",
    outfitColor: "from-indigo-500 to-blue-600",
    personality: "Calmado y sabio",
  },
  {
    id: "nova",
    name: "Nova",
    style: "Galaxy Guardian",
    hairColor: "from-pink-400 via-rose-500 to-orange-500",
    skinColor: "from-rose-300 via-pink-400 to-orange-300",
    eyeColor: "from-rose-500 to-pink-600",
    outfitColor: "from-emerald-500 to-green-600",
    personality: "Aventurera y divertida",
  },
]

interface AvatarCharacterProps {
  selectedCharacter?: string
}

export function AvatarCharacter({ selectedCharacter = "nini" }: AvatarCharacterProps) {
  const [isWaving, setIsWaving] = useState(false)
  const [eyeBlink, setEyeBlink] = useState(false)
  const [isBouncing, setIsBouncing] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const character = characters.find((c) => c.id === selectedCharacter) || characters[0]

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true)
      setTimeout(() => setIsWaving(false), 1000)
    }, 5000)

    const blinkInterval = setInterval(() => {
      setEyeBlink(true)
      setTimeout(() => setEyeBlink(false), 150)
    }, 3000)

    const bounceInterval = setInterval(() => {
      setIsBouncing(true)
      setTimeout(() => setIsBouncing(false), 600)
    }, 4000)

    const sparkleInterval = setInterval(() => {
      setShowSparkles(true)
      setTimeout(() => setShowSparkles(false), 2000)
    }, 6000)

    return () => {
      clearInterval(waveInterval)
      clearInterval(blinkInterval)
      clearInterval(bounceInterval)
      clearInterval(sparkleInterval)
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center">
      {showSparkles && (
        <>
          <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -top-2 right-8 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-75 animation-delay-300"></div>
          <div className="absolute top-12 -right-6 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping opacity-75 animation-delay-600"></div>
          <div className="absolute top-20 -left-8 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75 animation-delay-900"></div>
          <div className="absolute bottom-8 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75 animation-delay-1200"></div>
        </>
      )}

      <div className={`relative animate-float ${isBouncing ? "animate-bounce" : ""}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-500 via-blue-500 via-green-500 to-yellow-400 rounded-full blur-xl opacity-40 animate-pulse-glow"></div>

        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-secondary via-primary to-accent p-1">
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
            <div className="w-40 h-40 relative">
              <div
                className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br ${character.skinColor} rounded-full relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-40">
                  <div className="w-full h-full bg-gradient-to-br from-white via-transparent to-white rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[length:4px_4px]"></div>
                </div>

                <div
                  className={`absolute -top-4 -left-4 w-28 h-20 bg-gradient-to-r ${character.hairColor} rounded-t-full opacity-95 animate-pulse`}
                  style={{
                    clipPath: "polygon(15% 0%, 85% 0%, 100% 40%, 95% 80%, 80% 100%, 20% 100%, 5% 80%, 0% 40%)",
                  }}
                >
                  <div className="absolute top-2 left-4 w-16 h-4 bg-gradient-to-r from-white to-transparent opacity-30 rounded-full blur-sm"></div>
                </div>

                <div className="absolute top-5 left-2 w-6 h-7 bg-black rounded-full overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${character.eyeColor} rounded-full`}></div>
                  <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-90"></div>
                  <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-1.5 right-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                  <div
                    className={`absolute inset-0 bg-black rounded-full transition-all duration-150 ${eyeBlink ? "scale-y-0" : "scale-y-100"}`}
                  ></div>
                </div>
                <div className="absolute top-5 right-2 w-6 h-7 bg-black rounded-full overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${character.eyeColor} rounded-full`}></div>
                  <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full opacity-90"></div>
                  <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-1.5 left-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
                  <div
                    className={`absolute inset-0 bg-black rounded-full transition-all duration-150 ${eyeBlink ? "scale-y-0" : "scale-y-100"}`}
                  ></div>
                </div>

                <div className="absolute top-13 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-foreground rounded-b-full opacity-80"></div>
                <div className="absolute top-11 left-1 w-3 h-2 bg-pink-300 rounded-full opacity-50 blur-sm"></div>
                <div className="absolute top-11 right-1 w-3 h-2 bg-pink-300 rounded-full opacity-50 blur-sm"></div>
              </div>

              <div
                className={`absolute top-18 left-1/2 transform -translate-x-1/2 w-14 h-18 bg-gradient-to-b ${character.outfitColor} rounded-lg relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[length:3px_3px]"></div>
                <div className="absolute top-2 left-2 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute top-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full opacity-80"></div>
              </div>

              <div
                className={`absolute top-22 left-5 w-4 h-14 bg-gradient-to-b ${character.skinColor} rounded-full origin-top transition-transform duration-500 ${isWaving ? "rotate-45" : "rotate-12"} overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:2px_2px]"></div>
              </div>
              <div
                className={`absolute top-22 right-5 w-4 h-14 bg-gradient-to-b ${character.skinColor} rounded-full rotate-12 overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:2px_2px]"></div>
              </div>

              <div
                className={`absolute top-34 left-7 w-4 h-14 bg-gradient-to-b ${character.skinColor} rounded-full overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:2px_2px]"></div>
              </div>
              <div
                className={`absolute top-34 right-7 w-4 h-14 bg-gradient-to-b ${character.skinColor} rounded-full overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:2px_2px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-4 py-2 bg-gradient-to-r from-secondary to-accent rounded-full shadow-lg shadow-accent/30">
        <span className="text-sm font-bold text-white">{character.name}</span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-sm shadow-accent/50"></div>
        <span className="text-xs text-muted-foreground font-medium">{character.style}</span>
        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse shadow-sm shadow-secondary/50"></div>
      </div>
    </div>
  )
}
