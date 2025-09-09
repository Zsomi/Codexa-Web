import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Technologies from '@/components/Technologies';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Quote from '@/components/Quote';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
      <section id="technologies">
        <Technologies />
      </section>
      <section id="portfolio">
        <Portfolio />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="contact">
        <Quote />
      </section>
      <Footer />
    </main>
  );
}
