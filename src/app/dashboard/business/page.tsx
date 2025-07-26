// import React from "react";

// const BusinessDashboard = () => {
//   return <div>BusinessDashboard</div>;
// };

// export default BusinessDashboard;
// src/app/dashboard/business/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { XCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PackageDialog from "@/components/dashboard/business/PackageDialog";

// Varsayımsal API istemcisi (öncekiyle aynı, baseURL eklenebilir)
// Backend adresiniz
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const api = {
  get: async (url: string, token?: string) => {
    // Token opsiyonel hale getirildi
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API isteği başarısız oldu.");
    }
    return response.json();
  },
  post: async (url: string, data: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API isteği başarısız oldu.");
    }
    return response.json();
  },
};

// API'den gelecek paket tipi (AdminController'dan gelen response'a göre ayarlandı)
interface Package {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  maxBusinesses: number;
  price: string; // API'den string olarak geliyor
  description: string;
  isActive: boolean;
}

const BusinessDashboard = () => {
  const router = useRouter();
  const [hasPackage, setHasPackage] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null
  );
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [availablePackages, setAvailablePackages] = useState<Package[]>([]); // Paketleri tutacak state

  useEffect(() => {
    const checkUserAndPackages = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // Token yoksa, kullanıcıyı giriş sayfasına yönlendir
        router.push("/login");
        return;
      }

      try {
        // 1. Kullanıcının aktif paketini kontrol et
        const userPackageResponse = await api.get(
          "/business/my-package",
          token
        );
        if (userPackageResponse.success && userPackageResponse.data) {
          setHasPackage(true);
        } else {
          setHasPackage(false);
          setShowPackageModal(true); // Paket yoksa modalı aç
        }

        // 2. Tüm mevcut paketleri çek (herkesin görebileceği endpoint'ten)
        const packagesResponse = await api.get("/business/packages"); // Token göndermiyoruz, çünkü herkese açık
        if (packagesResponse.success && Array.isArray(packagesResponse.data)) {
          setAvailablePackages(packagesResponse.data);
        } else {
          setError(
            packagesResponse.message ||
              "Mevcut paketler getirilirken hata oluştu."
          );
        }
      } catch (err: any) {
        console.error("Veri yüklenirken hata:", err);
        setError(err.message || "Veri yüklenirken bir hata oluştu.");
        setHasPackage(false);
        setShowPackageModal(true); // Hata durumunda da paketi yok say ve modalı göster
      } finally {
        setLoading(false);
      }
    };

    checkUserAndPackages();
  }, [router]);

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackageId(packageId);
  };

  const handleSubscribe = async () => {
    if (selectedPackageId === null) {
      setError("Lütfen bir paket seçin.");
      return;
    }

    setIsSubscribing(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/login");
        return;
      }

      const response = await api.post(
        "/business/subscribe",
        { packageId: selectedPackageId },
        token
      );
      if (response.success) {
        alert(response.message);
        setHasPackage(true); // Başarılı abonelik sonrası paketin olduğunu işaretle
        setShowPackageModal(false); // Modalı kapat
        // Başarılı abonelikten sonra kullanıcı paket durumunu yeniden kontrol etmek isteyebiliriz
        // veya doğrudan state'i güncelleyebiliriz (şimdi hasPackage'i true yaptık)
      } else {
        setError(response.message || "Abonelik başarısız oldu.");
      }
    } catch (err: any) {
      console.error("Abonelik hatası:", err);
      setError(err.message || "Abonelik sırasında bir hata oluştu.");
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold">Kontrol ediliyor...</p>
      </div>
    );
  }

  // Bu kısım sadece başlangıç yükleme sırasında hata olursa görünür
  if (error && !hasPackage && !showPackageModal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4 rounded-md shadow-md">
        <XCircleIcon className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Hata Oluştu!</h2>
        <p className="text-red-600 text-center">{error}</p>
        <p className="mt-4 text-gray-700">
          Lütfen daha sonra tekrar deneyin veya destek ile iletişime geçin.
        </p>
      </div>
    );
  }

  // Eğer paket varsa, dashboard içeriğini göster
  if (hasPackage) {
    return (
      <div className="flex w-full">
        <main className="flex-1 p-6 bg-gray-100 min-h-screen ">
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
  }

  // Paket yoksa, paket seçim modalını göster
  return (
    <>
      <PackageDialog
        open={showPackageModal}
        onOpenChange={setShowPackageModal}
        packages={availablePackages}
        selectedPackageId={selectedPackageId}
        onSelectPackage={handleSelectPackage}
        onSubscribe={handleSubscribe}
        error={error}
        isSubscribing={isSubscribing}
      />
    </>
  );
};

export default BusinessDashboard;
