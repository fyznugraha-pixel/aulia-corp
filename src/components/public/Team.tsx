'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TeamMember } from '@prisma/client';

export function Team({ members }: { members: TeamMember[] }) {
  if (!members || members.length === 0) return null;

  const founder = members.find(m => m.role.toLowerCase().includes('founder') || m.role.toLowerCase().includes('ceo'));
  const otherMembers = members.filter(m => m.id !== founder?.id);

  return (
    <section className="w-full bg-background py-section-gap">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="flex flex-col gap-4 mb-16 md:mb-24">
          <div className="w-12 h-px bg-tertiary"></div>
          <h2 className="font-display-xl text-display-xl text-on-background font-black tracking-tighter uppercase">
            Meet the Team
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            The creative minds and strategic thinkers driving Auliacorp forward. A collective of editorial excellence and unwavering dedication.
          </p>
        </div>

        {founder && (
          <motion.div 
            className="mb-24 md:mb-32 grid grid-cols-1 md:grid-cols-12 gap-gutter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="md:col-span-8">
              <div className="aspect-[16/9] md:aspect-[3/2] w-full bg-surface-container-lowest/10 rounded-sm mb-6 flex items-center justify-center relative overflow-hidden">
                {founder.photo && founder.photo !== '[PLACEHOLDER]' ? (
                   <Image src={founder.photo} alt={founder.name} fill className="object-cover" />
                ) : (
                   <span className="text-on-surface-variant opacity-30 font-label-md tracking-widest uppercase">Placeholder</span>
                )}
              </div>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end pb-8">
              <h3 className="font-headline-xl text-headline-xl text-on-background mb-2 font-bold tracking-tight">{founder.name}</h3>
              <p className="font-body-lg text-tertiary uppercase tracking-widest">{founder.role}</p>
            </div>
          </motion.div>
        )}

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-gutter gap-y-12 md:gap-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {otherMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className="group"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
            >
              <div className="aspect-[3/4] w-full relative overflow-hidden bg-surface-container-lowest/10 border border-surface-container-lowest/40 mb-4">
                {member.photo && member.photo !== '[PLACEHOLDER]' ? (
                   <Image src={member.photo} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                   <span className="text-on-surface-variant opacity-30 font-label-md tracking-widest uppercase text-xs md:text-sm">Placeholder</span>
                )}
              </div>
              <h4 className="font-label-md text-body-md md:text-body-lg text-on-background font-bold mb-1">{member.name}</h4>
              <p className="font-label-sm text-[10px] md:text-xs text-tertiary uppercase tracking-wider">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
