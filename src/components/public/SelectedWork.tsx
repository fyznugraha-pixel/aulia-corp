'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
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
        <h2 className="font-display-xl text-headline-lg md:text-display-xl text-on-background font-black tracking-tighter uppercase">
          Selected Work
        </h2>
      </div>

      <div className="relative">
        <motion.div 
          className="flex md:grid overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter pb-6 md:pb-0 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 mb-8 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {bentoProjects.map((project, index) => {
            // Define classes based on index for the bento grid layout
            let gridClasses = "min-w-[85vw] snap-center shrink-0 md:min-w-0 md:shrink h-[450px] ";
            if (index === 0) {
              gridClasses += "md:col-span-2 lg:col-span-2 md:row-span-2 md:h-[600px] lg:h-[800px]"; // Large Featured
            } else if (index === 1 || index === 2) {
              gridClasses += "md:h-[288px] lg:h-[388px]"; // Side squares
            } else if (index === 3) {
              gridClasses += "md:col-span-2 lg:col-span-3 md:h-[400px]"; // Wide bottom
            }

            return (
              <Link href={`/projects/${project.id}`} key={project.id} className={`relative overflow-hidden group bg-surface-container-low cursor-pointer rounded block ${gridClasses}`}>
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
                
                {/* Mobile persistent gradient to ensure readability if we don't have hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-100 md:opacity-0 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 md:bg-surface/90 opacity-100 md:opacity-0 transition-opacity duration-500 ease-out flex flex-col justify-end md:justify-center p-6 md:p-8 group-hover:opacity-100 text-left md:text-center">
                  <h3 className={`${index === 0 || index === 3 ? 'font-display-lg text-display-sm md:text-display-lg' : 'font-headline-xl text-headline-sm md:text-headline-xl'} font-black tracking-tighter text-on-background uppercase leading-tight mb-2 md:mb-0`}>
                    {project.title.split(' ').map((word, i) => (
                      <span key={i}>
                        {word}
                        <br className="hidden md:block" />
                        <span className="md:hidden"> </span>
                      </span>
                    ))}
                  </h3>
                  <span className="mt-2 md:mt-8 inline-flex items-center gap-2 md:px-6 md:py-3 md:bg-tertiary text-tertiary md:text-on-tertiary font-label-md font-bold rounded md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 w-fit">
                    Lihat Detail <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Helper text for mobile */}
        {bentoProjects.length > 1 && (
          <div className="md:hidden flex justify-center -mt-2 mb-24 pointer-events-none">
            <span className="text-xs text-on-surface-variant bg-surface-container-high/50 px-4 py-1.5 rounded-full border border-outline-variant/20 shadow-sm flex items-center gap-1 font-medium">
              Geser untuk proyek lainnya <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
            </span>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
