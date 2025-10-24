import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch users with their submission counts and order by NINI score
    const users = await prisma.user.findMany({
      where: {
        onboardingCompleted: true, // Only show users who completed onboarding
      },
      include: {
        _count: {
          select: {
            submissions: true, // Count total submissions (videos)
          },
        },
      },
      orderBy: [
        { xpTotal: 'desc' }, // Primary sort by XP (NINI Score)
        { niniCoinsBalance: 'desc' }, // Secondary sort by coins
        { streakDays: 'desc' }, // Tertiary sort by streak
      ],
    })

    // Transform data to match frontend expectations
    const rankingData = users.map((user, index) => ({
      rank: index + 1, // Assign rank based on sorted position
      username: user.username || user.displayName || 'Usuario',
      avatar: user.profilePictureUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      videos: user._count.submissions, // Total submissions count
      streak: user.streakDays,
      earnings: user.niniCoinsBalance, // NINI coins balance as ganancias
      niniScore: user.xpTotal, // XP as NINI Score
      verified: !!user.username, // Consider verified if they have a username
    }))

    return NextResponse.json({
      success: true,
      data: rankingData,
      total: rankingData.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching ranking:', error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch ranking data",
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
