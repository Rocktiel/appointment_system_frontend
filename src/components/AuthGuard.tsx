"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux hook'ları
import type { RootState, AppDispatch } from "@/lib/store"; // Tip tanımı
import { checkAuth } from "@/lib/auth"; // Auth kontrol fonksiyonunuz (Redux'u güncelleyen)

export default function AuthGuard({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "BUSINESS";
}) {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const userRole = useSelector((state: RootState) => state.auth.user?.role); // `user` objesi null olabilir

  const [isLoading, setIsLoading] = useState(true);

  // Bu useEffect sadece ilk yüklemede ve Redux state'i boşken çalışmalı
  useEffect(() => {
    const verifyInitialAuth = async () => {
      // Sadece `auth.isAuthenticated` false ise ve `auth.user` null ise doğrulama yap
      // Bu, login sonrası zaten set edilmişse tekrar API çağrısı yapmasını engeller
      if (!isAuthenticated && !userRole) {
        await checkAuth(); // Bu çağrı Redux state'ini günceller
      }
      setIsLoading(false);
    };

    if (isLoading) {
      // Sadece bir kere ilk yüklemede çalıştır
      verifyInitialAuth();
    }
  }, [dispatch, isLoading, isAuthenticated, userRole]); // Bağımlılıkları kontrol edin

  useEffect(() => {
    if (isLoading) return; // İlk doğrulama bitene kadar işlem yapma

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to /login");
      router.replace(
        "/login?redirect=" + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    // Role kontrolü sadece requiredRole belirtilmişse ve userRole varsa yapılır
    if (requiredRole && userRole && userRole !== requiredRole.toUpperCase()) {
      // Rolleri büyük harfe çevirin veya backend ile eşleştirin
      console.log(
        `Role mismatch: User role is ${userRole}, but required is ${requiredRole}. Redirecting.`
      );
      router.replace(`/dashboard/${userRole.toLowerCase()}`); // Kendi dashboard'una yönlendir
      return;
    }

    console.log("AuthGuard passed. Rendering children.");
  }, [isAuthenticated, userRole, requiredRole, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-500">
        Yükleniyor...
      </div>
    );
  }

  // Eğer bu noktaya gelindiyse, kimlik doğrulanmış ve yetkilendirme başarılı demektir.
  return <>{children}</>;
}
