"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { VideoValidation } from "@/components/video-validation"
import { EffortTracker } from "@/components/effort-tracker"

interface StartupStep {
  id: string
  title: string
  description: string
  completed: boolean
  coins: number
  fields: {
    name: string
    type: "text" | "textarea" | "select"
    placeholder: string
    options?: string[]
  }[]
}

const startupSteps: StartupStep[] = [
  {
    id: "idea",
    title: "Define tu Idea",
    description: "Describe tu startup en una frase que tu abuela entienda",
    completed: false,
    coins: 50,
    fields: [
      { name: "name", type: "text", placeholder: "Nombre de tu startup" },
      { name: "oneLiner", type: "textarea", placeholder: "Describe tu startup en una frase simple" },
      { name: "problem", type: "textarea", placeholder: "¿Qué problema resuelves?" },
    ],
  },
  {
    id: "market",
    title: "Valida tu Mercado",
    description: "Demuestra que la gente quiere lo que haces",
    completed: false,
    coins: 75,
    fields: [
      { name: "targetAudience", type: "textarea", placeholder: "¿Quién es tu cliente ideal?" },
      {
        name: "marketSize",
        type: "select",
        placeholder: "Tamaño del mercado",
        options: ["Nicho (<1M)", "Medio (1M-100M)", "Masivo (>100M)"],
      },
      { name: "competition", type: "textarea", placeholder: "¿Quiénes son tus competidores?" },
    ],
  },
  {
    id: "mvp",
    title: "Construye tu MVP",
    description: "Crea la versión más simple que funcione",
    completed: false,
    coins: 100,
    fields: [
      { name: "features", type: "textarea", placeholder: "Lista las 3 funciones principales" },
      {
        name: "tech",
        type: "select",
        placeholder: "Stack tecnológico",
        options: ["No-Code", "Web App", "Mobile App", "Hardware"],
      },
      {
        name: "timeline",
        type: "select",
        placeholder: "Tiempo estimado",
        options: ["1 semana", "2-4 semanas", "1-3 meses", "3+ meses"],
      },
    ],
  },
  {
    id: "launch",
    title: "Lanza y Mide",
    description: "Sal al mundo y aprende de tus usuarios",
    completed: false,
    coins: 150,
    fields: [
      { name: "launchPlan", type: "textarea", placeholder: "¿Cómo vas a lanzar?" },
      { name: "metrics", type: "textarea", placeholder: "¿Qué métricas vas a medir?" },
      { name: "goal", type: "text", placeholder: "Meta para el primer mes" },
    ],
  },
]

export function StartupBuilder() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [view, setView] = useState<"builder" | "validation" | "effort">("builder")

  const progress = (completedSteps.length / startupSteps.length) * 100
  const totalCoins = completedSteps.reduce((sum, stepId) => {
    const step = startupSteps.find((s) => s.id === stepId)
    return sum + (step?.coins || 0)
  }, 0)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const completeStep = () => {
    const stepId = startupSteps[currentStep].id
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps((prev) => [...prev, stepId])
    }
    if (currentStep < startupSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const currentStepData = startupSteps[currentStep]

  return (
    <div className="space-y-6">
      {/* Navigation between builder, validation, and effort tracking */}
      <div className="flex gap-1 bg-card/30 backdrop-blur-sm rounded-xl p-1">
        <Button
          variant={view === "builder" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("builder")}
          className="flex-1 text-xs"
        >
          📝 Framework
        </Button>
        <Button
          variant={view === "validation" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("validation")}
          className="flex-1 text-xs"
        >
          🎥 Validación
        </Button>
        <Button
          variant={view === "effort" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("effort")}
          className="flex-1 text-xs"
        >
          ⚡ Esfuerzo
        </Button>
      </div>

      {view === "builder" ? (
        <>
          {/* Progress Header */}
          <div className="text-center space-y-3">
            <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Startup Builder Framework
            </h2>
            <div className="space-y-2">
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso: {Math.round(progress)}%</span>
                <span className="text-accent font-bold">{totalCoins} Nini Coins ganados</span>
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {startupSteps.map((step, index) => (
              <Button
                key={step.id}
                variant={index === currentStep ? "default" : completedSteps.includes(step.id) ? "secondary" : "outline"}
                size="sm"
                onClick={() => setCurrentStep(index)}
                className="flex-shrink-0 text-xs"
              >
                {completedSteps.includes(step.id) ? "✓" : index + 1} {step.title}
              </Button>
            ))}
          </div>

          {/* Current Step */}
          <Card className="border-accent/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{currentStepData.title}</CardTitle>
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  +{currentStepData.coins} coins
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentStepData.fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  {field.type === "text" && (
                    <Input
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="bg-background/50"
                    />
                  )}
                  {field.type === "textarea" && (
                    <Textarea
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="bg-background/50 min-h-[80px]"
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-3 rounded-lg bg-background/50 border border-border text-foreground"
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              ))}

              <div className="flex gap-2 pt-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Anterior
                  </Button>
                )}
                <Button
                  onClick={completeStep}
                  className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80"
                  disabled={!currentStepData.fields.every((field) => formData[field.name])}
                >
                  {completedSteps.includes(currentStepData.id) ? "Actualizar" : "Completar Paso"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Completed Steps Summary */}
          {completedSteps.length > 0 && (
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-sm text-secondary">Pasos Completados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {completedSteps.map((stepId) => {
                    const step = startupSteps.find((s) => s.id === stepId)
                    return (
                      <div key={stepId} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">✓ {step?.title}</span>
                        <span className="text-accent">+{step?.coins} coins</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : view === "validation" ? (
        <VideoValidation />
      ) : (
        <EffortTracker />
      )}
    </div>
  )
}
