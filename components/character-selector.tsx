"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Character {
  id: string
  name: string
  style: string
  hairColor: string
  skinColor: string
  outfitPrimary: string
  outfitSecondary: string
  personality: string
}

const characters: Character[] = [
  {
    id: "nini",
    name: "Nini",
    style: "Streetwear Vibes",
    hairColor: "from-secondary to-accent",
    skinColor: "from-orange-300 to-orange-400",
    outfitPrimary: "from-primary to-secondary",
    outfitSecondary: "secondary",
    personality: "Energético y motivador",
  },
  {
    id: "zara",
    name: "Zara",
    style: "Cyber Punk",
    hairColor: "from-purple-400 to-pink-500",
    skinColor: "from-amber-300 to-amber-400",
    outfitPrimary: "from-purple-600 to-pink-600",
    outfitSecondary: "purple-500",
    personality: "Rebelde y creativa",
  },
  {
    id: "kai",
    name: "Kai",
    style: "Minimalist Cool",
    hairColor: "from-blue-400 to-cyan-500",
    skinColor: "from-yellow-300 to-yellow-400",
    outfitPrimary: "from-blue-600 to-cyan-600",
    outfitSecondary: "blue-500",
    personality: "Calmado y sabio",
  },
  {
    id: "nova",
    name: "Nova",
    style: "Neon Dreams",
    hairColor: "from-green-400 to-emerald-500",
    skinColor: "from-rose-300 to-rose-400",
    outfitPrimary: "from-green-600 to-emerald-600",
    outfitSecondary: "green-500",
    personality: "Aventurera y divertida",
  },
]

interface CharacterSelectorProps {
  selectedCharacter: string
  onCharacterChange: (characterId: string) => void
}

export function CharacterSelector({ selectedCharacter, onCharacterChange }: CharacterSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="mb-4 bg-gradient-to-r from-secondary/20 to-accent/20 border-accent/30"
      >
        Cambiar Personaje ✨
      </Button>

      {isOpen && (
        <div className="absolute top-12 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border border-accent/30 rounded-xl p-6 shadow-2xl">
          <h3 className="text-lg font-bold mb-6 text-center bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Elige tu Copiloto AI
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => {
                  onCharacterChange(character.id)
                  setIsOpen(false)
                }}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedCharacter === character.id
                    ? "bg-gradient-to-r from-secondary/30 to-accent/30 border-2 border-accent"
                    : "bg-muted/50 hover:bg-muted border border-muted-foreground/20"
                }`}
              >
                {/* Mini Avatar Preview */}
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-secondary via-primary to-accent p-0.5">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <div className="w-12 h-12 relative">
                      {/* Mini Head */}
                      <div
                        className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br ${character.skinColor} rounded-full`}
                      >
                        {/* Mini Hair */}
                        <div
                          className={`absolute -top-0.5 -left-0.5 w-5 h-3 bg-gradient-to-r ${character.hairColor} rounded-t-full`}
                        ></div>
                      </div>
                      {/* Mini Body */}
                      <div
                        className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-5 bg-gradient-to-b ${character.outfitPrimary} rounded`}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h4 className="font-bold text-sm">{character.name}</h4>
                  <p className="text-xs text-muted-foreground">{character.style}</p>
                  <p className="text-xs text-accent">{character.personality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
