import { NextResponse } from "next/server";
import { Student } from "@/types/students";

// Use the standardized database connection
import { sql } from "@/lib/db";

export async function GET() {
  try {
    // Fetch all students from the database
    const result = await sql`SELECT * FROM students ORDER BY year, section, name`;
    const students = result as Student[];

    // Convert to CSV format
    const csv = generateCSV(students);

    // Return CSV as a downloadable file
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="students-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting students:", error);
    return NextResponse.json(
      { error: "Failed to export students" },
      { status: 500 }
    );
  }
}

function generateCSV(data: Student[]): string {
  if (data.length === 0) return "";

  // Create header row with all possible columns
  const headers = [
    "USN",
    "Name",
    "Year",
    "Section",
    "Email",
    "Phone",
    "Address",
    "DOB",
    "Parent Name",
    "Parent Phone",
  ];

  // Create CSV header row
  const headerRow = headers.join(",");

  // Create rows for each student
  const rows = data.map((student) => {
    return [
      escape(student.usn),
      escape(student.name),
      escape(student.year.toString()),
      escape(student.section),
      escape(student.email),
      escape(student.phone),
      escape(student.address || ""),
      escape(student.dob || ""),
      escape(student.parent_name || ""),
      escape(student.parent_phone || ""),
    ].join(",");
  });

  // Combine header and data rows
  return [headerRow, ...rows].join("\n");
}

// Helper function to escape CSV values
function escape(value: string): string {
  if (value === null || value === undefined) return '""';
  
  // Escape quotes and wrap in quotes if the value contains a comma, quote, or newline
  const escaped = value.replace(/"/g, '""');
  return `"${escaped}"`;
}
