import { getTestimonials } from '@/lib/services/testimonials.service';
import { TestimonialManager } from './TestimonialManager';

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <TestimonialManager initialTestimonials={testimonials} />
    </div>
  );
}
