"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Label } from "@/components/ui/label";

interface Props {
  onSelectDate: (date: string, dayId: number, formatted: string) => void;
}

const DateSelector: React.FC<Props> = ({ onSelectDate }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (date) {
      const isoDate = format(date, "yyyy-MM-dd");
      const dayId = date.getDay() === 0 ? 7 : date.getDay();

      const formatted = format(date, "d MMMM yyyy", { locale: tr });
      onSelectDate(isoDate, dayId, formatted);
    }
  }, [date]);

  return (
    <div className="mt-4">
      <Label htmlFor="business-select" className="mb-2 text-lg">
        Tarih Seç
      </Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
        locale={tr}
      />
    </div>
  );
};

export default DateSelector;
