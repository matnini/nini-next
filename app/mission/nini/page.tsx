"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, FileText, Eye, DollarSign } from "lucide-react"
import Link from "next/link"

interface Script {
  id: number
  title: string
  content: string
  estimatedViews: number
  earnings: number
}

export default function NiniMissionPage() {
  const { t } = useLanguage()

  const scripts: Script[] = [
    {
      id: 1,
      title: "Script 1: Introducción a NINI",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      estimatedViews: 5000,
      earnings: 5,
    },
    {
      id: 2,
      title: "Script 2: Beneficios de NINI",
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      estimatedViews: 4500,
      earnings: 4.5,
    },
    {
      id: 3,
      title: "Script 3: Cómo Empezar",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      estimatedViews: 6000,
      earnings: 6,
    },
    {
      id: 4,
      title: "Script 4: Historias de Éxito",
      content: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
      estimatedViews: 7000,
      earnings: 7,
    },
    {
      id: 5,
      title: "Script 5: Consejos para Creadores",
      content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      estimatedViews: 5500,
      earnings: 5.5,
    },
    {
      id: 6,
      title: "Script 6: Monetización en NINI",
      content: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
      estimatedViews: 8000,
      earnings: 8,
    },
    {
      id: 7,
      title: "Script 7: Comunidad NINI",
      content: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
      estimatedViews: 4000,
      earnings: 4,
    },
    {
      id: 8,
      title: "Script 8: Tutoriales Avanzados",
      content: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Ut enim ad minima veniam.",
      estimatedViews: 6500,
      earnings: 6.5,
    },
    {
      id: 9,
      title: "Script 9: Tendencias Virales",
      content: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.",
      estimatedViews: 9000,
      earnings: 9,
    },
    {
      id: 10,
      title: "Script 10: Colaboraciones",
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
      estimatedViews: 5000,
      earnings: 5,
    },
    {
      id: 11,
      title: "Script 11: Estrategias de Crecimiento",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.",
      estimatedViews: 7500,
      earnings: 7.5,
    },
    {
      id: 12,
      title: "Script 12: Próximos Pasos",
      content: "Consectetur adipiscing elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor.",
      estimatedViews: 6000,
      earnings: 6,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("back") || "Volver"}
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <img
              src="/nini-logo.svg"
              alt="NINI"
              className="w-16 h-16 rounded-xl object-contain bg-white p-2 border-2 border-primary"
            />
            <div>
              <h1 className="text-4xl lg:text-5xl font-black">Misión NINI</h1>
              <p className="text-muted-foreground">Social Platform</p>
            </div>
          </div>

          {/* Mission Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Presupuesto Total</span>
              </div>
              <p className="text-2xl font-black text-primary">$2,500 USD</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Pago por Vistas</span>
              </div>
              <p className="text-2xl font-black">$1 / 1,000 vistas</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Scripts Disponibles</span>
              </div>
              <p className="text-2xl font-black">12 scripts</p>
            </div>
          </div>
        </div>

        {/* Scripts Section */}
        <div>
          <h2 className="text-2xl font-black mb-6">Scripts Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scripts.map((script) => (
              <Card key={script.id} className="hover:border-primary transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{script.title}</CardTitle>
                  <CardDescription>Script #{script.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4">{script.content}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <div className="w-full flex justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      ~{script.estimatedViews.toLocaleString()} vistas
                    </span>
                    <span className="flex items-center gap-1 text-primary font-bold">
                      <DollarSign className="w-3 h-3" />
                      ${script.earnings}
                    </span>
                  </div>
                  <Button className="w-full" size="sm">
                    Usar este Script
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
