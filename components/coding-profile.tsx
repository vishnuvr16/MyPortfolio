"use client"

import { portfolioData } from "@/lib/portfolio-data"
import { Github, Linkedin, Code2, Zap, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// ⚠️ Add icons here for each platform you use
const iconMap = {
  linkedin: Linkedin,
  github: Github,
  leetcode: Code2, // TEMP: Using Code2 unless you add custom icon
  tuf: Zap, // TEMP: Using Zap
  gfg: Zap, // alias
  codechef: Code2,
}

export default function CodingProfilesSection() {
  const { codingProfiles } = portfolioData

  return (
    <section id="profiles" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Coding Profiles</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Track my journey across platforms - problems solved, connections made, and skills learned
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codingProfiles.map((profile, idx) => {
            const Icon = iconMap[profile.icon as keyof typeof iconMap]

            return (
              <a
                key={idx}
                rel="noopener noreferrer"
                className={cn(
                  "group relative overflow-hidden rounded-2xl p-8",
                  "glass-dark border border-white/10 transition-all duration-300",
                  "hover:shadow-lg hover:border-white/20 hover:translate-y-[-4px]",
                  "cursor-pointer"
                )}
              >
                {/* Hover gradient */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    `bg-gradient-to-br ${profile.color}`
                  )}
                  style={{ opacity: 0.05 }}
                ></div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", profile.bgColor)}>
                      <Icon size={24} className="text-foreground/80" />
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-foreground/40 group-hover:text-accent transition-colors"
                    />
                  </div>

                  {/* Platform Name + Badge */}
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {profile.platform}
                    </h3>

                    {profile.badge && (
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full text-white shadow-md",
                          profile.badge.color
                        )}
                      >
                        {profile.badge.text}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className={cn("py-4 px-4 rounded-lg", profile.bgColor, "border", profile.borderColor)}>
                    <p
                      className={cn(
                        "text-2xl font-bold bg-gradient-to-r",
                        profile.color,
                        "bg-clip-text text-transparent"
                      )}
                    >
                      {profile.stat}
                    </p>
                    <p className="text-sm text-foreground/60 mt-1">{profile.description}</p>
                  </div>

                  {/* Button */}
                  <a href={profile.url} target="_blank" rel="noopener noreferrer">
                    <button
                      className={cn(
                        "w-full py-2 px-4 rounded-lg cursor-pointer font-medium text-sm transition-all duration-300",
                        `bg-gradient-to-r ${profile.color} text-white`,
                        "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                      )}
                    >
                      Visit Profile
                    </button>
                  </a>
                </div>
              </a>
            )
          })}
        </div>

        {/* Stats summary */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-3xl font-bold gradient-text">270+</p>
              <p className="text-sm text-foreground/60">Total Problems</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold gradient-text">4</p>
              <p className="text-sm text-foreground/60">Active Platforms</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold gradient-text">500+</p>
              <p className="text-sm text-foreground/60">Connections</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold gradient-text">20+</p>
              <p className="text-sm text-foreground/60">Public Repositories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
