"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { Zap, TrendingUp } from "lucide-react"

export default function CurrentWorkSection() {
  const { currentProjects } = portfolioData

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text flex items-center gap-2">
              <Zap size={32} />
              Currently Working On
            </span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">Exciting projects I'm actively building and exploring</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentProjects.map((project, idx) => (
            <div
              key={idx}
              className="glass-dark rounded-2xl p-8 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:translate-y-[-4px]"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-foreground/70">{project.description}</p>
                </div>
                <TrendingUp size={24} className="text-accent flex-shrink-0" />
              </div>

              {/* Progress Bar */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-foreground">Progress</span>
                  <span className="text-sm font-bold gradient-text">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-3">
                <p className="text-xs text-foreground/60 uppercase tracking-wide font-semibold">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-accent border border-accent/20 hover:border-accent/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
