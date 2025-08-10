// "use client";
// import React, { useState } from "react";
// import CityCountySelector from "./CityCountySelector";
// import { useGetBusinessByLocationQuery } from "@/services/customerApi";

// const FindBusinessPage = () => {
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedCounty, setSelectedCounty] = useState("");

//   // Hook'u bileşenin en üst seviyesinde çağırın
//   const { data, error, isLoading } = useGetBusinessByLocationQuery(
//     { city: selectedCity, county: selectedCounty },
//     { skip: !selectedCity || !selectedCounty } // Eğer şehir veya ilçe seçili değilse sorguyu atla
//   );

//   const handleLocationChange = (city: string, county: string) => {
//     setSelectedCity(city);
//     setSelectedCounty(county);
//   };

//   // Veri değiştiğinde loglama yap
//   React.useEffect(() => {
//     if (data) {
//       console.log("İşletmeler:", data);
//     }
//     if (error) {
//       console.error("İşletmeler alınırken hata oluştu:", error);
//     }
//   }, [data, error]);

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <h1 className="text-2xl font-bold">İşletme Bul</h1>

//       <CityCountySelector onChange={handleLocationChange} />

//       <p className="text-sm text-gray-500">
//         Seçilen: {selectedCity} / {selectedCounty}
//       </p>

//       {isLoading && <p>Yükleniyor...</p>}

//       {data && (
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Bulunan İşletmeler</h2>
//           <ul className="space-y-2">
//             {data.map((business) => (
//               <li key={business.id} className="p-4 border rounded">
//                 <h3 className="font-medium">{business.businessName}</h3>
//                 <p>{business.businessAddress}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FindBusinessPage;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CityCountySelector from "./CityCountySelector";
import { useGetBusinessByLocationQuery } from "@/services/customerApi";
import { Button } from "@/components/ui/button"; // Shadcn/ui'dan Button bileşenini ekledik
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Kart bileşenlerini ekledik
import { MapPin, Search, ArrowRight, Phone } from "lucide-react"; // Ikonları ekledik

// API'den gelecek işletme verisi için tip tanımlaması
interface Business {
  id: number;
  businessName: string;
  businessAddress: string;
  slug: string;
  city: string;
  county: string;
  // Diğer alanlar da burada olabilir
}

const FindBusinessPage = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const router = useRouter();

  // Hook'u bileşenin en üst seviyesinde çağırın
  const {
    data: businesses,
    error,
    isLoading,
  } = useGetBusinessByLocationQuery(
    { city: selectedCity, county: selectedCounty },
    { skip: !selectedCity || !selectedCounty } // Eğer şehir veya ilçe seçili değilse sorguyu atla
  );
  console.log("İşletmeler:", businesses); // Veri değiştiğinde loglama yap
  console.log("İşletmeler alınırken hata oluştu:", error); // Hata durumunda loglama yap
  const handleLocationChange = (city: string, county: string) => {
    setSelectedCity(city);
    setSelectedCounty(county);
  };

  const handleGoToAppointment = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900 md:p-6">
      <Card className="w-full max-w-4xl shadow-2xl rounded-2xl md:p-8 bg-white dark:bg-gray-800">
        <CardHeader className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 flex items-center justify-center gap-4">
            <Search className="w-10 h-10 text-amber-500" />
            İşletme Bul
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Randevu almak için şehir ve ilçe seçerek işletme arayın.
          </p>
        </CardHeader>
        <CardContent className="mt-8 space-y-6">
          <CityCountySelector onChange={handleLocationChange} />

          {selectedCity && selectedCounty && (
            <p className="text-md text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              Seçilen Konum:{" "}
              <span className="font-semibold">
                {selectedCity.toUpperCase()} / {selectedCounty.toUpperCase()}
              </span>
            </p>
          )}

          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <p className="text-lg text-amber-600 dark:text-amber-400 animate-pulse">
                Yükleniyor...
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center p-4 text-red-500 dark:text-red-400">
              {/* API'den gelen spesifik hata mesajını göster */}
              <p>
                {(error as any)?.data?.message ||
                  "İşletmeler alınırken bir hata oluştu."}
              </p>
            </div>
          )}

          {businesses && businesses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800  pb-2">
                Bulunan İşletmeler
              </h2>
              <div className="grid grid-cols-1  gap-6">
                {businesses.map((business) => (
                  <Card
                    key={business.id}
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100 dark:border-gray-700"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                        {business.businessName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{business.businessAddress}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{business.businessPhone}</span>
                      </p>

                      <Button
                        className="mt-4 w-full bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-300 rounded-lg shadow-md cursor-pointer"
                        onClick={() =>
                          window.open(`/${business.slug}`, "_blank")
                        }
                      >
                        Randevu Al <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {businesses && businesses.length === 0 && (
            <div className="text-center p-8">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Seçtiğiniz konumda işletme bulunamadı.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FindBusinessPage;
