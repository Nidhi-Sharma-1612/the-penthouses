import Hero from "@/components/home/Hero";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import GrandPlazaExperience from "@/components/home/GrandPlazaExperience";
import FeaturedPenthouses from "@/components/home/FeaturedPenthouses";
import WhyBookDirect from "@/components/home/WhyBookDirect";
import Testimonials from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <GrandPlazaExperience />
      <FeaturedPenthouses />
      <WhyBookDirect />
      <Testimonials />
    </>
  );
}
