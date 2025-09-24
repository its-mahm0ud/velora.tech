
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token")
    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    } else {
        if (request.nextUrl.pathname == "/auth/login" || request.nextUrl.pathname == "/auth/register") {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    return NextResponse.next();

}
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/allorders', '/brands', '/cart', '/categories', '/detailsForCheckOut', '/products','/products/:path*' ,'/wishlist', '/']
}