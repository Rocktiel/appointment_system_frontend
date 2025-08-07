"use client";

import { useGetPackagesQuery } from "@/services/adminApi";
import React from "react";
import PackageCard from "./Pricing/PackageCard";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const router = useRouter();

  const {
    data: packagesResponse,
    error: packagesError,
    isLoading: isLoadingPackages,
  } = useGetPackagesQuery();

  const packages = packagesResponse?.data || [];

  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">
        Size Uygun Planı Seçin 💎
      </h2>
      <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-300">
        İşletmenizin ihtiyaçlarına göre tasarlanmış esnek paketlerimizden birini
        seçerek hemen başlayın.
      </p>
      {isLoadingPackages ? (
        <p className="text-gray-300">Paketler yükleniyor...</p>
      ) : packagesError ? (
        <p className="text-red-400">
          Paketler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
          deneyin.
        </p>
      ) : packages.length === 0 ? (
        <p className="text-gray-300">
          Şu anda görüntülenecek paket bulunmamaktadır.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages
            .filter((pkg) => pkg.isActive)
            .map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                price={pkg.price}
                description={pkg.description}
                maxBusinesses={pkg.maxBusinesses}
                onSelect={() => {
                  router.push("/login");
                }}
              />
            ))}
        </div>
      )}
    </section>
  );
}
