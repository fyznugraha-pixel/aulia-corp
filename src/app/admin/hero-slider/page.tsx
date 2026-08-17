import { getHeroSlides } from '@/lib/services/hero.service';
import { HeroSliderManager } from './HeroSliderManager';

export const dynamic = 'force-dynamic';

export default async function HeroSliderPage() {
  const slides = await getHeroSlides();

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hero Slider</h1>
        <p className="text-slate-500">Kelola gambar latar belakang (*background carousel*) untuk halaman utama.</p>
      </div>

      <HeroSliderManager initialSlides={slides} />
    </div>
  );
}
