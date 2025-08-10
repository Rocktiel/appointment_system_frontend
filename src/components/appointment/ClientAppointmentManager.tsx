"use client"; // Bu direktif burada olacak ve kalacak!

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isBefore } from "date-fns";
import * as z from "zod"; // Zod şemaları için import

import { BusinessInfoCard, AppointmentForm } from "@/components/appointment"; // Kendi kardeş bileşenlerini import et
import {
  useInitiateAppointmentBookingMutation,
  useVerifyPhoneNumberMutation, // Yeni!
  useFinalizeAppointmentMutation, // Yeni!
  useGetDetailedTimeSlotsQuery, // Yeni!
} from "@/services/customerApi";

// useGetServicesByBusinessIdQuery'yi buraya geri taşıyoruz!
import { useGetServicesByBusinessIdQuery } from "@/services/serviceApi";
import { AppointmentFormValues } from "./AppointmentForm";
import VerificationDialog, {
  VerificationFormValues,
} from "./VertificationDialog";
import { BusinessDetails } from "@/models/customer.model";
import { toast } from "sonner";

// Ana sayfadan kopyalanan Zod şemaları
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
  selectedDate: z
    .date({
      error: "Lütfen bir tarih seçin.",
    })
    .refine(
      (date) => !isBefore(date, new Date(new Date().setHours(0, 0, 0, 0))),
      {
        message: "Geçmiş bir tarih seçemezsiniz.",
      }
    ),
  selectedTimeSlot: z
    .number({
      error: "Lütfen bir zaman dilimi seçin.",
    })
    .min(1, "Lütfen bir zaman dilimi seçin."),
  selectedService: z.number().min(1, "Lütfen bir hizmet seçin."),
  note: z.string().max(500, "Not en fazla 500 karakter olabilir.").optional(),
});

const verificationSchema = z.object({
  code: z
    .string()
    .min(6, "Kod 6 haneli olmalıdır.")
    .max(6, "Kod 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Kod sadece rakamlardan oluşmalıdır."),
});

interface ClientAppointmentManagerProps {
  initialBusiness: BusinessDetails; // Sunucudan gelen işletme bilgisi
  // initialServices prop'unu buradan kaldırdık
}

