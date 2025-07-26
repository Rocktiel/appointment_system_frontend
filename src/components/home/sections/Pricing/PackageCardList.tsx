"use client";

import React from "react";
import PackageCard from "@/components/home/sections/Pricing/PackageCard";
import { useGetPackagesQuery, Package } from "@/services/adminApi";
import { useRouter } from "next/navigation";

export default function PackageCardList() {
  const router = useRouter();
  const {
    data: packagesResponse,
    error: packagesError,
    isLoading: isLoadingPackages,
  } = useGetPackagesQuery();
  const packages = packagesResponse?.data || [];

  if (isLoadingPackages) {
    return <p className="text-gray-300 text-center">Paketler yükleniyor...</p>;
  }

  if (packagesError) {
    return (
      <p className="text-red-400 text-center">
        Paketler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
      </p>
    );
  }

  if (packages.length === 0) {
    return (
      <p className="text-gray-300 text-center">
        Şu anda görüntülenecek paket bulunmamaktadır.
      </p>
    );
  }

  return (
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
  );
}
