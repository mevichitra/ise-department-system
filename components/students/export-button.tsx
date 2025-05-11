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
      className={`flex items-center gap-1 ${className}`}
      asChild
    >
      <Link href="/api/export/students" target="_blank">
        <Download className="h-4 w-4" />
        Export
      </Link>
    </Button>
  )
}
