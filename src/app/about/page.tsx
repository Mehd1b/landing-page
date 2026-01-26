'use client';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />

      <div className="border-b border-gray-800/50">
        <Header />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8">
            Founded in 2025 to bring verifiable AI agents to the masses.
          </p>
          <div className="w-32 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full"></div>
        </header>

        {/* CTA Button */}
        <div className="flex justify-center mb-20">
          <a
            href="mailto:mberiane@defiesta.net"
            className="px-8 py-4 rounded-xl border-2 border-dashed border-cyan-400/50 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-lg font-medium"
          >
            Get in Touch
          </a>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1: How We Started */}
          <div className="bg-gray-900/40 rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-400/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">How We Started</h3>
            <p className="text-gray-400 leading-relaxed">
              DeFiesta was started in 2025, when we built the first verifiable AI agent marketplace that combines zero-knowledge proofs with decentralized finance.
            </p>
          </div>

          {/* Card 2: Our Purpose */}
          <div className="bg-gray-900/40 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-400/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Our Purpose</h3>
            <p className="text-gray-400 leading-relaxed">
              We're building high-assurance systems for high-security applications, enabling trustless AI execution across finance and technology.
            </p>
          </div>

          {/* Card 3: What We Do */}
          <div className="bg-gray-900/40 rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-400/30 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">What We Do</h3>
            <p className="text-gray-400 leading-relaxed">
              We push the envelope in order to make it easier-than-ever to harness verifiable AI computation in your decentralized tech stack.
            </p>
          </div>
        </div>

        {/* Join Us CTA */}
        <section className="text-center">
          <div className="bg-linear-to-r from-cyan-400/10 via-purple-500/10 to-emerald-400/10 rounded-2xl p-12 border border-gray-700/50">
            <h2 className="text-3xl font-semibold text-white mb-4">Join Our Journey</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              We're always looking for talented individuals who share our passion for trustless systems and verifiable AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/defiesta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://github.com/Defiesta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg border border-gray-600 text-white hover:border-white transition-colors"
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
