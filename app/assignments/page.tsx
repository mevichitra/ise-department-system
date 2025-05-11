import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

// Define the columns for the assignments table
const columns = [
  {
    accessorKey: "faculty_name",
    header: "Faculty",
  },
  {
    accessorKey: "subject_name",
    header: "Subject",
  },
  {
    accessorKey: "subject_code",
    header: "Subject Code",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "semester",
    header: "Semester",
  },
]

async function getAssignments() {
  return sql`
    SELECT fa.id, f.name as faculty_name, s.name as subject_name, s.code as subject_code, 
           c.year, c.section, c.semester
    FROM faculty_assignments fa
    JOIN faculty f ON fa.faculty_id = f.id
    JOIN subjects s ON fa.subject_code = s.code
    JOIN classes c ON fa.class_id = c.id
    ORDER BY c.year, c.section, c.semester, s.code
  `
}

export default async function AssignmentsPage() {
  const assignments = await getAssignments()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Faculty Assignments</h1>
        <Link href="/assignments/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Assignment
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={assignments} searchKey="faculty_name" />
    </div>
  )
}
