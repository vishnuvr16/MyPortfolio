"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { Calendar, CheckCircle2 } from "lucide-react"

export default function ExperienceSection() {
  const { experience, education } = portfolioData

  return (
    <section id="experience" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Experience & Education</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">My professional journey and continuous learning path</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Work Experience */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-primary to-accent rounded-full"></span>
                Work Experience
              </h3>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-50"></div>

                {/* Experience items */}
                <div className="space-y-8">
                  {experience.map((exp, idx) => (
                    <div key={idx} className="relative pl-16">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1 w-9 h-9 bg-background rounded-full border-2 border-accent flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>

                      {/* Content */}
                      <div className="glass-dark rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 transform hover:translate-x-2">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-foreground">{exp.role}</h4>
                            <p className="text-accent font-semibold">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Calendar size={16} />
                            <span>{exp.period}</span>
                          </div>
                        </div>

                        <p className="text-foreground/70 mb-4">{exp.description}</p>

                        {/* Highlights */}
                        <div className="space-y-2">
                          {exp.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-3 text-sm">
                              <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-foreground/70">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education Sidebar */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
              <span className="w-3 h-3 bg-gradient-to-r from-accent to-primary rounded-full"></span>
              Education
            </h3>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-dark rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all">
                      <span className="text-sm font-bold text-primary-foreground">🎓</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-accent font-semibold">{edu.school}</p>
                    </div>
                  </div>

                  <div className="space-y-2 ml-13">
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <Calendar size={12} />
                      <span>{edu.year}</span>
                    </div>
                    <p className="text-sm text-foreground/70 italic">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
