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
import { DateTimePickerV2 } from "@/components/dashboard/business/date-time-picker-v2";
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
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Zaman Dilimlerini Ayarla</h1>

      {/* İşletme ve Gün Seçimi */}

      <Label htmlFor="business-select" className="text-right">
        İşletme Seç
      </Label>
      <Select
        value={selectedBusinessId || ""}
        onValueChange={(val) => setSelectedBusinessId(val)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="İşletme Seç" />
        </SelectTrigger>
        <SelectContent>
          {businesses?.map((b: Business) => (
            <SelectItem key={b.id} value={b.id.toString()}>
              {b.businessName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label htmlFor="day-select" className="text-right">
        Gün Seç
      </Label>
      <Select
        value={selectedDayId?.toString()}
        onValueChange={(val) => setSelectedDayId(Number(val))}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Gün Seç" />
        </SelectTrigger>
        <SelectContent>
          {DAYS.map((d) => (
            <SelectItem key={d.id} value={d.id.toString()}>
              {d.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Yeni zaman aralığı ekleme */}
      <DateTimePickerV2 onSubmit={handleTimeSlotCreate} />

      {/* Var olan zaman aralıkları */}
      {data && (
        <div className="mt-6">
          <h2 className="text-md font-medium mb-2">Ekli Zaman Dilimleri</h2>
          <ul className="space-y-2">
            {data?.data.map((slot: any) => (
              <li
                key={slot.id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>
                  {slot.start_time} - {slot.end_time}
                </span>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteSlot(slot.id)}
                >
                  Sil
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isFetching && <p className="text-sm text-gray-500">Yükleniyor...</p>}
    </div>
  );
};

export default BusinessTimeSlotsPage;
