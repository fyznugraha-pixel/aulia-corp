'use client';
import Image from 'next/image';
import type { ClientLogo } from '@prisma/client';
import { motion, Variants } from 'framer-motion';

export function ClientTrust({ clients }: { clients: ClientLogo[] }) {
  if (!clients || clients.length === 0) return null;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Group clients by category (optional, but good for structure)
  const govClients = clients.filter(c => c.category === 'GOVERNMENT_BUMN');
  const corpClients = clients.filter(c => c.category === 'CORPORATE');
  const otherClients = clients.filter(c => c.category === 'OTHERS');
  
  const renderClientGroup = (title: string, group: ClientLogo[], reverse: boolean = false) => {
    if (group.length === 0) return null;
    
    // Duplicate the group to create an infinite loop effect, ensure at least 12 items for wide screens
    let duplicatedGroup = [...group];
    while (duplicatedGroup.length < 12) {
      duplicatedGroup = [...duplicatedGroup, ...group];
    }

    return (
      <div className="flex flex-col gap-8 overflow-hidden w-full relative">
        <span className="text-label-sm text-tertiary uppercase tracking-widest font-bold px-margin-mobile md:px-margin-desktop">{title}</span>
        
        {/* Fading edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none mt-12"></div>
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none mt-12"></div>

        <div className="flex w-full overflow-hidden pause-on-hover">
          <div className={`flex w-max min-w-full shrink-0 gap-8 md:gap-16 items-center px-4 md:px-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
            {duplicatedGroup.map((client, i) => (
              <div key={`${client.id}-${i}`} className="w-28 md:w-36 h-12 md:h-16 relative rounded-sm flex items-center justify-center overflow-hidden shrink-0 group">
                {client.logoUrl && client.logoUrl !== '[PLACEHOLDER]' ? (
                  <Image 
                    src={client.logoUrl} 
                    alt={client.name} 
                    fill 
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center rounded">
                     <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">{client.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Second duplicate for seamless looping */}
          <div className={`flex w-max min-w-full shrink-0 gap-8 md:gap-16 items-center px-4 md:px-8 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} aria-hidden="true">
            {duplicatedGroup.map((client, i) => (
              <div key={`dup-${client.id}-${i}`} className="w-28 md:w-36 h-12 md:h-16 relative rounded-sm flex items-center justify-center overflow-hidden shrink-0 group">
                {client.logoUrl && client.logoUrl !== '[PLACEHOLDER]' ? (
                  <Image 
                    src={client.logoUrl} 
                    alt={client.name} 
                    fill 
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center rounded">
                     <span className="text-on-surface-variant text-[10px] uppercase font-bold tracking-wider">{client.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="w-full bg-background py-section-gap border-t border-outline-variant/30" id="clients">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-12">
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-px bg-tertiary"></div>
            <h2 className="font-display-xl text-headline-lg text-on-background font-black tracking-tighter uppercase">
              Klien & Mitra
            </h2>
          </motion.div>

          <div className="flex flex-col gap-16 mt-8">
            {renderClientGroup('Government & BUMN', govClients, false)}
            {renderClientGroup('Corporate', corpClients, true)}
            {renderClientGroup('Others', otherClients, false)}
          </div>
        </div>
      </div>
    </section>
  );
}
