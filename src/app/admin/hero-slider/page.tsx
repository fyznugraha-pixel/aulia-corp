import { getHeroSlides } from '@/lib/services/hero.service';
import { HeroSliderManager } from './HeroSliderManager';

export default async function HeroSliderPage() {
  const slides = await getHeroSlides();

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto">
      <HeroSliderManager initialSlides={slides} />
    </div>
  );
}
