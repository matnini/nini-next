import { NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function GET() {
  try {
    // Simular un pequeño delay como si fuera una llamada real a DB
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Devolver solo los datos necesarios para el ranking
    const rankingData = mockUsers.map((user) => ({
      rank: user.rank,
      username: user.username,
      avatar: user.avatar,
      videos: user.videos,
      streak: user.streak,
      earnings: user.earnings,
      niniScore: user.niniScore,
      verified: user.verified,
    }))

    return NextResponse.json({
      success: true,
      data: rankingData,
      total: rankingData.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch ranking data" }, { status: 500 })
  }
}
