import { Footer } from "@/components/footer/page";
import { Header } from "@/components/header/page";
import {
  Benefits,
  CallToAction,
  Features,
  Hero,
  HowItWorks,
  Pricing,
  Testimonials,
} from "@/components/home/sections";

export default function Home() {
  return (
    <div>
      <Header />

      <Hero />
      <div className="bg-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          <Features />
          <Benefits />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <CallToAction />
        </div>
      </div>

      <Footer />
    </div>
  );
}
