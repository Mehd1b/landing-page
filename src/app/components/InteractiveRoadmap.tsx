'use client';
import { useState, useRef, useEffect } from 'react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  quarter: string;
  x: number;
  y: number;
  category: 'zkvm' | 'agents' | 'marketplace' | 'ecosystem' | 'defi';
  details?: string[];
  success_criteria?: string[];
  non_goals?: string[];
  link?: string;
}

interface Connection {
  from: string;
  to: string;
}

const roadmapData: RoadmapItem[] = [
  // Phase 1 - Core Protocol (Q1-Q2 2026)
  {
    id: 'canonical-zkvm-guest',
    title: 'Canonical zkVM Guest + Constraint Kernel',
    description: 'RISC Zero execution sandbox with deterministic constraints and proof pipeline',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 240,
    y: 320,
    category: 'zkvm',
    details: [
      'RISC Zero zkVM implementation',
      'Constraint engine for agent execution',
      'Deterministic execution boundaries',
      'Proof pipeline to Ethereum'
    ],
    link: 'https://github.com/Defiesta/execution-kernel'
  },
  {
    id: 'agent-trait-interface',
    title: 'Agent Trait Interface',
    description: 'Canonical agent interface with input/output formats and execution semantics',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 440,
    y: 320,
    category: 'agents',
    details: [
      'Agent trait: init(), execute(), constraints()',
      'Input format specification',
      'Output/actions format',
      'Constraint enforcement semantics'
    ],
    link: 'https://github.com/Defiesta/execution-kernel'
  },
  {
    id: 'transcript-determinism',
    title: 'Transcript & Replay Protection',
    description: 'Input commitment design, journal canonicalization, and replay protection',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 640,
    y: 320,
    category: 'zkvm',
    details: [
      'Input commitment design',
      'Journal shaping & canonicalization',
      'Replay protection mechanisms',
      'Deterministic execution guarantees'
    ],
    link: 'https://github.com/Defiesta/execution-kernel'
  },
  {
    id: 'developer-sdk',
    title: 'Developer Tooling (SDK & CLI)',
    description: 'Complete SDK with guest generation CLI and example agents',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 840,
    y: 320,
    category: 'ecosystem',
    details: [
      'Kernel SDK for agent development',
      'Guest generation CLI',
      'Example agents and templates',
      'CI/testing suite for guest + host'
    ],
    link: 'https://github.com/Defiesta/execution-kernel'
  },
  {
    id: 'on-chain-interfaces',
    title: 'On-Chain Interface Standards',
    description: 'Vault, proof submission, and registry interfaces with multionce scheme',
    status: 'in-progress',
    quarter: 'Q2 2026',
    x: 240,
    y: 480,
    category: 'ecosystem',
    details: [
      'Vault interface standard',
      'Proof submission interface',
      'Agent registry specification',
      'Replay/multinonce scheme'
    ]
  },
  {
    id: 'execution-flow-mvp',
    title: 'Execution Flow v1',
    description: 'Complete user-to-settlement flow with first agent deployment',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 440,
    y: 480,
    category: 'agents',
    details: [
      'End-to-end execution pipeline',
      'First agent deployment + proof settlement',
      'User allocation to agents',
      'Automatic settlement'
    ]
  },
  {
    id: 'defi-integration-mvp',
    title: 'DeFi & On-chain Integration',
    description: 'Vaults, registry, and verifier contracts with basic DeFi interactions',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 640,
    y: 480,
    category: 'defi',
    details: [
      'User vault contracts',
      'Agent registry deployment',
      'Proof verifier contracts',
      'Basic DeFi interaction patterns'
    ]
  },
  {
    id: 'proof-format-standard',
    title: 'Proof Format Standardization',
    description: 'Receipt structure, journal formats, and verification specifications',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 840,
    y: 480,
    category: 'zkvm',
    details: [
      'Receipt structure specification',
      'Journal format standards',
      'Verification interface',
      'Proof metadata schemas'
    ]
  },

  // Phase 2 - Marketplace & Economics (Q3 2026)
  {
    id: 'agent-marketplace-v1',
    title: 'Agent Marketplace v1',
    description: 'Listing/registry UI with agent discovery and versioning',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 240,
    y: 640,
    category: 'marketplace',
    details: [
      'Agent listing and discovery UI',
      'Versioning and metadata',
      'Agent performance metrics',
      'Search and filtering'
    ]
  },
  {
    id: 'economic-layer-mvp',
    title: 'Economic Layer (Fees & Royalties)',
    description: 'MVP allocation and fee routing',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 440,
    y: 640,
    category: 'ecosystem',
    details: [
      'Allocation + fee routing',
      'Developer royalties',
      'Transparent fee structure'
    ]
  },
  {
    id: 'allocator-dashboard',
    title: 'Allocator Dashboard',
    description: 'Better UX for allocators with portfolio management and analytics',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 640,
    y: 640,
    category: 'marketplace',
    details: [
      'Portfolio management interface',
      'Agent performance analytics',
      'Allocation tools',
      'Risk management dashboard'
    ]
  },
  {
    id: 'monitoring-observability',
    title: 'Monitoring & Observability',
    description: 'Proof latency, execution cost, and uptime dashboards for allocators',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 840,
    y: 640,
    category: 'ecosystem',
    details: [
      'Proof latency monitoring',
      'Execution cost tracking',
      'Uptime dashboards',
      'Performance metrics'
    ]
  },

  // Phase 3 - Scale & Security (Q4 2026)
  {
    id: 'performance-optimizations',
    title: 'Performance Improvements',
    description: 'Proof size reduction, batch verification, and cost optimizations',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 240,
    y: 800,
    category: 'zkvm',
    details: [
      'Proof size reduction',
      'Batch verification',
      'Cost optimizations',
      'Scalability improvements'
    ]
  },
  {
    id: 'security-audit',
    title: 'Security & Formalization',
    description: 'External audits, formal specification, and security benchmarks',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 440,
    y: 800,
    category: 'ecosystem',
    details: [
      'External security audits',
      'Formal specification',
      'Security benchmarks',
      'Vulnerability assessments'
    ]
  },
  {
    id: 'constraint-system-spec',
    title: 'Constraint System Specification',
    description: 'Advanced constraint engine with formal verification and composability',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 640,
    y: 800,
    category: 'zkvm',
    details: [
      'Formal constraint specification',
      'Advanced constraint types',
      'Constraint composability',
      'Verification guarantees'
    ]
  },
  {
    id: 'multi-agent-composition',
    title: 'Multi-Agent Composition',
    description: 'Agent-to-agent calls with proof aggregation and composable patterns',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 840,
    y: 800,
    category: 'agents',
    details: [
      'Agent → Agent communication',
      'Proof aggregation strategies',
      'Multi-agent composition primitives',
      'Composable execution patterns'
    ]
  },

  // Future/Post-MVP (2027+) - Moved from earlier phases
  {
    id: 'stateful-agents-future',
    title: 'Stateful & Long-Running Agents',
    description: 'Long-lived stateful agents with persistent state (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 320,
    y: 960,
    category: 'agents',
    details: [
      'Persistent agent state',
      'Long-running execution',
      'State management protocols',
      'Complex workflows'
    ]
  },
  {
    id: 'decentralized-execution-future',
    title: 'Decentralized Execution Network',
    description: 'Multiple executors with proof races and decentralized infrastructure (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 540,
    y: 960,
    category: 'ecosystem',
    details: [
      'Multiple executor network',
      'Proof race mechanisms',
      'Decentralized infrastructure',
      'Executor reputation system'
    ]
  },
  {
    id: 'governance-future',
    title: 'Governance Layer',
    description: 'Protocol governance and community management (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 760,
    y: 960,
    category: 'ecosystem',
    details: [
      'Protocol governance',
      'Parameter management',
      'Community coordination',
      'Treasury management'
    ]
  }
];

