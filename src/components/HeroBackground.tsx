'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface Node {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}

const GRID_SIZE = 12; // Number of nodes in each direction
const NODE_SPACING = 80; // Pixels between nodes
const INFLUENCE_RADIUS = 150; // How far cursor affects nodes
const MAX_DISPLACEMENT = 30; // Max pixels a node can move

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  // Initialize grid nodes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        
        const cols = Math.ceil(width / NODE_SPACING) + 2;
        const rows = Math.ceil(height / NODE_SPACING) + 2;
        
        const newNodes: Node[] = [];
        let id = 0;
        
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = col * NODE_SPACING - NODE_SPACING / 2;
            const y = row * NODE_SPACING - NODE_SPACING / 2;
            newNodes.push({
              id: id++,
              x,
              y,
              originalX: x,
              originalY: y,
            });
          }
        }
        setNodes(newNodes);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 z-10" />
      
      {/* SVG Net/Mesh */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.5 }}
      >
        {/* Grid lines */}
        <NetLines 
          nodes={nodes} 
          smoothMouseX={smoothMouseX} 
          smoothMouseY={smoothMouseY}
          dimensions={dimensions}
        />
      </svg>

      {/* Cursor glow effect */}
      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </div>
  );
}

// Lines connecting the nodes
function NetLines({ 
  nodes, 
  smoothMouseX, 
  smoothMouseY,
  dimensions 
}: { 
  nodes: Node[];
  smoothMouseX: ReturnType<typeof useSpring>;
  smoothMouseY: ReturnType<typeof useSpring>;
  dimensions: { width: number; height: number };
}) {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; id: string }[]>([]);
  
  useEffect(() => {
    const updateLines = () => {
      const cursorX = smoothMouseX.get();
      const cursorY = smoothMouseY.get();
      
      const cols = Math.ceil(dimensions.width / NODE_SPACING) + 2;
      const newLines: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
      
      nodes.forEach((node, index) => {
        const getDisplacedPosition = (n: Node) => {
          const dx = n.originalX - cursorX;
          const dy = n.originalY - cursorY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < INFLUENCE_RADIUS) {
            const force = (1 - distance / INFLUENCE_RADIUS) * MAX_DISPLACEMENT;
            const angle = Math.atan2(dy, dx);
            return {
              x: n.originalX + Math.cos(angle) * force,
              y: n.originalY + Math.sin(angle) * force,
            };
          }
          return { x: n.originalX, y: n.originalY };
        };
        
        const currentPos = getDisplacedPosition(node);
        
        // Horizontal line to next node
        const rightNode = nodes[index + 1];
        if (rightNode && (index + 1) % cols !== 0) {
          const rightPos = getDisplacedPosition(rightNode);
          newLines.push({
            x1: currentPos.x,
            y1: currentPos.y,
            x2: rightPos.x,
            y2: rightPos.y,
            id: `h-${node.id}`,
          });
        }
        
        // Vertical line to node below
        const bottomNode = nodes[index + cols];
        if (bottomNode) {
          const bottomPos = getDisplacedPosition(bottomNode);
          newLines.push({
            x1: currentPos.x,
            y1: currentPos.y,
            x2: bottomPos.x,
            y2: bottomPos.y,
            id: `v-${node.id}`,
          });
        }
      });
      
      setLines(newLines);
    };
    
    const unsubX = smoothMouseX.on('change', updateLines);
    const unsubY = smoothMouseY.on('change', updateLines);
    
    // Initial render
    updateLines();
    
    return () => {
      unsubX();
      unsubY();
    };
  }, [nodes, smoothMouseX, smoothMouseY, dimensions.width]);

  return (
    <g>
      {lines.map((line) => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#000"
          strokeWidth={0.8}
          opacity={0.25}
        />
      ))}
    </g>
  );
}
