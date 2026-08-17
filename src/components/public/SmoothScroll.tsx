'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Nonaktifkan smooth scroll di halaman admin agar tidak bentrok dengan modal/sidebar
  if (pathname?.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
