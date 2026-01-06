'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-purple-500/10 to-emerald-500/5 animate-pulse"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-8">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-8xl font-light leading-tight opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            DeFi AI Agent
            <br />
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
                Marketplace
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 transform scale-x-0 animate-scale-x" style={{animationDelay: '1s'}}></div>
            </span>
          </h1>
          
          <div className="relative">
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              Deploy AI agents that execute DeFi strategies with zero-knowledge proofs. 
              Trustless, verifiable, and autonomous financial execution on-chain.
            </p>
            
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-cyan-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border border-purple-400/20 rounded-full animate-spin-reverse"></div>
          </div>

          <div className="flex justify-center items-center opacity-0 animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <button className="group relative bg-linear-to-r from-gray-700 to-gray-800 text-gray-400 px-8 py-4 rounded-full font-medium transition-all duration-300 cursor-not-allowed">
              <span className="relative z-10">Coming Soon</span>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400/10 via-purple-500/10 to-emerald-400/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        <div className="absolute top-1/4 left-8 opacity-30">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute top-1/2 right-12 opacity-30">
          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 opacity-30">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes scale-x {
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          to {
            transform: rotate(-360deg);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-scale-x {
          animation: scale-x 0.8s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
      `}</style>
    </section>
  );
}