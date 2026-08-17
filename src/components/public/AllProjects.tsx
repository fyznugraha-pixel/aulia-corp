'use client';


import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@prisma/client';

export function AllProjects({ 
  projects,
  categories = ['MICE', 'EXHIBITION', 'BRANDING', 'FILM']
}: { 
  projects: Project[];
  categories?: string[];
}) {
  const [filter, setFilter] = useState('All');

  const filterCategories = ['All', ...categories];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full bg-background pb-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-12 pt-16 border-t border-on-surface/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <h2 className="font-display-xl text-headline-lg md:text-display-xl text-on-background font-black tracking-tighter uppercase">
            All Projects
          </h2>

          <div className="flex overflow-x-auto hide-scrollbar gap-6 border-b border-on-surface/10 w-full md:w-auto">
            {filterCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-label-md text-label-md whitespace-nowrap pb-4 relative transition-colors ${
                  filter === cat 
                    ? 'text-tertiary font-bold' 
                    : 'text-on-surface-variant hover:text-tertiary font-medium'
                }`}
              >
                {cat}
                {filter === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-tertiary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          key={filter}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {filteredProjects.map(project => (
            <Link href={`/projects/${project.id}`} passHref key={project.id}>
              <motion.div 
                className="flex flex-col gap-6 group cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <div className="aspect-[4/3] w-full rounded overflow-hidden relative bg-surface-container-low">
                  {project.coverImage && project.coverImage !== '[PLACEHOLDER]' ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-700 group-hover:scale-105 flex items-center justify-center">
                      <span className="text-on-surface-variant opacity-30 font-label-md tracking-widest uppercase">Placeholder</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-background/70">{project.year} • {project.city}</span>
                  <h3 className="font-display-lg text-headline-sm font-black tracking-tighter text-on-background uppercase">{project.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant line-clamp-3">{project.shortDesc}</p>
                  <div className="flex items-center gap-2 mt-2 text-tertiary font-label-md font-bold group-hover:gap-4 transition-all duration-300">
                    <span>Lihat Detail</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
