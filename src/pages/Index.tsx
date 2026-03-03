import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import NominationsSection from "@/components/NominationsSection";
import TimelineSection from "@/components/TimelineSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="bg-nebula min-h-screen">
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <NominationsSection />
      <TimelineSection />
      <ContactSection />
    </div>
  );
};

export default Index;
