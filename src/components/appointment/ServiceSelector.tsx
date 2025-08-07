// components/business-appointment/ServiceSelector.tsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/services/serviceApi";
import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin

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
          <FormLabel className="text-gray-700 dark:text-gray-300">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {services.map((service) => (
                <Button
                  key={service.id}
                  type="button"
                  onClick={() => field.onChange(service.id)}
                  className={cn(
                    "flex items-center justify-center p-2 rounded-md border transition",
                    Number(field.value) === service.id
                      ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                  )}
                >
                  <Clock className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{service.name}</span>
                </Button>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
