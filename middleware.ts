// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Korunacak rotaları tanımlayın
const protectedRoutes = [
  "/dashboard",
  "/dashboard/admin",
  "/dashboard/settings",
  "/dashboard/profile",
  "/dashboard/business", // ekledim çünkü business altında da route'lar var
];

// 2. Auth kontrol fonksiyonu
const isAuthenticated = (request: NextRequest) => {
  // Çerezlerden token kontrolü
  const token = request.cookies.get("accessToken")?.value;

  return !!token;
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Giriş sayfası ve API rotalarını hariç tut
  if (path.startsWith("/login") || path.startsWith("/api")) {
    return NextResponse.next();
  }

  // Korunan rotayı kontrol et
  const isProtected = protectedRoutes.some(
    (route) => path.startsWith(route) || path === route
  );

  // Giriş yapılmamışsa login'e yönlendir
  if (isProtected && !isAuthenticated(request)) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Hangi rotalarda çalışacak?
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
