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
  
  const renderClientGroup = (title: string, group: ClientLogo[]) => {
    if (group.length === 0) return null;
    return (
      <div className="flex flex-col gap-8">
        <span className="text-label-sm text-tertiary uppercase tracking-widest font-bold">{title}</span>
        <motion.div 
          className="flex flex-wrap items-center gap-x-12 gap-y-8 opacity-80 hover:opacity-100 transition-all"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {group.map((client) => (
            <motion.div key={client.id} variants={itemVariants} className="w-32 h-16 relative rounded-sm flex items-center justify-center overflow-hidden group">
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
            </motion.div>
          ))}
        </motion.div>
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
            {renderClientGroup('Government & BUMN', govClients)}
            {renderClientGroup('Corporate', corpClients)}
            {renderClientGroup('Others', otherClients)}
          </div>
        </div>
      </div>
    </section>
  );
}
