import { HeroSection } from "@/components/organisms/Hero/HeroSection"
import { AboutSection } from "@/components/templates/Home/AboutSection"
import { PracticeAreasSection } from "@/components/templates/Home/PracticeAreasSection"
import { ServicesSection } from "@/components/templates/Home/ServicesSection"
import { TestimonialsSection } from "@/components/templates/Home/TestimonialsSection"

export default function Page() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <PracticeAreasSection />
      <TestimonialsSection />
      <ServicesSection />
    </div>
  )
}
