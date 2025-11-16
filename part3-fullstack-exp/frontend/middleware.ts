import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Si tiene token y está intentando acceder a /login, redirigir a /casos
    if (token && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/casos', request.url));
    }

    // Si no hay token y está intentando acceder a /casos, redirigir a /login
    if (!token && request.nextUrl.pathname.startsWith('/casos')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/casos/:path*', '/login'],
};
