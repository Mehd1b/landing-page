'use client';
import Image from 'next/image';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Card data for the three About sections
const ABOUT_CARDS = [
  {
    title: 'How We Started',
    description: 'Defiesta began as a small research-driven initiative focused on understanding how decentralized finance systems behave under real constraints. What started as exploratory work—analyzing protocols, incentives, and on-chain mechanics—gradually evolved into a broader effort to build tools and frameworks that prioritize correctness, transparency, and long-term reliability.',
    image: '/about/how_we_started.png',
    alt: 'Illustration representing the founding of DeFiesta',
    hoverBorder: 'hover:border-cyan-400/30',
    glowColor: 'shadow-cyan-400/20',
  },
  {
    title: 'Our Purpose',
    description: 'Our purpose is to contribute to a more understandable and resilient decentralized ecosystem. We aim to reduce unnecessary complexity by focusing on clear designs, verifiable behavior, and well-defined assumptions. Rather than chasing short-term trends, we concentrate on fundamentals that help protocols and users reason more clearly about the systems they rely on.',
    image: '/about/purpose.png',
    alt: 'Illustration representing our mission and purpose',
    hoverBorder: 'hover:border-purple-400/30',
    glowColor: 'shadow-purple-400/20',
  },
  {
    title: 'What We Do',
    description: 'We design and develop infrastructure, research artifacts, and open-source components related to decentralized finance. Our work spans protocol analysis, system design, and implementation, with an emphasis on correctness, security, and composability. When possible, we share our findings and tools publicly to support broader ecosystem learning.',
    image: '/about/what_we_do.png',
    alt: 'Illustration representing what DeFiesta does',
    hoverBorder: 'hover:border-emerald-400/30',
    glowColor: 'shadow-emerald-400/20',
  },
];

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
          {ABOUT_CARDS.map((card) => (
            <div
              key={card.title}
              className={`bg-gray-900/40 rounded-2xl p-8 border border-gray-700/50 ${card.hoverBorder} transition-all duration-300`}
            >
              {/* Image container with glow effect */}
              <div className="flex justify-center mb-6">
                <div className={`relative w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden shadow-lg ${card.glowColor}`}>
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 128px, 176px"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 text-center">{card.title}</h3>
              <p className="text-gray-400 leading-relaxed text-center">
                {card.description}
              </p>
            </div>
          ))}
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
