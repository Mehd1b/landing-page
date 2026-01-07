'use client';
import { useEffect, useRef, useState } from 'react';

interface Feature {
  title: string;
  description: string;
  iconType: 'circuit' | 'lock' | 'vault';
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    title: "AI Agent Registry",
    description: "Deploy WASM-compiled AI agents with model commitments and constraint verification on-chain.",
    iconType: "circuit",
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    title: "Zero-Knowledge Proofs",
    description: "Every execution generates cryptographic proofs ensuring agent compliance and result integrity.",
    iconType: "lock",
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600"
  },
  {
    title: "Trustless Vaults",
    description: "Create agent-controlled vaults that execute DeFi strategies without human intervention.",
    iconType: "vault",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600"
  }
];

const IconComponent = ({ type, color }: { type: string; color: string }) => {
  switch (type) {
    case 'circuit':
      return (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <circle cx="8" cy="8" r="2" fill={color} />
          <circle cx="24" cy="8" r="2" fill={color} />
          <circle cx="8" cy="24" r="2" fill={color} />
          <circle cx="24" cy="24" r="2" fill={color} />
          <circle cx="16" cy="16" r="3" fill={color} />
          <path d="M10 8h12M8 10v12M24 10v12M10 24h12M13 16h6M16 13v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'lock':
      return (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect x="8" y="14" width="16" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
          <path d="M12 14V10a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="20" r="2" fill={color} />
          <path d="M16 22v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'vault':
      return (
        <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="20" cy="16" r="4" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="20" cy="16" r="1.5" fill={color} />
          <path d="M8 12h4M8 20h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <rect x="6" y="6" width="20" height="2" rx="1" fill={color} />
        </svg>
      );
    default:
      return null;
  }
};

export default function FuturisticFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [streamHeights, setStreamHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights for data streams on client side only
    const heights = Array.from({ length: 8 }, () => Math.random() * 16 + 8);
    setStreamHeights(heights);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/10 to-transparent"></div>
      
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Core Features
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-96 bg-gray-900/40 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden transition-all duration-500 hover:border-gray-700/50 hover:bg-gray-900/60">
                
                {/* Animated background glow */}
                <div className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Scanning line effect */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                >
                  <div 
                    className="h-full w-16 bg-white/30 animate-pulse"
                    style={{
                      animation: hoveredIndex === index ? 'scan 2s linear infinite' : 'none'
                    }}
                  ></div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8">
                  <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${feature.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  <div className={`absolute top-0 left-0 w-0.5 h-full bg-linear-to-b ${feature.gradient} transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-150`}></div>
                </div>

                <div className="absolute bottom-4 right-4 w-8 h-8">
                  <div className={`absolute bottom-0 right-0 w-full h-0.5 bg-linear-to-l ${feature.gradient} transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-300`}></div>
                  <div className={`absolute bottom-0 right-0 w-0.5 h-full bg-linear-to-t ${feature.gradient} transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-450`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div 
                        className="absolute inset-0 rounded-2xl bg-linear-to-br opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                        style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}40)` }}
                      ></div>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <IconComponent type={feature.iconType} color={feature.color} />
                        </div>
                      </div>
                      
                      {/* Orbital rings */}
                      <div className="absolute inset-0 rounded-full border border-gray-700/30 animate-spin" style={{ animationDuration: '8s' }}></div>
                      <div className="absolute inset-2 rounded-full border border-gray-600/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold mb-4 text-center group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 text-center leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Data stream effect */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <div className="flex flex-col space-y-1">
                    {streamHeights.map((height, i) => (
                      <div 
                        key={i}
                        className="w-1 bg-linear-to-t from-transparent to-current rounded-full"
                        style={{
                          height: `${height}px`,
                          color: feature.color,
                          animationDelay: `${i * 0.1}s`,
                          animation: hoveredIndex === index ? 'pulse 1s ease-in-out infinite' : 'none'
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
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