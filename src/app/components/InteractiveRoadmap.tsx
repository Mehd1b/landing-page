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
}

interface Connection {
  from: string;
  to: string;
}

const roadmapData: RoadmapItem[] = [
  // Q1 2026 - Foundations & Protocol Core
  {
    id: 'zk-execution',
    title: 'zk Execution Environment',
    description: 'Finalize zkVM choice and define deterministic execution constraints',
    status: 'in-progress',
    quarter: 'Q1 2026',
    x: 150,
    y: 220,
    category: 'zkvm',
    details: [
      'Finalize zkVM choice: RISC Zero',
      'Define deterministic execution constraints',
      'No network calls, fixed randomness via transcript',
      'Explicit input/output boundaries'
    ]
  },
  {
    id: 'verifiable-agent-v1',
    title: 'Verifiable Agent Model v1',
    description: 'Define canonical agent interface with code hash and commitments',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 350,
    y: 220,
    category: 'agents',
    details: [
      'Agent = (Code Hash, Input Commitments, Execution Proof, Output Commitments)',
      'Define canonical agent interface: init(), step(state, input), finalize()',
      'Verifiable execution model'
    ]
  },
  {
    id: 'transcript-layer',
    title: 'Transcript & Determinism',
    description: 'Rolling transcript spec with Rust prover and Solidity verifier alignment',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 550,
    y: 220,
    category: 'zkvm',
    details: [
      'Rolling transcript spec (Keccak-based)',
      'Rust prover implementation',
      'Solidity verifier implementation',
      'Deterministic prompt & tool encoding'
    ]
  },
  {
    id: 'smart-contracts-v1',
    title: 'Smart Contract Skeleton',
    description: 'Agent registry, proof verification, and reward distribution',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 750,
    y: 220,
    category: 'ecosystem',
    details: [
      'Agent registry',
      'Proof verification entrypoint',
      'Minimal reward distribution logic',
      'End-to-end demo capability'
    ]
  },

  // Q2 2026 - MVP: Agent Marketplace
  {
    id: 'marketplace-v1',
    title: 'Agent Marketplace v1',
    description: 'On-chain registry with metadata, pricing, and versioned code hashes',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 150,
    y: 380,
    category: 'marketplace',
    details: [
      'On-chain registry of agents',
      'Metadata: description, pricing, constraints',
      'Versioned agent code hashes',
      'Discoverable agent ecosystem'
    ]
  },
  {
    id: 'economic-layer',
    title: 'Economic Layer',
    description: 'Pay-per-execution model with staking and slashing mechanisms',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 350,
    y: 380,
    category: 'ecosystem',
    details: [
      'Pay-per-execution model',
      'Staking for agent publishers',
      'Slashing for invalid proofs',
      'Economic incentive alignment'
    ]
  },
  {
    id: 'execution-flow-v1',
    title: 'Execution Flow v1',
    description: 'Complete user-to-settlement flow with off-chain execution',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 550,
    y: 380,
    category: 'agents',
    details: [
      'User submits input + fee',
      'Off-chain executor runs agent in zkVM',
      'Proof + output posted on-chain',
      'Automatic settlement'
    ]
  },
  {
    id: 'developer-tooling',
    title: 'Developer Tooling',
    description: 'Rust SDK and tooling for agent development and testing',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 750,
    y: 380,
    category: 'ecosystem',
    details: [
      'Rust SDK for agent authors',
      'Deterministic prompt compiler',
      'Local prover + verifier tooling',
      'Developer documentation'
    ]
  },

  // Q3 2026 - Advanced Agents & Composability
  {
    id: 'stateful-agents',
    title: 'Stateful & Long-Running Agents',
    description: 'Persistent state commitments and multi-step execution proofs',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 150,
    y: 540,
    category: 'agents',
    details: [
      'Persistent agent state commitments',
      'Multi-step execution proofs',
      'On-chain state root updates',
      'Complex agent workflows'
    ]
  },
  {
    id: 'defi-integration',
    title: 'DeFi & On-chain Integration',
    description: 'Agents that read on-chain state and generate verifiable trading decisions',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 350,
    y: 540,
    category: 'defi',
    details: [
      'Read on-chain state',
      'Generate verifiable trading decisions',
      'Interact via execution adapters',
      'Real DeFi use cases'
    ]
  },
  {
    id: 'agent-composition',
    title: 'Agent Composition',
    description: 'Agent-to-agent calls with proof aggregation strategies',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 550,
    y: 540,
    category: 'agents',
    details: [
      'Agent → Agent calls',
      'Proof aggregation strategies',
      'Shared transcript standards',
      'Composable agent pipelines'
    ]
  },
  {
    id: 'performance-improvements',
    title: 'Performance Improvements',
    description: 'Proof size reduction, batch verification, and cost optimizations',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 750,
    y: 540,
    category: 'zkvm',
    details: [
      'Proof size reduction',
      'Batch verification',
      'Cost optimizations',
      'Scalability improvements'
    ]
  },

  // Q4 2026 - Protocol Hardening & Decentralization
  {
    id: 'security-formalization',
    title: 'Security & Formalization',
    description: 'External audits, formal guarantees, and adversarial agent modeling',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 150,
    y: 700,
    category: 'ecosystem',
    details: [
      'External audits (contracts + zk circuits)',
      'Formal determinism guarantees',
      'Adversarial agent model',
      'Security hardening'
    ]
  },
  {
    id: 'decentralized-execution',
    title: 'Decentralized Execution Network',
    description: 'Multiple executors with proof race, redundancy, and reputation',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 350,
    y: 700,
    category: 'ecosystem',
    details: [
      'Multiple executors',
      'Proof race / redundancy',
      'Executor reputation & slashing',
      'Decentralized infrastructure'
    ]
  },
  {
    id: 'governance-layer',
    title: 'Governance Layer',
    description: 'Parameter governance, agent standards evolution, and treasury management',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 550,
    y: 700,
    category: 'ecosystem',
    details: [
      'Parameter governance',
      'Agent standards evolution',
      'Treasury management',
      'Community governance'
    ]
  },
  {
    id: 'mainnet-launch',
    title: 'Mainnet Launch',
    description: 'Permissionless publishing, incentivized executors, real economic usage',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 750,
    y: 700,
    category: 'marketplace',
    details: [
      'Permissionless agent publishing',
      'Incentivized executors',
      'Real economic usage',
      'Open agent ecosystem'
    ]
  }
];

