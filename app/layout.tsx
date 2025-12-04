import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ScrollAnimations from "@/components/scroll-animations"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vishnu Vardhan Reddy | Full Stack Developer",
  description:
    "Premium portfolio showcasing innovative projects, advanced technical skills, and a creative approach to full-stack development. Featuring AI-powered chat assistant.",
  keywords: ["portfolio", "developer", "full-stack", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Vishnu Vardhan Reddy" }],
  creator: "Vishnu Vardhan Reddy",
  publisher: "Vishnu Vardhan Reddy",
  
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`font-sans antialiased overflow-x-hidden`}>
        <ScrollAnimations />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
