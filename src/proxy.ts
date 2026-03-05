import { NextResponse as res} from "next/server";
import { NextRequest } from "next/server";
import { getSession } from "./lib/auth";
import routeConfig from '@/config/routes.json';

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isProtectedRoute = routeConfig.protected.some(route => pathname.startsWith(route));

    const session = await getSession();
    if (!session) return null;
    const { role } = session;

    console.log(pathname)

    if (pathname.startsWith('/login') && session) {
        let target = '/dashboard';

         if (role == "ADMIN") target = '/dashboard/admin';
         else if (role == "USTADZ") target = '/dashboard/ustadz'
         
         if (pathname !== target) return res.redirect(new URL(target, request.url));
    }

    if (isProtectedRoute) {
            
            if(!session) return res.redirect(new URL('/login', request.url));

            const isAdminRoute = routeConfig.adminOnly.some(route => pathname.startsWith(route));

            if (isAdminRoute && role !== "ADMIN"){
                return res.redirect(new URL('/dashboard', request.url));
            }
            return res.next();
    }   
}

export const config = {
    matcher: ['/login', '/dashboard/:path']
}