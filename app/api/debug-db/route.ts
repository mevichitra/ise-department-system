import { sql } from "@/lib/db";
import { NextResponse } from "next/server";

// This is a debug endpoint that will show us the database connection and data
export async function GET() {
  try {
    // Get list of all tables in the database to verify connection
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    // Try to get students data
    const students = await sql`SELECT * FROM students LIMIT 10`;
    
    // Return diagnostic information
    return NextResponse.json({
      databaseConnection: "success",
      tables: tables,
      studentsTableExists: tables.some((t: any) => t.table_name === 'students'),
      studentCount: students?.length || 0,
      studentSample: students?.slice(0, 2) || [],
      env: {
        databaseUrl: process.env.DATABASE_URL ? "Set (first few chars): " + process.env.DATABASE_URL.substring(0, 15) + "..." : "Not set"
      }
    });
  } catch (error: any) {
    console.error("Database debug error:", error);
    return NextResponse.json({
      error: "Failed to connect to database",
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
