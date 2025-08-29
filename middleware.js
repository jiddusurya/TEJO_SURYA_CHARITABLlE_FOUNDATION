import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const sessionCookie = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;

  // If there's no session cookie and the user is trying to access a protected admin page
  if (!sessionCookie && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (sessionCookie) {
    try {
      // Verify the JWT
      await jwtVerify(sessionCookie.value, secret);
      
      // If the user is authenticated and tries to visit the login page, redirect them to the dashboard
      if (pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    } catch (err) {
      // If verification fails, the token is invalid. Redirect to login.
      if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        // Clear the invalid cookie
        response.cookies.set('admin_session', '', { maxAge: 0 });
        return response;
      }
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};
