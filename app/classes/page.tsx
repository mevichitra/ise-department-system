import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

// Define the columns for the classes table
const columns = [
  {
    accessorKey: "id",
    header: "ID",
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

async function getClasses() {
  return sql`SELECT * FROM classes ORDER BY year, section, semester`
}

export default async function ClassesPage() {
  const classes = await getClasses()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Classes</h1>
        <Link href="/classes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={classes} searchKey="year" />
    </div>
  )
}
