import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createAuthResponse } from '@/lib/auth';

// Simple in-memory rate limiting (in production, use Redis or similar)
const rateLimit = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = rateLimit.get(ip) || [];
  
  // Remove old attempts outside the window
  const recentAttempts = attempts.filter((time: number) => now - time < WINDOW_MS);
  
  if (recentAttempts.length >= MAX_ATTEMPTS) {
    return false; // Rate limited
  }
  
  // Add current attempt
  recentAttempts.push(now);
  rateLimit.set(ip, recentAttempts);
  
  return true; // Not rate limited
}

export async function POST(request: NextRequest) {
  try {
    // Debug logging
    console.log('Login attempt - ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);
    console.log('Login attempt - ADMIN_PASSWORD length:', process.env.ADMIN_PASSWORD?.length || 0);
    
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.log('Rate limited for IP:', ip);
      return NextResponse.json({ 
        error: 'Too many login attempts. Please try again in 15 minutes.' 
      }, { status: 429 });
    }
    
    const { password } = await request.json();
    console.log('Login attempt - password received:', !!password);
    console.log('Login attempt - password length:', password?.length || 0);
    console.log('Login attempt - password value:', JSON.stringify(password));
    console.log('Login attempt - ADMIN_PASSWORD value:', JSON.stringify(process.env.ADMIN_PASSWORD));
    console.log('Login attempt - passwords match exactly:', password === process.env.ADMIN_PASSWORD);
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = verifyPassword(password);
    console.log('Login attempt - password valid:', isValid);
    
    if (isValid) {
      // Clear rate limit on successful login
      rateLimit.delete(ip);
      console.log('Login successful for IP:', ip);
      
      // Set the auth cookie and return success
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    } else {
      console.log('Login failed - invalid password for IP:', ip);
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
