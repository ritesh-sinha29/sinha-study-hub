"use client";

import { HeroSection } from "@/modules/home/HeroSection"
import { StatsSection } from "@/modules/home/StatsSection"
import { DepartmentsSection } from "@/modules/home/DepartmentsSection"
import { YearSelectionSection } from "@/modules/home/YearSelectionSection"
import { FeaturesSection } from "@/modules/home/FeaturesSection"
import { TestimonialsSection } from "@/modules/home/TestimonialsSection"
import { CTASection } from "@/modules/home/CTASection"

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Module */}
      <HeroSection />

      {/* Stats Counter Module */}
      <StatsSection />

      {/* Specialized Departments Grid Module */}
      <DepartmentsSection />

      {/* Academic Year Selection Module */}
      <YearSelectionSection />

      {/* Platform Features Highlight Module */}
      <FeaturesSection />

      {/* Social Proof & Testimonials Module */}
      <TestimonialsSection />

      {/* Final Call to Action Module */}
      <CTASection />
    </div>
  )
}

export default function Page() {
  return <Home />
}
