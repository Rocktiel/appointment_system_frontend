"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useGetUserBusinessesQuery } from "@/services/businessApi"; // İşletmeleri çekmek için RTK Query hook'u

interface BusinessSelectorProps {
  // Seçilen işletmenin ID'sini number olarak geri döndürecek callback
  onBusinessSelect: (businessId: number | undefined) => void;
  // Dışarıdan seçili değeri kontrol etmek için
  selectedValue?: number | undefined;
  // Hata mesajını dışarıdan almak için (örneğin useForm'dan gelen errors.businessId)
  errorMessage?: string;
  // Formun disabled durumunu kontrol etmek için
  isDisabled?: boolean;
}
const BusinessSelector = ({
  onBusinessSelect,
  selectedValue,
  errorMessage,
  isDisabled = false,
}: BusinessSelectorProps) => {
  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    error: businessesError,
  } = useGetUserBusinessesQuery();

  const handleSelectChange = (value: string) => {
    // Eğer "placeholder" seçilirse undefined döndür, aksi halde sayıya çevir
    onBusinessSelect(value === "placeholder" ? undefined : Number(value));
  };

  if (isLoadingBusinesses) return <p>Yükleniyor...</p>;
  if (businessesError) return <p>İşletmeler alınamadı.</p>;

  return (
    <div className="md:col-span-2">
      {" "}
      {/* Bu div'i dışarıdan da kontrol edebilirsiniz */}
      <FormItem>
        <FormLabel>İşletme Seçin</FormLabel>
        <Select
          onValueChange={handleSelectChange}
          // `selectedValue` prop'unun tipini string olarak beklediği için toString() veya boş string
          value={
            selectedValue?.toString() ||
            (selectedValue === undefined ? "" : "placeholder")
          }
          disabled={isLoadingBusinesses || isDisabled}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  isLoadingBusinesses
                    ? "İşletmeler yükleniyor..."
                    : "Bir işletme seçin"
                }
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {/* Boş veya varsayılan seçenek, eğer hiç işletme seçilmediyse veya sıfırlanırsa */}
            <SelectItem value="placeholder" disabled>
              Bir işletme seçin
            </SelectItem>
            {businesses?.map((biz) => (
              <SelectItem key={biz.id} value={biz.id.toString()}>
                {biz.businessName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
        {businessesError && (
          <FormMessage className="text-red-500">
            İşletmeler yüklenirken hata oluştu.
          </FormMessage>
        )}
      </FormItem>
    </div>
  );
};

export default BusinessSelector;
