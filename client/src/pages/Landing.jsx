import CTA from "../components/landing/CTA";
import Features from "../components/landing/Features";
import FooterSection from "../components/landing/FooterSection";
import Hero from "../components/landing/Hero";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <Hero />
      <Features />
      <section className="bg-white py-1 dark:bg-slate-950">
        <PageContainer>
         
        </PageContainer>
      </section>
      <CTA />
      <FooterSection />
    </main>
  );
}
