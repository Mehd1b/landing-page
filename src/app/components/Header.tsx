'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// Types for company dropdown
interface CompanyLink {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

interface CompanySection {
  heading: string;
  links: CompanyLink[];
}

// Social icons (from Footer)
const SOCIAL_ICONS = {
  github: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  telegram: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  ),
  discord: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  medium: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
    </svg>
  ),
};

// Company sections data
const COMPANY_SECTIONS: CompanySection[] = [
  {
    heading: "About Us",
    links: [
      { title: "About", description: "Our mission and story", href: "/about" },
      { title: "Contact Us", description: "Get in touch with us", href: "mailto:mberiane@defiesta.net" },
    ]
  },
  {
    heading: "Socials",
    links: [
      { title: "GitHub", description: "View our code", href: "https://github.com/Defiesta", icon: SOCIAL_ICONS.github },
      { title: "Telegram", description: "Join our community", href: "https://t.me/defiesta", icon: SOCIAL_ICONS.telegram },
      { title: "Discord", description: "Chat with us", href: "https://discord.gg/v3Se8GytFc", icon: SOCIAL_ICONS.discord },
      { title: "Medium", description: "Read our blog", href: "https://medium.com/@mehd1b", icon: SOCIAL_ICONS.medium },
    ]
  }
];

// Close delay in ms - time before dropdown closes after pointer leaves
const CLOSE_DELAY = 300;

