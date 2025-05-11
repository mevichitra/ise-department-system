"use client"

import { Student } from "@/types/students"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, User, Calendar, MapPin, Users } from "lucide-react"

interface StudentDetailsDialogProps {
  student: Student | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentDetailsDialog({
  student,
  open,
  onOpenChange,
}: StudentDetailsDialogProps) {
  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1 text-xs">
              USN: {student.usn}
            </Badge>
            <DialogTitle className="text-xl">{student.name}</DialogTitle>
          </div>
          <DialogDescription>
            Year {student.year}, Section {student.section}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{student.phone}</span>
                </div>
                {student.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{student.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">Personal Information</h3>
              <div className="space-y-2">
                {student.dob && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">DOB: {student.dob}</span>
                  </div>
                )}
                {student.parent_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Parent: {student.parent_name}</span>
                  </div>
                )}
                {student.parent_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Parent's Phone: {student.parent_phone}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
