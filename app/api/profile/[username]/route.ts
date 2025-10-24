import { NextResponse } from "next/server"
import { mockUsers } from "@/lib/mock-data"

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  try {
    const { username } = await params

    // Simular un pequeño delay como si fuera una llamada real a DB
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Buscar el usuario por username
    const user = mockUsers.find((u) => u.username === username)

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch profile data" }, { status: 500 })
  }
}
