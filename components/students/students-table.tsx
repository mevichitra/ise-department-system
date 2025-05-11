"use client"

import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { 
  ColumnDef,
  Row,
  FilterFn
} from "@tanstack/react-table"

type Student = {
  usn: string
  name: string
  year: number
  section: string
  email: string
  phone: string
}

// Define the columns for the students table on the client side
const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "usn",
    header: "USN",
    cell: ({ row }: { row: Row<Student> }) => {
      const usn = row.getValue("usn") as string
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
    cell: ({ row }: { row: Row<Student> }) => {
      const name = row.getValue("name") as string
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
    cell: ({ row }: { row: Row<Student> }) => {
      const year = row.getValue("year") as number
      return (
        <Badge variant="outline" className="px-3 py-1">
          {year}<sup>st</sup> Year
        </Badge>
      )
    },
    filterFn: (row: Row<Student>, id: string, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }: { row: Row<Student> }) => {
      const section = row.getValue("section") as string
      return (
        <Badge variant="secondary" className="px-3 py-1">
          Section {section}
        </Badge>
      )
    },
    filterFn: (row: Row<Student>, id: string, value: string[]) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }: { row: Row<Student> }) => {
      const email = row.getValue("email") as string
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
    cell: ({ row }: { row: Row<Student> }) => {
      const phone = row.getValue("phone") as string
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
    cell: ({ row }: { row: Row<Student> }) => {
      const student = row.original as Student
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

interface StudentsTableProps {
  data: Student[]
}

export function StudentsTable({ data }: StudentsTableProps) {
  return <DataTable columns={columns} data={data} searchKey="name" />
}
