// components/business-appointment/TimeSlotSelector.tsx
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDays, Clock, Loader2 } from "lucide-react";
import { format, isBefore } from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import type { DetailedTimeSlot } from "@/lib/api-requests";
import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin

interface TimeSlotSelectorProps {
  form: UseFormReturn<any>; // Dinamik form tipi için any kullanılabilir veya özel tip oluşturulabilir
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  detailedTimeSlots: DetailedTimeSlot[];
  loadingSlots: boolean;
}

export default function TimeSlotSelector({
  form,
  selectedDate,
  setSelectedDate,
  detailedTimeSlots,
  loadingSlots,
}: TimeSlotSelectorProps) {
  const disabledDates = (date: Date) =>
    isBefore(date, new Date(new Date().setHours(0, 0, 0, 0)));

  return (
    <>
      <FormField
        control={form.control}
        name="selectedDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-gray-700 dark:text-gray-300">
              Randevu Tarihi
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP", { locale: tr })
                  ) : (
                    <span>Bir tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setSelectedDate(date || undefined);
                  }}
                  initialFocus
                  locale={tr}
                  disabled={disabledDates}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="selectedTimeSlot"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-gray-300">
              Müsait Zaman Dilimi
            </FormLabel>
            {loadingSlots ? (
              <div className="w-full p-3 text-center text-gray-500 dark:text-gray-400">
                <Loader2 className="h-5 w-5 animate-spin inline-block mr-2" />{" "}
                Zaman Dilimleri Yükleniyor...
              </div>
            ) : detailedTimeSlots.length === 0 ? (
              <div className="w-full p-3 text-center text-gray-500 dark:text-gray-400 border rounded-md">
                Seçilen tarihte müsait zaman dilimi bulunmamaktadır.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {detailedTimeSlots.map((slot) => (
                  <Button
                    key={slot.id}
                    type="button"
                    onClick={() => {
                      slot.isAvailableForBooking && field.onChange(slot.id);
                    }}
                    className={cn(
                      "flex items-center justify-center p-2 rounded-md border transition",
                      slot.isAvailableForBooking
                        ? field.value === slot.id
                          ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 border-blue-600"
                          : "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-100 border-green-300 dark:border-green-700"
                        : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 border-red-300 dark:border-red-700 cursor-not-allowed opacity-70"
                    )}
                    disabled={!slot.isAvailableForBooking}
                  >
                    <Clock className="h-4 w-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">{`${slot.start_time} - ${slot.end_time}`}</span>
                  </Button>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
