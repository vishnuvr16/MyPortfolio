"use client"

import Image from "next/image"
import { portfolioData } from "@/lib/portfolio-data"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ProjectsSection() {
  const { projects } = portfolioData
  const featured = projects.filter((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Showcasing my most impactful work and creative solutions
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-20">
          {featured.map((project, idx) => (
            <div
              key={idx}
              className="group glass-dark rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 lg:h-full min-h-96 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <h3 className="text-3xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-lg">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-accent border border-accent/30 hover:border-accent transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-4 items-center">
                    <a href={project.link} target="_blank" className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group/btn cursor-pointer">
                      View Project
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      className="w-10 h-10 glass cursor-pointer rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                      aria-label="View source"
                    >
                      <Github size={18} className="text-accent" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        {regular.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8">Other Notable Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regular.map((project, idx) => (
                <div
                  key={idx}
                  className="group glass-dark rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 flex flex-col h-full"
                  onMouseEnter={() => setHoveredIdx(featured.length + idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-foreground/70 text-sm mb-4 flex-1">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-accent/80">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 text-sm font-medium text-accent hover:bg-accent/10 rounded transition-colors">
                        Learn More
                      </a>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 glass rounded flex items-center justify-center hover:bg-accent/20 transition-colors"
                        aria-label="View source"
                      >
                        <ExternalLink size={16} className="text-accent" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
