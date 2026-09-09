import { CtaSection } from "@/features/home/CtaSection";
import { FeaturesSection } from "@/features/home/FeaturesSection";
import { HeroSection } from "@/features/home/HeroSection";
import { HomeAboutSection } from "@/features/home/HomeAboutSection";
import { TestimonialsSection } from "@/features/home/TestimonialsSection";
import { WorkflowSection } from "@/features/home/WorkflowSection";

const Page = () => {
  return (
    <main>
      <HeroSection />
      <HomeAboutSection />
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  );
};

export default Page;