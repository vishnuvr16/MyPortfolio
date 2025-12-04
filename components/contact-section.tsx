"use client"

import type React from "react"

import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const ACCESS_KEY = "f7856123-49dd-4b5f-9217-fb09bec821f4"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setSubmitted(true)
  //   setTimeout(() => {
  //     setFormData({ name: "", email: "", message: "" })
  //     setSubmitted(false)
  //   }, 3000)
  // }

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        setError(false);

        // 1. Prepare the data payload, including the Access Key
        const jsonPayload = JSON.stringify({
            ...formData,
            access_key: ACCESS_KEY,
            // Optional fields to customize the email you receive:
            // subject: `New Message from ${formData.name}`,
            // from_name: "My Portfolio Contact Form",
        });

        try {
            // 2. Send the data to the Web3Forms API endpoint
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: jsonPayload,
            });

            const result = await response.json();

            if (result.success) {
                setSubmitted(true);

                setTimeout(() => {
                    setFormData({ name: "", email: "", message: "" });
                    setSubmitted(false);
                }, 3000);
            } else {
                console.error("Web3Forms Error:", result);
                setError(true);
            }
        } catch (err) {
            console.error("Submission Failed:", err);
            setError(true);
        }
    }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Get In Touch</h3>

            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="glass-dark rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 flex gap-4 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 glow-accent group-hover:shadow-lg group-hover:shadow-accent/40 transition-all">
                  <Mail size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Email</p>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors break-all">
                    {portfolioData.personal.email}
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${portfolioData.personal.phone}`}
                className="glass-dark rounded-2xl p-6 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 flex gap-4 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 glow-accent group-hover:shadow-lg group-hover:shadow-accent/40 transition-all">
                  <Phone size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Phone</p>
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {portfolioData.personal.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="glass-dark rounded-2xl p-6 flex gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0 glow-accent">
                  <MapPin size={24} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 mb-1">Location</p>
                  <p className="font-semibold text-foreground">{portfolioData.personal.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-foreground/60 mb-4 uppercase tracking-wide font-semibold">Follow Me</p>
              <div className="flex gap-3">
                {[
                  { icon: Github, label: "GitHub" , url: "https://github.com/vishnuvr16" },
                  { icon: Linkedin, label: "LinkedIn" , url: "https://www.linkedin.com/in/vishnuvardhanreddy-gajjala" },
                  // { icon: Twitter, label: "Twitter" , url: "https://twitter.com/yourtwitterhandle" },
                ].map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 cursor-pointer glass-dark rounded-lg flex items-center justify-center hover:bg-accent/20 transition-all duration-300 hover:scale-110 group"
                      aria-label={social.label}
                    >
                      <Icon size={20} className="text-accent group-hover:scale-125 transition-transform" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-dark rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send Me A Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/50 focus:border-accent focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 group"
              >
                {submitted ? (
                  <>
                    <span>Message Sent! ✓</span>
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
