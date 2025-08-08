// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   useGetUserPackageQuery,
//   useSubscribeToPackageMutation,
// } from "@/services/businessApi";
// import { useGetPackagesQuery } from "@/services/adminApi";
// import PackageDialog from "@/components/dashboard/business/PackageDialog";
// import { useAppSelector } from "@/lib/hooks";

// interface Props {
//   onPackageConfirmed: () => void;
// }

// const CheckUserPackage = ({ onPackageConfirmed }: Props) => {
//   const token = useAppSelector((state) => state.auth.accessToken);
//   const router = useRouter();

//   const {
//     data: userPackageData,
//     isLoading: isUserPackageLoading,
//     isError: isUserPackageError,
//   } = useGetUserPackageQuery(undefined, { skip: !token });

//   const {
//     data: packagesResponse,
//     isLoading: isPackagesLoading,
//     isError: isPackagesError,
//     error: packagesError,
//   } = useGetPackagesQuery(undefined, { skip: !token });

//   const [
//     subscribeToPackage,
//     {
//       isLoading: isSubscribing,
//       isError: isSubscribeError,
//       error: subscribeError,
//     },
//   ] = useSubscribeToPackageMutation();

//   const [showPackageModal, setShowPackageModal] = useState(false);
//   const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!token && !isUserPackageLoading) {
//       router.push("/login");
//     }
//   }, [token, isUserPackageLoading, router]);

//   useEffect(() => {
//     if (!isUserPackageLoading && !isUserPackageError) {
//       const hasPackage = !!userPackageData?.data;
//       if (!hasPackage) {
//         setShowPackageModal(true);
//       } else {
//         onPackageConfirmed(); // Paket varsa dashboard'u göster
//       }
//     }
//   }, [
//     userPackageData,
//     isUserPackageLoading,
//     isUserPackageError,
//     onPackageConfirmed,
//   ]);

//   const handleSelectPackage = (packageId: number) => {
//     setSelectedPackageId(packageId);
//   };

//   const handleSubscribe = async () => {
//     setError(null);

//     if (selectedPackageId === null) {
//       setError("Lütfen bir paket seçin.");
//       return;
//     }

//     try {
//       const response = await subscribeToPackage({
//         packageId: selectedPackageId,
//       }).unwrap();
//       if (response.success) {
//         setShowPackageModal(false);
//         onPackageConfirmed(); // Abonelik başarılıysa dashboard'u göster
//       } else {
//         setError(response.message || "Abonelik başarısız oldu.");
//       }
//     } catch (err: any) {
//       setError(
//         err.data?.message ||
//           err.message ||
//           "Abonelik sırasında bir hata oluştu."
//       );
//     }
//   };

//   if (isUserPackageLoading || isPackagesLoading) {
//     console.log("Loading user package or packages...");
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p>Kontrol ediliyor...</p>
//       </div>
//     );
//   }

//   if (isUserPackageError || isPackagesError) {
//     console.error("Error fetching user package or packages:");
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-500">
//         <p>
//           {(packagesError as any)?.data?.message ||
//             (packagesError as any)?.message ||
//             "Veri yüklenirken bir hata oluştu."}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <PackageDialog
//       open={showPackageModal}
//       onOpenChange={setShowPackageModal}
//       packages={packagesResponse?.data || []}
//       selectedPackageId={selectedPackageId}
//       onSelectPackage={handleSelectPackage}
//       onSubscribe={handleSubscribe}
//       error={
//         isSubscribeError
//           ? (subscribeError as any)?.data?.message ||
//             (subscribeError as any)?.message
//           : undefined
//       }
//       isSubscribing={isSubscribing}
//     />
//   );
// };

// export default CheckUserPackage;
"use client";

import {
  useGetUserPackageQuery,
  useSubscribeToPackageMutation,
} from "@/services/businessApi";

import { useGetPackagesQuery } from "@/services/adminApi";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import PackageDialog from "../PackageDialog";

const CheckUserPackage = () => {
  const token = useAppSelector((state) => state.auth.accessToken);
  const router = useRouter();
  const {
    data: userPackageData,
    isLoading: isUserPackageLoading,
    isError: isUserPackageError,
  } = useGetUserPackageQuery(undefined, { skip: !token });

  const {
    data: packagesResponse,
    isLoading: isPackagesLoading,
    isError: isPackagesError,
    error: packagesError,
  } = useGetPackagesQuery(undefined, { skip: !token });

  const [
    subscribeToPackage,
    {
      isLoading: isSubscribing,
      isError: isSubscribeError,
      error: subscribeError,
    },
  ] = useSubscribeToPackageMutation();

  const [showPackageModal, setShowPackageModal] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleSelectPackage = (packageId: number) => {
    setSelectedPackageId(packageId);
  };
  const handleSubscribe = async () => {
    setError(null);

    if (selectedPackageId === null) {
      setError("Lütfen bir paket seçin.");
      return;
    }

    try {
      const response = await subscribeToPackage({
        packageId: selectedPackageId,
      }).unwrap();
      if (response.success) {
        setShowPackageModal(false);
        router.push("/dashboard/business"); // Abonelik başarılıysa dashboard'u göster
      } else {
        setError(response.message || "Abonelik başarısız oldu.");
      }
    } catch (err: any) {
      setError(
        err.data?.message ||
          err.message ||
          "Abonelik sırasında bir hata oluştu."
      );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Paketiniz bulunamadı</h2>
        <p>Lütfen bir paket seçerek hizmetleri kullanmaya başlayın.</p>
        <button
          onClick={() => setShowPackageModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Paket Seç
        </button>
        <PackageDialog
          open={showPackageModal}
          onOpenChange={setShowPackageModal}
          packages={packagesResponse?.data || []}
          selectedPackageId={selectedPackageId}
          onSelectPackage={handleSelectPackage}
          onSubscribe={handleSubscribe}
          error={
            isSubscribeError
              ? (subscribeError as any)?.data?.message ||
                (subscribeError as any)?.message
              : undefined
          }
          isSubscribing={isSubscribing}
        />
      </div>
    </div>
  );
};

export default CheckUserPackage;
