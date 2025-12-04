export const NAVIGATION_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const

export const SOCIAL_LINKS = [
  { name: "GitHub", icon: "github", url: "https://github.com" },
  { name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com" },
  { name: "Twitter", icon: "twitter", url: "https://twitter.com" },
  { name: "Email", icon: "mail", url: "mailto:alex@example.com" },
] as const

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const
