import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET /api/leaderboard - Get top users ranked by XP
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const users = await prisma.user.findMany({
      where: {
        onboardingCompleted: true,
      },
      orderBy: {
        xpTotal: 'desc',
      },
      take: limit,
      select: {
        id: true,
        username: true,
        displayName: true,
        xpTotal: true,
        niniCoinsBalance: true,
        streakDays: true,
        rank: true,
        level: true,
        totalQuestsCompleted: true,
        category: true,
      },
    })

    // Add calculated rank position
    const rankedUsers = users.map((user, index) => ({
      ...user,
      position: index + 1,
    }))

    return NextResponse.json({ success: true, data: rankedUsers })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}
