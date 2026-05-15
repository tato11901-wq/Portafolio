import React, { useState } from 'react';
import { TechTag } from './TechTag';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageText?: string;
  variant?: 'red' | 'white';
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tags,
  imageText = "PROJECT_PREVIEW",
  variant = 'red',
  primaryButton,
  secondaryButton,
  className = ''
}) => {
  const isRed = variant === 'red';
  const shadowColor = isRed ? 'shadow-hard' : 'shadow-hard-white';
  const hoverShadow = isRed ? 'hover:shadow-[14px_14px_0_0_#E50012]' : 'hover:shadow-[14px_14px_0_0_#F4F4F4]';

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Tarjeta pequeña (Siempre en el grid) */}
      <article 
        onClick={() => setIsExpanded(true)}
        className={`
          bg-p5-black border-4 border-adaptive p-4 
          flex flex-col gap-4 group 
          hover:-translate-y-3 hover:-translate-x-3 hover:-rotate-1 
          transition-all duration-300 relative cursor-pointer
          ${shadowColor} ${hoverShadow}
          ${className}
        `}
      >
        <div className={`aspect-video w-full overflow-hidden relative border-2 ${isRed ? 'border-p5-white' : 'border-p5-black bg-p5-white'}`}>
          <div className={`w-full h-full flex items-center justify-center font-display text-4xl tracking-widest relative ${isRed ? 'bg-p5-black text-p5-white' : 'bg-p5-white text-p5-black'}`}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
            <span className="z-20 transform rotate-2 group-hover:scale-110 transition-transform duration-500">{imageText}</span>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <h3 className="font-display text-3xl mb-2 text-p5-white group-hover:text-p5-red transition-colors leading-none uppercase">
            {title}
          </h3>
          <p className="font-body text-base text-p5-white opacity-80 mb-6 flex-1 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <TechTag key={tag} name={tag} index={i} variant={isRed ? 'black' : 'white'} />
            ))}
          </div>
        </div>
      </article>

      {/* Modal / Panel Expandido */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 overflow-y-auto" onClick={() => setIsExpanded(false)}>
          {/* Overlay oscuro lineal */}
          <div className="fixed inset-0 bg-p5-black/90 backdrop-blur-md animate-fade-in"></div>
          
          {/* Contenedor del Modal lineal */}
          <div 
            className={`relative w-full max-w-6xl bg-p5-black border-4 ${isRed ? 'border-p5-red' : 'border-p5-white'} p-6 md:p-10 flex flex-col md:flex-row gap-8 shadow-[16px_16px_0_0_#E50012] animate-slide-in`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón de Cerrar estilo P5 */}
            <button 
              onClick={() => setIsExpanded(false)}
              className={`absolute -top-6 -right-6 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-display text-3xl md:text-4xl border-4 transition-colors z-50 -skew-x-[6deg] ${isRed ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white' : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red hover:border-p5-black'}`}
            >
              <span className="skew-x-[6deg]">X</span>
            </button>

            {/* Visual del Modal */}
            <div className={`w-full md:w-1/2 aspect-video overflow-hidden relative border-4 ${isRed ? 'border-p5-white' : 'border-p5-black bg-p5-white'}`}>
              <div className={`w-full h-full flex items-center justify-center font-display text-5xl md:text-6xl tracking-widest relative ${isRed ? 'bg-p5-black text-p5-white' : 'bg-p5-white text-p5-black'}`}>
                <div className="absolute inset-0 opacity-10 bg-halftone"></div>
                <span className="z-20 transform -rotate-2">{imageText}</span>
              </div>
            </div>

            {/* Info del Modal */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="font-display text-5xl md:text-6xl mb-4 text-p5-white uppercase leading-none border-b-4 border-adaptive pb-4">
                {title}
              </h3>
              <p className="font-body text-lg md:text-xl text-p5-white opacity-90 mb-8 flex-1">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, i) => (
                  <TechTag key={tag} name={tag} index={i} variant={isRed ? 'black' : 'white'} />
                ))}
              </div>

              {/* Botones de acción */}
              {(primaryButton || secondaryButton) && (
                <div className="flex flex-wrap gap-4 mt-auto">
                  {primaryButton && (
                    <a href={primaryButton.href} className="inline-block">
                      <span className={`inline-block px-8 py-3 font-display text-3xl uppercase tracking-widest -skew-x-[6deg] border-4 shadow-sm transition-all duration-300 hover:rotate-0 hover:translate-x-1 hover:-translate-y-1 ${isRed ? 'bg-p5-red text-p5-white border-p5-black hover:bg-p5-white hover:text-p5-red hover:shadow-[6px_6px_0_0_#0F0F0F]' : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red hover:border-p5-black hover:shadow-[6px_6px_0_0_#F4F4F4]'}`}>
                        <span className="inline-block skew-x-[6deg]">{primaryButton.text}</span>
                      </span>
                    </a>
                  )}
                  {secondaryButton && (
                    <a href={secondaryButton.href} className="inline-block">
                      <span className={`inline-block px-8 py-3 font-display text-3xl uppercase tracking-widest -skew-x-[6deg] border-4 shadow-sm transition-all duration-300 hover:rotate-0 hover:translate-x-1 hover:-translate-y-1 ${isRed ? 'bg-transparent text-p5-white border-p5-white hover:bg-p5-white hover:text-p5-black hover:shadow-[6px_6px_0_0_#E50012]' : 'bg-transparent text-p5-black border-p5-black hover:bg-p5-black hover:text-p5-white hover:shadow-[6px_6px_0_0_#E50012]'}`}>
                        <span className="inline-block skew-x-[6deg]">{secondaryButton.text}</span>
                      </span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
