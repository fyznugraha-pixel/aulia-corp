'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/admin/actions';

const NAV_ITEMS = [
  { label: 'Hero Slider', href: '/admin/hero-slider', icon: 'imagesmode' },
  { label: 'Projects', href: '/admin/projects', icon: 'movie' },
  { label: 'Event Videos', href: '/admin/videos', icon: 'play_circle' },
  { label: 'Team', href: '/admin/team', icon: 'group' },
  { label: 'Testimonials', href: '/admin/testimonials', icon: 'reviews' },
  { label: 'Client Logos', href: '/admin/clients', icon: 'handshake' },
  { label: 'Settings', href: '/admin/settings', icon: 'settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  
  if (pathname === '/admin/login') return null;

  return (
    <nav className="w-[260px] h-screen bg-surface-container-low border-r border-outline-variant flex flex-col fixed left-0 top-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-outline-variant shrink-0">
        <span className="font-display-lg text-title-md font-bold text-on-surface tracking-tight">Auliacorp CMS</span>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-sm font-label-md text-label-md transition-colors group ${
                isActive 
                  ? 'bg-surface-container text-primary' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span 
                className="material-symbols-outlined text-[20px]" 
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-outline-variant">
        <button 
          onClick={() => logoutAction()}
          className="flex w-full items-center gap-3 px-3 py-2 rounded-sm font-label-md text-label-md text-error hover:bg-error-container/50 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
}
