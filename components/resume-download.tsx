"use client"

import { Download, FileText } from "lucide-react"

export default function ResumeDownload() {
  const handleDownload = () => {
    // In production, replace this with your actual resume file
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Alex_Morgan_Resume.pdf"
    link.click()
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 hover:scale-105 group"
    >
      <FileText size={18} className="group-hover:rotate-12 transition-transform" />
      Download Resume
      <Download size={18} className="group-hover:translate-y-1 transition-transform" />
    </button>
  )
}
