"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, FileText, Eye, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"

interface Script {
  id: number
  title: string
  script: string
}

interface QuestData {
  id: number
  trackingCode: string
  title: string
  description: string | null
  xp: number
  rewardCoins: number
  type: string | null
  isActive: boolean
  expiresAt: string | null
  createdAt: string
  poolCoins: number | null
  availableScripts: Script[] | null
}

export default function NiniMissionPage() {
  const { t } = useLanguage()
  const [questData, setQuestData] = useState<QuestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Quest ID for NINI mission - this corresponds to the #NiniCreators01 quest
  const QUEST_ID = 5

  useEffect(() => {
    fetchQuestData()
  }, [])

  const fetchQuestData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/quest/${QUEST_ID}`)
      const result = await response.json()

      if (result.success) {
        console.log('Quest data received:', result.data)
        setQuestData(result.data)
        setError(null)
      } else {
        setError(result.error || 'Error al cargar la misión')
        setQuestData(null)
      }
    } catch (err) {
      setError('Error al conectar con el servidor')
      setQuestData(null)
      console.error('Error fetching quest:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando misión...</p>
        </div>
      </div>
    )
  }

  if (error || !questData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Misión no encontrada</h1>
          <p className="text-muted-foreground mb-8">{error || 'No se pudo cargar la misión'}</p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const scripts = questData.availableScripts || []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <img
              src="/logonotnini.png"
              alt="NINI"
              className="w-16 h-16 rounded-xl object-contain"
            />
            <div>
              <h1 className="text-4xl lg:text-5xl font-black">{questData.title}</h1>
              <p className="text-muted-foreground">{questData.trackingCode}</p>
            </div>
          </div>

          {/* Mission Description */}
          {questData.description && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <p className="text-muted-foreground">{questData.description}</p>
            </div>
          )}

          {/* Mission Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Presupuesto Total</span>
              </div>
              <p className="text-2xl font-black text-primary">
                {questData.poolCoins ? `${questData.poolCoins.toLocaleString()} NINI Coins` : 'N/A'}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Recompensa</span>
              </div>
              <p className="text-2xl font-black">
                {questData.xp} XP + {questData.rewardCoins} coins
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Scripts Disponibles</span>
              </div>
              <p className="text-2xl font-black">{scripts.length} scripts</p>
            </div>
          </div>
        </div>

        {/* Scripts Section */}
        <div>
          <h2 className="text-2xl font-black mb-6">Scripts Disponibles</h2>
          {scripts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scripts.map((script) => (
                <Card key={script.id} className="hover:border-primary transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{script.title}</CardTitle>
                    <CardDescription>Script #{script.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{script.script}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No hay scripts disponibles para esta misión</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
