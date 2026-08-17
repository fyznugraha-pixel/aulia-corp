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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filterCategories = ['All', ...categories];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (cat: string) => {
    setFilter(cat);
    setCurrentPage(1);
  };

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
                onClick={() => handleFilterChange(cat)}
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
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-gutter gap-y-10 md:gap-y-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {currentProjects.map(project => (
            <Link href={`/projects/${project.id}`} passHref key={project.id}>
              <motion.div 
                className="flex flex-col gap-4 md:gap-6 group cursor-pointer"
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
                      <span className="text-on-surface-variant opacity-30 text-[10px] md:font-label-md tracking-widest uppercase">Placeholder</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <span className="text-[10px] md:text-label-md text-on-background/70 font-semibold tracking-wider uppercase">{project.year} • {project.city}</span>
                  <h3 className="font-display-lg text-sm md:text-headline-sm font-black tracking-tighter text-on-background uppercase line-clamp-2 leading-tight md:leading-tight">{project.title}</h3>
                  {project.shortDesc && project.shortDesc !== '[PLACEHOLDER]' && (
                    <p className="font-body-md text-xs md:text-body-md text-on-surface-variant line-clamp-2 md:line-clamp-3">{project.shortDesc}</p>
                  )}
                  <div className="flex items-center gap-1 md:gap-2 mt-1 md:mt-2 text-tertiary text-xs md:text-label-md font-bold group-hover:gap-2 md:group-hover:gap-4 transition-all duration-300">
                    <span>Lihat Detail</span>
                    <span className="material-symbols-outlined text-[14px] md:text-[18px]">arrow_outward</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:border-tertiary hover:text-tertiary disabled:opacity-30 disabled:hover:border-outline-variant/30 disabled:hover:text-current transition-colors bg-surface-container"
              aria-label="Previous page"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <span className="font-label-md text-on-surface-variant w-24 text-center">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant/30 hover:border-tertiary hover:text-tertiary disabled:opacity-30 disabled:hover:border-outline-variant/30 disabled:hover:text-current transition-colors bg-surface-container"
              aria-label="Next page"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
