"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "fitness",
    name: "Salud Física",
    icon: "💪",
    color: "from-red-500 to-orange-500",
    missions: [
      { id: 1, title: "Caminar 10,000 pasos", reward: 50, completed: false },
      { id: 2, title: "Hacer 30 min de ejercicio", reward: 75, completed: true },
      { id: 3, title: "Beber 2L de agua", reward: 25, completed: false },
    ],
  },
  {
    id: "nutrition",
    name: "Alimentación",
    icon: "🥗",
    color: "from-green-500 to-emerald-500",
    missions: [
      { id: 4, title: "Comer 5 frutas/verduras", reward: 40, completed: false },
      { id: 5, title: "No comer comida chatarra", reward: 60, completed: false },
      { id: 6, title: "Cocinar en casa", reward: 35, completed: true },
    ],
  },
  {
    id: "mental",
    name: "Salud Mental",
    icon: "🧠",
    color: "from-indigo-500 to-purple-500",
    missions: [
      { id: 16, title: "Meditar 15 minutos", reward: 70, completed: false },
      { id: 17, title: "Escribir en diario personal", reward: 55, completed: false },
      { id: 18, title: "Practicar respiración profunda", reward: 40, completed: true },
      { id: 19, title: "Hacer una actividad que te relaje", reward: 65, completed: false },
    ],
  },
  {
    id: "social",
    name: "Menos Redes",
    icon: "📱",
    color: "from-purple-500 to-pink-500",
    missions: [
      { id: 7, title: "Máximo 2h en redes sociales", reward: 80, completed: false },
      { id: 8, title: "No usar el teléfono 1h antes de dormir", reward: 70, completed: false },
      { id: 9, title: "Leer 30 min en lugar de scrollear", reward: 90, completed: true },
    ],
  },
  {
    id: "work",
    name: "Trabajo/Estudio",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
    missions: [
      {
        id: 20,
        title: "🌟 Carrera del Futuro: Prompt Engineer",
        reward: 200,
        completed: false,
        isNiniRecommended: true,
      },
      { id: 10, title: "Estudiar 2 horas", reward: 100, completed: false },
      { id: 11, title: "Completar proyecto pendiente", reward: 150, completed: false },
      { id: 12, title: "Aprender algo nuevo", reward: 85, completed: true },
    ],
  },
  {
    id: "finance",
    name: "Finanzas",
    icon: "💰",
    color: "from-yellow-500 to-amber-500",
    missions: [
      { id: 13, title: "Ahorrar $500 esta semana", reward: 120, completed: false },
      { id: 14, title: "No comprar cosas innecesarias", reward: 65, completed: true },
      { id: 15, title: "Revisar gastos del mes", reward: 45, completed: false },
    ],
  },
]

export function MissionCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [missions, setMissions] = useState(categories)

  const completeMission = (categoryId: string, missionId: number) => {
    setMissions((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              missions: cat.missions.map((mission) =>
                mission.id === missionId ? { ...mission, completed: true } : mission,
              ),
            }
          : cat,
      ),
    )
  }

  const totalNiniCoins = missions.reduce(
    (total, cat) => total + cat.missions.filter((m) => m.completed).reduce((sum, m) => sum + m.reward, 0),
    0,
  )

  return (
    <div className="space-y-4">
      {/* Nini Coins Display */}
      <Card className="p-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">₦</span>
            </div>
            <div>
              <p className="font-bold text-lg">{totalNiniCoins} Nini Coins</p>
              <p className="text-xs text-muted-foreground">≈ ${(totalNiniCoins * 0.001).toFixed(3)} BTC</p>
            </div>
          </div>
          <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-500">
            Canjear
          </Button>
        </div>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-3 gap-2">
        {missions.map((category) => {
          const completedMissions = category.missions.filter((m) => m.completed).length
          const totalMissions = category.missions.length
          const progress = (completedMissions / totalMissions) * 100

          return (
            <Card
              key={category.id}
              className={`p-3 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id ? "ring-2 ring-accent" : ""
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <div className="text-center space-y-2">
                <div
                  className={`w-10 h-10 mx-auto bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-lg animate-pulse-glow`}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-xs leading-tight">{category.name}</h3>
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {completedMissions}/{totalMissions}
                </p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Mission Details */}
      {selectedCategory && (
        <Card className="p-4 animate-in slide-in-from-bottom-4">
          {missions
            .find((cat) => cat.id === selectedCategory)
            ?.missions.map((mission) => (
              <div
                key={mission.id}
                className={`flex items-center justify-between py-3 border-b border-border last:border-b-0 ${
                  mission.isNiniRecommended
                    ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg px-3 mb-2"
                    : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium ${mission.completed ? "line-through text-muted-foreground" : ""}`}>
                      {mission.title}
                    </p>
                    {mission.isNiniRecommended && (
                      <Badge className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse text-white">
                        HIPER RECOMENDADO POR NINI
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      +{mission.reward} ₦
                    </Badge>
                    {mission.completed && <Badge className="text-xs bg-green-500">✓ Completada</Badge>}
                  </div>
                </div>
                {!mission.completed && (
                  <Button size="sm" onClick={() => completeMission(selectedCategory, mission.id)} className="ml-2">
                    Completar
                  </Button>
                )}
              </div>
            ))}
        </Card>
      )}
    </div>
  )
}
