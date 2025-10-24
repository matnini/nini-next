"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Sparkles, Mic, MicOff, Paperclip, ImageIcon, Copy, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  type?: "text" | "audio" | "image"
  audioUrl?: string
  imageUrl?: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 Ready to level up your game? I'm here to help you earn Bitcoin and unlock new achievements!",
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: "2",
      text: "How do I earn Bitcoin?",
      isUser: true,
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: "3",
      text: "Great question! 🚀 You can earn Bitcoin by completing daily challenges, referring friends, and engaging with our AI learning modules. Each activity gives you XP and Bitcoin rewards!",
      isUser: false,
      timestamp: new Date(),
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "That's awesome! 🎉 Keep asking questions and I'll help you maximize your earnings. Every interaction gets you closer to your next level!",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      const chunks: BlobPart[] = []

      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(blob)

        const audioMessage: Message = {
          id: Date.now().toString(),
          text: "🎤 Audio message",
          isUser: true,
          timestamp: new Date(),
          type: "audio",
          audioUrl,
        }

        setMessages((prev) => [...prev, audioMessage])

        // Simulate AI response to audio
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "I heard your audio message! 🎧 That's a great way to communicate. Audio messages help me understand your tone and energy better!",
            isUser: false,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, aiResponse])
        }, 1500)
      }

      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      mediaRecorder.stream.getTracks().forEach((track) => track.stop())
      setIsRecording(false)
      setMediaRecorder(null)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `📎 ${file.name}`,
        isUser: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, fileMessage])

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for sharing that file! 📄 I can help you analyze documents, images, and other content to boost your productivity and earnings!",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      const imageMessage: Message = {
        id: Date.now().toString(),
        text: "📸 Image shared",
        isUser: true,
        timestamp: new Date(),
        type: "image",
        imageUrl,
      }

      setMessages((prev) => [...prev, imageMessage])

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Cool image! 🖼️ I can help you analyze images, extract text, or even suggest ways to monetize your visual content!",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const regenerateResponse = (messageId: string) => {
    const responses = [
      "Let me give you another perspective! 🔄 There are multiple ways to approach this challenge and maximize your rewards.",
      "Here's a different take! ✨ I can suggest alternative strategies that might work better for your goals.",
      "Good question! 🎯 Let me share some fresh insights that could help you level up even faster.",
    ]

    const newResponse: Message = {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newResponse])
  }

  return (
    <div className="flex flex-col h-full max-h-96">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.txt"
      />
      <input ref={imageInputRef} type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gradient-to-b from-background/50 to-card/30 rounded-t-2xl">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? "bg-gradient-to-r from-secondary to-accent text-accent-foreground ml-4"
                  : "bg-card border border-border text-card-foreground mr-4"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              {!message.isUser && (
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-accent">AI Copilot</span>
                </div>
              )}

              {message.type === "audio" && message.audioUrl && (
                <audio controls className="w-full mb-2">
                  <source src={message.audioUrl} type="audio/wav" />
                </audio>
              )}

              {message.type === "image" && message.imageUrl && (
                <img
                  src={message.imageUrl || "/placeholder.svg"}
                  alt="Shared image"
                  className="w-full max-w-48 rounded-lg mb-2"
                />
              )}

              <p className="text-sm leading-relaxed">{message.text}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                    onClick={() => copyMessage(message.text)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>

                  {!message.isUser && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                        onClick={() => regenerateResponse(message.id)}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100 hover:text-green-500"
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100 hover:text-red-500"
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card/50 backdrop-blur-sm rounded-b-2xl border-t border-border">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-card/50 border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="bg-card/50 border-border hover:bg-accent hover:text-accent-foreground"
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" />
          </Button>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-input border-border rounded-xl text-foreground placeholder:text-muted-foreground"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />

          <Button
            variant="outline"
            size="icon"
            className={`border-border hover:bg-accent hover:text-accent-foreground ${
              isRecording ? "bg-red-500 text-white animate-pulse" : "bg-card/50"
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>

          <Button
            onClick={handleSend}
            size="icon"
            className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/80 hover:to-accent/80 text-accent-foreground rounded-xl animate-pulse-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-card/50 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setInputValue("What are today's challenges?")}
          >
            Daily Challenges
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-card/50 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setInputValue("How can I level up faster?")}
          >
            Level Up Tips
          </Button>
        </div>
      </div>
    </div>
  )
}
