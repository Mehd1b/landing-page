'use client';

export default function Header() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-8 py-6">
      <a href="/" className="group relative">
        <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative px-4 py-2 bg-black rounded-lg text-xl font-semibold text-white hover:text-cyan-400 transition-colors duration-300 border border-transparent group-hover:border-cyan-400/30">
          DEFIESTA
        </div>
      </a>
      <div className="hidden md:flex space-x-8 text-sm font-medium">
        <a href="/whitepaper" className="hover:text-gray-300 transition-colors">WHITEPAPER</a>
        <a href="#docs" className="hover:text-gray-300 transition-colors">DOCS</a>
        <a href="#discord" className="hover:text-gray-300 transition-colors">DISCORD</a>
      </div>
    </nav>
  );
}