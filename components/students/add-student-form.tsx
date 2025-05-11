"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast } from "sonner"

export function AddStudentForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    usn: "",
    name: "",
    year: "",
    section: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!formData.usn || !formData.name || !formData.year || !formData.section || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setIsLoading(true)
      
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add student")
      }

      toast.success("Student added successfully")
      router.push("/students")
      router.refresh()
    } catch (error) {
      console.error("Error adding student:", error)
      toast.error("Failed to add student. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <label htmlFor="usn" className="text-sm font-medium">USN</label>
        <Input 
          id="usn" 
          placeholder="e.g. 1SI21IS001" 
          value={formData.usn}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
        <Input 
          id="name" 
          placeholder="e.g. John Doe" 
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="year" className="text-sm font-medium">Year</label>
        <Input 
          id="year" 
          type="number" 
          placeholder="e.g. 3" 
          min="1" 
          max="4" 
          value={formData.year}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="section" className="text-sm font-medium">Section</label>
        <Input 
          id="section" 
          placeholder="e.g. A" 
          value={formData.section}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <Input 
          id="email" 
          type="email" 
          placeholder="e.g. john.doe@ise.edu" 
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
        <Input 
          id="phone" 
          placeholder="e.g. 9876543210" 
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mt-2 flex items-center gap-2 sm:col-span-2">
        <Button type="submit" disabled={isLoading} className="relative">
          {isLoading ? (
            <>
              <div className="loader mr-2" style={{ width: '16px', height: '16px' }}></div>
              <span>Saving...</span>
            </>
          ) : (
            "Save Student"
          )}
        </Button>
        <Link href="/students">
          <Button type="button" variant="outline">Cancel</Button>
        </Link>
      </div>
    </form>
  )
}
