"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface Student {
  usn: string
  name: string
}

interface Subject {
  code: string
  name: string
}

export default function NewMarksPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [formData, setFormData] = useState({
    usn: "",
    subject_code: "",
    internal_marks: "",
    external_marks: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, subjectsRes] = await Promise.all([fetch("/api/students"), fetch("/api/subjects")])

        const studentsData = await studentsRes.json()
        const subjectsData = await subjectsRes.json()

        setStudents(studentsData)
        setSubjects(subjectsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please refresh the page.",
          variant: "destructive",
        })
      }
    }

    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/marks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usn: formData.usn,
          subject_code: formData.subject_code,
          internal_marks: Number.parseFloat(formData.internal_marks),
          external_marks: Number.parseFloat(formData.external_marks),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add marks")
      }

      toast({
        title: "Success",
        description: "Marks added successfully",
      })

      router.push("/marks")
      router.refresh()
    } catch (error) {
      console.error("Error adding marks:", error)
      toast({
        title: "Error",
        description: "Failed to add marks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Student Marks</h1>

      <Card>
        <CardHeader>
          <CardTitle>Marks Information</CardTitle>
          <CardDescription>Enter marks for a student in a subject</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <Select onValueChange={(value) => handleSelectChange("usn", value)} defaultValue={formData.usn}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((s) => (
                    <SelectItem key={s.usn} value={s.usn}>
                      {s.name} ({s.usn})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                onValueChange={(value) => handleSelectChange("subject_code", value)}
                defaultValue={formData.subject_code}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.code} value={s.code}>
                      {s.name} ({s.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="internal_marks">Internal Marks</Label>
                <Input
                  id="internal_marks"
                  name="internal_marks"
                  type="number"
                  step="0.01"
                  min="0"
                  max="50"
                  placeholder="40"
                  value={formData.internal_marks}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="external_marks">External Marks</Label>
                <Input
                  id="external_marks"
                  name="external_marks"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="75"
                  value={formData.external_marks}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Marks"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
