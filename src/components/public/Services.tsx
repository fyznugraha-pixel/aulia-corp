'use client';
import { Megaphone, Clapperboard, Sparkles, Paintbrush } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-surface py-section-gap" id="services">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-12">
          
          <div className="flex flex-col gap-4">
            <div className="w-12 h-px bg-tertiary"></div>
            <h2 className="font-display-xl text-headline-lg md:text-display-xl text-on-background font-black tracking-tighter uppercase">
              Layanan Kami
            </h2>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="aspect-[3/4] overflow-hidden rounded">
                <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <span className="text-on-surface-variant opacity-30 text-[10px] md:font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-display-xl text-base md:text-headline-lg text-on-background font-black tracking-tighter uppercase leading-tight md:leading-normal">MICE</h3>
                <p className="font-body-md text-xs md:text-body-md text-on-surface-variant text-balance">Mewujudkan segala impian event MICE yang fresh, kreatif, inovatif, and out of the box: mengubah imajinasi ide event kalian menjadi realita.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="aspect-[3/4] overflow-hidden rounded">
                <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <span className="text-on-surface-variant opacity-30 text-[10px] md:font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-display-xl text-base md:text-headline-lg text-on-background font-black tracking-tighter uppercase leading-tight md:leading-normal">Film & Visual Branding</h3>
                <p className="font-body-md text-xs md:text-body-md text-on-surface-variant text-balance">Melakukan promosi perusahaan lewat Web-Series, Music Video, dan Film Dokumenter, mewujudkan promosi perusahaan dalam bentuk audio-visual.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="aspect-[3/4] overflow-hidden rounded">
                <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <span className="text-on-surface-variant opacity-30 text-[10px] md:font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-display-xl text-base md:text-headline-lg text-on-background font-black tracking-tighter uppercase leading-tight md:leading-normal">Thematic Decoration</h3>
                <p className="font-body-md text-xs md:text-body-md text-on-surface-variant text-balance">Membuat booth event paling banyak dikunjungi lewat desain yang kreatif, unik, dan menarik tanpa mengesampingkan fungsi. Booth paling keren dan jadi pusat perhatian di pameran.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 md:gap-6">
              <div className="aspect-[3/4] overflow-hidden rounded">
                <div className="w-full h-full bg-surface-container-lowest/10 border border-surface-container-lowest/40 transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                  <span className="text-on-surface-variant opacity-30 text-[10px] md:font-label-md tracking-widest uppercase">Placeholder</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h3 className="font-display-xl text-base md:text-headline-lg text-on-background font-black tracking-tighter uppercase leading-tight md:leading-normal">Corporate & Event Branding</h3>
                <p className="font-body-md text-xs md:text-body-md text-on-surface-variant text-balance">Membuat logo perusahaan yang eye-catching dan berkesan, merepresentasikan karakter perusahaan menjadi logo dan branding yang sesuai.</p>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
