import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { calculateStreak } from "@/lib/streak-calculator"

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params

    // Find user by username with their submissions and rewards
    const user = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive', // Case-insensitive search
        },
      },
      include: {
        submissions: {
          include: {
            quest: true,
            rewards: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        rewards: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            submissions: true,
            rewards: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found"
      }, { status: 404 })
    }

    // Calculate user's rank based on XP
    const usersAbove = await prisma.user.count({
      where: {
        onboardingCompleted: true,
        OR: [
          { xpTotal: { gt: user.xpTotal } },
          {
            AND: [
              { xpTotal: user.xpTotal },
              { niniCoinsBalance: { gt: user.niniCoinsBalance } },
            ],
          },
          {
            AND: [
              { xpTotal: user.xpTotal },
              { niniCoinsBalance: user.niniCoinsBalance },
              { streakDays: { gt: user.streakDays } },
            ],
          },
        ],
      },
    })
    const calculatedRank = usersAbove + 1

    // Calculate statistics
    const totalXP = user.xpTotal
    const totalCoins = user.niniCoinsBalance
    const totalSubmissions = user._count.submissions

    // Calculate streak from consecutive submission days
    const streak = calculateStreak(user.submissions)

    // Transform data to match frontend expectations
    const profileData = {
      username: user.username || user.displayName || 'Usuario',
      displayName: user.displayName,
      avatar: user.profilePictureUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      rank: calculatedRank,
      niniScore: totalXP,
      videosUploaded: totalSubmissions,
      streak: streak,
      earnings: totalCoins,
      category: user.category,
      joinDate: user.createdAt.toISOString(),
      verified: !!user.username,
      recentSubmissions: user.submissions.map(sub => ({
        id: sub.id,
        questTitle: sub.quest.title,
        shareUrl: sub.shareUrl,
        state: sub.state,
        createdAt: sub.createdAt.toISOString(),
        rewards: sub.rewards.map(r => ({
          xp: r.xp,
          coins: r.coins,
        })),
      })),
    }

    return NextResponse.json({
      success: true,
      data: profileData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json({
      success: false,
      error: "Failed to fetch profile data",
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
