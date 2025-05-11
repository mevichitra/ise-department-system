"use client"

import { useState } from "react"
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StudentDetailsDialog } from "./student-details-dialog"
import { StudentEditDialog } from "./student-edit-dialog"
import { Mail, Phone, Download } from "lucide-react"
import { exportStudentsToCSV } from "@/lib/utils/export-data"

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
          <Button size="sm" variant="outline">
            View
          </Button>
          <Button size="sm" variant="outline">
            Edit
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
  const [viewStudent, setViewStudent] = useState<Student | null>(null)
  const [editStudent, setEditStudent] = useState<Student | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  
  const handleView = (student: Student) => {
    setViewStudent(student)
    setViewDialogOpen(true)
  }
  
  const handleEdit = (student: Student) => {
    setEditStudent(student)
    setEditDialogOpen(true)
  }
  
  const handleExport = () => {
    exportStudentsToCSV(data)
  }
  
  const tableColumns = columns.map(col => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }: { row: Row<Student> }) => {
          const student = row.original
          return (
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleView(student)}
              >
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleEdit(student)}
              >
                Edit
              </Button>
            </div>
          )
        }
      }
    }
    return col
  })
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end mb-2">
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="flex-1 overflow-auto rounded-md border">
        <DataTable 
          columns={tableColumns} 
          data={data} 
          searchKey="name"
        />
      </div>
      
      {/* View Student Dialog */}
      <StudentDetailsDialog
        student={viewStudent}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />
      
      {/* Edit Student Dialog */}
      <StudentEditDialog
        student={editStudent}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  )
}
