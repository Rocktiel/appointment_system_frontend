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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {services.map((service) => (
        <Button
          key={service.id}
          type="button"
          onClick={() => field.onChange(service.id)}
          className={cn(
            "flex items-center h-full justify-center p-2 rounded-md border transition cursor-pointer",
            Number(field.value) === service.id
              ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
          )}
        >
          <div className="flex-col items-center ml-2">
            <div className="flex items-center mb-1">
              <NotebookText className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{service.name}</span>
            </div>
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">
                {service.duration_minutes} dakika
              </span>
            </div>
            <div className="flex items-center mb-1">
              <Gem className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">{service.price} ₺</span>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ServiceSelectCard;
