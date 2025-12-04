import type React from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export default function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn("bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", className)}
    >
      {children}
    </span>
  )
}
