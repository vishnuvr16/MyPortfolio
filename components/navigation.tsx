"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Download, ExternalLink, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [pdfError, setPdfError] = useState(false)

  const resumeUrl = "/vishnu_vardhan_reddy_resume.pdf"
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (showResumeModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showResumeModal])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        setIsOpen(false)
      }
    }
  }

  const handleResumeClick = () => {
    // Test if the PDF exists before opening modal
    fetch(resumeUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setPdfError(false)
          setShowResumeModal(true)
        } else {
          // If PDF doesn't exist, open download directly
          handleDownload()
        }
      })
      .catch(() => {
        // Fallback to direct download
        handleDownload()
      })
    setIsOpen(false)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = resumeUrl
    link.download = "Vishnu_Reddy_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(resumeUrl, "_blank", "noopener,noreferrer")
  }

  const handleIframeError = () => {
    setPdfError(true)
  }

  const closeModal = () => {
    setShowResumeModal(false)
    setPdfError(false)
  }

  return (
    <>
      <nav className={cn("fixed top-0 w-full z-50 transition-all duration-300", isScrolled ? "glass-dark py-4" : "py-6")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-accent">
                <span className="text-sm font-bold text-primary-foreground">VVR</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:block">Vishnu Reddy</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-200 relative group cursor-pointer"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
              <button
                onClick={handleResumeClick}
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 text-sm cursor-pointer"
              >
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 glass-dark mt-2 rounded-b-xl">
              <div className="flex flex-col gap-4 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-foreground/80 hover:text-accent transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleResumeClick}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium cursor-pointer"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Resume Modal */}
      {showResumeModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-5xl max-h-[90vh] bg-background rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-background/95 backdrop-blur-sm border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Resume</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vishnu Reddy - Full Stack Developer
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 cursor-pointer"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={handleOpenInNewTab}
                  className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                >
                  <ExternalLink size={18} />
                  Open in New Tab
                </button>
                <button
                  onClick={closeModal}
                  className="ml-2 p-2 hover:bg-muted rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="overflow-y-auto">
              {pdfError ? (
                <div className="flex flex-col items-center justify-center h-96 p-8 text-center">
                  <div className="p-4 bg-destructive/10 rounded-full mb-4">
                    <FileText className="text-destructive" size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Unable to Load PDF</h3>
                  <p className="text-muted-foreground mb-6">
                    There was an issue loading the PDF preview. You can still download or open it.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 cursor-pointer"
                    >
                      <Download size={20} />
                      Download Resume
                    </button>
                    <button
                      onClick={handleOpenInNewTab}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all duration-200 cursor-pointer"
                    >
                      <ExternalLink size={20} />
                      Open Resume
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <iframe
                    src={`${resumeUrl}#view=fitH&toolbar=0&navpanes=0`}
                    className="w-full h-[70vh] min-h-[500px] border-0"
                    title="Resume PDF Preview"
                    onError={handleIframeError}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}