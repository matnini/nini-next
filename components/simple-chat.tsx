"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "nini"
  timestamp: Date
}

export function SimpleChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setTimeout(() => {
      const niniResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Let's build something legendary. I'll help you architect this into reality.",
        sender: "nini",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, niniResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
          What do you want to create?
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tell me your vision and I'll help you build it into reality
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start gap-3 max-w-[85%]">
              <div
                className={`p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto"
                    : "bg-card/80 backdrop-blur-sm border border-border/50 text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6">
        <div className="flex gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 focus-within:border-accent/50 transition-colors shadow-lg">
          <Button variant="ghost" size="icon" className="shrink-0 hover:bg-accent/20">
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe your vision, idea, or concept..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-base"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
