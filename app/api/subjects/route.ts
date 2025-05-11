import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const subjects = await sql`SELECT * FROM subjects ORDER BY code`
    return NextResponse.json(subjects)
  } catch (error) {
    console.error("Error fetching subjects:", error)
    return NextResponse.json({ error: "Failed to fetch subjects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { code, name, credits } = await request.json()

    const result = await sql`
      INSERT INTO subjects (code, name, credits) 
      VALUES (${code}, ${name}, ${credits}) 
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating subject:", error)
    return NextResponse.json({ error: "Failed to create subject" }, { status: 500 })
  }
}
