import { sql } from "@/lib/db"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { 
  PlusCircle, 
  School, 
  Download, 
  Search, 
  Filter, 
  UserRoundPlus, 
  Mail,
  Phone
} from "lucide-react"

// Define the columns for the students table
const columns = [
  {
    accessorKey: "usn",
    header: "USN",
    cell: ({ row }) => {
      const usn = row.getValue("usn")
      return (
        <div className="font-medium">
          {usn}
        </div>
      )
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name")
      return (
        <div className="font-medium">
          {name}
        </div>
      )
    },
  },
  {
    accessorKey: "year",
    header: "Year",
    cell: ({ row }) => {
      const year = row.getValue("year")
      return (
        <Badge variant="outline" className="px-3 py-1">
          {year}<sup>st</sup> Year
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => {
      const section = row.getValue("section")
      return (
        <Badge variant="secondary" className="px-3 py-1">
          Section {section}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email")
      return (
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone")
      return (
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const student = row.original
      return (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href={`/students/${student.usn}`}>View</Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/students/${student.usn}/edit`}>Edit</Link>
          </Button>
        </div>
      )
    },
  },
]

async function getStudents() {
  return sql`SELECT * FROM students ORDER BY year, section, name`
}

export default async function StudentsPage({ searchParams }) {
  const students = await getStudents()
  const showAddForm = searchParams?.action === 'add'

  return (
    <div className="animate-in space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="gradient-heading text-3xl font-bold tracking-tight">Students</h1>
          <p className="mt-1 text-muted-foreground">Manage all student records in the department</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Link href="/students?action=add">
            <Button size="sm" className="gap-2">
              <UserRoundPlus className="h-4 w-4" />
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      {showAddForm ? (
        <Card className="hover-card-effect">
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
        <Card className="hover-card-effect">
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
          <CardContent className="px-0 pb-0">
            <DataTable columns={columns} data={students} searchKey="name" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
