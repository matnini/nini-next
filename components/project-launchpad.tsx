"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Eye } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  category: string
  stage: "idea" | "mvp" | "beta" | "launched"
  fundingGoal: number
  currentFunding: number
  backers: number
  daysLeft: number
  image: string
  tags: string[]
  founderName: string
  monthlyRevenue: number
  growthRate: number
  validatedVideos: number
  effortHours: number
  minInvestment: number
  expectedROI: number
  riskLevel: "low" | "medium" | "high"
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "EcoWear AI",
    description: "Ropa sostenible diseñada por IA que se adapta a tu estilo y reduce el impacto ambiental",
    category: "Fashion Tech",
    stage: "beta",
    fundingGoal: 50000,
    currentFunding: 32500,
    backers: 127,
    daysLeft: 15,
    image: "/sustainable-fashion-ai-app.jpg",
    tags: ["IA", "Sostenible", "Fashion"],
    founderName: "Sofia_Builder",
    monthlyRevenue: 8500,
    growthRate: 23.5,
    validatedVideos: 12,
    effortHours: 340,
    minInvestment: 100,
    expectedROI: 180,
    riskLevel: "medium",
  },
  {
    id: "2",
    name: "StudyBuddy",
    description: "Plataforma que conecta estudiantes para sesiones de estudio gamificadas con recompensas",
    category: "EdTech",
    stage: "mvp",
    fundingGoal: 25000,
    currentFunding: 8750,
    backers: 89,
    daysLeft: 22,
    image: "/study-app-students-collaboration.jpg",
    tags: ["Educación", "Social", "Gamificación"],
    founderName: "Luna_Code",
    monthlyRevenue: 2100,
    growthRate: 45.2,
    validatedVideos: 8,
    effortHours: 220,
    minInvestment: 50,
    expectedROI: 250,
    riskLevel: "high",
  },
  {
    id: "3",
    name: "CryptoChef",
    description: "App que te enseña a cocinar mientras minas crypto con recetas NFT exclusivas",
    category: "Food & Crypto",
    stage: "idea",
    fundingGoal: 75000,
    currentFunding: 12300,
    backers: 45,
    daysLeft: 30,
    image: "/cooking-app-crypto-nft-kitchen.jpg",
    tags: ["Crypto", "Cooking", "NFT"],
    founderName: "Marcus_Hustle",
    monthlyRevenue: 0,
    growthRate: 0,
    validatedVideos: 4,
    effortHours: 150,
    minInvestment: 25,
    expectedROI: 300,
    riskLevel: "high",
  },
]

const stageColors = {
  idea: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  mvp: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  beta: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  launched: "bg-green-500/20 text-green-300 border-green-500/30",
}

const stageLabels = {
  idea: "💡 Idea",
  mvp: "🔧 MVP",
  beta: "🧪 Beta",
  launched: "🚀 Live",
}

const riskColors = {
  low: "text-green-400",
  medium: "text-yellow-400",
  high: "text-red-400",
}

export function ProjectLaunchpad() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [view, setView] = useState<"projects" | "investment">("projects")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = ["all", "Fashion Tech", "EdTech", "Food & Crypto"]

  const filteredProjects =
    selectedCategory === "all" ? mockProjects : mockProjects.filter((p) => p.category === selectedCategory)

  const calculateInvestmentScore = (project: Project) => {
    const revenueScore = project.monthlyRevenue > 0 ? 30 : 0
    const growthScore = Math.min(project.growthRate * 0.5, 25)
    const effortScore = Math.min(project.effortHours * 0.1, 25)
    const validationScore = Math.min(project.validatedVideos * 2, 20)
    return Math.round(revenueScore + growthScore + effortScore + validationScore)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
          🚀 NotUniversity Launchpad
        </h2>
        <p className="text-sm text-muted-foreground">Invierte en startups reales de founders verificados</p>
      </div>

      <div className="flex gap-2 bg-card/30 backdrop-blur-sm rounded-xl p-1">
        <Button
          variant={view === "projects" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("projects")}
          className="flex-1 text-xs"
        >
          🚀 Proyectos
        </Button>
        <Button
          variant={view === "investment" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("investment")}
          className="flex-1 text-xs"
        >
          💰 Inversión
        </Button>
      </div>

      {view === "projects" ? (
        <>
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap text-xs"
              >
                {category === "all" ? "🌟 Todos" : category}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const fundingPercentage = (project.currentFunding / project.fundingGoal) * 100

              return (
                <div
                  key={project.id}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 space-y-3"
                >
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm">{project.name}</h3>
                        <Badge className={`text-xs px-2 py-0.5 ${stageColors[project.stage]}`}>
                          {stageLabels[project.stage]}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="w-full h-20 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1 flex-wrap">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Funding Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        ${project.currentFunding.toLocaleString()} de ${project.fundingGoal.toLocaleString()}
                      </span>
                      <span className="text-accent font-medium">{Math.round(fundingPercentage)}%</span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>👥 {project.backers} backers</span>
                      <span>⏰ {project.daysLeft} días restantes</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button size="sm" className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90">
                    💰 Apoyar con Nini Coins
                  </Button>
                </div>
              )
            })}
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {/* Investment Stats Header */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="border-accent/20">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-accent">12.5k</div>
                <div className="text-xs text-muted-foreground">Nini Coins invertidos</div>
              </CardContent>
            </Card>
            <Card className="border-secondary/20">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-secondary">+23%</div>
                <div className="text-xs text-muted-foreground">ROI promedio</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground">Inversiones activas</div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Opportunities */}
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const investmentScore = calculateInvestmentScore(project)

              return (
                <Card key={project.id} className="border-accent/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm">{project.name}</CardTitle>
                        <Badge className={`text-xs ${stageColors[project.stage]}`}>{stageLabels[project.stage]}</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-accent">{investmentScore}/100</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Founder & Revenue */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs text-muted-foreground">Founder</div>
                        <div className="text-sm font-medium">{project.founderName}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Revenue mensual</div>
                        <div className="text-sm font-bold text-green-400">
                          {project.monthlyRevenue > 0 ? `$${project.monthlyRevenue.toLocaleString()}` : "Pre-revenue"}
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-lg font-bold text-secondary">+{project.growthRate}%</div>
                        <div className="text-xs text-muted-foreground">Crecimiento</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-accent">{project.validatedVideos}</div>
                        <div className="text-xs text-muted-foreground">Videos validados</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-primary">{project.effortHours}h</div>
                        <div className="text-xs text-muted-foreground">Esfuerzo total</div>
                      </div>
                    </div>

                    {/* Investment Details */}
                    <div className="bg-background/50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Inversión mínima:</span>
                        <span className="font-medium">{project.minInvestment} Nini Coins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ROI esperado:</span>
                        <span className="font-medium text-green-400">+{project.expectedROI}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Riesgo:</span>
                        <span className={`font-medium capitalize ${riskColors[project.riskLevel]}`}>
                          {project.riskLevel}
                        </span>
                      </div>
                    </div>

                    {/* Investment Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedProject(project)}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Ver Detalles
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-secondary to-accent">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Invertir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-xl border border-accent/20">
        <p className="text-sm font-medium mb-2">¿Tienes un proyecto genial?</p>
        <Button variant="outline" size="sm" className="text-xs bg-transparent">
          🚀 Lanza tu proyecto
        </Button>
      </div>
    </div>
  )
}
