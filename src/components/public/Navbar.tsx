import Link from 'next/link';
import Image from 'next/image';

export function Navbar({ ctaText = "Konsultasi Gratis" }: { ctaText?: string }) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-on-surface/10 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
        <Link 
          href="/" 
          className="active:scale-95 transition-all duration-200"
        >
          <Image src="/logo/logo-white.png" alt="Auliacorp" width={160} height={40} className="object-contain h-10 w-auto" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-label-md text-label-md text-tertiary border-b-2 border-tertiary font-bold hover:text-tertiary transition-colors duration-300 active:scale-95">Home</Link>
          <Link href="#services" className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Services</Link>
          <Link href="#portfolio" className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Portfolio</Link>
          <Link href="#about" className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            className="hidden md:inline-flex items-center justify-center px-6 py-3 bg-tertiary text-on-tertiary font-label-md text-label-md font-bold rounded hover:opacity-90 transition-all duration-200 active:scale-95"
          >
            {ctaText}
          </a>
          <button className="md:hidden text-on-background p-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
