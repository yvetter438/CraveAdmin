import { NextRequest, NextResponse } from 'next/server';
import { checkAuth } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host');
  
  // Force redirect to custom domain if accessing via Vercel default domain
  if (host && host.includes('vercel.app') && !host.includes('admin.cravesocial.app')) {
    return NextResponse.redirect(new URL(`https://admin.cravesocial.app${pathname}`, request.url));
  }
  
  // Allow access to login page and API routes
  if (pathname === '/login' || pathname.startsWith('/api/auth/login')) {
    const response = NextResponse.next();
    addSecurityHeaders(response);
    return response;
  }
  
  // Check authentication for all other routes
  if (!checkAuth(request)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  const response = NextResponse.next();
  addSecurityHeaders(response);
  return response;
}

function addSecurityHeaders(response: NextResponse) {
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https://*.supabase.co https://*.posthog.com https://*.sentry.io;"
  );
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
