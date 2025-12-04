"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { TrendingUp, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SkillsSection() {
  const { skills, currentlyLearning } = portfolioData

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Skills & Technologies</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">A curated set of tools and technologies I've mastered</p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {skills.map((skillGroup, idx) => (
            <div
              key={idx}
              className="glass-dark rounded-2xl p-8 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:translate-y-[-4px]"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-default",
                      "glass border border-white/10 hover:border-accent/50 hover:bg-accent/10",
                      "text-foreground/80 hover:text-accent",
                    )}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning */}
        <div className="glass-dark rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Zap size={24} className="text-accent" />
            Currently Exploring
          </h3>
          <p className="text-foreground/70">
            I'm passionate about continuous learning. These are the technologies and concepts I'm actively studying:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentlyLearning.map((topic, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-lg p-4 border border-white/10 hover:border-accent/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <TrendingUp
                    size={20}
                    className="text-accent flex-shrink-0 mt-1 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium text-foreground group-hover:text-accent transition-colors">{topic}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
