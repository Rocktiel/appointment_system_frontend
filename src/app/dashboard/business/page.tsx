"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/hooks";
import { useLogoutMutation } from "@/services/authApi";
import { logout } from "@/lib/slices/authSlice";
import {
  useGetUserPackageQuery,
  useGetPackagesQuery,
} from "@/services/businessApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CheckUserPackage from "@/components/dashboard/business/CheckUserPackage";

const BusinessDashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutBackend] = useLogoutMutation();

  const { data: userPackageData, isLoading: isUserPackageLoading } =
    useGetUserPackageQuery();
  const { isLoading: isPackagesLoading } = useGetPackagesQuery();
  const hasPackage = !!userPackageData?.data;

  if (isUserPackageLoading || isPackagesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Paket kontrol ediliyor...</p>
      </div>
    );
  }

  // Paket yoksa CheckUserPackage bileşenini göster
  if (!hasPackage) {
    return <CheckUserPackage />;
  }

  // Normal dashboard render
  const handleLogout = async () => {
    try {
      await logoutBackend(undefined).unwrap();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Çıkış yapılırken hata:", error);
      alert("Çıkış yapılırken bir hata oluştu.");
    }
  };

  return (
    <div className="flex w-full">
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          İşletme Kontrol Paneli
        </h1>
        <p className="text-lg text-gray-600">
          Hoş geldiniz! İşletmenizi buradan yönetebilirsiniz. 🎉
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Genel Bakış</CardTitle>
            <CardDescription>İşletmenizin güncel durumu.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Bugün için bekleyen randevular: 5</p>
            <p>Toplam aktif hizmetler: 12</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BusinessDashboard;
