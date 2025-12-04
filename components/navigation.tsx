"use client"

import React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"

// --- react-pdf imports ---
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set the worker source for react-pdf. Essential for it to work.
// Use the recommended CDN path for a reliable setup.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// --- Constants (Keep these the same) ---
const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

// ⚠️ UPDATE THIS WITH YOUR ACTUAL RESUME FILE PATH
const RESUME_PDF_URL = "/public/vishnu_vardhan_reddy_resume.pdf" 

// --- Resume PDF Modal Component ---
interface ResumePDFModalProps {
  isOpen: boolean
  onClose: () => void
  pdfUrl: string
}

const ResumePDFModal: React.FC<ResumePDFModalProps> = ({ isOpen, onClose, pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  // Calculate container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [isOpen]);


  if (!isOpen) return null

  return (
    // Full Screen Overlay (z-index increased to ensure visibility)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-background/80 transition-opacity duration-300">
      {/* Modal Content Container */}
      <div 
        className="relative w-full h-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden glass-dark border border-white/10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Controls */}
        <div className="flex justify-between items-center h-16 bg-gradient-to-r from-primary/80 to-accent/80 p-4 shrink-0">
          <h3 className="text-lg font-bold text-white">Vishnu's Resume (PDF)</h3>
          <div className="flex gap-3">
            {/* Download Button */}
            <a 
              href={pdfUrl} 
              download 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Download Resume"
            >
              <Download size={20} />
            </a>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              title="Close Viewer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Area */}
        <div ref={containerRef} className="flex-grow overflow-y-auto p-4 bg-background/5">
            {/* The Document component handles loading the PDF file */}
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="text-center p-8 text-foreground/70">
                    Loading Resume...
                    <div className="mt-4 w-16 h-1 bg-accent/50 rounded-full mx-auto animate-pulse"></div>
                </div>
              }
              error={
                <div className="text-center p-8 text-red-400">
                    Failed to load PDF. Please check the file path.
                </div>
              }
            >
                {/* Map over the number of pages to display them all */}
                {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-4 shadow-xl border border-white/10 rounded-lg overflow-hidden">
                        <Page 
                            pageNumber={index + 1} 
                            width={containerWidth ? containerWidth * 0.95 : undefined} // Use calculated width for responsiveness
                            renderTextLayer={true}
                            renderAnnotationLayer={true}
                        />
                    </div>
                ))}
            </Document>
        </div>
      </div>
    </div>
  )
}


// --- Main Navigation Component ---

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        setIsMenuOpen(false)
      }
    }
  }
  
  const handleOpenResume = useCallback(() => {
    setIsPdfModalOpen(true);
    setIsMenuOpen(false);
  }, []);


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
              {/* Desktop Resume Button */}
              <button 
                onClick={handleOpenResume}
                className="px-6 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-medium hover:shadow-lg hover:shadow-accent/30 transition-all duration-200 text-sm cursor-pointer"
              >
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-foreground hover:text-accent transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
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
                {/* Mobile Resume Button */}
                <button 
                  onClick={handleOpenResume}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-medium cursor-pointer"
                >
                  Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Resume PDF Modal Rendered Here */}
      <ResumePDFModal 
        isOpen={isPdfModalOpen} 
        onClose={() => setIsPdfModalOpen(false)} 
        pdfUrl={RESUME_PDF_URL} 
      />
    </>
  )
}