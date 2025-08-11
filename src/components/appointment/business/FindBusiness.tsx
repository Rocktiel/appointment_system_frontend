"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CityCountySelector from "./CityCountySelector";
import { useGetBusinessByLocationQuery } from "@/services/customerApi";
import { Button } from "@/components/ui/button"; // Shadcn/ui'dan Button bileşenini ekledik
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Kart bileşenlerini ekledik
import { MapPin, Search, ArrowRight, Phone } from "lucide-react"; // Ikonları ekledik

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

  const handleLocationChange = (city: string, county: string) => {
    setSelectedCity(city);
    setSelectedCounty(county);
  };

  const handleGoToAppointment = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-white  md:p-6">
      <Card className="w-full max-w-4xl  rounded-2xl md:p-8 bg-white ">
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
                    className="shadow-lg hover:shadow-xl hover:scale-102 transition-transform duration-300 border-2 border-gray-100 dark:border-gray-700"
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
                        className="mt-4 w-full bg-amber-500 text-white text-lg hover:bg-amber-600 transition-colors duration-300 rounded-lg shadow-md cursor-pointer"
                        onClick={() =>
                          window.open(`/${business.slug}`, "_blank")
                        }
                      >
                        Randevu Al <ArrowRight className="ml-2 size-5" />
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
