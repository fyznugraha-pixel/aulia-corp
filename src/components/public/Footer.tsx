import Link from 'next/link';
import Image from 'next/image';

import { SiteSettings } from '@prisma/client';

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full bg-surface-container-lowest py-section-gap border-t border-on-surface/5">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 md:mb-6 block hover:opacity-80 transition-opacity w-fit">
              <Image src="/logo/logo-white.png" alt="Auliacorp" width={160} height={40} className="object-contain h-8 md:h-10 w-auto" />
            </Link>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Plan. Do. Play.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-3 lg:grid-cols-3">
            <div className="col-span-1">
              <h4 className="font-label-md text-on-background font-bold mb-4 md:mb-6 tracking-widest uppercase text-xs md:text-sm">Quick Links</h4>
              <ul className="space-y-3 font-body-md text-sm md:text-base text-on-surface-variant">
                <li><Link href="/" className="hover:text-tertiary transition-colors">Home</Link></li>
                <li><Link href="#services" className="hover:text-tertiary transition-colors">Services</Link></li>
                <li><Link href="#portfolio" className="hover:text-tertiary transition-colors">Portfolio</Link></li>
                <li><Link href="#about" className="hover:text-tertiary transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="font-label-md text-on-background font-bold mb-4 md:mb-6 tracking-widest uppercase text-xs md:text-sm">Sosial Media</h4>
              <ul className="space-y-3 font-body-md text-sm md:text-base text-on-surface-variant">
                <li><a href={settings?.socialInstagram || "#"} className="hover:text-tertiary transition-colors">Instagram</a></li>
                <li><a href={settings?.socialFacebook || "#"} className="hover:text-tertiary transition-colors">Facebook</a></li>
                <li><a href={settings?.socialTiktok || "#"} className="hover:text-tertiary transition-colors">TikTok</a></li>
                <li><a href={settings?.socialYoutube || "#"} className="hover:text-tertiary transition-colors">YouTube</a></li>
              </ul>
            </div>

            <div className="col-span-2 lg:col-span-1 mt-2 lg:mt-0">
              <h4 className="font-label-md text-on-background font-bold mb-4 md:mb-6 tracking-widest uppercase text-xs md:text-sm">Hubungi Kami</h4>
              <address className="not-italic text-sm text-slate-400 leading-relaxed mb-6 whitespace-pre-wrap">
                {settings?.contactAddress || "PT. Aulia Kreasindo Utama\nJl. Karawitan No. 56\nBandung, Jawa Barat 40264"}
              </address>
              <div className="space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">mail</span>
                  <a href={`mailto:${settings?.contactEmail || "hello@auliacorp.id"}`} className="break-all">{settings?.contactEmail || "hello@auliacorp.id"}</a>
                </p>
                <p className="flex items-center gap-2 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">call</span>
                  <a href={`tel:${settings?.contactPhone || "022-7301019"}`}>{settings?.contactPhone || "022-7301019"}</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-on-surface/10 font-body-md text-on-surface-variant flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {currentYear} Auliacorp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
