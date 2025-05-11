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
  const results = await sql`SELECT * FROM students ORDER BY year, section, name`
  // Cast the SQL results to the Student type
  return results as Student[]
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
            <form className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="usn" className="text-sm font-medium">USN</label>
                <Input id="usn" placeholder="e.g. 1SI21IS001" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" placeholder="e.g. John Doe" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="year" className="text-sm font-medium">Year</label>
                <Input id="year" type="number" placeholder="e.g. 3" min="1" max="4" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="section" className="text-sm font-medium">Section</label>
                <Input id="section" placeholder="e.g. A" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="e.g. john.doe@ise.edu" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input id="phone" placeholder="e.g. 9876543210" />
              </div>
              <div className="mt-2 flex items-center gap-2 sm:col-span-2">
                <Button>Save Student</Button>
                <Link href="/students">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
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
