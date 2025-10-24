"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import GradientStarsBackground from "@/components/gradient-stars-background"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Question {
  id: string
  text: string
  options: string[]
}

const questions: Question[] = [
  {
    id: "name",
    text: "¡Hola! Soy Byron. ¿Cómo te llamas?",
    options: [],
  },
  {
    id: "uploads",
    text: "¿Ya subes videos a TikTok?",
    options: ["Sí, ya subo", "No, soy nuevo"],
  },
  {
    id: "videoRange",
    text: "¿Cuántos videos has subido?",
    options: ["0-10", "11-50", "51-100", "100+"],
  },
  {
    id: "viewsRange",
    text: "¿Cuántas vistas sueles obtener?",
    options: ["0-1K", "1K-10K", "10K-100K", "100K+"],
  },
  {
    id: "topics",
    text: "¿Qué temas te interesan más?",
    options: ["Salud", "Dinero", "Deporte", "Moda", "Educación", "Ciencias"],
  },
  {
    id: "age",
    text: "¿Cuál es tu edad?",
    options: ["13-17", "18-24", "25-30", "30+"],
  },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [messages, setMessages] = useState<Array<{ type: "bot" | "user"; text: string }>>([])
  const [showOptions, setShowOptions] = useState(false)
  const [userName, setUserName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages([{ type: "bot", text: questions[0].text }])
      setIsTyping(false)
      setShowOptions(true)
    }, 1500)
  }, [])

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentStep]

    setMessages((prev) => [...prev, { type: "user", text: answer }])

    if (currentQuestion.id === "name") {
      setUserName(answer)
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answer }))

    setShowOptions(false)
    setIsTyping(true)

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        const nextStep = currentStep + 1
        let nextMessage = questions[nextStep].text

        if (nextStep === 1 && userName) {
          nextMessage = `Perfecto ${userName}! ${questions[nextStep].text}`
        }

        setMessages((prev) => [...prev, { type: "bot", text: nextMessage }])
        setCurrentStep(nextStep)
        setIsTyping(false)
        setShowOptions(true)
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `¡Listo ${userName}! Creando tu roadmap personalizado 🚀`,
          },
        ])
        setIsTyping(false)

        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    }, 1200)
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    if (name.trim()) {
      handleAnswer(name.trim())
    }
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <GradientStarsBackground />

      <div className="absolute inset-0 z-10">
        <header className="px-4 py-4 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <button className="flex flex-col space-y-1">
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
            </button>

            <div className="flex items-center space-x-2 text-xs">
              <div className="bg-gray-800 px-2 py-1 rounded">
                <span className="text-[#27f090] font-bold">$200</span>
              </div>
              <div className="bg-gray-800 px-2 py-1 rounded">
                <span className="text-white">Nv.1</span>
              </div>
              <div className="bg-gray-800 px-2 py-1 rounded">
                <span className="text-orange-400">🔥0</span>
              </div>
              <div className="bg-gray-800 px-2 py-1 rounded">
                <span className="text-yellow-400">#123</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-[#27f090] text-[#27f090] hover:bg-[#27f090] hover:text-black text-xs bg-transparent px-3 py-1"
              >
                Retirar
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 max-w-3xl mx-auto">
          <div className="h-[calc(100vh-120px)] flex flex-col">
            <div className="flex-1 space-y-4 py-8 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  {message.type === "bot" && (
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="w-8 h-8 flex-shrink-0 mt-1">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C1ideyqE71FPKhKDwq5IQtHU4dfzz1.png"
                          alt="Byron"
                          width={32}
                          height={32}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3">
                        <p className="text-white text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </div>
                  )}
                  {message.type === "user" && (
                    <div className="max-w-[80%]">
                      <div className="bg-[#27f090] text-black rounded-2xl rounded-tr-md px-4 py-3">
                        <p className="text-sm font-medium">{message.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 flex-shrink-0 mt-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-C1ideyqE71FPKhKDwq5IQtHU4dfzz1.png"
                        alt="Byron"
                        width={32}
                        height={32}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showOptions && (
              <div className="flex-shrink-0 border-t border-gray-800/50 pt-4 bg-gray-900/50 backdrop-blur-sm">
                {(() => {
                  console.log("[v0] Current step:", currentStep)
                  console.log("[v0] Current question:", questions[currentStep])
                  console.log("[v0] Show options:", showOptions)
                  return null
                })()}
                {questions[currentStep]?.id === "name" ? (
                  <form onSubmit={handleNameSubmit} className="space-y-3">
                    <div className="relative">
                      <input
                        name="name"
                        type="text"
                        placeholder="Escribe tu respuesta..."
                        className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#27f090] focus:ring-1 focus:ring-[#27f090] text-sm"
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-[#27f090] hover:bg-[#20d080] text-black font-medium rounded-xl px-6 py-2 text-sm"
                    >
                      Enviar
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {questions[currentStep]?.options?.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        variant="outline"
                        className="bg-gray-800/60 border-gray-700/50 text-white hover:bg-[#27f090] hover:text-black hover:border-[#27f090] transition-all rounded-xl px-4 py-2 text-sm"
                      >
                        {option}
                      </Button>
                    )) || <div className="text-red-500">No options available</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
