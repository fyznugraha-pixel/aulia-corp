'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@prisma/client';

export function SelectedWork({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  // Take up to 4 projects for the bento grid
  const bentoProjects = projects.slice(0, 4);

  return (
    <section className="w-full bg-background py-section-gap" id="portfolio">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-4 mb-16 md:mb-24">
        <div className="w-12 h-px bg-tertiary"></div>
        <h2 className="font-display-xl text-display-xl text-on-background font-black tracking-tighter uppercase">
          Selected Work
        </h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-32"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {bentoProjects.map((project, index) => {
          // Define classes based on index for the bento grid layout
          let gridClasses = "";
          if (index === 0) {
            gridClasses = "md:col-span-2 lg:col-span-2 row-span-2 h-[600px] lg:h-[800px]"; // Large Featured
          } else if (index === 1 || index === 2) {
            gridClasses = "h-[300px] lg:h-[388px]"; // Side squares
          } else if (index === 3) {
            gridClasses = "md:col-span-2 lg:col-span-3 h-[400px]"; // Wide bottom
          }

          return (
            <div key={project.id} className={`relative overflow-hidden group bg-surface-container-low cursor-pointer rounded ${gridClasses}`}>
              {project.coverImage && project.coverImage !== '[PLACEHOLDER]' ? (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-700 ease-out group-hover:scale-105 flex items-center justify-center">
                  <span className="text-on-surface-variant opacity-30 font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              )}
              <div className="absolute inset-0 bg-surface/90 opacity-0 transition-opacity duration-500 ease-out flex items-center justify-center p-8 group-hover:opacity-100 text-center">
                <h3 className={`${index === 0 || index === 3 ? 'font-display-lg text-headline-xl md:text-display-lg' : 'font-headline-xl text-headline-lg-mobile md:text-headline-xl'} font-black tracking-tighter text-on-background uppercase leading-tight`}>
                  {project.title.split(' ').map((word, i) => (
                    <span key={i}>
                      {word}
                      <br />
                    </span>
                  ))}
                </h3>
              </div>
            </div>
          );
        })}
      </motion.div>
      </div>
    </section>
  );
}
