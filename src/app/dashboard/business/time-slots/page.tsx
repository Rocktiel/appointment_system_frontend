"use client";

import React, { useState } from "react";
import {
  useGetUserBusinessesQuery,
  useGetTimeIntervalsQuery,
  useCreateTimeIntervalMutation,
  useDeleteTimeIntervalMutation,
} from "@/services/businessApi";
import { Business } from "@/models/business.model";
import { Button } from "@/components/ui/button";
import { DateTimePickerV2 } from "@/components/dashboard/business/time-slots/date-time-picker-v2";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { DAYS } from "./Days";
import { Day } from "react-day-picker";
import DaySelection from "@/components/dashboard/business/DaySelection";
import BusinessSelector from "@/components/dashboard/business/shared/BusinessSelector";
import BusinessSelector2 from "@/components/dashboard/business/shared/BusinessSelector2";

const BusinessTimeSlotsPage = () => {
  const { data: businesses } = useGetUserBusinessesQuery();
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

  const selectedDayValue = DAYS.find((d) => d.id === selectedDayId)?.id;

  const { data, refetch, isFetching } = useGetTimeIntervalsQuery(
    {
      businessId: Number(selectedBusinessId),
      dayId: selectedDayValue || 0,
    },
    { skip: !selectedBusinessId || !selectedDayValue }
  );

  const [createTimeSlot] = useCreateTimeIntervalMutation();
  const [deleteTimeSlot] = useDeleteTimeIntervalMutation();

  const handleTimeSlotCreate = async ({
    startTime,
    endTime,
  }: {
    startTime: string;
    endTime: string;
  }) => {
    if (!selectedBusinessId || !selectedDayValue) {
      toast.error("İşletme ve gün seçmelisiniz");
      return;
    }

    const overlap = data?.data.some((slot: any) => {
      return (
        (startTime >= slot.startTime && startTime < slot.endTime) ||
        (endTime > slot.startTime && endTime <= slot.endTime) ||
        (startTime <= slot.startTime && endTime >= slot.endTime)
      );
    });

    if (overlap) {
      toast.error("Bu zaman aralığı çakışıyor");
      return;
    }

    try {
      await createTimeSlot({
        businessId: Number(selectedBusinessId),
        dayId: selectedDayValue,
        startTime,
        endTime,
      }).unwrap();

      toast.success("Zaman aralığı eklendi");
      refetch();
    } catch (error) {
      toast.error("Zaman aralığı eklenirken hata oluştu");
    }
  };

  const handleDeleteSlot = async (id: number) => {
    try {
      await deleteTimeSlot(id).unwrap();
      toast.success("Zaman aralığı silindi");
      refetch();
    } catch (err) {
      toast.error("Silme başarısız");
    }
  };

  return (
    <div className="p-4 space-y-4 ">
      <h1 className="text-3xl font-bold">Zaman Dilimlerini Ayarla</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <BusinessSelector2
          selectedBusinessId={selectedBusinessId}
          onSelectBusiness={setSelectedBusinessId}
        />
        <DaySelection
          selectedDayId={selectedDayId}
          setSelectedDayId={setSelectedDayId}
        />
      </div>
      {!selectedBusinessId ? (
        <div className="text-center py-8 text-2xl text-muted-foreground">
          Lütfen işletme seçiniz
        </div>
      ) : !selectedDayId ? (
        <div className="text-center py-8 text-2xl text-muted-foreground">
          Lütfen gün seçiniz
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <DateTimePickerV2 onSubmit={handleTimeSlotCreate} />
        </div>
      )}

      {/* Var olan zaman aralıkları */}
      <div>
        {data && (
          <div className="mt-6">
            <h2 className="text-md font-medium mb-2">Ekli Zaman Dilimleri</h2>
            <ul className="space-y-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.data.map((slot: any) => (
                <li
                  key={slot.id}
                  className="flex justify-around items-center border p-2 rounded"
                >
                  <span>
                    {slot.start_time} - {slot.end_time}
                  </span>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="ml-2 cursor-pointer bg-red-600 hover:bg-red-700"
                  >
                    Sil
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isFetching && <p className="text-sm text-gray-500">Yükleniyor...</p>}
    </div>
  );
};

export default BusinessTimeSlotsPage;
