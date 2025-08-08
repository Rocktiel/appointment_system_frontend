"use client";

import {
  useGetUserPackageQuery,
  useGetPackagesQuery,
} from "@/services/businessApi";
import CheckUserPackage from "@/components/dashboard/business/CheckUserPackage";
import BusinessStatisticsPage from "./statistics/page";

const BusinessDashboard = () => {
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

  return (
    <div className="flex w-full">
      <BusinessStatisticsPage />
    </div>
  );
};

export default BusinessDashboard;
