import { ControlSection } from "./features/landing/control-section";
import { GetStartedSection } from "./features/landing/get-started-section";
import { HeroSection } from "./features/landing/hero-section";
import { SkillsSection } from "./features/landing/skills-section";
import { VisualOutputSection } from "./features/landing/visual-output-section";

function Landing() {
  return (
    <div className="flex flex-col gap-12 pb-3 leading-6 sm:gap-14 md:gap-20 lg:gap-28">
      <HeroSection />
      <VisualOutputSection />
      <GetStartedSection />
      <SkillsSection />
      <ControlSection />
    </div>
  );
}

export default Landing;
