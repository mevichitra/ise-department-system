"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface Faculty {
  id: number
  name: string
}

interface Subject {
  code: string
  name: string
}

interface Class {
  id: number
  year: number
  section: string
  semester: number
}

export default function NewAssignmentPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [faculty, setFaculty] = useState<Faculty[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [classes, setClasses] = useState<Class[]>([])
  const [formData, setFormData] = useState({
    faculty_id: "",
    subject_code: "",
    class_id: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facultyRes, subjectsRes, classesRes] = await Promise.all([
          fetch("/api/faculty"),
          fetch("/api/subjects"),
          fetch("/api/classes"),
        ])

        const facultyData = await facultyRes.json()
        const subjectsData = await subjectsRes.json()
        const classesData = await classesRes.json()

        setFaculty(facultyData)
        setSubjects(subjectsData)
        setClasses(classesData)
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          faculty_id: Number.parseInt(formData.faculty_id),
          subject_code: formData.subject_code,
          class_id: Number.parseInt(formData.class_id),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create assignment")
      }

      toast({
        title: "Success",
        description: "Assignment added successfully",
      })

      router.push("/assignments")
      router.refresh()
    } catch (error) {
      console.error("Error creating assignment:", error)
      toast({
        title: "Error",
        description: "Failed to add assignment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Faculty Assignment</h1>

      <Card>
        <CardHeader>
          <CardTitle>Assignment Information</CardTitle>
          <CardDescription>Assign a faculty member to teach a subject for a class</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Select
                onValueChange={(value) => handleSelectChange("faculty_id", value)}
                defaultValue={formData.faculty_id}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent>
                  {faculty.map((f) => (
                    <SelectItem key={f.id} value={f.id.toString()}>
                      {f.name}
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

            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select onValueChange={(value) => handleSelectChange("class_id", value)} defaultValue={formData.class_id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.year} Year, Section {c.section}, Semester {c.semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Assignment"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