export default function Header({ onMenuToggle }: { onMenuToggle?: (isOpen: boolean) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{ left: number } | null>(null);

  // Refs for dropdown management
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerInsideRef = useRef(false);

  // Clear close timeout helper
  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  // Schedule dropdown close with delay (only if not already scheduled)
  const scheduleClose = useCallback(() => {
    if (closeTimeoutRef.current) return; // Already scheduled
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      setIsCompanyOpen(false);
    }, CLOSE_DELAY);
  }, []);

  // Check if a point is inside the dropdown region (trigger or panel)
  const isPointInsideDropdown = useCallback((x: number, y: number): boolean => {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;

    const inTrigger = triggerRef.current?.contains(el) ?? false;
    const inPanel = panelRef.current?.contains(el) ?? false;

    return inTrigger || inPanel;
  }, []);

  // Document-level pointermove tracking (source of truth for hover detection)
  useEffect(() => {
    if (!isCompanyOpen) return;

    const handlePointerMove = (e: PointerEvent) => {
      const inside = isPointInsideDropdown(e.clientX, e.clientY);

      if (inside) {
        // Pointer is inside dropdown region - cancel any pending close
        clearCloseTimeout();
        isPointerInsideRef.current = true;
      } else {
        // Pointer is outside - schedule close if we were previously inside
        if (isPointerInsideRef.current) {
          isPointerInsideRef.current = false;
          scheduleClose();
        }
      }
    };

    // Initial check in case pointer is already over panel when it opens
    // Use a small delay to ensure panel is rendered
    const initialCheck = setTimeout(() => {
      // We don't have coordinates here, so just mark as inside if open
      isPointerInsideRef.current = true;
    }, 10);

    document.addEventListener('pointermove', handlePointerMove);

    return () => {
      clearTimeout(initialCheck);
      document.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isCompanyOpen, isPointInsideDropdown, clearCloseTimeout, scheduleClose]);

  // Semantic pointer handlers (hints for immediate response)
  const handleTriggerPointerEnter = useCallback(() => {
    clearCloseTimeout();
    isPointerInsideRef.current = true;
    setIsCompanyOpen(true);
  }, [clearCloseTimeout]);

  const handleTriggerPointerLeave = useCallback((e: React.PointerEvent) => {
    // Check if leaving to the panel
    const relatedTarget = e.relatedTarget as Node | null;
    const goingToPanel = relatedTarget && panelRef.current?.contains(relatedTarget);

    if (!goingToPanel) {
      // Not going to panel, let document pointermove handle the close
      // But mark as potentially outside
      isPointerInsideRef.current = false;
      scheduleClose();
    }
  }, [scheduleClose]);

  const handlePanelPointerEnter = useCallback(() => {
    clearCloseTimeout();
    isPointerInsideRef.current = true;
  }, [clearCloseTimeout]);

  const handlePanelPointerLeave = useCallback((e: React.PointerEvent) => {
    // Check if leaving to the trigger
    const relatedTarget = e.relatedTarget as Node | null;
    const goingToTrigger = relatedTarget && triggerRef.current?.contains(relatedTarget);

    if (!goingToTrigger) {
      isPointerInsideRef.current = false;
      scheduleClose();
    }
  }, [scheduleClose]);

  // Click toggle for accessibility
  const handleCompanyClick = useCallback(() => {
    clearCloseTimeout();
    setIsCompanyOpen(prev => !prev);
  }, [clearCloseTimeout]);

  // Calculate panel position to stay within viewport
  const calculatePanelPosition = useCallback(() => {
    if (!triggerRef.current) return;

    const buttonRect = triggerRef.current.getBoundingClientRect();
    const panelWidth = 420;
    const viewportPadding = 16;

    // Default: left-aligned with button (left: 0 relative to wrapper)
    let left = 0;

    // Check if panel would overflow right edge of viewport
    const rightEdge = buttonRect.left + panelWidth;
    if (rightEdge > window.innerWidth - viewportPadding) {
      // Shift panel left by the overflow amount
      const overflow = rightEdge - (window.innerWidth - viewportPadding);
      left = -overflow;
    }

    setPanelPosition({ left });
  }, []);

  // Keyboard handling for trigger button
  const handleCompanyKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        clearCloseTimeout();
        setIsCompanyOpen(prev => !prev);
        break;
      case 'Escape':
        clearCloseTimeout();
        setIsCompanyOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isCompanyOpen) {
          clearCloseTimeout();
          setIsCompanyOpen(true);
        }
        // Focus first menu item after a tick to ensure menu is rendered
        setTimeout(() => {
          const firstItem = panelRef.current?.querySelector('a');
          firstItem?.focus();
        }, 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isCompanyOpen) {
          clearCloseTimeout();
          setIsCompanyOpen(true);
        }
        // Focus last menu item
        setTimeout(() => {
          const items = panelRef.current?.querySelectorAll('a');
          items?.[items.length - 1]?.focus();
        }, 0);
        break;
    }
  }, [isCompanyOpen, clearCloseTimeout]);

  // Menu item keyboard navigation
  const handleMenuItemKeyDown = useCallback((e: React.KeyboardEvent, index: number, totalItems: number) => {
    const items = panelRef.current?.querySelectorAll('a');
    if (!items) return;

    switch (e.key) {
      case 'Escape':
        clearCloseTimeout();
        setIsCompanyOpen(false);
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = (index + 1) % totalItems;
        (items[nextIndex] as HTMLElement)?.focus();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = (index - 1 + totalItems) % totalItems;
        (items[prevIndex] as HTMLElement)?.focus();
        break;
      case 'Tab':
        // Let natural tab order work, but close on last item tab
        if (!e.shiftKey && index === totalItems - 1) {
          setIsCompanyOpen(false);
        }
        break;
    }
  }, [clearCloseTimeout]);

  // Outside click handler using pointerdown
  useEffect(() => {
    if (!isCompanyOpen) return;

    const handleOutsideClick = (e: PointerEvent) => {
      const target = e.target as Node;

      // Check if click is outside both trigger and panel
      const isOutsideTrigger = !triggerRef.current?.contains(target);
      const isOutsidePanel = !panelRef.current?.contains(target);

      if (isOutsideTrigger && isOutsidePanel) {
        clearCloseTimeout();
        setIsCompanyOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [isCompanyOpen, clearCloseTimeout]);

  // Global Escape key handler when dropdown is open
  useEffect(() => {
    if (!isCompanyOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearCloseTimeout();
        setIsCompanyOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCompanyOpen, clearCloseTimeout]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Recalculate panel position when dropdown opens or window resizes
  useEffect(() => {
    if (isCompanyOpen) {
      calculatePanelPosition();
      window.addEventListener('resize', calculatePanelPosition);
      return () => window.removeEventListener('resize', calculatePanelPosition);
    }
  }, [isCompanyOpen, calculatePanelPosition]);

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
      <nav className="relative z-50 flex items-center justify-between px-8 py-6">
        <a href="/" className="relative">
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-lg"></div>
          <div className="relative px-4 py-2 bg-black rounded-lg text-xl font-semibold text-white hover:text-cyan-400 transition-colors duration-300">
            DEFIESTA
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
          <a href="/whitepaper" className="px-4 py-2 rounded-lg border border-dashed border-white/30 hover:border-white/60 hover:text-gray-300 transition-all">WHITEPAPER</a>

          {/* Company Dropdown */}
          <div className="relative">
            {/* Trigger Button */}
            <button
              ref={triggerRef}
              onClick={handleCompanyClick}
              onKeyDown={handleCompanyKeyDown}
              onPointerEnter={handleTriggerPointerEnter}
              onPointerLeave={handleTriggerPointerLeave}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-dashed border-white/30 hover:border-white/60 hover:text-gray-300 transition-all"
              aria-haspopup="true"
              aria-expanded={isCompanyOpen}
              aria-controls="company-menu"
            >
              COMPANY
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isCompanyOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Panel */}
            <div
              ref={panelRef}
              id="company-menu"
              role="menu"
              onPointerEnter={handlePanelPointerEnter}
              onPointerLeave={handlePanelPointerLeave}
              className={`absolute top-full mt-2 w-105 grid grid-cols-2 gap-6 p-6
                rounded-xl border-2 border-dashed border-white/50
                backdrop-blur-md bg-transparent
                transition-all duration-200 origin-top-left
                pointer-events-auto z-50
                ${isCompanyOpen
                  ? 'opacity-100 scale-100 visible'
                  : 'opacity-0 scale-95 invisible pointer-events-none'}`}
              style={{ left: panelPosition ? panelPosition.left : 0 }}
            >
              {(() => {
                let itemIndex = 0;
                const totalItems = COMPANY_SECTIONS.reduce((acc, section) => acc + section.links.length, 0);

                return COMPANY_SECTIONS.map((section) => (
                  <div key={section.heading} className="space-y-3">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section.heading}
                    </h3>
                    <div className="space-y-1">
                      {section.links.map((link) => {
                        const currentIndex = itemIndex++;
                        const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:');
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
                            onKeyDown={(e) => handleMenuItemKeyDown(e, currentIndex, totalItems)}
                            {...(isExternal && !link.href.startsWith('mailto:') && { target: "_blank", rel: "noopener noreferrer" })}
                          >
                            {link.icon && (
                              <span className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                                {link.icon}
                              </span>
                            )}
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                                {link.title}
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {link.description}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>

          <a href="/roadmap" className="px-4 py-2 rounded-lg border border-dashed border-white/30 hover:border-white/60 hover:text-gray-300 transition-all">ROADMAP</a>
          <a href="https://medium.com/@mehd1b" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border border-dashed border-white/30 hover:border-white/60 hover:text-gray-300 transition-all">BLOG</a>
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
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-700/30">
              <a href="/" className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-lg"></div>
                <div className="relative px-4 py-2 bg-black rounded-lg text-xl font-semibold text-white">
                  DEFIESTA
                </div>
              </a>
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

                {/* Mobile Company Accordion */}
                <div className="text-center">
                  <button
                    onClick={() => setIsMobileCompanyOpen(prev => !prev)}
                    className="inline-flex items-center gap-2 text-md font-light text-white hover:text-cyan-400 transition-all duration-300"
                    aria-expanded={isMobileCompanyOpen}
                  >
                    COMPANY
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isMobileCompanyOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isMobileCompanyOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-4 text-sm">
                      {COMPANY_SECTIONS.map((section) => (
                        <div key={section.heading} className="space-y-2">
                          <div className="text-xs text-gray-400 uppercase tracking-wider">
                            {section.heading}
                          </div>
                          {section.links.map((link) => {
                            const isExternal = link.href.startsWith('http');
                            return (
                              <a
                                key={link.href}
                                href={link.href}
                                className="block text-gray-300 hover:text-cyan-400 transition-colors"
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setIsMobileCompanyOpen(false);
                                  onMenuToggle?.(false);
                                }}
                                {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                              >
                                {link.title}
                              </a>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

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
                <a
                  href="https://medium.com/@mehd1b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-md font-light text-white hover:text-cyan-400 transition-all duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onMenuToggle?.(false);
                  }}
                >
                  BLOG
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
