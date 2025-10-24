import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Find quest by ID
    const quest = await prisma.quest.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!quest) {
      return NextResponse.json({
        success: false,
        error: "Quest not found"
      }, { status: 404 })
    }

    // Transform data to match frontend expectations
    const questData = {
      id: quest.id,
      trackingCode: quest.trackingCode,
      title: quest.title,
      description: quest.description,
      xp: quest.xp,
      rewardCoins: quest.rewardCoins,
      type: quest.type,
      isActive: quest.isActive,
      expiresAt: quest.expiresAt?.toISOString(),
      createdAt: quest.createdAt.toISOString(),
      poolCoins: quest.poolCoins,
      availableScripts: quest.availableScripts,
    }

    return NextResponse.json({
      success: true,
      data: questData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching quest:', error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch quest data",
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
