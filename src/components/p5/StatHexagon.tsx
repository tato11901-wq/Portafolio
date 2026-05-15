import React from 'react';

interface Stat {
  label: string;
  value: number; // 0 to 100
}

interface StatHexagonProps {
  stats: Stat[];
  className?: string;
}

export const StatHexagon: React.FC<StatHexagonProps> = ({ stats, className = '' }) => {
  // Simple hexagon points calculation for 6 stats
  // (In a real app, this would be more dynamic, but here we fix it for the P5 aesthetic)
  return (
    <div className={`relative w-64 h-64 mx-auto group ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[6px_6px_0px_rgba(0,0,0,0.8)]">
        {/* Background Grids */}
        <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" />
        <polygon points="50,25 70,35 70,65 50,75 30,65 30,35" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40" />
        
        {/* Stat Shape (Simulated values for now based on the P5 look) */}
        <polygon points="50,15 85,35 75,70 50,85 20,65 25,30" fill="var(--color-p5-red)" fillOpacity="0.7" stroke="var(--color-p5-white)" strokeWidth="1.5" className="transition-all group-hover:fill-opacity-90" />
        
        {/* Axes */}
        <line x1="50" y1="50" x2="50" y2="5" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
        <line x1="50" y1="50" x2="90" y2="25" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
        <line x1="50" y1="50" x2="90" y2="75" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
        <line x1="50" y1="50" x2="50" y2="95" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
      </svg>
      
      {/* Labels would go here as absolute divs if needed */}
    </div>
  );
};

export default StatHexagon;
