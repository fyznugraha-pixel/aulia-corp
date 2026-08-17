'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HeroSlider } from '@prisma/client';
import Image from 'next/image';

export function Hero({
  headline,
  subheadline,
  ctaText,
  slides
}: {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  slides?: HeroSlider[];
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };
  // Parse headline to find text wrapped in *asterisks* for gradient
  const rawHeadline = headline || "Memberikan pelayanan terbaik bagi semua klien dengan mengedepankan *inovasi dan kreativitas*";
  
  const parts = rawHeadline.split('*');
  
  const wordVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
    visible: { 
      filter: 'blur(0px)', 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" as any } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };

  return (
    <section className="relative w-full min-h-[100svh] flex items-center md:items-end pt-24 md:pt-28 pb-16 md:pb-section-gap overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-surface-container-lowest overflow-hidden">
        <AnimatePresence mode="popLayout">
          {slides && slides.length > 0 ? (
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src={slides[currentSlideIndex].imageUrl} 
                alt="Hero Background" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          ) : (
            <div className="w-full h-full bg-surface-container-lowest flex items-center justify-center relative overflow-hidden">
              {/* Blue Glow Effects */}
              <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-tertiary/20 rounded-full blur-[120px] mix-blend-screen"></div>
              <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-tertiary/30 rounded-full blur-[100px] mix-blend-screen"></div>
              <span className="text-on-surface-variant opacity-20 font-label-md tracking-widest uppercase relative z-10">Placeholder</span>
            </div>
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <motion.div 
        className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="font-display-xl text-headline-lg md:text-display-xl font-black tracking-tighter uppercase max-w-5xl leading-[0.95] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 md:gap-y-2">
          {parts.map((part, index) => {
            const isGradient = index % 2 === 1; // odd index means it was inside asterisks
            const words = part.trim().split(' ').filter(w => w.length > 0);
            
            return words.map((word, wordIndex) => (
              <motion.span 
                key={`${index}-${wordIndex}`} 
                variants={wordVariants} 
                className={isGradient ? "bg-gradient-to-r from-tertiary via-blue-400 to-tertiary bg-clip-text text-transparent" : "text-on-background"}
              >
                {word}
              </motion.span>
            ));
          })}
        </div>
        <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mt-4">
          {subheadline || "A corporate creative team for MICE, gathering, company branding, and creative film & documentation."}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-8">
          <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 bg-tertiary text-on-tertiary font-label-md text-label-md font-bold rounded shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:bg-tertiary-fixed transition-all duration-300">
            {ctaText || "Hubungi Kami"}
          </a>
          <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 bg-tertiary/10 border border-tertiary/30 text-tertiary hover:bg-tertiary/20 font-label-md text-label-md rounded transition-colors duration-300">
            Lihat Portfolio
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
