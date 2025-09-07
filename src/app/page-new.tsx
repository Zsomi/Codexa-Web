import Hero from '@/components/Hero';
import Technologies from '@/components/Technologies';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import Quote from '@/components/Quote';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Hero />
      <Technologies />
      <Portfolio />
      <Services />
      <Quote />
      <Footer />
    </main>
  );
}
