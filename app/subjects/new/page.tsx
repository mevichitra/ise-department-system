"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function NewSubjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    credits: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          credits: Number.parseInt(formData.credits),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create subject")
      }

      toast({
        title: "Success",
        description: "Subject added successfully",
      })

      router.push("/subjects")
      router.refresh()
    } catch (error) {
      console.error("Error creating subject:", error)
      toast({
        title: "Error",
        description: "Failed to add subject. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Subject</h1>

      <Card>
        <CardHeader>
          <CardTitle>Subject Information</CardTitle>
          <CardDescription>Enter the details of the new subject</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input id="code" name="code" placeholder="CS101" value={formData.code} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Introduction to Computer Science"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="credits">Credits</Label>
              <Input
                id="credits"
                name="credits"
                type="number"
                placeholder="4"
                value={formData.credits}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Subject"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
