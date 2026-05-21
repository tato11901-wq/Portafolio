import React, { useState, useEffect } from 'react';
import { ProjectCard } from './ProjectCard';

interface ProjectViewsProps {
  devProjects: any[]; // We will pass the mock data for dev projects
  artProjects: any[]; // We will pass the mock data for digital art projects
}

export const ProjectViews: React.FC<ProjectViewsProps> = ({ devProjects, artProjects }) => {
  const [activeView, setActiveView] = useState<'dev' | 'art'>('dev');

  useEffect(() => {
    // Modify body background and colors based on view
    if (activeView === 'art') {
      document.body.style.backgroundColor = '#660000'; // Dark Red background
      document.body.style.color = '#F4F4F4';
      document.body.style.backgroundImage = 'radial-gradient(rgba(15, 15, 15, 0.4) 2px, transparent 2px)';
    } else {
      document.body.style.backgroundColor = '#0F0F0F';
      document.body.style.color = '#F4F4F4';
      document.body.style.backgroundImage = 'radial-gradient(var(--grid-color) 2px, transparent 2px)';
    }

    return () => {
      // Cleanup
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.backgroundImage = '';
    };
  }, [activeView]);

  const currentProjects = activeView === 'dev' ? devProjects : artProjects;

  return (
    <div className="w-full">
      {/* View Switcher Tabs */}
      <div className="flex justify-center mb-16 relative z-10">
        <div className="bg-p5-black border-4 border-p5-white flex p-2 shadow-hard-white -skew-x-[6deg]">
          <button
            onClick={() => setActiveView('dev')}
            className={`px-8 py-3 font-display text-2xl uppercase tracking-widest transition-all ${
              activeView === 'dev' 
                ? 'bg-p5-white text-p5-black shadow-[4px_4px_0_0_#E50012]' 
                : 'text-p5-white hover:bg-p5-red/20'
            }`}
          >
            <span className="inline-block skew-x-[6deg]">Dev Projects</span>
          </button>
          
          <button
            onClick={() => setActiveView('art')}
            className={`px-8 py-3 font-display text-2xl uppercase tracking-widest transition-all ${
              activeView === 'art' 
                ? 'bg-p5-white text-p5-black shadow-[4px_4px_0_0_#0F0F0F]' 
                : 'text-p5-white hover:bg-p5-black/20'
            }`}
          >
            <span className="inline-block skew-x-[6deg]">Digital Art</span>
          </button>
        </div>
      </div>

      {/* Projects Grid List */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500`}>
        {currentProjects.map((proj, idx) => (
          <ProjectCard
            key={proj.title}
            title={proj.title}
            description={proj.description}
            tags={proj.tags}
            imageText={proj.title}
            variant={idx % 2 === 0 ? 'red' : 'white'}
            primaryButton={proj.primaryButton}
            secondaryButton={proj.secondaryButton}
            className={activeView === 'art' ? 'theme-red-context' : ''}
          />
        ))}
      </div>

    </div>
  );
};
