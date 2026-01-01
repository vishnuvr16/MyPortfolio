"use client"
import { portfolioData } from "@/lib/portfolio-data"
import { MapPin, Mail, Phone, Briefcase, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutSection() {
  const { personal, socials } = portfolioData

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl">Get to know the person behind the code</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Bio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Card */}
            <div className="glass-dark rounded-2xl p-8 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Who I Am</h3>
                <p className="text-foreground/80 leading-relaxed text-lg">{personal.bio}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Months Experience", value: "8+" },
                  { label: "Projects Completed", value: "5+" },
                  { label: "B.tech CGPA", value: "9.0*" },
                  { label: "PUC CGPA", value: "9.81" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-4 text-center">
                    <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
                    <p className="text-xs text-foreground/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths Grid */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Key Strengths</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioData.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "glass-dark rounded-xl p-4 hover:bg-white/20 transition-all duration-300 group cursor-pointer",
                      idx % 2 === 0 ? "border-l-2 border-primary" : "border-l-2 border-accent",
                    )}
                  >
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {strength}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Company */}
          <div className="space-y-6">
            {/* Current Role Card */}
            <div className="glass-dark rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 glow-accent">
                  <Briefcase size={24} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/60 mb-1">Recent Work</p>
                  <h4 className="font-bold text-foreground">{personal.currentRole}</h4>
                  <p className="text-sm text-accent font-semibold">{personal.currentCompany}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-dark rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-foreground mb-4">Contact Info</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group"
                >
                  <Mail size={18} className="text-accent/60 group-hover:text-accent transition-colors" />
                  <span className="text-sm break-all">{personal.email}</span>
                </a>
                <a
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors group"
                >
                  <Phone size={18} className="text-accent/60 group-hover:text-accent transition-colors" />
                  <span className="text-sm">{personal.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-foreground/70">
                  <MapPin size={18} className="text-accent/60" />
                  <span className="text-sm">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-dark rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-foreground mb-4">Connect With Me</h4>
              <div className="space-y-2">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    className="flex items-center gap-3 px-4 py-3 glass rounded-lg hover:bg-primary/20 transition-all duration-300 group"
                  >
                    <span className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center text-sm font-bold text-primary-foreground group-hover:shadow-lg group-hover:shadow-accent/30 transition-all">
                      {social.name[0]}
                    </span>
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-accent transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="glass-dark rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Award size={18} className="text-accent" />
                When I'm Not Coding
              </h4>
              <div className="space-y-2">
                {portfolioData.hobbies.slice(0, 4).map((hobby, idx) => (
                  <p key={idx} className="text-sm text-foreground/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {hobby}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
