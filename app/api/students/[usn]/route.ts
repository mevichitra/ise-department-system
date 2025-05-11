import { sql } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET endpoint to fetch a specific student by USN
export async function GET(
  request: NextRequest,
  { params }: { params: { usn: string } }
) {
  try {
    const usn = params.usn;
    const result = await sql`
      SELECT * FROM students WHERE usn = ${usn}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error fetching student:", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

// PATCH endpoint to update a student
export async function PATCH(
  request: NextRequest,
  { params }: { params: { usn: string } }
) {
  try {
    const usn = params.usn;
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.phone || !data.year || !data.section) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update student in the database
    const result = await sql`
      UPDATE students
      SET 
        name = ${data.name},
        email = ${data.email},
        phone = ${data.phone},
        year = ${data.year},
        section = ${data.section},
        address = ${data.address || null},
        dob = ${data.dob || null},
        parent_name = ${data.parent_name || null},
        parent_phone = ${data.parent_phone || null}
      WHERE usn = ${usn}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

// DELETE endpoint to delete a student
export async function DELETE(
  request: NextRequest,
  { params }: { params: { usn: string } }
) {
  try {
    const usn = params.usn;

    // Delete student from the database
    const result = await sql`
      DELETE FROM students
      WHERE usn = ${usn}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
