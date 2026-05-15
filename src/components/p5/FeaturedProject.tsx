import React, { useState } from 'react';
import { TechTag } from './TechTag';
import { P5Button } from './P5Button';

export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  filename: string;
}

interface FeaturedProjectProps {
  title: string;
  context: string;
  description: string;
  tags: string[];
  media: MediaItem[];
  orientation?: 'left' | 'right';
  className?: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  title,
  context,
  description,
  tags,
  media,
  orientation = 'left',
  className = '',
  primaryButton,
  secondaryButton
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = orientation === 'left';

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);

  return (
    <section className={`col-span-1 lg:col-span-2 relative pb-8 ${className}`}>
      <div className={`relative ${isLeft
        ? '-ml-2 md:-ml-4 lg:-ml-8 xl:-ml-12 pr-[5%]'
        : '-mr-1 md:-mr-2 lg:-mr-4 xl:-mr-6 pl-[5%]'
      }`}>
        
        {/* Título Superpuesto */}
        <div className={`absolute -top-12 z-30 pointer-events-none ${isLeft ? '-left-4 md:-left-8' : '-right-4 md:-right-8 text-right'}`}>
          <div className={`
            ${isLeft ? 'bg-p5-red rotate-2 border-p5-black shadow-hard' : 'bg-p5-black -rotate-2 border-p5-red shadow-hard-white-inverse'} 
            text-p5-white p-4 md:p-6 border-4 inline-block min-w-[300px] md:min-w-[500px]
          `}>
            <span className="font-mono text-xs block mb-1 opacity-80 tracking-[0.3em]">&gt; CURRENT_PROJECT:</span>
            <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase leading-none border-t-2 border-p5-white/30 pt-2">
              PROJECT_ <span className={`${isLeft ? 'text-p5-black bg-p5-white' : 'text-p5-red bg-p5-white'} px-4 uppercase`}>
                {title}
              </span>
            </h2>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className={`bg-panel border-8 border-p5-black p-4 md:p-8 pt-24 md:pt-28 ${isLeft ? 'shadow-hard-adaptive' : 'shadow-hard-adaptive-inverse'} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            
            {/* ÁREA DE MEDIOS */}
            <div className={`lg:col-span-7 flex flex-col justify-center ${isLeft ? '' : 'lg:order-2'}`}>
              <div className={`relative aspect-video bg-p5-black border-4 border-p5-white overflow-hidden ${isLeft ? 'shadow-hard' : 'shadow-hard-white-inverse'} mb-4`}>
                
                {/* Slides */}
                <div className="w-full h-full relative">
                  {media.map((item, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop />
                      ) : (
                        <img src={item.url} className="w-full h-full object-cover" alt={`Slide ${index}`} />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Nav Buttons */}
                {media.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute inset-y-0 left-0 z-20 bg-p5-black/90 text-p5-white p-3 border-r-4 border-p5-red hover:bg-p5-red transition-all">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/></svg>
                    </button>
                    <button onClick={nextSlide} className="absolute inset-y-0 right-0 z-20 bg-p5-black/90 text-p5-white p-3 border-l-4 border-p5-red hover:bg-p5-red transition-all">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/></svg>
                    </button>
                  </>
                )}
              </div>
              
              <div className={`flex items-center px-2 ${isLeft ? 'justify-between' : 'justify-end'}`}>
                <div className={`font-mono text-[10px] px-3 py-1 border border-adaptive uppercase tracking-widest ${isLeft ? 'bg-p5-red text-p5-white -rotate-1' : 'bg-p5-white text-p5-black rotate-1'}`}>
                  &gt; FILE: {media[currentSlide]?.filename}
                </div>
              </div>
            </div>

            {/* ÁREA DE INFORMACIÓN */}
            <div className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${isLeft ? '' : 'lg:order-1'}`}>
              <div className={`
                ${isLeft ? 'bg-p5-white text-p5-black border-l-[12px]' : 'bg-p5-black text-p5-white border-l-[12px]'}
                p-6 border-p5-red ${isLeft ? 'shadow-hard' : 'shadow-hard-inverse'} relative flex-1
              `}>
                <h3 className={`font-display text-4xl mb-4 uppercase tracking-tighter leading-none border-b-2 pb-2 italic ${isLeft ? 'border-p5-black' : 'border-p5-red text-p5-red'}`}>
                  {context}
                </h3>
                <p className="font-body text-base leading-relaxed opacity-90">
                  {description}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className={`font-display text-2xl uppercase text-p5-red tracking-widest ${isLeft ? 'text-left' : 'text-right'}`}>TECH_STACK</h4>
                <div className={`flex flex-wrap gap-3 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {tags.map((tag, i) => (
                    <TechTag key={tag} name={tag} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex w-full gap-2 xl:gap-4">
                {primaryButton && (
                  <P5Button href={primaryButton.href} variant="secondary" className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap">
                    {primaryButton.text}
                  </P5Button>
                )}
                {secondaryButton && (
                  <P5Button href={secondaryButton.href} variant="primary" className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap">
                    {secondaryButton.text}
                  </P5Button>
                )}
                <P5Button onClick={() => setIsExpanded(true)} variant="outline" className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap">
                  MORE INFO
                </P5Button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal / Panel Expandido de Featured Project */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 overflow-y-auto" onClick={() => setIsExpanded(false)}>
          {/* Overlay oscuro con Patrón Grid */}
          <div className="fixed inset-0 bg-p5-black/90 backdrop-blur-md animate-fade-in">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          </div>
          
          <div 
            className={`relative w-full max-w-7xl bg-p5-black border-4 ${isLeft ? 'border-p5-red' : 'border-p5-white'} p-6 md:p-10 flex flex-col gap-8 shadow-[16px_16px_0_0_#E50012] animate-slide-in`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={() => setIsExpanded(false)}
              className={`absolute -top-6 -right-6 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-display text-3xl md:text-4xl border-4 transition-colors z-50 -skew-x-[6deg] ${isLeft ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white' : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red hover:border-p5-black'}`}
            >
              <span className="skew-x-[6deg]">X</span>
            </button>

            {/* Título de Archivo */}
            <h3 className="font-display text-4xl md:text-6xl text-p5-red uppercase leading-none border-b-4 border-p5-red pb-4 italic tracking-widest">
              FILE_DATA: {title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-panel border-l-8 border-p5-white p-6 shadow-hard-adaptive">
                   <p className="font-body text-base md:text-lg text-p5-white leading-relaxed">
                     {description}
                     <br/><br/>
                     <span className="opacity-70 text-sm">
                       This section can be extended with more detailed logs, challenges faced, and specific achievements unlocked during the development of the project.
                     </span>
                   </p>
                </div>
                <div>
                   <h4 className="font-display text-2xl uppercase text-p5-red tracking-widest border-b-2 border-adaptive pb-2 mb-4">RESOURCES ASSIGNED</h4>
                   <div className="flex flex-wrap gap-2">
                     {tags.map((tag, i) => (
                       <TechTag key={tag} name={tag} index={i} variant={isLeft ? 'white' : 'black'} />
                     ))}
                   </div>
                </div>
              </div>
              
              <div className="space-y-6 flex flex-col">
                <div className="aspect-video bg-p5-black border-4 border-adaptive relative overflow-hidden flex-1 shadow-hard">
                   {media[currentSlide]?.type === 'video' ? (
                     <video src={media[currentSlide].url} className="w-full h-full object-cover" autoPlay muted loop />
                   ) : (
                     <img src={media[currentSlide]?.url} className="w-full h-full object-cover" alt="Media" />
                   )}
                   <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>
                   <div className="absolute top-2 left-2 font-mono text-[10px] bg-p5-red text-p5-white px-2 py-1 uppercase tracking-widest z-10 -skew-x-[6deg]">
                     <span className="inline-block skew-x-[6deg]">VISUAL_RECORD</span>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  {primaryButton && (
                    <P5Button href={primaryButton.href} variant="primary" className="flex-1">
                      {primaryButton.text}
                    </P5Button>
                  )}
                  {secondaryButton && (
                    <P5Button href={secondaryButton.href} variant="outline" className="flex-1">
                      {secondaryButton.text}
                    </P5Button>
                  )}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProject;
