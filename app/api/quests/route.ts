import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/quests - Get all active quests
export async function GET() {
  try {
    const quests = await prisma.quest.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ success: true, data: quests })
  } catch (error) {
    console.error('Error fetching quests:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quests' },
      { status: 500 }
    )
  }
}

// POST /api/quests - Create a new quest
export async function POST(request: Request) {
  try {
    const body = await request.json()

    const quest = await prisma.quest.create({
      data: {
        trackingCode: body.trackingCode,
        title: body.title,
        description: body.description,
        xp: body.xp || 0,
        rewardCoins: body.rewardCoins || 0,
        type: body.type,
        poolCoins: body.poolCoins,
        availableScripts: body.availableScripts,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
      },
    })

    return NextResponse.json({ success: true, data: quest })
  } catch (error) {
    console.error('Error creating quest:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create quest' },
      { status: 500 }
    )
  }
}
