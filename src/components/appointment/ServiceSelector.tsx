import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import type { Service } from "@/services/serviceApi";
import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin
import ServiceSelectCard from "./ServiceSelectCard";

interface ServiceSelectorProps {
  form: UseFormReturn<any>; // Dinamik form tipi için any kullanılabilir veya özel tip oluşturulabilir
  services: Service[];
  loadingServices: boolean;
}

export default function ServiceSelector({
  form,
  services,
  loadingServices,
}: ServiceSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="selectedService"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 text-lg">
            Almak İstediğiniz Hizmet
          </FormLabel>
          {loadingServices ? (
            <div className="w-full p-3 text-center text-gray-500 dark:text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />{" "}
              Hizmetler Yükleniyor...
            </div>
          ) : services.length === 0 ? (
            <div className="w-full p-3 text-center text-gray-500 dark:text-gray-400 border rounded-md">
              Hizmet Bulunamadı.
            </div>
          ) : (
            <ServiceSelectCard services={services} field={field} />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
