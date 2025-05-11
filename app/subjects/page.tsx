import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

// Define the columns for the subjects table
const columns = [
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "credits",
    header: "Credits",
  },
]

async function getSubjects() {
  return sql`SELECT * FROM subjects ORDER BY code`
}

export default async function SubjectsPage() {
  const subjects = await getSubjects()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subjects</h1>
        <Link href="/subjects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Subject
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={subjects} searchKey="name" />
    </div>
  )
}