const connections: Connection[] = [
  { from: 'zk-execution', to: 'verifiable-agent-v1' },
  { from: 'verifiable-agent-v1', to: 'transcript-layer' },
  { from: 'transcript-layer', to: 'smart-contracts-v1' },
  { from: 'zk-execution', to: 'marketplace-v1' },
  { from: 'verifiable-agent-v1', to: 'economic-layer' },
  { from: 'transcript-layer', to: 'execution-flow-v1' },
  { from: 'smart-contracts-v1', to: 'developer-tooling' },
  { from: 'marketplace-v1', to: 'stateful-agents' },
  { from: 'economic-layer', to: 'defi-integration' },
  { from: 'execution-flow-v1', to: 'agent-composition' },
  { from: 'developer-tooling', to: 'performance-improvements' },
  { from: 'stateful-agents', to: 'security-formalization' },
  { from: 'defi-integration', to: 'decentralized-execution' },
  { from: 'agent-composition', to: 'governance-layer' },
  { from: 'performance-improvements', to: 'mainnet-launch' }
];

export default function InteractiveRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 0, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const categoryColors = {
    zkvm: '#06B6D4', // Cyan
    agents: '#10B981', // Emerald  
    marketplace: '#8B5CF6', // Purple
    ecosystem: '#F59E0B', // Amber
    defi: '#EF4444' // Red
  };

  const statusColors = {
    completed: '#10B981',
    'in-progress': '#F59E0B',
    upcoming: '#6B7280'
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.4, Math.min(3, scale * scaleChange));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-gray-900/90 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{category === 'zkvm' ? 'zkVM' : category === 'defi' ? 'DeFi' : category}</span>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-semibold mt-4 mb-3">Status</h3>
        <div className="space-y-2">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{status.replace('-', ' ')}</span>
            </div>
          ))}
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
          viewBox="0 0 900 820"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="0.5" fill="#1F2937" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Header Section - Inside SVG */}
          <foreignObject x="150" y="20" width="600" height="120">
            <div className="bg-gray-900/95 rounded-lg p-4 border border-gray-700">
              <div className="text-center mb-3">
                <h1 className="text-2xl font-light mb-1 text-white">
                  DeFiesta Roadmap
                </h1>
                <div className="text-xs text-gray-400 mb-3">
                  Our journey to verifiable on-chain AI agents
                </div>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <h2 className="text-sm font-semibold mb-2 text-center bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                  Vision 2026: Verifiable AI Agent Protocol
                </h2>
                <p className="text-xs text-gray-300 text-center leading-relaxed">
                  Build the leading on-chain marketplace for verifiable AI agents, where every agent's execution, strategy, and outputs are cryptographically provable, deterministic, and composable with DeFi and on-chain state.
                </p>
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

          {/* Quarter Labels */}
          {['Q1 2026', 'Q2 2026', 'Q3 2026', 'Q4 2026'].map((quarter, index) => (
            <g key={quarter}>
              <rect
                x="20"
                y={180 + index * 160}
                width="80"
                height="30"
                fill="#1F2937"
                stroke="#374151"
                rx="6"
              />
              <text
                x="60"
                y={198 + index * 160}
                className="text-sm font-semibold"
                fill="#9CA3AF"
                textAnchor="middle"
              >
                {quarter}
              </text>
            </g>
          ))}

          {/* Roadmap Items */}
          {roadmapData.map((item) => (
            <g key={item.id}>
              {/* Item Circle */}
              <circle
                cx={item.x}
                cy={item.y}
                r={selectedItem === item.id ? "28" : "22"}
                fill={statusColors[item.status]}
                stroke={categoryColors[item.category]}
                strokeWidth="4"
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              />
              
              {/* Item Label */}
              <text
                x={item.x}
                y={item.y - 38}
                textAnchor="middle"
                className="text-xs font-medium pointer-events-none max-w-30"
                fill="white"
              >
                <tspan x={item.x} dy="0">{item.title.split(' ').slice(0, 2).join(' ')}</tspan>
                {item.title.split(' ').length > 2 && (
                  <tspan x={item.x} dy="12">{item.title.split(' ').slice(2).join(' ')}</tspan>
                )}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Selected Item Details */}
      {selectedItem && (
        <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-96 bg-gray-900/95 rounded-lg p-6 border border-gray-700 z-30">
          {(() => {
            const item = roadmapData.find(i => i.id === selectedItem);
            if (!item) return null;
            
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: statusColors[item.status] + '20',
                      color: statusColors[item.status]
                    }}
                  >
                    {item.status.replace('-', ' ')}
                  </span>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: categoryColors[item.category] + '20',
                      color: categoryColors[item.category]
                    }}
                  >
                    {item.category === 'zkvm' ? 'zkVM' : item.category === 'defi' ? 'DeFi' : item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.quarter}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{item.description}</p>
                {item.details && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Deliverables:</h4>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {item.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-cyan-400 mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-20 text-xs text-gray-400 text-right">
        <div>Scroll to zoom • Drag to pan • Click items for details</div>
        <div>Press ESC to deselect</div>
      </div>
    </div>
  );
}