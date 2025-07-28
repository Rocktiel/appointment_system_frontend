"use client";

import { useState } from "react";
import { format, addWeeks, subWeeks, startOfWeek, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tr } from "date-fns/locale/tr";
import { useGetWeeklyDetailedSlotsQuery } from "@/services/businessApi";
import BusinessSelector2 from "./dashboard/business/BusinessSelector2";
type Slot = {
  id: number;
  start_time: string;
  end_time: string;
  isAvailableForBooking: boolean;
};

export default function WeeklyCalendar() {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );

  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const handlePrevWeek = () => {
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const start = format(currentWeekStart, "yyyy-MM-dd"); // ✅ API için uygun format
  const end = format(addDays(currentWeekStart, 6), "yyyy-MM-dd");

  const { data, isLoading, isError } = useGetWeeklyDetailedSlotsQuery({
    businessId: Number(selectedBusinessId),
    start,
    end,
  });

  return (
    <div className="p-6 space-y-4">
      <BusinessSelector2
        selectedBusinessId={selectedBusinessId}
        onSelectBusiness={(id) => {
          setSelectedBusinessId(id);
        }}
      />
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" onClick={handlePrevWeek}>
          Önceki Hafta
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentWeekStart, "d MMM yyyy", { locale: tr })} -{" "}
          {format(addDays(currentWeekStart, 6), "d MMM yyyy", { locale: tr })}
        </h2>
        <Button variant="outline" onClick={handleNextWeek}>
          Sonraki Hafta
        </Button>
      </div>

      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : isError ? (
        <p>Bir hata oluştu</p>
      ) : (
        <div className="grid grid-cols-7 border rounded-lg overflow-hidden">
          {weekDates.map((date) => {
            const formattedDate = format(date, "yyyy-MM-dd");
            const slots = data?.[formattedDate] || [];

            return (
              <div key={formattedDate} className="border-r last:border-r-0">
                <div className="bg-gray-100 p-2 text-center font-semibold border-b">
                  {format(date, "EEE dd MMM", { locale: tr })}
                </div>
                <div className="p-2 space-y-2">
                  {slots.length === 0 ? (
                    <div className="text-center text-sm text-muted-foreground">
                      Uygunluk yok
                    </div>
                  ) : (
                    slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={cn(
                          "text-sm px-2 py-1 rounded-md text-center border h-15 items-center justify-center flex",
                          slot.isAvailableForBooking
                            ? "bg-green-100 border-green-400 text-green-800"
                            : "bg-red-100 border-red-400 text-red-800"
                        )}
                      >
                        {slot.start_time} - {slot.end_time}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
