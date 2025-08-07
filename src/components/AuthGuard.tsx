// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { useSelector, useDispatch } from "react-redux"; // Redux hook'ları
// // import type { RootState, AppDispatch } from "@/lib/store"; // Tip tanımı
// // import { checkAuth } from "@/lib/auth"; // Auth kontrol fonksiyonunuz (Redux'u güncelleyen)

// // export default function AuthGuard({
// //   children,
// //   requiredRole,
// // }: {
// //   children: React.ReactNode;
// //   requiredRole?: "ADMIN" | "BUSINESS";
// // }) {
// //   const router = useRouter();
// //   const dispatch: AppDispatch = useDispatch();
// //   console.log("AuthGuard render edildi");
// //   const isAuthenticated = useSelector(
// //     (state: RootState) => state.auth.isAuthenticated
// //   );
// //   const userRole = useSelector((state: RootState) => state.auth.user?.role); // `user` objesi null olabilir

// //   const [isLoading, setIsLoading] = useState(true);

// //   // Bu useEffect sadece ilk yüklemede ve Redux state'i boşken çalışmalı
// //   useEffect(() => {
// //     const verifyInitialAuth = async () => {
// //       // Sadece `auth.isAuthenticated` false ise ve `auth.user` null ise doğrulama yap
// //       // Bu, login sonrası zaten set edilmişse tekrar API çağrısı yapmasını engeller
// //       if (!isAuthenticated && !userRole) {
// //         await checkAuth(); // Bu çağrı Redux state'ini günceller
// //       }
// //       setIsLoading(false);
// //     };

// //     if (isLoading) {
// //       // Sadece bir kere ilk yüklemede çalıştır
// //       verifyInitialAuth();
// //     }
// //   }, [dispatch, isLoading, isAuthenticated, userRole]); // Bağımlılıkları kontrol edin

// //   useEffect(() => {
// //     if (isLoading) return; // İlk doğrulama bitene kadar işlem yapma

// //     if (!isAuthenticated) {
// //       console.log("Not authenticated, redirecting to /login");
// //       router.replace(
// //         "/login?redirect=" + encodeURIComponent(window.location.pathname)
// //       );
// //       return;
// //     }

// //     // Role kontrolü sadece requiredRole belirtilmişse ve userRole varsa yapılır
// //     if (requiredRole && userRole && userRole !== requiredRole.toUpperCase()) {
// //       // Rolleri büyük harfe çevirin veya backend ile eşleştirin
// //       console.log(
// //         `Role mismatch: User role is ${userRole}, but required is ${requiredRole}. Redirecting.`
// //       );
// //       router.replace(`/dashboard/${userRole.toLowerCase()}`); // Kendi dashboard'una yönlendir
// //       return;
// //     }

// //     console.log("AuthGuard passed. Rendering children.");
// //   }, [isAuthenticated, userRole, requiredRole, router, isLoading]);

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
// //         Yükleniyor...
// //       </div>
// //     );
// //   }

// //   // Eğer bu noktaya gelindiyse, kimlik doğrulanmış ve yetkilendirme başarılı demektir.
// //   return <>{children}</>;
// // }
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { type RootState, type AppDispatch } from "@/lib/store";
// import { checkAuth } from "@/lib/auth";
// import {
//   selectCurrentUser,
//   selectIsAuthenticated,
// } from "@/lib/slices/authSlice";

// export default function AuthGuard({
//   children,
//   requiredRole,
// }: {
//   children: React.ReactNode;
//   requiredRole?: "ADMIN" | "BUSINESS";
// }) {
//   const router = useRouter();
//   const dispatch: AppDispatch = useDispatch();

