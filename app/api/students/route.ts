import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const students = await sql`SELECT * FROM students ORDER BY year, section, name`
    return NextResponse.json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { usn, name, year, section, email, phone } = await request.json()

    const result = await sql`
      INSERT INTO students (usn, name, year, section, email, phone) 
      VALUES (${usn}, ${name}, ${year}, ${section}, ${email}, ${phone}) 
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
}
