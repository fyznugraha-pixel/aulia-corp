'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ProjectGallery({ images, title }: { images: string[], title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [images]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth + 40 : clientWidth - 40;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full">
      {/* Scroll Area */}
      <div 
        ref={containerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 hide-scrollbar pb-8 pt-4 w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((imgUrl, i) => (
          <div 
            key={i} 
            className="w-[90%] md:w-[75%] lg:w-[60%] shrink-0 snap-center md:snap-start aspect-video relative rounded-xl overflow-hidden bg-surface-container border border-outline-variant/20 shadow-lg"
          >
            <Image 
              src={imgUrl} 
              alt={`${title} Gallery ${i + 1}`} 
              fill 
              className="object-cover" 
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons (Desktop mostly) */}
      {canScrollLeft && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white backdrop-blur flex items-center justify-center rounded-full transition-all border border-white/10 z-10 hidden md:flex"
          aria-label="Previous image"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}
      
      {canScrollRight && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/80 text-white backdrop-blur flex items-center justify-center rounded-full transition-all border border-white/10 z-10 hidden md:flex"
          aria-label="Next image"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}

      {/* Helper text for mobile */}
      <div className="md:hidden absolute bottom-0 left-0 w-full flex justify-center pb-2 pointer-events-none">
        <span className="text-xs text-on-surface-variant bg-background/80 px-3 py-1 rounded-full backdrop-blur-sm border border-outline-variant/20">
          Geser untuk melihat foto lain →
        </span>
      </div>
    </div>
  );
}
