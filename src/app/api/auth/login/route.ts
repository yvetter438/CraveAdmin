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
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ 
        error: 'Too many login attempts. Please try again in 15 minutes.' 
      }, { status: 429 });
    }
    
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = verifyPassword(password);
    
    if (isValid) {
      // Clear rate limit on successful login
      rateLimit.delete(ip);
      return createAuthResponse(true);
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
