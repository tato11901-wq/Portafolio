import React, { useState } from 'react';

interface CallingCardProps {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  className?: string;
}

export const CallingCard: React.FC<CallingCardProps> = ({
  name,
  email,
  linkedin,
  github,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative max-w-xl w-full mx-auto group ${className}`}>
      {/* Red Shadow Offset */}
      <div className="absolute inset-0 bg-p5-red transform translate-x-4 translate-y-4 -rotate-1"></div>
      
      {/* Main Card Body */}
      <div className="relative bg-p5-black border-4 border-p5-white px-8 py-8 md:px-12 md:py-10 overflow-hidden">
        {/* Halftone Texture Overlay */}
        <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none"></div>
        
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-p5-white transform translate-x-12 -translate-y-12 rotate-45"></div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div className="border-l-4 border-p5-red pl-5">
            <h3 className="font-display text-4xl md:text-5xl text-p5-white leading-none uppercase tracking-tighter">
              {name}
            </h3>
            <span className="font-mono text-xs md:text-sm text-p5-red tracking-widest uppercase mt-2 block">
              // GAME DEVELOPER
            </span>
          </div>

          <div className="space-y-3 font-mono text-sm md:text-base">
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red w-28">EMAIL:</span>
              <a 
                href={`mailto:${email}`} 
                onClick={handleCopyEmail}
                className={`transition-colors px-2 py-1 inline-block cursor-pointer ${copied ? 'bg-p5-white text-p5-black font-bold' : 'text-p5-white hover:bg-p5-white hover:text-p5-black'}`}
                title="Click to copy"
              >
                {copied ? 'COPIED TO CLIPBOARD!' : email}
              </a>
            </div>
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red w-28">LINKEDIN:</span>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block">
                /in/alejandro-sandoval/
              </a>
            </div>
            <div className="group/item flex flex-col sm:flex-row sm:items-center">
              <span className="text-p5-red w-28">GITHUB:</span>
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-p5-white hover:bg-p5-white hover:text-p5-black transition-colors px-2 py-1 inline-block">
                /tato11901-wq
              </a>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-p5-gray flex justify-between items-end mt-8">
            <div className="font-display text-2xl md:text-3xl text-p5-white opacity-40 italic tracking-widest">
              CALLING_CARD
            </div>
            <div className="w-8 h-8 bg-p5-red rotate-45 transform translate-y-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallingCard;