const connections: Connection[] = [
  // Phase 1: Horizontal flow within phase
  { from: 'zkvm-guest-kernel', to: 'constraint-enforcement' },
  { from: 'constraint-enforcement', to: 'deterministic-framework' },
  { from: 'proof-pipeline', to: 'agent-registry' },
  { from: 'agent-registry', to: 'vault-infrastructure' },
  { from: 'vault-infrastructure', to: 'developer-sdk' },
  
  // Phase 1 to Phase 2: Only key foundational connections
  { from: 'developer-sdk', to: 'execution-orchestration' },
  { from: 'vault-infrastructure', to: 'financial-agents' },
  { from: 'agent-registry', to: 'mvp-deployment' },
  
  // Phase 2: Horizontal flow within phase
  { from: 'execution-orchestration', to: 'financial-agents' },
  { from: 'financial-agents', to: 'mvp-deployment' },
  
  // Phase 2 to Phase 3: Production readiness flow
  { from: 'mvp-deployment', to: 'security-audit' },
  { from: 'execution-orchestration', to: 'performance-optimization' },
  { from: 'financial-agents', to: 'monitoring-observability' },
  
  // Phase 3: Horizontal flow within phase
  { from: 'security-audit', to: 'performance-optimization' },
  { from: 'performance-optimization', to: 'monitoring-observability' },
  
  // Phase 3 to Future: Advanced capabilities
  { from: 'monitoring-observability', to: 'advanced-execution' },
  { from: 'security-audit', to: 'network-decentralization' },
  { from: 'performance-optimization', to: 'ecosystem-expansion' }
];

