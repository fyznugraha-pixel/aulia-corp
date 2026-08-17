'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function About({ 
  aboutImage,
  aboutHeadline,
  aboutDescription
}: { 
  aboutImage?: string | null;
  aboutHeadline?: string;
  aboutDescription?: string;
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } }
  };
  return (
    <section className="w-full bg-tertiary text-on-tertiary py-section-gap" id="about">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <motion.div 
          className="flex flex-col md:flex-row gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="w-full md:w-[60%] flex flex-col gap-8">
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <div className="flex flex-col justify-center items-start">
                <h2 className="font-display-lg text-headline-lg font-black tracking-tighter uppercase mb-6 text-on-background">
                  {aboutHeadline || "AULIACORP MEMBERIKAN PELAYANAN TERBAIK DENGAN MENGEDEPANKAN INOVASI DAN KREATIVITAS"}
                </h2>
                <div className="w-12 h-1 bg-tertiary mb-8"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 whitespace-pre-wrap">
                  {aboutDescription || "Kami tidak pernah berhenti melahirkan gagasan-gagasan hebat, agar selalu relevan terhadap dinamika industri dan kebutuhan pasar masa kini.\n\nMemiliki tim muda dan berpengalaman sejak 2003, ide kreatif kami telah banyak melahirkan karya terbaik bagi setiap partner & klien."}
                </p>
              </div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="w-full md:w-[40%]">
            <div className="relative aspect-[3/4] overflow-hidden rounded shadow-2xl shadow-black/20">
              {aboutImage ? (
                <Image src={aboutImage} alt="Tentang Auliacorp" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-on-tertiary/10 border border-on-tertiary/20 flex items-center justify-center">
                  <span className="opacity-40 font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
