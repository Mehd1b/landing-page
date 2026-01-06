'use client';
import { useEffect, useRef, useState } from 'react';

interface MarketFeature {
  title: string;
  description: string;
  value: string;
  color: string;
  gradient: string;
}

const marketFeatures: MarketFeature[] = [
  {
    title: "Agent Tokenization",
    description: "Transform AI agents into tradeable assets with fractional ownership and transparent performance metrics.",
    value: "ERC-20",
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    title: "Yield Generation",
    description: "Earn passive income from agent performance with automated profit distribution to token holders.",
    value: "15-45%",
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600"
  },
  {
    title: "Liquidity Pools",
    description: "Deep liquidity markets for agent tokens enable seamless entry and exit for investors.",
    value: "$2.5M",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600"
  }
];

export default function CapitalMarketsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [streamHeights, setStreamHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights for data streams on client side only
    const heights = Array.from({ length: 5 }, () => Math.random() * 16 + 8);
    setStreamHeights(heights);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/10 to-emerald-500/5"></div>
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 border border-cyan-400/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-purple-400/10 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-400/10 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Capital Markets
          </h2>
          <p className={`text-xl text-gray-400 max-w-4xl mx-auto mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Tokenize AI agents, create liquid markets, and democratize access to autonomous financial execution
          </p>
          <div className={`w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {marketFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`relative group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{transitionDelay: `${600 + index * 200}ms`}}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-96 bg-gray-900/60 backdrop-blur-sm rounded-3xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-gray-600/50 hover:bg-gray-900/80 group-hover:scale-105">
                
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-500 ${feature.gradient}`}></div>
                
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                >
                  <div 
                    className="h-full w-20 bg-white/40"
                    style={{
                      animation: hoveredIndex === index ? 'scan 2.5s linear infinite' : 'none'
                    }}
                  ></div>
                </div>

                <div className="absolute top-6 left-6 w-8 h-8">
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r ${feature.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b ${feature.gradient} transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-400 delay-200`}></div>
                </div>

                <div className="absolute bottom-6 right-6 w-8 h-8">
                  <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l ${feature.gradient} transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-400 delay-400`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t ${feature.gradient} transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-400 delay-600`}></div>
                </div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${feature.gradient} text-black font-bold text-lg mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                        {feature.value}
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse`}></div>
                  </div>
                </div>

                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                  <div className="flex flex-col space-y-1.5">
                    {streamHeights.map((height, i) => (
                      <div 
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-transparent to-current rounded-full"
                        style={{
                          height: `${height}px`,
                          color: feature.color,
                          animationDelay: `${i * 0.15}s`,
                          animation: hoveredIndex === index ? 'pulse 1.2s ease-in-out infinite' : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="absolute -top-3 -left-3 w-8 h-8 border border-gray-600/15 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 border border-gray-500/15 rounded-full animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}}></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-700/40 p-8 md:p-12 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-light mb-6">Decentralized Investment Infrastructure</h3>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our capital markets enable seamless investment in AI agents through tokenized shares, 
                automated yield distribution, and transparent performance tracking. Build diversified 
                portfolios of autonomous agents executing profitable DeFi strategies.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Fractional ownership through ERC-20 tokens</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-violet-600 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                  <span className="text-gray-300">Automated profit distribution via smart contracts</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <span className="text-gray-300">Real-time performance metrics and transparency</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-3xl font-light bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                    $847K
                  </div>
                  <p className="text-sm text-gray-400">Agent TVL</p>
                </div>
                <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-3xl font-light bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent mb-2">
                    234
                  </div>
                  <p className="text-sm text-gray-400">Active Investors</p>
                </div>
                <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-3xl font-light bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-2">
                    28.4%
                  </div>
                  <p className="text-sm text-gray-400">Avg APY</p>
                </div>
                <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700/50">
                  <div className="text-3xl font-light bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent mb-2">
                    67
                  </div>
                  <p className="text-sm text-gray-400">Listed Agents</p>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-12 h-12 border border-cyan-400/20 rounded-full animate-spin" style={{animationDuration: '6s'}}></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border border-purple-400/20 rounded-full animate-spin" style={{animationDuration: '9s', animationDirection: 'reverse'}}></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </section>
  );
}