export default function InteractiveRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 0, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const phaseColors: Record<string, string> = {
    'Q1 2026': '#00D4FF', // Phase 1 - Core Protocol - Cyan
    'Q2 2026': '#00D4FF', // Phase 1 - Core Protocol - Cyan
    'Q3 2026': '#FF00FF', // Phase 2 - MVP - Magenta
    'Q4 2026': '#FF6B00', // Phase 3 - Production - Orange
    '2027+': '#FFD700'     // Future - Gold
  };

  const statusColors = {
    completed: '#00FF88',
    'in-progress': '#FFD700',
    upcoming: '#6B7280'
  };


  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.4, Math.min(3, scale * scaleChange));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as Element;
    // Only start dragging on background elements, not on interactive elements
    if (target.tagName === 'svg' || target.tagName === 'rect' || 
        (target.closest('svg') === svgRef.current && !target.closest('.milestone-node'))) {
      setIsDragging(true);
      setDragMoved(false);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Track if mouse has moved significantly
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setDragMoved(true);
      }
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset drag moved state after a short delay
    setTimeout(() => setDragMoved(false), 100);
  };

  const resetView = () => {
    setScale(0.8);
    setPosition({ x: 0, y: -100 });
    setSelectedItem(null);
  };

  const zoomIn = () => setScale(prev => Math.min(3, prev * 1.1));
  const zoomOut = () => setScale(prev => Math.max(0.4, prev * 0.9));

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
        if (isFullscreen) setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full h-full'} overflow-hidden`}
    >

      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={zoomOut}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={resetView}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Reset View"
        >
          ⌂
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Fullscreen"
        >
          ⛶
        </button>
      </div>

      {/* Phase Color Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-linear-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-xl p-4 border border-cyan-500/30 backdrop-blur-sm">
        <h3 className="text-sm font-bold mb-3 text-cyan-300">Development Phases</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-full border-2 border-white/20" style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 8px #00D4FF40' }} />
            <span className="text-gray-300 font-medium">Phase 1: Core Protocol (Q1-Q2 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-full border-2 border-white/20" style={{ backgroundColor: '#FF00FF', boxShadow: '0 0 8px #FF00FF40' }} />
            <span className="text-gray-300 font-medium">Phase 2: MVP Execution (Q3 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-full border-2 border-white/20" style={{ backgroundColor: '#FF6B00', boxShadow: '0 0 8px #FF6B0040' }} />
            <span className="text-gray-300 font-medium">Phase 3: Production (Q4 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-4 h-4 rounded-full border-2 border-white/20" style={{ backgroundColor: '#FFD700', boxShadow: '0 0 8px #FFD70040' }} />
            <span className="text-gray-300 font-medium">Future: Advanced (2027+)</span>
          </div>
        </div>
      </div>

      {/* Main SVG */}
      <div 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          {/* Enhanced Background with Futuristic Grid */}
          <defs>
            <pattern id="futuristicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#1E293B" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="1" fill="#06B6D4" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
              </circle>
            </pattern>
            
            {/* Glowing effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
            
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
            
            {/* Animated gradient for connections */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8">
                <animate attributeName="stopColor" 
                  values="#06B6D4;#8B5CF6;#10B981;#06B6D4" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6">
                <animate attributeName="stopColor" 
                  values="#8B5CF6;#10B981;#06B6D4;#8B5CF6" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8">
                <animate attributeName="stopColor" 
                  values="#10B981;#06B6D4;#8B5CF6;#10B981" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width="100%" height="100%" fill="#0A0A0A"/>
          <rect width="100%" height="100%" fill="url(#futuristicGrid)" opacity="0.6"/>

          {/* Technical Header Section */}
          <foreignObject x="200" y="25" width="600" height="200">
            <div className="relative bg-linear-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 animate-pulse"></div>
              <div className="relative z-10 text-center">
                <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-emerald-400">
                  Protocol Development Roadmap
                </h1>
                <div className="text-sm text-cyan-300 mb-4 font-medium">
                  Verifiable Execution Kernel for Bounded Financial Agents
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-2 border border-cyan-500/40">
                    <div className="font-semibold text-cyan-300">Phase 1</div>
                    <div className="text-gray-300">Core Protocol Infrastructure</div>
                    <div className="text-gray-400 text-xs mt-1">Q1-Q2 2026</div>
                  </div>
                  <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-2 border border-purple-500/40">
                    <div className="font-semibold text-purple-300">Phase 2</div>
                    <div className="text-gray-300">MVP Execution Protocol</div>
                    <div className="text-gray-400 text-xs mt-1">Q3 2026</div>
                  </div>
                  <div className="bg-linear-to-r from-orange-500/20 to-amber-500/20 rounded-lg p-2 border border-orange-500/40">
                    <div className="font-semibold text-orange-300">Phase 3</div>
                    <div className="text-gray-300">Production Hardening</div>
                    <div className="text-gray-400 text-xs mt-1">Q4 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </foreignObject>

          {/* Connections */}
          {connections.map((connection, index) => {
            const fromItem = roadmapData.find(item => item.id === connection.from);
            const toItem = roadmapData.find(item => item.id === connection.to);
            
            if (!fromItem || !toItem) return null;
            
            return (
              <line
                key={index}
                x1={fromItem.x}
                y1={fromItem.y}
                x2={toItem.x}
                y2={toItem.y}
                stroke="#374151"
                strokeWidth="2"
                strokeDasharray="4,4"
                opacity="0.6"
              />
            );
          })}

          {/* Technical Phase Indicators */}
          {[
            { 
              label: 'Phase 1', 
              subtitle: 'Core Protocol Infrastructure', 
              period: 'Q1-Q2 2026', 
              y: 280, 
              gradient: 'from-cyan-500 to-blue-600', 
              glow: '#00D4FF', 
              objective: 'Establish foundational execution primitives',
              success: '<10ms latency overhead, 300k gas verification'
            },
            { 
              label: 'Phase 2', 
              subtitle: 'MVP Execution Protocol', 
              period: 'Q3 2026', 
              y: 600, 
              gradient: 'from-purple-500 to-pink-600', 
              glow: '#FF00FF', 
              objective: 'Deploy end-to-end execution flow',
              success: '10+ production agents, <5min settlement'
            },
            {
              label: 'Phase 3',
              subtitle: 'Production Hardening',
              period: 'Q4 2026',
              y: 760,
              gradient: 'from-orange-500 to-amber-600',
              glow: '#FF6B00',
              objective: 'Secure and optimize for production',
              success: '$10M+ assets, 99.9% execution success'
            },
            { 
              label: 'Future', 
              subtitle: 'Advanced Patterns', 
              period: '2027+', 
              y: 920, 
              gradient: 'from-orange-500 to-red-600', 
              glow: '#FFD700', 
              objective: 'Network decentralization and ecosystem expansion',
              success: 'Multi-executor networks, governance'
            }
          ].map((phase, index) => (
            <g key={index}>
              {/* Glowing background */}
              <rect
                x="20"
                y={phase.y - 10}
                width="140"
                height="90"
                fill={phase.glow}
                opacity="0.1"
                rx="12"
                filter="url(#glow)"
              />
              
              {/* Main phase container */}
              <foreignObject x="25" y={phase.y - 5} width="130" height="80">
                <div className={`h-full bg-linear-to-br ${phase.gradient} p-2 rounded-xl border border-white/20 backdrop-blur-sm`}>
                  <div className="text-xs font-bold text-white">{phase.label}</div>
                  <div className="text-xs text-white/90 font-medium mt-1 leading-tight">{phase.subtitle}</div>
                  <div className="text-xs text-white/70 mt-1">{phase.period}</div>
                  <div className="text-xs text-white/60 mt-1 leading-tight">{phase.success}</div>
                </div>
              </foreignObject>
              
              {/* Animated side indicator */}
              <rect
                x="15"
                y={phase.y + 20}
                width="4"
                height="30"
                fill={phase.glow}
                rx="2"
                opacity="0.8"
              >
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin={`${index * 0.5}s`}/>
              </rect>
            </g>
          ))}

          {/* Enhanced Roadmap Items */}
          {roadmapData.map((item) => {
            const isSelected = selectedItem === item.id;
            const nodeSize = isSelected ? 35 : 28;
            const phaseColor = phaseColors[item.quarter];
            const statusColor = statusColors[item.status];
            const isCompleted = item.status === 'completed';
            const nodeColor = isCompleted ? '#00FF88' : phaseColor;

            return (
              <g key={item.id}>
                {/* Outer glow ring */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize + 8}
                  fill={nodeColor}
                  opacity={isCompleted ? "0.4" : "0.2"}
                  filter="url(#nodeGlow)"
                  className={`transition-all duration-300 ${isSelected ? 'opacity-40' : ''}`}
                >
                  {!isCompleted && (
                    <animate attributeName="r" values={`${nodeSize + 6};${nodeSize + 12};${nodeSize + 6}`} dur="3s" repeatCount="indefinite"/>
                  )}
                </circle>

                {/* Status ring */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize + 3}
                  fill="none"
                  stroke={statusColor}
                  strokeWidth={isCompleted ? "3" : "2"}
                  opacity={isCompleted ? "1" : "0.8"}
                  className="transition-all duration-300"
                />

                {/* Main node */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize}
                  fill={nodeColor}
                  stroke={isCompleted ? '#00FF88' : phaseColor}
                  strokeWidth={isCompleted ? "4" : "3"}
                  className="milestone-node cursor-pointer transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!dragMoved) {
                      setSelectedItem(selectedItem === item.id ? null : item.id);
                    }
                  }}
                  filter="url(#nodeGlow)"
                  opacity="0.9"
                />

                {/* Inner icon/indicator - Checkmark for completed, circle for others */}
                {isCompleted ? (
                  <g
                    className="milestone-node cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!dragMoved) {
                        setSelectedItem(selectedItem === item.id ? null : item.id);
                      }
                    }}
                  >
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r={nodeSize - 10}
                      fill="rgba(0, 255, 136, 0.3)"
                    />
                    <path
                      d={`M ${item.x - 8} ${item.y} L ${item.x - 2} ${item.y + 6} L ${item.x + 10} ${item.y - 6}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : (
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={nodeSize - 12}
                    fill={item.status === 'in-progress' ? statusColor : 'rgba(255,255,255,0.9)'}
                    opacity={item.status === 'in-progress' ? '0.9' : '0.7'}
                    className="milestone-node cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!dragMoved) {
                        setSelectedItem(selectedItem === item.id ? null : item.id);
                      }
                    }}
                  >
                    {item.status === 'in-progress' && (
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                    )}
                  </circle>
                )}
                
                {/* Enhanced Label */}
                <foreignObject 
                  x={item.x - 60} 
                  y={item.y - 70} 
                  width="120" 
                  height="35"
                  className="pointer-events-none"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white drop-shadow-lg leading-tight">
                      {item.title.length > 30 ? 
                        item.title.substring(0, 30) + '...' : 
                        item.title
                      }
                    </div>
                    <div className="text-xs text-gray-300 mt-1 opacity-80">
                      {item.quarter}
                    </div>
                  </div>
                </foreignObject>
                
                {/* Progress indicator for in-progress items */}
                {item.status === 'in-progress' && (
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={nodeSize + 5}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * (nodeSize + 5) * 0.75} ${2 * Math.PI * (nodeSize + 5) * 0.25}`}
                    opacity="0.9"
                    transform={`rotate(-90 ${item.x} ${item.y})`}
                  >
                    <animateTransform 
                      attributeName="transform" 
                      type="rotate" 
                      from={`-90 ${item.x} ${item.y}`}
                      to={`270 ${item.x} ${item.y}`}
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Enhanced Selected Item Details */}
      {selectedItem && (
        <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-96 bg-linear-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-xl z-30">
          {(() => {
            const item = roadmapData.find(i => i.id === selectedItem);
            if (!item) return null;
            
            const phaseColor = phaseColors[item.quarter];
            const statusColor = statusColors[item.status];
            
            return (
              <>
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-400 hover:text-cyan-400 text-xl transition-colors duration-200 hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: statusColor + '20',
                        color: statusColor,
                        borderColor: statusColor + '40'
                      }}
                    >
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: phaseColor + '20',
                        color: phaseColor,
                        borderColor: phaseColor + '40'
                      }}
                    >
                      {item.quarter.includes('Q1') || item.quarter.includes('Q2') ? 'PHASE 1' :
                       item.quarter.includes('Q3') ? 'PHASE 2' :
                       item.quarter.includes('Q4') ? 'PHASE 3' : 'FUTURE'}
                    </span>
                    <span className="text-xs text-cyan-300 font-medium bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                      {item.quarter}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                    {item.description}
                  </p>

                  {item.link && (
                    <div className="mb-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg border border-emerald-500/40 transition-colors text-sm font-medium"
                      >
                        <span>View Repository</span>
                        <span>→</span>
                      </a>
                    </div>
                  )}

                  {item.details && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-cyan-300">Technical Deliverables:</h4>
                      <ul className="text-xs text-gray-300 space-y-2">
                        {item.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 bg-gray-800/30 p-2 rounded border border-gray-700/30">
                            <span className="text-cyan-400 mt-1 font-bold">→</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Success Criteria based on phase */}
                  {item.quarter.includes('Q1') || item.quarter.includes('Q2') ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-emerald-300">Phase 1 Success Criteria:</h4>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">✓</span>
                          <span>Agent programs execute deterministically with &lt;10ms latency overhead</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">✓</span>
                          <span>All constraint violations result in proof generation failure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">✓</span>
                          <span>Execution receipts verify on-chain within 300k gas budget</span>
                        </li>
                      </ul>
                    </div>
                  ) : item.quarter.includes('Q3') ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-purple-300">Phase 2 Success Criteria:</h4>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>&lt;5 minute end-to-end execution latency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">✓</span>
                          <span>Zero custody errors across 100+ execution cycles</span>
                        </li>
                      </ul>
                    </div>
                  ) : item.quarter.includes('Q4') ? (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-orange-300">Phase 3 Success Criteria:</h4>
                      <ul className="text-xs text-gray-300 space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">✓</span>
                          <span>5+ production-ready financial agents deployed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">✓</span>
                          <span>Average proof generation cost &lt;$0.50 per execution</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">✓</span>
                          <span>99.9% execution success rate with constraint compliance</span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                  
                  {/* Protocol Invariants */}
                  <div className="bg-linear-to-r from-orange-500/10 to-red-500/10 p-3 rounded-lg border border-orange-500/30">
                    <h4 className="text-sm font-bold mb-2 text-orange-300">Protocol Invariants:</h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">⚡</span>
                        <span>Execution Determinism: Identical inputs → identical outputs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">🔒</span>
                        <span>Capital Safety: User funds remain in controlled vaults</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">📋</span>
                        <span>Constraint Enforcement: All actions respect declared bounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-400 mt-1">🔍</span>
                        <span>Proof Completeness: Every state change is cryptographically backed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 right-4 z-20 bg-gray-900/80 rounded-lg p-3 border border-cyan-500/30 backdrop-blur-sm">
        <div className="text-xs text-cyan-300 font-medium mb-1">Navigation</div>
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            <span>Scroll to zoom • Drag to pan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span>Click nodes for details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span>Press ESC to deselect</span>
          </div>
        </div>
      </div>
    </div>
  );
}