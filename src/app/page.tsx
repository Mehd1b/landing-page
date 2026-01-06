import AnimatedBackground from './components/AnimatedBackground';
import FuturisticFeatures from './components/FuturisticFeatures';
import HeroSection from './components/HeroSection';
import CapitalMarketsSection from './components/CapitalMarketsSection';
import PillarsSection from './components/PillarsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="text-xl font-semibold">DEFIESTA</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#about" className="hover:text-gray-300 transition-colors">ABOUT</a>
          <a href="/whitepaper" className="hover:text-gray-300 transition-colors">WHITEPAPER</a>
          <a href="#docs" className="hover:text-gray-300 transition-colors">DOCS</a>
          <a href="#discord" className="hover:text-gray-300 transition-colors">DISCORD</a>
          <a href="#wallet" className="hover:text-gray-300 transition-colors">WALLET</a>
        </div>
      </nav>

      <main className="relative z-10">
        <HeroSection />
        <FuturisticFeatures />
        <CapitalMarketsSection />
        <PillarsSection />
      </main>

      <footer className="relative z-10 border-t border-gray-800 mt-20 py-8 px-8 text-center text-gray-400">
        <p>&copy; 2026 DeFiesta Protocol. All rights reserved.</p>
      </footer>
    </div>
  );
}
