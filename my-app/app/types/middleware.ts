import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware executed for:', request.nextUrl.pathname);
  const authToken = request.cookies.get('auth_token');
  const userData = request.cookies.get('user_data');
  const tokenExpiration = request.cookies.get('token_expiration');

  if (tokenExpiration) {
    const expirationDate = new Date(tokenExpiration.value);
    if (new Date() > expirationDate) {
      console.log('Token expired, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      console.log('Token is still valid');
    }
  }

  if (request.nextUrl.pathname.startsWith('/mypage')) {
    if (!authToken || !userData) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (request.nextUrl.pathname === '/login' && authToken && userData) {
    return NextResponse.redirect(new URL('/mypage', request.url));
  }

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