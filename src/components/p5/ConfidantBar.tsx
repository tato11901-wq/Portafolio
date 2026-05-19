import React, { useState } from 'react';

export interface ConfidantBarProps {
  title: string;
  rank: number;
  percentage: number;
  description: string;
}

export const ConfidantBar: React.FC<ConfidantBarProps> = ({ title, rank, percentage, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group cursor-pointer flex flex-col" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex justify-between items-end mb-1">
        <span className="font-display text-2xl italic group-hover:text-p5-red transition-colors">{title}</span>
        <span className="text-p5-red font-display text-xl transition-transform duration-300 group-hover:scale-110 origin-right">RANK {rank}</span>
      </div>
      <div className="h-8 border-4 border-p5-black bg-p5-white relative overflow-hidden -skew-x-[12deg] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_#E50012]">
        <div 
          className="h-full bg-p5-red-dark transition-colors duration-300 group-hover:bg-p5-red"
          style={{ width: `${percentage}%` }}
        ></div>
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '4px 4px' }}
        ></div>
      </div>
      
      {/* Expanded Description Area */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out px-1 pb-2 ${
          isExpanded ? 'max-h-96 opacity-100 mt-2 pt-4' : 'max-h-0 opacity-0 mt-0 pt-0'
        }`}
      >
        <div className="bg-p5-black text-p5-white p-4 border-4 border-p5-white relative shadow-hard flex flex-col transition-transform hover:-translate-y-1">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
          <div className="absolute -top-3 -left-2 bg-p5-red text-p5-white font-mono text-xs px-2 py-0.5 border-2 border-p5-white -skew-x-[6deg] shadow-sm z-10">
            <span className="inline-block skew-x-[6deg] font-bold tracking-widest">NOTE</span>
          </div>
          <p className="font-body text-sm opacity-90 leading-relaxed relative z-10 mt-1 pl-2 border-l-2 border-p5-red">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
