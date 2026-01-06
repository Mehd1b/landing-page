'use client';
import { useEffect, useRef, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  color: string;
  gradient: string;
  endValue: number;
  suffix: string;
}

const stats: Stat[] = [
  {
    value: "1,250+",
    label: "Deployed Agents",
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
    endValue: 1250,
    suffix: "+"
  },
  {
    value: "$45.7M",
    label: "Total Value Managed",
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600",
    endValue: 45.7,
    suffix: "M"
  },
  {
    value: "99.8%",
    label: "Execution Success Rate",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600",
    endValue: 99.8,
    suffix: "%"
  },
  {
    value: "24/7",
    label: "Autonomous Operation",
    color: "#f59e0b",
    gradient: "from-amber-400 to-orange-600",
    endValue: 24,
    suffix: "/7"
  }
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            animateNumbers();
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

  const animateNumbers = () => {
    const duration = 2000;
    const intervals = stats.map((stat, index) => {
      const startTime = Date.now();
      const endValue = stat.endValue;
      
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = endValue * easeOutCubic;
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = currentValue;
          return newValues;
        });
        
        if (progress === 1) {
          clearInterval(interval);
        }
      }, 16);
      
      return interval;
    });
    
    return () => intervals.forEach(clearInterval);
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-emerald-500/5"></div>
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 border border-cyan-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-purple-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-emerald-400/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-light mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Ecosystem Stats
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Building the largest network of autonomous AI agents for DeFi execution
          </p>
          <div className={`w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto mt-4 rounded-full transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`}></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`relative group text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{transitionDelay: `${600 + index * 200}ms`}}
            >
              <div className="relative p-8 rounded-3xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group-hover:bg-gray-900/60">
                
                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl ${stat.gradient}`}></div>
                
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full animate-ping" style={{backgroundColor: stat.color, animationDelay: `${index * 0.5}s`}}></div>
                
                <div className={`text-4xl md:text-5xl font-light bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 relative z-10`}>
                  {index === 0 && Math.floor(animatedValues[index]).toLocaleString() + stat.suffix}
                  {index === 1 && "$" + animatedValues[index].toFixed(1) + stat.suffix}
                  {index === 2 && animatedValues[index].toFixed(1) + stat.suffix}
                  {index === 3 && Math.floor(animatedValues[index]) + stat.suffix}
                </div>
                
                <p className="text-gray-400 text-sm relative z-10 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </p>

                <div className="absolute inset-x-4 bottom-2 h-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" style={{background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`}}></div>
                
                <div className="absolute -top-2 -right-2 w-4 h-4 border border-gray-600/30 rounded-full animate-spin" style={{animationDuration: '4s'}}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className={`flex space-x-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  backgroundColor: i === 0 ? '#00d4ff' : i === 1 ? '#a855f7' : '#10b981',
                  animationDelay: `${i * 0.3}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}