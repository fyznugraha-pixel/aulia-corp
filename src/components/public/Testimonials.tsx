'use client';
import type { Testimonial } from '@prisma/client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full bg-surface-container py-section-gap border-t border-on-surface/5" id="testimonials">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-px bg-tertiary"></div>
            <h2 className="font-display-xl text-display-xl text-on-background font-black tracking-tighter uppercase">
              Client Feedback
            </h2>
          </div>
          <motion.div 
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-8 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id} 
                className="min-w-[85vw] snap-center shrink-0 md:min-w-0 bg-surface-container-low p-8 rounded border border-surface-container-lowest/10 flex flex-col gap-6"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
              >
                <p className="font-body-md text-headline-sm text-on-surface-variant font-medium leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex gap-4 items-center mt-auto">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high overflow-hidden shrink-0 relative">
                    {(testimonial as any).photo ? (
                      <Image src={(testimonial as any).photo} alt={testimonial.name} fill className="object-cover" />
                    ) : (
                      <Image src="/logo/logo-black.png" alt={testimonial.name} width={48} height={48} className="object-cover opacity-50" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-background font-bold uppercase tracking-widest">{testimonial.name}</h4>
                    <span className="font-body-md text-label-sm text-on-surface-variant">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
