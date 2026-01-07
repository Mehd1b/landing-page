'use client';
import { useEffect, useRef, useState } from 'react';

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  gradient: string;
}

const pillars: Pillar[] = [
  {
    title: "Agent Marketplace",
    description: "Discover, deploy, and monetize AI agents with verified performance metrics. Every agent comes with cryptographic guarantees and transparent execution history.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    title: "Proof Infrastructure",
    description: "Zero-knowledge proof generation ensures every execution is verifiable and compliant with predefined constraints, eliminating trust assumptions.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600"
  },
  {
    title: "Execution Engine",
    description: "High-performance WASM runtime with oracle integration enables agents to execute complex DeFi strategies across multiple protocols simultaneously.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600"
  },
  {
    title: "Capital Formation",
    description: "Tokenized agent shares enable community funding and profit distribution, creating sustainable incentives for agent development and deployment.",
    icon: (
      <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    color: "#f59e0b",
    gradient: "from-amber-400 to-orange-600"
  }
];

export default function PillarsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [streamHeights, setStreamHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights for data streams on client side only
    const heights = Array.from({ length: 6 }, () => Math.random() * 12 + 6);
    setStreamHeights(heights);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 border-t border-gray-800 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 border border-cyan-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-purple-400/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-400/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-light mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The DeFi Agent Economy
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Four pillars powering autonomous financial execution
          </p>
          <div className={`w-24 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto mt-4 rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className={`relative group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{transitionDelay: `${600 + index * 200}ms`}}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-80 bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50 hover:bg-gray-900/80 group-hover:scale-105">
                
                <div className={`absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${pillar.gradient}`}></div>
                
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${pillar.color}, transparent)` }}
                >
                  <div 
                    className="h-full w-16 bg-white/30"
                    style={{
                      animation: hoveredIndex === index ? 'scan 2s linear infinite' : 'none'
                    }}
                  ></div>
                </div>

                <div className="absolute top-6 left-6 w-6 h-6">
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${pillar.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 h-full bg-linear-to-b ${pillar.gradient} transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150`}></div>
                </div>

                <div className="absolute bottom-6 right-6 w-6 h-6">
                  <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-linear-to-l ${pillar.gradient} transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 h-full bg-linear-to-t ${pillar.gradient} transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-450`}></div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-16 h-16 bg-linear-to-r ${pillar.gradient} rounded-2xl mb-6 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 relative`}>
                      {pillar.icon}
                      
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(45deg, ${pillar.color}40, transparent, ${pillar.color}40)`}}></div>
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </div>

                </div>

                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="flex flex-col space-y-1">
                    {streamHeights.map((height, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-linear-to-t from-transparent to-current rounded-full"
                        style={{
                          height: `${height}px`,
                          color: pillar.color,
                          animationDelay: `${i * 0.1}s`,
                          animation: hoveredIndex === index ? 'pulse 1s ease-in-out infinite' : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="absolute -top-2 -left-2 w-6 h-6 border border-gray-600/20 rounded-full animate-spin" style={{animationDuration: '6s'}}></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border border-gray-500/20 rounded-full animate-spin" style={{animationDuration: '8s', animationDirection: 'reverse'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </section>
  );
}