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
  const [isExporting, setIsExporting] = useState(false)
  
  const handleView = (student: Student) => {
    setViewStudent(student)
    setViewDialogOpen(true)
  }
  
  const handleEdit = (student: Student) => {
    setEditStudent(student)
    setEditDialogOpen(true)
  }
  
  const handleExport = () => {
    setIsExporting(true)
    try {
      exportStudentsToCSV(data)
    } finally {
      // Add a small delay to show the loading state 
      setTimeout(() => setIsExporting(false), 500)
    }
  }
  
  const tableColumns = columns.map(col => {
    if (col.id === 'actions') {
      return {
        ...col,
        cell: ({ row }: { row: Row<Student> }) => {
          const student = row.original
          return (
            <div className="flex items-center gap-3">
              <Button 
                size="sm" 
                variant="secondary"
                className="rounded-lg px-3 py-1 h-8 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium"
                onClick={() => handleView(student)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="rounded-lg px-3 py-1 h-8 bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 transition-all duration-200 font-medium"
                onClick={() => handleEdit(student)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
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
      {/* <div className="flex justify-between items-center py-3 px-4 mb-3 border-b border-gray-700 bg-gray-800">
        <div className="text-sm font-medium text-gray-300">
          {data.length} {data.length === 1 ? 'student' : 'students'} found
        </div>
        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="gap-2 px-4 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 transition-all duration-200"
          disabled={isExporting || data.length === 0}
        >
          {isExporting ? (
            <>
              <div className="loader mr-1" style={{ width: '14px', height: '14px' }}></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </>
          )}
        </Button>
      </div> */}
      <div className="flex-1 overflow-auto rounded-lg border shadow-sm bg-gray-900" style={{ maxHeight: 'calc(100vh - 200px)' }}>
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