export function ClientAppointmentManager({
  initialBusiness,
}: ClientAppointmentManagerProps) {
  const [business] = useState<BusinessDetails>(initialBusiness); // business'ı artık doğrudan initialBusiness olarak kullanabiliriz
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  // const [detailedTimeSlots, setDetailedTimeSlots] = useState<
  //   DetailedTimeSlot[]
  // >([]);
  // const [loadingSlots, setLoadingSlots] = useState(false);
  const [appointmentMessage, setAppointmentMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [phoneNumberToVerify, setPhoneNumberToVerify] = useState<string>("");
  const [tempAppointmentData, setTempAppointmentData] =
    useState<AppointmentFormValues | null>(null);

  // Servisleri burada, istemci tarafında RTK Query ile çekiyoruz!
  const { data: services = [], isLoading: loadingServices } =
    useGetServicesByBusinessIdQuery(Number(business?.id), {
      skip: !business?.id, // business.id yoksa sorguyu atla
    });

  const appointmentForm = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      selectedDate: new Date(),
      selectedTimeSlot: 0,
      selectedService: services[0]?.id || 0, // Servisler yüklendikten sonra ilkini seç
      note: undefined,
    },
  });

  // services yüklendiğinde default selectedService değerini güncelle
  useEffect(() => {
    if (
      services.length > 0 &&
      appointmentForm.getValues("selectedService") === 0
    ) {
      appointmentForm.setValue("selectedService", services[0].id);
    }
  }, [services, appointmentForm]);

  const verificationForm = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: "",
    },
  });

  // Seçilen tarih değiştiğinde müsait zaman dilimlerini yükle
  const {
    data: detailedTimeSlots = [],
    refetch,
    isLoading: loadingSlots,
    // refetch: refetchDetailedTimeSlots, // Manuel yenileme ihtiyacı varsa
  } = useGetDetailedTimeSlotsQuery(
    {
      businessId: initialBusiness.id,
      date: format(selectedDate || new Date(), "yyyy-MM-dd"),
    },
    {
      skip: !initialBusiness?.id || !selectedDate, // Koşullu sorgu
      // Örneğin, kullanıcı tarih değiştirdiğinde yeni veri çekmek için refetch kullanmak yerine
      // selectArgs (queryFn'deki parametreler) değişince RTK Query otomatik çeker.
      // pollingInterval: 60000 // İsteğe bağlı: Her 60 saniyede bir yeniden çek
    }
  );

  const [initiateBooking, { isLoading: isInitiatingBooking }] =
    useInitiateAppointmentBookingMutation();
  const [verifyPhone] = useVerifyPhoneNumberMutation(); // Yeni!
  const [finalizeAppointmentBooking] = useFinalizeAppointmentMutation(); // Yeni!

  const onAppointmentSubmit = useCallback(
    async (values: AppointmentFormValues) => {
      if (!initialBusiness) return;
      setAppointmentMessage(null);
      setTempAppointmentData(values);

      try {
        const selectedSlot = detailedTimeSlots.find(
          (slot) => slot.id === values.selectedTimeSlot
        );
        if (!selectedSlot) {
          setAppointmentMessage({
            type: "error",
            text: "Seçilen zaman dilimi bulunamadı.",
          });
          return;
        }

        const result = await initiateBooking({
          businessId: initialBusiness.id, // String olmalı
          date: format(values.selectedDate, "yyyy-MM-dd"),
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
          customerName: values.customerName,
          customerPhone: values.customerPhone,
          serviceId: Number(values.selectedService),
          time_slot_template_id: selectedSlot.id,
          note: values.note,
        }).unwrap();

        setPhoneNumberToVerify(result.phone);
        setIsVerificationModalOpen(true);
      } catch (error: any) {
        setAppointmentMessage({
          type: "error",
          text:
            error?.data?.message ||
            "Randevu başlatılırken bir hata oluştu. Lütfen tekrar deneyin.",
        });
        toast.error(
          error?.data?.message ||
            "Randevu başlatılırken bir hata oluştu. Lütfen tekrar deneyin."
        );
        await refetch(); // Hata sonrası zaman dilimlerini yeniden yükle
      }
    },
    [initialBusiness, detailedTimeSlots, initiateBooking]
  );

  const onVerificationSubmit = useCallback(
    async (values: VerificationFormValues) => {
      verificationForm.clearErrors();
      if (!phoneNumberToVerify || !tempAppointmentData) {
        setAppointmentMessage({
          type: "error",
          text: "Randevu bilgileri eksik, lütfen baştan başlayın.",
        });
        setIsVerificationModalOpen(false);
        return;
      }

      try {
        const verifyRes = await verifyPhone({
          // verifyPhone mutasyonunu kullanıyoruz
          phone: phoneNumberToVerify,
          code: values.code,
        }).unwrap();

        // verifyRes.success kontrolünü yapın, API yanıtına göre
        if (!verifyRes.success) {
          // Örnek kontrol
          throw new Error(
            verifyRes.message ||
              "Geçersiz doğrulama kodu. Lütfen tekrar deneyin."
          );
        }

        const selectedSlot = detailedTimeSlots.find(
          (slot) => slot.id === tempAppointmentData.selectedTimeSlot
        );
        if (!selectedSlot) {
          throw new Error("Zaman dilimi bulunamadı. Lütfen tekrar deneyin.");
        }

        await finalizeAppointmentBooking({
          // finalizeAppointmentBooking mutasyonunu kullanıyoruz
          businessId: initialBusiness.id,
          date: format(tempAppointmentData.selectedDate!, "yyyy-MM-dd"),
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
          customerName: tempAppointmentData.customerName,
          customerPhone: tempAppointmentData.customerPhone,
          serviceId: tempAppointmentData.selectedService,
          time_slot_template_id: selectedSlot.id,
          note: tempAppointmentData.note,
        }).unwrap();
        toast.success("Randevunuz başarıyla oluşturuldu!");
        setAppointmentMessage({
          type: "success",
          text: "Randevunuz başarıyla oluşturuldu ve onaylandı! 🎉",
        });
        setIsVerificationModalOpen(false);
        appointmentForm.reset({
          customerName: "",
          customerPhone: "",
          selectedDate: selectedDate,
          selectedTimeSlot: 0,
          selectedService: services[0]?.id || 0,
          note: "",
        });
        verificationForm.reset();
        await refetch();
        // Randevu sonrası zaman dilimlerini yeniden çekmek için
        // useGetDetailedTimeSlotsQuery'nin refetch fonksiyonunu kullanabilirsiniz,
        // veya ilgili cache tag'ini invalidate edebilirsiniz (eğer offersTags/invalidatesTags kullandıysanız).
        // Şu anki kurulumunuzda, selectedDate değişince otomatik çekecek.
        // Eğer aynı tarihi tekrar çekecekseniz, sorgu parametresi aynı kaldığı için
        // RTK Query cached veriyi döndürebilir. Bu durumda invalidate etmeniz gerekebilir.
        // Örnek: dispatch(customerApi.endpoints.getDetailedTimeSlots.initiate({ businessId: initialBusiness.id, date: format(selectedDate, "yyyy-MM-dd") }, { forceRefetch: true }));
        // Veya providesTags/invalidatesTags kullanın.
      } catch (error: any) {
        console.error("Doğrulama hatası:", error);
        verificationForm.setError("code", {
          message: error.message || "Doğrulama başarısız.",
        });
        toast.error(
          error.message || "Doğrulama başarısız. Lütfen tekrar deneyin."
        );
      }
    },
    [
      phoneNumberToVerify,
      tempAppointmentData,
      detailedTimeSlots,
      initialBusiness,
      selectedDate,
      appointmentForm,
      verificationForm,
      services,
      verifyPhone,
      finalizeAppointmentBooking,
    ]
  );

  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <BusinessInfoCard business={business} />

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden my-4 p-6">
        <AppointmentForm
          form={appointmentForm}
          onAppointmentSubmit={onAppointmentSubmit}
          isBooking={isInitiatingBooking}
          appointmentMessage={appointmentMessage}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          detailedTimeSlots={detailedTimeSlots}
          loadingSlots={loadingSlots}
          services={services} // Servisleri burada RTK Query'den gelen 'services' olarak kullanıyoruz
          loadingServices={loadingServices} // RTK Query'den gelen isLoading'i kullanıyoruz
        />
      </div>

      <VerificationDialog
        isOpen={isVerificationModalOpen}
        onOpenChange={setIsVerificationModalOpen}
        form={verificationForm}
        onVerificationSubmit={onVerificationSubmit}
        isSubmitting={verificationForm.formState.isSubmitting}
        appointmentData={
          tempAppointmentData
            ? {
                customerName: tempAppointmentData.customerName,
                customerPhone: tempAppointmentData.customerPhone,
                selectedDate: tempAppointmentData.selectedDate,
                selectedService: tempAppointmentData.selectedService,
                note: tempAppointmentData.note,
                timeSlot: detailedTimeSlots.find(
                  (slot) => slot.id === tempAppointmentData.selectedTimeSlot
                ),
              }
            : undefined
        }
        services={services}
      />
    </div>
  );
}
