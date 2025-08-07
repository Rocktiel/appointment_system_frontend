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
// const isAuthenticated = (request: NextRequest) => {
//   // Çerezlerden token kontrolü
//   const token = request.cookies.get("accessToken")?.value;

//   return !!token;
// };
const publicPaths = ["/login", "/register", "/confirm-email", "/"];
const isAuthenticatedInMiddleware = (request: NextRequest) => {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  // Middleware, token'ı sadece varlığını kontrol edebilir, geçerliliğini doğrulayamaz.
  // Geçerlilik kontrolü backend'de yapılmalıdır.
  return !!refreshToken;
};
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isUserAuthenticated = isAuthenticatedInMiddleware(request);
  if (path === "/login" && isUserAuthenticated) {
    // Not: Rol bazlı yönlendirme için backend'den rol bilgisini çerezde tutmak gerekebilir
    // veya basitçe varsayılan bir dashboard'a yönlendirebilirsiniz.
    return NextResponse.redirect(new URL("/dashboard/business", request.url));
  }
  // Giriş sayfası ve API rotalarını hariç tut
  if (path.startsWith("/api") || publicPaths.includes(path)) {
    // publicPaths'i middleware'de de kullanmak için import edebilirsin
    return NextResponse.next();
  }

  // Korunan rotayı kontrol et
  const isProtected = protectedRoutes.some(
    (route) => path.startsWith(route) || path === route
  );

  // Giriş yapılmamışsa login'e yönlendir
  if (isProtected && !isUserAuthenticated) {
    const redirectUrl = new URL("/login", request.url);
    // Orijinal rotayı query parametresi olarak ekle, böylece giriş sonrası geri yönlendirilebilir
    redirectUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Hangi rotalarda çalışacak?
export const config = {
  matcher: [
    "/dashboard/:path*", // /dashboard ve altındaki tüm yollar
    "/profile/:path*", // /profile ve altındaki tüm yollar
    "/login", // login sayfası için de middleware'i çalıştır
    "/register", // register sayfası için de middleware'i çalıştır
    "/confirm-email", // confirm-email sayfası için de middleware'i çalıştır
    // Diğer özel rotalar
  ],
};
