import { Header } from "@/component/shared/header";
import { Button } from "@/component/ui/button";
import { EyeBrow } from "@/component/ui/eyebrow";
import Image from "next/image";
import { RouteHero } from "./component/RouteHero";
import StatsSection from "./component/StatsSection";
import { ExtraInfo } from "./component/ExtraInfo";
import { HowItWorks } from "./component/HowItWorks";
import { AudienceCards } from "./component/AudienceCards";
import { FarmerCard } from "./component/FarmerCard";
import { TransportationCard } from "./component/TransportationCard";
import { TrustHighlights } from "./component/TrustHighlights";
import { CTASection } from "./component/CTASection";
import { Footer } from "./component/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary"
      >
        Skip to main content
      </a>

      <div id="top" className="flex min-h-screen flex-col gap-4 font-heading">
        <Header />
        <main id="main-content" className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center gap-4 px-6 pb-2.5 pt-10 text-center">
          <EyeBrow>
            Nigerian Agri-Logistics · Abuja · Kano · Kaduna · Nasarawa · Niger ·
            Plateau
          </EyeBrow>
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl text-center text-green-950 font-bold leading-[1.1] sm:text-5xl md:text-6xl">
              From Farm to Market,
              <span className="block text-secondary">Made Simple.</span>
            </h1>
          <div>
            <Image
              src={"/assests/images/Agrisync-truck.png"}
              width={500}
              height={200}
              alt="delivery-truck"
              loading="eager"
              className="h-auto w-full max-w-125"
            />
          </div>
        </div>
        <h4 className="max-w-175  text-center text-lg text-muted-foreground sm:text-xl">
          AgriLink connects farmers, drivers, and buyers to move fresh produce
          faster, sell directly, and earn more
        </h4>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            label="Get Started"
            type="button"
            variant="primary"
            
          />
          <Button label="Learn More" type="button" variant="outline" />
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 px-6 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="w-full md:w-1/2">
            <div className="pt-10 md:pt-0">
              <RouteHero />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <StatsSection />
          </div>
        </div>
        <ExtraInfo
          id="problem"
          heading="The Problem"
          description="Getting produce to market is harder than growing it"
          info="Two gaps quietly cost farmers money every single week."
        />
        <section id="for-roles" className="bg-[#F9F7F0] px-6 py-4">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:gap-10">
            <FarmerCard />
            <TransportationCard />
          </div>
        </section>
        <ExtraInfo
          id="how-it-works"
          heading="How AgriLink Works"
          description="One coordinated network, three simple moves"
          info="Moving harvested produce from farms to storage, homes"
        />
        <article id="how-it-works-steps">
          <HowItWorks />
        </article>
        <div className="py-4">
          <ExtraInfo
            id="buyers"
            heading="Built For Every Stop On The Route"
            description="Whichever seat you're in, AgriLink works for you"
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
        <div>
          <CTASection id="contact" />
        </div>
        </main>
      </div>
      <div className="w-screen bg-[#F9F7F0]">
        <Footer />
      </div>
    </>
  );
}
