"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import Snowfall from "react-snowfall"

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl blob"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl blob"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <Snowfall speed={[0.5,1]} />

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="space-y-8 slide-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-dark px-4 py-2 rounded-full w-fit mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm text-foreground/80">Full Stack Developer & Creative Builder</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="gradient-text block">Vishnu Vardhan Reddy</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              I craft beautiful, high-performance web applications that solve real problems. Passionate about clean
              code, great design, and building products that matter.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <Link href="#experience" className="group px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold flex items-center gap-2 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              View My Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#contact" className="px-8 py-4 glass-dark rounded-full font-semibold text-foreground hover:bg-white/20 transition-all duration-300 cursor-pointer">
              Get In Touch
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <span className="text-sm text-foreground/60">Connect with me:</span>
            <div className="flex gap-3 cursor-pointer">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/vishnuvr16" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vishnuvardhanreddy-gajjala" },
                { icon: Mail, label: "Email", href: "mailto:vishnuvardhanreddygajjala1@gmail.com" },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    className="w-12 h-12 glass-dark rounded-full flex items-center justify-center hover:bg-primary/20 hover:text-accent transition-all duration-300 hover:scale-110 cursor-pointer"
                    aria-label={social.label}
                  >
                    <Icon size={20} className="text-accent cursor-pointer" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-xs text-foreground/60">Scroll to explore</span>
            <div className="w-1 h-6 border-l-2 border-accent/50"></div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          section {
            position: relative;
          }
        }
      `}</style>
    </section>
  )
}
