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
    // Log the database URL (partially) for debugging
    console.log('Using database connection:', process.env.DATABASE_URL?.substring(0, 20) + '...')

    // Direct database connection, explicitly targeting students table
    const results = await sql`
      SELECT 
        usn, 
        name, 
        year, 
        section, 
        email, 
        phone 
      FROM students 
      ORDER BY year, section, name
    `
    
    // Verbose debugging to see what's coming from the database
    console.log('Raw database result:', JSON.stringify(results))
    console.log('Fetched students count:', results?.length || 0)
    
    if (!Array.isArray(results) || results.length === 0) {
      console.warn('No students found in database or results is not an array!')
    } else {
      console.log('First student from DB:', results[0])
    }
    
    // Map the results to ensure they match the Student type exactly
    const mappedResults: Student[] = Array.isArray(results) ? results.map(row => ({
      usn: String(row.usn || ''),
      name: String(row.name || ''),
      year: Number(row.year || 1),
      section: String(row.section || ''),
      email: String(row.email || ''),
      phone: String(row.phone || '')
    })) : []
    
    return mappedResults
  } catch (error) {
    console.error('Error fetching students:', error)
    // Return empty array on error to prevent UI crashes
    return [] 
  }
}

export default async function StudentsPage({ searchParams }: { searchParams?: { action?: string } }) {
  const students = await getStudents()
  const showAddForm = searchParams?.action === 'add'

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center shrink-0 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text">Students</h1>
          <p className="mt-2 text-muted-foreground">Manage all student records in the department</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="lg" className="rounded-lg px-5 shadow-sm border-2 hover:bg-secondary transition-all duration-200">
            <Link href="/students?action=add" scroll={false}>Add Student</Link>
          </Button>
          <ExportButton 
            variant="secondary" 
            size="lg"
            className="hidden sm:flex shadow-sm rounded-lg px-5" 
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
        <Card className="h-full overflow-hidden flex flex-col bg-white shadow-sm border-2 rounded-xl">
          <CardHeader className="pb-4 pt-5 px-6">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-primary-foreground bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
                <School className="h-6 w-6 text-primary" />
                Student Directory
              </CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-9 pr-4 py-2 h-10 w-[260px] rounded-lg border-2 shadow-sm focus-visible:ring-primary/60" 
                  />
                </div>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg border-2 shadow-sm hover:bg-secondary transition-all duration-200">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            {students.length > 0 ? (
              <StudentsTable data={students} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <div className="loader mb-4"></div>
                <p>Loading student data...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      </div>
    </div>
  )
}
