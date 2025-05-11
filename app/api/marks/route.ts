import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const marks = await sql`
      SELECT m.id, m.usn, s.name as student_name, m.subject_code, 
             sub.name as subject_name, m.internal_marks, m.external_marks, m.total_marks
      FROM marks m
      JOIN students s ON m.usn = s.usn
      JOIN subjects sub ON m.subject_code = sub.code
      ORDER BY s.name, sub.name
    `
    return NextResponse.json(marks)
  } catch (error) {
    console.error("Error fetching marks:", error)
    return NextResponse.json({ error: "Failed to fetch marks" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { usn, subject_code, internal_marks, external_marks } = await request.json()

    const total_marks = Number.parseFloat(internal_marks) + Number.parseFloat(external_marks)

    const result = await sql`
      INSERT INTO marks (usn, subject_code, internal_marks, external_marks, total_marks) 
      VALUES (${usn}, ${subject_code}, ${internal_marks}, ${external_marks}, ${total_marks}) 
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating marks:", error)
    return NextResponse.json({ error: "Failed to create marks" }, { status: 500 })
  }
}
