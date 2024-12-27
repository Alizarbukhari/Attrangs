import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Cookies check karein
  const authToken = request.cookies.get('auth_token');
  const userData = request.cookies.get('user_data');

  // 1. Protected Routes Check
  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (!authToken || !userData) {
      // Agar user logged in nahi hai to login page par redirect
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 2. Already Logged In Users Check
  if (request.nextUrl.pathname === '/login' && authToken && userData) {
    // Agar user already logged in hai to mypage par redirect
    return NextResponse.redirect(new URL('/mypage', request.url));
  }

  // 3. Allow the request to continue
  return NextResponse.next();
}

// Specify which routes should be handled by middleware
export const config = {
  matcher: [
    '/mypage/:path*',  // MyPage aur uske sub-routes
    '/login',          // Login page
    // Add more protected routes here
    '/dashboard/:path*',
    '/profile/:path*'
  ]
}; 