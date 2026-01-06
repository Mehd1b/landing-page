import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import FuturisticFeatures from './components/FuturisticFeatures';
import HeroSection from './components/HeroSection';
import CapitalMarketsSection from './components/CapitalMarketsSection';
import PillarsSection from './components/PillarsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      <Header />

      <main className="relative z-10">
        <HeroSection />
        <FuturisticFeatures />
        <CapitalMarketsSection />
        <PillarsSection />
      </main>

      <Footer />
    </div>
  );
}
