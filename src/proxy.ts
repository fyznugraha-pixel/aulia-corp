import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;

  const isLoginRoute = req.nextUrl.pathname === '/admin/login';

  if (!token && !isLoginRoute) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  if (token) {
    try {
      await verifyAuth(token);
      // If token is valid and user is on login page, redirect to admin
      if (isLoginRoute) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    } catch (err) {
      // Invalid token
      if (!isLoginRoute) {
        // Clear invalid token
        const response = NextResponse.redirect(new URL('/admin/login', req.url));
        response.cookies.delete('admin_token');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
