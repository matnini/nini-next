"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Pause, Upload, Camera, Check, X } from "lucide-react"

interface ValidationVideo {
  id: string
  stepId: string
  title: string
  description: string
  videoUrl?: string
  status: "pending" | "recording" | "uploaded" | "validated" | "rejected"
  coins: number
  feedback?: string
  timestamp: Date
}

const validationPrompts = [
  {
    stepId: "idea",
    title: "Pitch tu Idea",
    description: "Graba un video de 60 segundos explicando tu startup como si fueras en Shark Tank",
    coins: 100,
  },
  {
    stepId: "market",
    title: "Demuestra Validación",
    description: "Muestra evidencia de que investigaste tu mercado (screenshots, conversaciones, etc.)",
    coins: 150,
  },
  {
    stepId: "mvp",
    title: "Demo de tu MVP",
    description: "Enseña tu producto funcionando, aunque sea súper básico",
    coins: 200,
  },
  {
    stepId: "launch",
    title: "Primeros Resultados",
    description: "Comparte métricas reales, testimonios o feedback de usuarios",
    coins: 250,
  },
]

export function VideoValidation() {
  const [videos, setVideos] = useState<ValidationVideo[]>([])
  const [activePrompt, setActivePrompt] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
  const [description, setDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" })
        setRecordedBlob(blob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setRecordedBlob(file)
    }
  }

  const submitVideo = () => {
    if (!activePrompt || !recordedBlob) return

    const prompt = validationPrompts.find((p) => p.stepId === activePrompt)
    if (!prompt) return

    const newVideo: ValidationVideo = {
      id: Date.now().toString(),
      stepId: activePrompt,
      title: prompt.title,
      description: description,
      videoUrl: URL.createObjectURL(recordedBlob),
      status: "uploaded",
      coins: prompt.coins,
      timestamp: new Date(),
    }

    setVideos((prev) => [...prev, newVideo])
    setActivePrompt(null)
    setRecordedBlob(null)
    setDescription("")

    // Simulate AI validation after 3 seconds
    setTimeout(() => {
      setVideos((prev) =>
        prev.map((v) =>
          v.id === newVideo.id
            ? {
                ...v,
                status: Math.random() > 0.3 ? "validated" : "rejected",
                feedback:
                  Math.random() > 0.3
                    ? "¡Excelente! Tu video demuestra claramente el progreso. Sigue así!"
                    : "Necesitas más evidencia. Intenta ser más específico con los datos.",
              }
            : v,
        ),
      )
    }, 3000)
  }

  const totalCoinsEarned = videos.filter((v) => v.status === "validated").reduce((sum, v) => sum + v.coins, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
          Validación con Videos
        </h2>
        <p className="text-sm text-muted-foreground">Demuestra tu progreso con videos y gana credibilidad</p>
        <div className="text-accent font-bold">{totalCoinsEarned} Nini Coins ganados por validaciones</div>
      </div>

      {/* Video Prompts */}
      <div className="space-y-3">
        {validationPrompts.map((prompt) => {
          const existingVideo = videos.find((v) => v.stepId === prompt.stepId)

          return (
            <Card key={prompt.stepId} className="border-accent/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{prompt.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                      +{prompt.coins} coins
                    </Badge>
                    {existingVideo && (
                      <Badge
                        variant={
                          existingVideo.status === "validated"
                            ? "default"
                            : existingVideo.status === "rejected"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {existingVideo.status === "validated" && <Check className="w-3 h-3 mr-1" />}
                        {existingVideo.status === "rejected" && <X className="w-3 h-3 mr-1" />}
                        {existingVideo.status === "uploaded" && "⏳"}
                        {existingVideo.status === "validated"
                          ? "Validado"
                          : existingVideo.status === "rejected"
                            ? "Rechazado"
                            : "Pendiente"}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{prompt.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {existingVideo ? (
                  <div className="space-y-3">
                    {existingVideo.videoUrl && (
                      <video
                        src={existingVideo.videoUrl}
                        controls
                        className="w-full rounded-lg bg-background/50"
                        style={{ maxHeight: "200px" }}
                      />
                    )}
                    {existingVideo.feedback && (
                      <div
                        className={`p-3 rounded-lg text-xs ${
                          existingVideo.status === "validated"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {existingVideo.feedback}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActivePrompt(prompt.stepId)}
                      className="w-full"
                    >
                      Subir Nuevo Video
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setActivePrompt(prompt.stepId)}
                    className="w-full bg-gradient-to-r from-secondary/20 to-accent/20 hover:from-secondary/30 hover:to-accent/30"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Grabar Video
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recording Modal */}
      {activePrompt && (
        <Card className="border-secondary/30 bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">{validationPrompts.find((p) => p.stepId === activePrompt)?.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!recordedBlob ? (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`flex-1 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-secondary hover:bg-secondary/80"}`}
                  >
                    {isRecording ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Detener Grabación
                      </>
                    ) : (
                      <>
                        <Camera className="w-4 h-4 mr-2" />
                        Grabar Video
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir
                  </Button>
                </div>

                <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />

                {isRecording && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-red-400">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      Grabando...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <video
                  src={URL.createObjectURL(recordedBlob)}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: "200px" }}
                />

                <Textarea
                  placeholder="Describe brevemente lo que muestras en el video..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-background/50"
                />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRecordedBlob(null)
                      setDescription("")
                    }}
                  >
                    Grabar de Nuevo
                  </Button>
                  <Button
                    onClick={submitVideo}
                    disabled={!description.trim()}
                    className="flex-1 bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80"
                  >
                    Enviar para Validación
                  </Button>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              onClick={() => {
                setActivePrompt(null)
                setRecordedBlob(null)
                setDescription("")
              }}
              className="w-full"
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
