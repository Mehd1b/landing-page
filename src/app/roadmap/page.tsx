'use client';
import { useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import InteractiveRoadmap from '../components/InteractiveRoadmap';

export default function RoadmapPage() {
  useEffect(() => {
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Restore scrolling when leaving the page
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white">
      <AnimatedBackground />
      <InteractiveRoadmap />
    </div>
  );
}