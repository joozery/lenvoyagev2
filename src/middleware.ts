import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that require authentication (all paths properly starting with /admin)
    const isProtectedPath = path.startsWith('/admin');

    // Define paths that are public (login page)
    const isPublicPath = path === '/admin/login';

    // Get the session cookie
    const adminSession = request.cookies.get('admin_session')?.value;

    // 1. If trying to access a protected path (like /admin/dashboard) and NOT logged in
    //    Redirect to login page
    if (isProtectedPath && !isPublicPath && !adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. If trying to access login page AND ALREADY logged in
    //    Redirect to admin dashboard
    if (isPublicPath && adminSession) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Continue to the requested page
    return NextResponse.next();
}

// Ensure middleware runs only on specific paths to avoid performance overhead
export const config = {
    matcher: [
        /*
         * Match all request paths starting with /admin
         */
        '/admin/:path*',
    ],
};
