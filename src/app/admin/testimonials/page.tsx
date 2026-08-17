import { getTestimonials } from '@/lib/services/testimonials.service';

import { TestimonialManager } from './TestimonialManager';

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <header className="sticky top-0 right-0 w-full h-16 bg-background border-b border-outline-variant flex justify-between items-center px-container-padding z-10">
        <h1 className="font-display-lg text-title-lg font-bold text-on-background tracking-tight">Testimonials</h1>
        <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline flex items-center justify-center">
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">person</span>
        </div>
      </header>
      <div className="p-8 w-full">
        <div className="mb-8">
          <TestimonialManager initialTestimonials={testimonials} />
        </div>
      </div>
    </>
  );
}
