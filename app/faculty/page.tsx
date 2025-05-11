import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

// Define the columns for the faculty table
const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
]

async function getFaculty() {
  return sql`SELECT * FROM faculty ORDER BY name`
}

export default async function FacultyPage() {
  const faculty = await getFaculty()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Faculty</h1>
        <Link href="/faculty/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={faculty} searchKey="name" />
    </div>
  )
}