//   const isAuthenticated = useSelector(selectIsAuthenticated); // useSelector ile güncel state'i al
//   const currentUser = useSelector(selectCurrentUser); // useSelector ile güncel state'i al

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const verifyAuthStatus = async () => {
//       console.log("AuthGuard: Initial auth check started.");
//       console.log("AuthGuard: isAuthenticated:", isAuthenticated);
//       console.log("AuthGuard: currentUser:", currentUser);

//       // Eğer kullanıcı Redux'ta authenticated değilse veya user bilgisi eksikse, doğrulama yap
//       // Bu kontrol, gereksiz API çağrılarını önler.
//       if (!isAuthenticated || !currentUser?.id) {
//         console.log("AuthGuard: Initial auth check needed.");
//         await checkAuth(); // Redux state'ini güncelleyen asenkron çağrı
//       }
//       setIsLoading(false);
//     };

//     verifyAuthStatus();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Sadece bileşen mount olduğunda bir kez çalıştır

//   useEffect(() => {
//     if (isLoading) return; // İlk doğrulama bitene kadar işlem yapma

//     if (!isAuthenticated) {
//       console.log("AuthGuard: Not authenticated, redirecting to /login");
//       router.replace(
//         `/login?redirect=${encodeURIComponent(window.location.pathname)}`
//       );
//       return;
//     }

//     // Role kontrolü sadece requiredRole belirtilmişse yapılır
//     if (requiredRole && currentUser?.role) {
//       // currentUser.role doğrudan kullanılabilir, çünkü user null değilse type'ı User olur.
//       if (currentUser.role !== requiredRole.toUpperCase()) {
//         console.log(
//           `AuthGuard: Role mismatch. User role is ${currentUser.role}, required is ${requiredRole}. Redirecting.`
//         );
//         router.replace(`/dashboard/${currentUser.role.toLowerCase()}`); // Kendi dashboard'una yönlendir
//         return;
//       }
//     }

//     console.log("AuthGuard: Passed. Rendering children.");
//   }, [isAuthenticated, currentUser, requiredRole, router, isLoading]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
//         Yükleniyor...
//       </div>
//     );
//   }

//   // Eğer bu noktaya gelindiyse, kimlik doğrulanmış ve yetkilendirme başarılı demektir.
//   return <>{children}</>;
// }
// src/components/AuthProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  useVerifyTokenQuery,
  useRefreshTokenMutation,
} from "@/services/authApi";
import { logout, setCredentials } from "@/lib/slices/authSlice";

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicPaths = ["/login", "/register", "/confirm-email", "/"];

export function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { accessToken } = useAppSelector((state) => state.auth);
  const [isSessionChecking, setIsSessionChecking] = useState(true);
  const [refreshTokenTrigger] = useRefreshTokenMutation();

  const {
    data: verifyData,
    isLoading: isVerifying,
    isError: isVerifyError,
  } = useVerifyTokenQuery(undefined, {
    skip: !accessToken || publicPaths.includes(pathname) || isSessionChecking,
    refetchOnMountOrArgChange: true,
  });

  // İlk yüklemede session restore etmeye çalış
  useEffect(() => {
    const restoreSession = async () => {
      if (publicPaths.includes(pathname)) {
        setIsSessionChecking(false);
        return;
      }

      if (accessToken) {
        setIsSessionChecking(false);
        return;
      }

      try {
        const result = await refreshTokenTrigger(undefined).unwrap();
        if (result?.data?.accessToken) {
          dispatch(
            setCredentials({
              accessToken: result.data.accessToken,
              refreshToken: null,
            })
          );
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setIsSessionChecking(false);
      }
    };

    restoreSession();
  }, [dispatch, accessToken, pathname, refreshTokenTrigger]);

  // Token geçerliliği kontrolü bittiğinde yönlendirme kararı
  useEffect(() => {
    if (isSessionChecking || isVerifying) return;
    console.log("Token verification completed", verifyData);
    const isTokenValid =
      accessToken && verifyData?.success && verifyData?.data?.isValid;

    console.log(">>> accessToken:", accessToken);
    console.log(">>> verifyData.success:", verifyData.success);
    console.log(">>> verifyData.data.isValid:", verifyData?.data?.isValid);
    console.log(">>> pathname:", pathname);
    console.log(">>> isTokenValid:", isTokenValid);
    console.log(">>> isPublic:", publicPaths.includes(pathname));

    if (!isTokenValid && !publicPaths.includes(pathname)) {
      console.log("Token geçersiz, /login sayfasına yönlendiriliyor");
      router.replace("/login");
      return;
    }

    if (isTokenValid && publicPaths.includes(pathname)) {
      console.log("Token geçerli ama public sayfadasın, yönlendiriliyor");
      router.replace("/dashboard/business");
    }
  }, [
    accessToken,
    isVerifying,
    isVerifyError,
    verifyData,
    router,
    pathname,
    isSessionChecking,
  ]);

  if (isSessionChecking || isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Oturum kontrol ediliyor...</p>
      </div>
    );
  }

  return <>{children}</>;
}
