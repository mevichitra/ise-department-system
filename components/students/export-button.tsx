"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

interface ExportButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function ExportButton({ 
  variant = "secondary", 
  size = "default",
  className = ""
}: ExportButtonProps) {
  return (
    <Button 
      variant={variant} 
      size={size}
      className={`flex items-center gap-2 hover:shadow-md transition-all duration-200 ${className}`}
      asChild
    >
      <Link href="/api/export/students" target="_blank">
        <Download className="h-5 w-5" />
        <span className="font-medium">Export</span>
      </Link>
    </Button>
  )
}
