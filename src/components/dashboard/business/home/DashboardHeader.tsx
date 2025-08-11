import { Button } from "@/components/ui/button";
import { CalendarDays, Plus } from "lucide-react";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          İşletme Kontrol Paneli
        </h1>
        <p className="text-md md:text-lg text-gray-600">
          Hoş geldiniz! İşletmenizi buradan yönetebilirsiniz.
        </p>
      </div>
      <div className="flex gap-4 mt-4 sm:mt-0">
        <Button
          className="flex items-center border-1 border-gray-800 gap-2 cursor-pointer "
          variant="outline"
          onClick={() =>
            (window.location.href = "/dashboard/business/calendar")
          }
        >
          <CalendarDays className="h-4 w-4" />
          Takvime Git
        </Button>
        <Button
          className="flex items-center gap-2 cursor-pointer"
          onClick={() =>
            (window.location.href = "/dashboard/business/appointments")
          }
        >
          <Plus className="h-4 w-4" />
          Randevu Oluştur
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
