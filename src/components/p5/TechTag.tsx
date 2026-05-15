import React from 'react';

const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];
const SKEWS = ['-skew-x-[6deg]', 'skew-x-[6deg]', '-skew-x-[6deg]', 'skew-x-[6deg]', '-skew-x-[6deg]', 'skew-x-[6deg]'];
const INNER_SKEWS = ['skew-x-[6deg]', '-skew-x-[6deg]', 'skew-x-[6deg]', '-skew-x-[6deg]', 'skew-x-[6deg]', '-skew-x-[6deg]'];

interface TechTagProps {
  name: string;
  variant?: 'black' | 'white';
  index?: number;
  className?: string;
}

export const TechTag: React.FC<TechTagProps> = ({ name, variant = 'black', index = 0, className = '' }) => {
  const isWhite = variant === 'white';
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const skew = SKEWS[index % SKEWS.length];
  const innerSkew = INNER_SKEWS[index % INNER_SKEWS.length];

  return (
    <span className={`
      ${isWhite ? 'bg-p5-white text-p5-black border-p5-black' : 'bg-p5-black text-p5-white border-p5-white'}
      font-mono text-sm px-3 py-1
      ${skew} ${rotation}
      hover:rotate-0 hover:bg-p5-red hover:text-p5-white hover:border-p5-black
      transition-all duration-200 cursor-default
      border-2 inline-block group
      ${className}
    `}>
      <span className={`inline-block ${innerSkew} uppercase tracking-wider`}>
        {name}
      </span>
    </span>
  );
};

export default TechTag;
