import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD environment variable is required');
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createAuthResponse(success: boolean, redirectTo: string = '/dashboard') {
  if (success) {
    const response = NextResponse.redirect(new URL(redirectTo, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
    response.cookies.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } else {
    return NextResponse.redirect(new URL('/login?error=invalid', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  }
}

export function checkAuth(request: NextRequest): boolean {
  return request.cookies.get('admin-auth')?.value === 'authenticated';
}

export function logout() {
  const response = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  response.cookies.delete('admin-auth');
  return response;
}
