'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Navbar({ ctaText = "Konsultasi Gratis" }: { ctaText?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we are already on the home page and clicking a hash link
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault();
      const hash = href.replace('/', '');
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-on-surface/10 transition-all duration-200">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 md:py-6 max-w-container-max mx-auto">
        <Link 
          href="/" 
          className="active:scale-95 transition-all duration-200"
          onClick={closeMenu}
        >
          <Image src="/logo/logo-white.png" alt="Auliacorp" width={240} height={60} className="object-contain h-10 md:h-14 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <Link href="/" className="font-label-md text-label-md text-tertiary border-b-2 border-tertiary font-bold hover:text-tertiary transition-colors duration-300 active:scale-95">Home</Link>
          <Link href="/#about" onClick={(e) => handleAnchorClick(e, '/#about')} className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">About</Link>
          <Link href="/#services" onClick={(e) => handleAnchorClick(e, '/#services')} className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Services</Link>
          <Link href="/#portfolio" onClick={(e) => handleAnchorClick(e, '/#portfolio')} className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Portfolio</Link>
          <Link href="/#team" onClick={(e) => handleAnchorClick(e, '/#team')} className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Team</Link>
          <Link href="/#clients" onClick={(e) => handleAnchorClick(e, '/#clients')} className="font-label-md text-label-md text-on-background/70 font-medium hover:text-tertiary transition-colors duration-300 active:scale-95">Clients</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e as any, '/#contact')}
            className="hidden lg:inline-flex items-center justify-center px-6 py-3 bg-tertiary text-on-tertiary font-label-md text-label-md font-bold rounded hover:opacity-90 transition-all duration-200 active:scale-95"
          >
            {ctaText}
          </a>
          {/* Hamburger Button */}
          <button 
            className="lg:hidden text-on-background p-2 active:scale-95 transition-transform"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-surface-container border-b border-outline-variant/20 shadow-xl flex flex-col py-4 px-6 gap-4">
          <Link href="/" onClick={closeMenu} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">Home</Link>
          <Link href="/#about" onClick={(e) => handleAnchorClick(e, '/#about')} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">About</Link>
          <Link href="/#services" onClick={(e) => handleAnchorClick(e, '/#services')} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">Services</Link>
          <Link href="/#portfolio" onClick={(e) => handleAnchorClick(e, '/#portfolio')} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">Portfolio</Link>
          <Link href="/#team" onClick={(e) => handleAnchorClick(e, '/#team')} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">Team</Link>
          <Link href="/#clients" onClick={(e) => handleAnchorClick(e, '/#clients')} className="font-label-lg text-on-background hover:text-tertiary py-2 border-b border-outline-variant/10">Clients</Link>
          <a 
            href="/#contact" 
            onClick={(e) => handleAnchorClick(e as any, '/#contact')}
            className="mt-4 flex items-center justify-center w-full py-4 bg-tertiary text-on-tertiary font-label-lg font-bold rounded hover:opacity-90 transition-all active:scale-95"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
