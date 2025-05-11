import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StudentsTable } from "@/components/students/students-table"
import Link from "next/link"
import { 
  School, 
  Download, 
  Search, 
  Filter, 
  UserRoundPlus,
  Users,
  ArrowUpDown
} from "lucide-react"
import { ExportButton } from "@/components/students/export-button"
import { AddStudentForm } from "@/components/students/add-student-form"

// Student type definitions
interface Student {
  usn: string;
  name: string;
  year: number;
  section: string;
  email: string;
  phone: string;
}

async function getStudents(): Promise<Student[]> {
  try {
    // Explicitly query all required fields to ensure consistent data structure
    const results = await sql`
      SELECT usn, name, year, section, email, phone
      FROM students 
      ORDER BY year, section, name
    `
    
    // For debugging
    console.log('Fetched students count:', results.length)
    
    // Map the results to ensure they match the Student type exactly
    return Array.isArray(results) ? results.map(row => ({
      usn: row.usn,
      name: row.name,
      year: Number(row.year),
      section: row.section,
      email: row.email,
      phone: row.phone
    })) : []
  } catch (error) {
    console.error('Error fetching students:', error)
    return [] // Return empty array on error to prevent UI crashes
  }
}

export default async function StudentsPage({ searchParams }: { searchParams?: { action?: string } }) {
  const students = await getStudents()
  const showAddForm = searchParams?.action === 'add'

  return (
    <div className="flex flex-col h-full animate-in">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center shrink-0">
        <div>
          <h1 className="gradient-heading text-3xl font-bold tracking-tight">Students</h1>
          <p className="mt-1 text-muted-foreground">Manage all student records in the department</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/students?action=add" scroll={false}>Add Student</Link>
          </Button>
          <ExportButton 
            variant="secondary" 
            size="sm"
            className="hidden sm:flex" 
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {showAddForm ? (
        <Card className="h-full overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
            <CardDescription>Enter student information to add them to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <AddStudentForm />
          </CardContent>
        </Card>
      ) : (
        <Card className="h-full overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5 text-primary" />
                <span>Student Directory</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-8 sm:w-[260px] md:w-[300px]" 
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <StudentsTable data={students} />
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}
