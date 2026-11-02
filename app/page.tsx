import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/organisms/Hero/HeroSection"
import { AboutSection } from "@/components/templates/Home/AboutSection"
import { PracticeAreasSection } from "@/components/templates/Home/PracticeAreasSection"

export default function Page() {
  return (
    <div className="">
      <HeroSection />
      <AboutSection />
      <PracticeAreasSection />
    </div>
  )
}
