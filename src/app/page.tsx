import {
  AudienceCards,
  ExtraInfo,
  FeatureCards,
  IndustryServices,
  MissionVision,
  TrustHighlights,
} from "@/widgets/landing/features";
import { RouteHero, HeroSlider } from "@/widgets/landing/hero";
import { HowItWorks } from "@/widgets/landing/how-it-works";
import { CTASection } from "@/widgets/landing/cta";
import { TestimonialsSection } from "@/widgets/landing/testimonials";
import { Footer } from "@/widgets/landing";



export default function Home() {
  
  return (
    <>
   
      <a
        href="#main-content"
        className="sr-only  focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary"
      >
        Skip to main content
      </a>

      <div id="top" className="flex min-h-screen flex-col font-heading">
        {/* <Header /> */}
        <HeroSlider />
        <main id="main-content" className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center gap-4 px-6  text-center">
        <FeatureCards />
        <div className="w-full">
          <RouteHero />
        </div>
        <MissionVision />
        <ExtraInfo
          id="how-it-works"
          heading="How AgriSync Works"
          description="One coordinated network, three simple moves"
          info="Moving harvested produce from farms to storage, homes"
        />
        <article id="how-it-works-steps">
          <HowItWorks />
        </article>
        <IndustryServices />
        <div className="py-4">
          <ExtraInfo
            id="buyers"
            heading="Built For Every Stop On The Route"
            description="Whichever seat you're in, AgriSync works for you"
            info="Buy directly from verified farmers"
          />
        </div>
        <section id="audience-cards">
          <AudienceCards />
        </section>
        <div className="py-4">
          <ExtraInfo
            id="trust-safety"
            heading="Trust & Safety"
            description="Every stop on the route is verified"
          />
        </div>
        <TrustHighlights />
      <TestimonialsSection />
      <div>
          <CTASection id="contact" />
        </div>
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
