import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const assignments = await sql`
      SELECT fa.id, f.name as faculty_name, s.name as subject_name, s.code as subject_code, 
             c.year, c.section, c.semester
      FROM faculty_assignments fa
      JOIN faculty f ON fa.faculty_id = f.id
      JOIN subjects s ON fa.subject_code = s.code
      JOIN classes c ON fa.class_id = c.id
      ORDER BY c.year, c.section, c.semester, s.code
    `
    return NextResponse.json(assignments)
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { faculty_id, class_id, subject_code } = await request.json()

    const result = await sql`
      INSERT INTO faculty_assignments (faculty_id, class_id, subject_code) 
      VALUES (${faculty_id}, ${class_id}, ${subject_code}) 
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 })
  }
}
