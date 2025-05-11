import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

// Define the columns for the marks table
const columns = [
  {
    accessorKey: "usn",
    header: "USN",
  },
  {
    accessorKey: "student_name",
    header: "Student Name",
  },
  {
    accessorKey: "subject_code",
    header: "Subject Code",
  },
  {
    accessorKey: "subject_name",
    header: "Subject Name",
  },
  {
    accessorKey: "internal_marks",
    header: "Internal Marks",
  },
  {
    accessorKey: "external_marks",
    header: "External Marks",
  },
  {
    accessorKey: "total_marks",
    header: "Total Marks",
  },
]

async function getMarks() {
  return sql`
    SELECT m.id, m.usn, s.name as student_name, m.subject_code, 
           sub.name as subject_name, m.internal_marks, m.external_marks, m.total_marks
    FROM marks m
    JOIN students s ON m.usn = s.usn
    JOIN subjects sub ON m.subject_code = sub.code
    ORDER BY s.name, sub.name
  `
}

export default async function MarksPage() {
  const marks = await getMarks()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Marks</h1>
        <Link href="/marks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Marks
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={marks} searchKey="student_name" />
    </div>
  )
}
