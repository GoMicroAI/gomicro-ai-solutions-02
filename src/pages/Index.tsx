import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold components
const SolutionsSection = lazy(() => import("@/components/SolutionsSection"));
const TechnologySection = lazy(() => import("@/components/TechnologySection"));
const TestimonialSection = lazy(() => import("@/components/TestimonialSection"));
const PressSection = lazy(() => import("@/components/PressSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <SolutionsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TechnologySection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PressSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
