// components/business-appointment/AppointmentForm.tsx
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import type { Service } from "@/services/serviceApi";
import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin

// Randevu formu için Zod şeması tipini burada tekrar tanımlayabiliriz
// veya ana sayfadan import edebiliriz, burada tekrar tanımlamak daha bağımsız yapar.
// Ancak ana sayfadaki Zod şeması ile senkronize kalması önemlidir.
import { z } from "zod";
import TimeSlotSelector from "./TimeSlotSelector";
import ServiceSelector from "./ServiceSelector";
import { DetailedTimeSlot } from "@/models/customer.model";

const appointmentFormSchema = z.object({
  customerName: z
    .string()
    .min(2, "Adınız en az 2 karakter olmalıdır.")
    .max(100, "Adınız en fazla 100 karakter olabilir."),
  customerPhone: z
    .string()
    .regex(
      /^(\+90|0)?5[0-9]{9}$/,
      "Geçerli bir telefon numarası girin. (Örn: 05xx xxx xx xx veya +905xx xxx xx xx)"
    ),
  selectedDate: z.date({
    error: "Lütfen bir tarih seçin.",
  }),
  selectedTimeSlot: z
    .number({
      error: "Lütfen bir zaman dilimi seçin.",
    })
    .min(1, "Lütfen bir zaman dilimi seçin."),
  selectedService: z.number().min(1, "Lütfen bir hizmet seçin."),
  note: z.string().max(500, "Not en fazla 500 karakter olabilir.").optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  form: UseFormReturn<AppointmentFormValues>; // Form hook'unun kendisini prop olarak al
  onAppointmentSubmit: (values: AppointmentFormValues) => Promise<void>;
  isBooking: boolean;
  appointmentMessage: { type: "success" | "error"; text: string } | null;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  detailedTimeSlots: DetailedTimeSlot[];
  loadingSlots: boolean;
  services: Service[];
  loadingServices: boolean;
}

export default function AppointmentForm({
  form,
  onAppointmentSubmit,
  isBooking,
  appointmentMessage,
  selectedDate,
  setSelectedDate,
  detailedTimeSlots,
  loadingSlots,
  services,
  loadingServices,
}: AppointmentFormProps) {
  return (
    <section className="pt-6 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2 mb-4">
        Randevu Oluştur
      </h2>

      {appointmentMessage && (
        <div
          className={cn(
            "p-4 rounded-md mb-4 text-sm flex items-center",
            appointmentMessage.type === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          )}
        >
          {appointmentMessage.type === "success" ? (
            <CheckCircle className="h-5 w-5 mr-2" />
          ) : (
            <XCircle className="h-5 w-5 mr-2" />
          )}
          {appointmentMessage.text}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onAppointmentSubmit)}
          className="space-y-6"
        >
          {/* Tarih ve Zaman Dilimi Seçimi */}
          <TimeSlotSelector
            form={form}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            detailedTimeSlots={detailedTimeSlots}
            loadingSlots={loadingSlots}
          />

          {/* Hizmet Seçimi */}
          <ServiceSelector
            form={form}
            services={services}
            loadingServices={loadingServices}
          />

          {/* Müşteri Adı */}
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Adınız Soyadınız
                </FormLabel>
                <Input placeholder="Adınız Soyadınız" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Müşteri Telefonu */}
          <FormField
            control={form.control}
            name="customerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Telefon Numaranız (Örn: 05xx xxx xx xx)
                </FormLabel>
                <Input
                  placeholder="05xx xxx xx xx"
                  {...field}
                  type="tel"
                  inputMode="numeric"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Not (İsteğe Bağlı) */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Ek Not (İsteğe Bağlı)
                </FormLabel>
                <Textarea
                  placeholder="Eklemek istediğiniz notlar..."
                  {...field}
                  rows={3}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-2.5" disabled={isBooking}>
            {isBooking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Randevu İçin Kod Gönderiliyor...
              </>
            ) : (
              "Randevu Al"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
