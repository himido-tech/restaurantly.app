import { NextResponse, } from 'next/server'
import type { NextRequest } from 'next/server'

export { default } from "next-auth/middleware"

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/logout')) {
        const response = NextResponse.redirect(new URL("/", request.url))
        response.cookies.set('session', '')
        return response
    }
}

export const config = { matcher: ["/dashboard"] }
