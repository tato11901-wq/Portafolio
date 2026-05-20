import React, { useState } from 'react';
import { TechTag } from './TechTag';
import { P5Button } from './P5Button';

type LocalizedText = {
  es: string;
  en: string;
};

export interface MediaItem {
  type: 'video' | 'image';
  url: string;
  filename: string;
}

interface FeaturedProjectProps {
  title: string;
  context: LocalizedText;
  description: LocalizedText;
  tags: string[];
  media: MediaItem[];
  orientation?: 'left' | 'right';
  className?: string;
  primaryButton?: { text: LocalizedText; href: string };
  secondaryButton?: { text: LocalizedText; href: string };
  role?: LocalizedText;
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
  secondaryButton,
  role
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isLeft = orientation === 'left';

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % media.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + media.length) % media.length);

  return (
    <section className={`col-span-1 lg:col-span-2 relative pb-8 ${className}`}>
      <div
        className={`relative ${
          isLeft
            ? '-ml-2 md:-ml-4 lg:-ml-8 xl:-ml-12 pr-[5%]'
            : '-mr-1 md:-mr-2 lg:-mr-4 xl:-mr-6 pl-[5%]'
        }`}
      >
        <div
          className={`absolute -top-12 z-30 pointer-events-none ${
            isLeft ? '-left-4 md:-left-8' : '-right-4 md:-right-8 text-right'
          }`}
        >
          <div
            className={`
              ${
                isLeft
                  ? 'bg-p5-red rotate-2 border-p5-black shadow-hard'
                  : 'bg-p5-black -rotate-2 border-p5-red shadow-hard-white-inverse'
              }
              text-p5-white p-4 md:p-6 border-4 inline-block min-w-[300px] md:min-w-[500px]
            `}
          >
            <span className="font-mono text-xs block mb-1 opacity-80 tracking-[0.3em]">
              <span className="lang-es">&gt; PROYECTO_ACTUAL:</span>
              <span className="lang-en">&gt; CURRENT_PROJECT:</span>
            </span>
            <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase leading-none border-t-2 border-p5-white/30 pt-2">
              PROJECT_{' '}
              <span className={`${isLeft ? 'text-p5-black bg-p5-white' : 'text-p5-red bg-p5-white'} px-4 uppercase`}>
                {title}
              </span>
            </h2>
          </div>
        </div>

        <div
          className={`bg-panel border-8 border-p5-black p-4 md:p-8 pt-24 md:pt-28 ${
            isLeft ? 'shadow-hard-adaptive' : 'shadow-hard-adaptive-inverse'
          } relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
            <div className={`lg:col-span-7 flex flex-col justify-center ${isLeft ? '' : 'lg:order-2'}`}>
              <div
                className={`relative aspect-video bg-p5-black border-4 border-p5-white overflow-hidden ${
                  isLeft ? 'shadow-hard' : 'shadow-hard-white-inverse'
                } mb-4 cursor-pointer group`}
                onClick={() => setIsFullscreen(true)}
              >
                <div className="absolute inset-0 bg-p5-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none flex items-center justify-center">
                  <div className="bg-p5-black text-p5-white font-display text-2xl px-4 py-2 border-2 border-p5-white -skew-x-[6deg] tracking-widest scale-90 group-hover:scale-100 transition-transform">
                    <span className="inline-block skew-x-[6deg]">
                      <span className="lang-es">AMPLIAR</span>
                      <span className="lang-en">EXPAND</span>
                    </span>
                  </div>
                </div>

                <div className="w-full h-full relative">
                  {media.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                    >
                      {item.type === 'video' ? (
                        <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop />
                      ) : (
                        <img src={item.url} className="w-full h-full object-cover" alt={`Slide ${index}`} />
                      )}
                    </div>
                  ))}
                </div>

                {media.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                      className="absolute inset-y-0 left-0 z-40 bg-p5-black/90 text-p5-white p-3 border-r-4 border-p5-red hover:bg-p5-red transition-all"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                      className="absolute inset-y-0 right-0 z-40 bg-p5-black/90 text-p5-white p-3 border-l-4 border-p5-red hover:bg-p5-red transition-all"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className={`flex items-center px-2 ${isLeft ? 'justify-between' : 'justify-end'}`}>
                <div
                  className={`font-mono text-[10px] px-3 py-1 border border-adaptive uppercase tracking-widest ${
                    isLeft ? 'bg-p5-red text-p5-white -rotate-1' : 'bg-p5-white text-p5-black rotate-1'
                  }`}
                >
                  <span className="lang-es">&gt; ARCHIVO:</span>
                  <span className="lang-en">&gt; FILE:</span>{' '}
                  {media[currentSlide]?.filename}
                </div>
              </div>
            </div>

            <div className={`lg:col-span-5 flex flex-col gap-6 ${isLeft ? '' : 'lg:order-1'}`}>
              <div
                className={`
                  ${isLeft ? 'bg-p5-white text-p5-black border-l-[12px]' : 'bg-p5-black text-p5-white border-l-[12px]'}
                  p-6 border-p5-red ${isLeft ? 'shadow-hard' : 'shadow-hard-inverse'} relative
                `}
              >
                <h3
                  className={`font-display text-4xl mb-4 uppercase tracking-tighter leading-none border-b-2 pb-2 italic ${
                    isLeft ? 'border-p5-black' : 'border-p5-red text-p5-red'
                  }`}
                >
                  <span className="lang-es">{context.es}</span>
                  <span className="lang-en">{context.en}</span>
                </h3>
                <p className="font-body text-base leading-relaxed opacity-90">
                  <span className="lang-es">{description.es}</span>
                  <span className="lang-en">{description.en}</span>
                </p>
              </div>

              <div className="space-y-4">
                <h4 className={`font-display text-2xl uppercase text-p5-red tracking-widest ${isLeft ? 'text-left' : 'text-right'}`}>
                  TECH_STACK
                </h4>
                <div className={`flex flex-wrap gap-3 ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {tags.map((tag, i) => (
                    <TechTag key={tag} name={tag} index={i} />
                  ))}
                </div>
              </div>

              <div className="flex w-full gap-2 xl:gap-4">
                {primaryButton && (
                  <P5Button
                    href={primaryButton.href}
                    variant="secondary"
                    className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap"
                  >
                    <span className="lang-es">{primaryButton.text.es}</span>
                    <span className="lang-en">{primaryButton.text.en}</span>
                  </P5Button>
                )}
                {secondaryButton && (
                  <P5Button
                    href={secondaryButton.href}
                    variant="primary"
                    className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap"
                  >
                    <span className="lang-es">{secondaryButton.text.es}</span>
                    <span className="lang-en">{secondaryButton.text.en}</span>
                  </P5Button>
                )}
                <P5Button
                  onClick={() => setIsExpanded(true)}
                  variant="outline"
                  className="flex-1 !text-sm sm:!text-base lg:!text-lg !px-1 md:!px-4 whitespace-nowrap"
                >
                  <span className="lang-es">MAS INFO</span>
                  <span className="lang-en">MORE INFO</span>
                </P5Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-20 overflow-y-auto"
          onClick={() => setIsExpanded(false)}
        >
          <div className="fixed inset-0 bg-p5-black/90 backdrop-blur-md animate-fade-in">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: 'radial-gradient(#F4F4F4 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            ></div>
          </div>

          <div
            className={`relative w-full max-w-7xl bg-p5-black border-4 ${
              isLeft ? 'border-p5-red' : 'border-p5-white'
            } p-6 md:p-10 flex flex-col gap-8 shadow-[16px_16px_0_0_#E50012] animate-slide-in`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className={`absolute -top-6 -right-6 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center font-display text-3xl md:text-4xl border-4 transition-colors z-50 -skew-x-[6deg] ${
                isLeft
                  ? 'bg-p5-white text-p5-black border-p5-black hover:bg-p5-red hover:text-p5-white'
                  : 'bg-p5-black text-p5-white border-p5-white hover:bg-p5-red hover:border-p5-black'
              }`}
            >
              <span className="skew-x-[6deg]">X</span>
            </button>

            <h3 className="font-display text-4xl md:text-6xl text-p5-red uppercase leading-none border-b-4 border-p5-red pb-4 italic tracking-widest">
              <span className="lang-es">ROL_AGENTE:</span>
              <span className="lang-en">AGENT_ROLE:</span>{' '}
              {title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-panel border-l-8 border-p5-white p-6 shadow-hard-adaptive">
                  <h4 className="font-display text-xl uppercase text-p5-red tracking-wider mb-2">
                    <span className="lang-es">&gt; MISIÓN Y APORTES</span>
                    <span className="lang-en">&gt; MISSION & CONTRIBUTIONS</span>
                  </h4>
                  <p className="font-body text-base md:text-lg text-p5-white leading-relaxed">
                    {role ? (
                      <>
                        <span className="lang-es">{role.es}</span>
                        <span className="lang-en">{role.en}</span>
                      </>
                    ) : (
                      <>
                        <span className="lang-es">{description.es}</span>
                        <span className="lang-en">{description.en}</span>
                      </>
                    )}
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-2xl uppercase text-p5-red tracking-widest border-b-2 border-adaptive pb-2 mb-4">
                    <span className="lang-es">RECURSOS ASIGNADOS</span>
                    <span className="lang-en">RESOURCES ASSIGNED</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <TechTag key={tag} name={tag} index={i} variant={isLeft ? 'white' : 'black'} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex flex-col">
                <div
                  className="aspect-video bg-p5-black border-4 border-adaptive relative overflow-hidden flex-1 shadow-hard cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(true);
                  }}
                >
                  {media[currentSlide]?.type === 'video' ? (
                    <video
                      src={media[currentSlide].url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      autoPlay
                      muted
                      loop
                    />
                  ) : (
                    <img
                      src={media[currentSlide]?.url}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt="Media"
                    />
                  )}
                  <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none"></div>

                  <div className="absolute inset-0 bg-p5-red/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none flex items-center justify-center">
                    <div className="bg-p5-black text-p5-white font-display text-xl px-3 py-1 border-2 border-p5-white -skew-x-[6deg] tracking-widest scale-90 group-hover:scale-100 transition-transform">
                      <span className="inline-block skew-x-[6deg]">
                        <span className="lang-es">AMPLIAR</span>
                        <span className="lang-en">EXPAND</span>
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-2 left-2 font-mono text-[10px] bg-p5-red text-p5-white px-2 py-1 uppercase tracking-widest z-30 -skew-x-[6deg]">
                    <span className="inline-block skew-x-[6deg]">
                      <span className="lang-es">REGISTRO_VISUAL</span>
                      <span className="lang-en">VISUAL_RECORD</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  {primaryButton && (
                    <P5Button href={primaryButton.href} variant="primary" className="flex-1">
                      <span className="lang-es">{primaryButton.text.es}</span>
                      <span className="lang-en">{primaryButton.text.en}</span>
                    </P5Button>
                  )}
                  {secondaryButton && (
                    <P5Button href={secondaryButton.href} variant="outline" className="flex-1">
                      <span className="lang-es">{secondaryButton.text.es}</span>
                      <span className="lang-en">{secondaryButton.text.en}</span>
                    </P5Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-p5-black/95 flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: 'radial-gradient(#E50012 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          ></div>

          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-p5-red text-p5-white font-display text-3xl flex items-center justify-center border-4 border-p5-white hover:bg-p5-white hover:text-p5-red hover:border-p5-red transition-all z-50 -skew-x-[6deg]"
            onClick={() => setIsFullscreen(false)}
          >
            <span className="skew-x-[6deg]">X</span>
          </button>

          <div
            className="relative w-full max-w-7xl aspect-video border-8 border-p5-white shadow-[16px_16px_0_0_#E50012] bg-p5-black"
            onClick={(e) => e.stopPropagation()}
          >
            {media.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {item.type === 'video' ? (
                  <video src={item.url} className="w-full h-full object-contain" autoPlay controls loop />
                ) : (
                  <img src={item.url} className="w-full h-full object-contain" alt={`Slide ${index}`} />
                )}
              </div>
            ))}

            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute inset-y-0 left-0 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-p5-red/20 text-p5-white transition-colors z-20 group"
                >
                  <svg className="w-12 h-12 md:w-16 md:h-16 group-hover:-translate-x-2 transition-transform drop-shadow-[2px_2px_0_#0F0F0F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute inset-y-0 right-0 w-16 md:w-24 flex items-center justify-center bg-transparent hover:bg-p5-red/20 text-p5-white transition-colors z-20 group"
                >
                  <svg className="w-12 h-12 md:w-16 md:h-16 group-hover:translate-x-2 transition-transform drop-shadow-[2px_2px_0_#0F0F0F]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-p5-black border-4 border-p5-red px-6 py-2 font-display text-xl text-p5-white z-20 -skew-x-[6deg]">
              <span className="inline-block skew-x-[6deg]">
                <span className="lang-es">DIAPO {currentSlide + 1} // {media.length}</span>
                <span className="lang-en">SLIDE {currentSlide + 1} // {media.length}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProject;
