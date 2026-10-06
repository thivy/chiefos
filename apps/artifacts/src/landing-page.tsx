import { AppSection } from "./features/landing/app-section";
import { ControlSection } from "./features/landing/control-section";
import { FooterSection } from "./features/landing/footer-section";
import { GetStartedSection } from "./features/landing/get-started-section";
import { HeroSection } from "./features/landing/hero-section";
import { RhythmSection } from "./features/landing/rhythm-section";
import { ScoringSection } from "./features/landing/scoring-section";
import { SkillsSection } from "./features/landing/skills-section";
import { VisualOutputSection } from "./features/landing/visual-output-section";

function Landing() {
  return (
    <div className="flex flex-col gap-12 leading-6 selection:bg-card-lemon sm:gap-14 md:gap-20 lg:gap-28">
      <HeroSection />
      <RhythmSection />
      <AppSection />
      <ScoringSection />
      <VisualOutputSection />
      <GetStartedSection />
      <SkillsSection />
      <ControlSection />
      <FooterSection />
    </div>
  );
}

export default Landing;
