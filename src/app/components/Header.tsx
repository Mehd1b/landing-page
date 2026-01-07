'use client';
import { useState, useEffect } from 'react';

export default function Header({ onMenuToggle }: { onMenuToggle?: (isOpen: boolean) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Prevent background scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <a href="/" className="group relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative px-4 py-2 bg-black rounded-lg text-xl font-semibold text-white hover:text-cyan-400 transition-colors duration-300 border border-transparent group-hover:border-cyan-400/30">
            DEFIESTA
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="/whitepaper" className="hover:text-gray-300 transition-colors">WHITEPAPER</a>
          <a href="/roadmap" className="hover:text-gray-300 transition-colors">ROADMAP</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden relative group p-3 rounded-xl border border-gray-700/50 bg-gray-900/60 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''} group-hover:bg-cyan-400`}></span>
            <span className={`block w-5 h-0.5 bg-current mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} group-hover:bg-cyan-400`}></span>
            <span className={`block w-5 h-0.5 bg-current mt-1 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''} group-hover:bg-cyan-400`}></span>
          </div>
        </button>
      </nav>

      {/* Full-Screen Mobile Menu Portal */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black z-50 md:hidden">
          <div className="flex flex-col h-full">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/30">
              <div className="text-xl font-semibold text-white">
                DEFIESTA
              </div>
              <button 
                onClick={toggleMenu}
                className="p-2 text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Menu Items */}
            <div className="flex-1 flex flex-col justify-center px-6">
              <div className="space-y-8 text-center">
                <a 
                  href="/whitepaper" 
                  className="block text-md font-light text-white hover:text-cyan-400 transition-all duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenuToggle?.(false);
                  }}
                >
                  WHITEPAPER
                </a>
                <a 
                  href="/roadmap" 
                  className="block text-md font-light text-white hover:text-cyan-400 transition-all duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenuToggle?.(false);
                  }}
                >
                  ROADMAP
                </a>
              </div>
            </div>

            {/* Bottom Social Links */}
            <div className="p-6 border-t border-gray-700/30">
              <div className="flex space-x-6 justify-center">
                <a 
                  href="https://x.com/DeFiestaRoom" 
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 text-white hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://github.com/defiesta" 
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 text-white hover:text-cyan-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}