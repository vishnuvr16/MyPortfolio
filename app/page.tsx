import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import CurrentWorkSection from "@/components/current-work-section"
import ValuesSection from "@/components/values-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import AIChat from "@/components/ai-chat"
import CodingProfilesSection from "@/components/coding-profile"

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CodingProfilesSection />
      {/* <CurrentWorkSection /> */}
      <ValuesSection />
      <ContactSection />
      <Footer />
      <AIChat />
    </main>
  )
}
