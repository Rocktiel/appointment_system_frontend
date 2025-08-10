import { cn } from "@/lib/utils";
import { Service } from "@/services/serviceApi";
import { Clock, Gem, NotebookText } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ControllerRenderProps } from "react-hook-form";

interface ServiceSelectCardProps {
  services: Service[];
  field: ControllerRenderProps<any, "selectedService">;
}
const ServiceSelectCard = ({ services, field }: ServiceSelectCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {services.map((service) => {
        const isSelected = Number(field.value) === service.id;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => field.onChange(service.id)}
            className={cn(
              "group relative flex flex-col justify-between h-full rounded-xl border shadow-sm p-5 transition-all duration-300",
              isSelected
                ? "border-blue-600 bg-blue-50 shadow-lg scale-[1.04] "
                : "border-gray-200 bg-white hover:border-blue-600 hover:scale-[1.02] cursor-pointer hover:shadow-md"
            )}
          >
            {/* Başlık */}
            <div className="flex items-center space-x-2 mb-4">
              <NotebookText
                className={cn(
                  "h-5 w-5",
                  isSelected ? "text-blue-600" : "text-gray-500"
                )}
              />
              <span
                className={cn(
                  "font-semibold text-base sm:text-lg",
                  isSelected ? "text-blue-600" : "text-gray-800"
                )}
              >
                {service.name}
              </span>
            </div>

            {/* Süre */}
            <div className="flex items-center space-x-2 mb-2">
              <Clock
                className={cn(
                  "h-4 w-4",
                  isSelected ? "text-blue-600" : "text-gray-500"
                )}
              />
              <span
                className={cn(
                  "text-sm",
                  isSelected ? "text-blue-600" : "text-gray-600"
                )}
              >
                {service.duration_minutes} dakika
              </span>
            </div>

            {/* Fiyat */}
            <div className="flex items-center space-x-2">
              <Gem
                className={cn(
                  "h-4 w-4",
                  isSelected ? "text-blue-500" : "text-gray-500"
                )}
              />
              <span
                className={cn(
                  "font-medium text-sm",
                  isSelected ? "text-blue-600" : "text-gray-700"
                )}
              >
                {service.price} ₺
              </span>
            </div>

            {/* Seçim göstergesi */}
            {isSelected && (
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ServiceSelectCard;
