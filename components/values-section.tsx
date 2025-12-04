"use client"

import type React from "react"

import { portfolioData } from "@/lib/portfolio-data"
import { Heart, Lightbulb, Users, Code, Globe, Sparkles } from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  "Continuous learning and growth": <Sparkles size={24} />,
  "Collaborative and inclusive teams": <Users size={24} />,
  "Clean code and best practices": <Code size={24} />,
  "User-centric design philosophy": <Lightbulb size={24} />,
  "Open source contribution": <Globe size={24} />,
  "Ethical technology development": <Heart size={24} />,
}

export default function ValuesSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Values & Commitments</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">What I stand for and believe in</p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.values.map((value, idx) => (
            <div
              key={idx}
              className="glass-dark rounded-2xl p-8 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:translate-y-[-4px] group cursor-pointer"
            >
              <div className="mb-4 text-accent transform transition-transform duration-300 group-hover:scale-110 inline-block">
                {iconMap[value] || <Heart size={24} />}
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{value}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
