import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const faculty = await sql`SELECT * FROM faculty ORDER BY name`
    return NextResponse.json(faculty)
  } catch (error) {
    console.error("Error fetching faculty:", error)
    return NextResponse.json({ error: "Failed to fetch faculty" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, designation } = await request.json()

    const result = await sql`
      INSERT INTO faculty (name, email, phone, designation) 
      VALUES (${name}, ${email}, ${phone}, ${designation}) 
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating faculty:", error)
    return NextResponse.json({ error: "Failed to create faculty" }, { status: 500 })
  }
}
