import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { calculateStreak } from "@/lib/streak-calculator"

export async function GET() {
  try {
    // Fetch users with their submission counts and order by NINI score
    const users = await prisma.user.findMany({
      where: {
        onboardingCompleted: true, // Only show users who completed onboarding
      },
      include: {
        submissions: {
          select: {
            createdAt: true,
          },
        },
        _count: {
          select: {
            submissions: true, // Count total submissions (videos)
          },
        },
      },
    })

    // Calculate streaks and transform data
    const usersWithStreaks = users.map(user => ({
      ...user,
      calculatedStreak: calculateStreak(user.submissions),
    }))

    // Sort by XP, then coins, then streak
    usersWithStreaks.sort((a, b) => {
      if (b.xpTotal !== a.xpTotal) return b.xpTotal - a.xpTotal
      if (b.niniCoinsBalance !== a.niniCoinsBalance) return b.niniCoinsBalance - a.niniCoinsBalance
      return b.calculatedStreak - a.calculatedStreak
    })

    // Transform data to match frontend expectations
    const rankingData = usersWithStreaks.map((user, index) => ({
      rank: index + 1, // Assign rank based on sorted position
      username: user.username || user.displayName || 'Usuario',
      avatar: user.profilePictureUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      videos: user._count.submissions, // Total submissions count
      streak: user.calculatedStreak, // Use calculated streak
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
