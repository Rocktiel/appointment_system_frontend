"use client";
import AppointmentDetails from "@/components/dashboard/business/AppointmentDetails";
import BusinessSelector2 from "@/components/dashboard/business/BusinessSelector2";
import DateSelector from "@/components/dashboard/business/DateSelection";
import TimeSlots from "@/components/dashboard/business/TimeSlots"; // Güncellenmiş TimeSlots bileşeni
import { useState } from "react";
// DetailedTimeSlot tipi için, models/customer.model'dan değil,
// artık API tanımlarınızla uyumlu olan lib/api-requests.ts veya services/customerApi.ts'den import etmek daha doğru olacaktır.
// veya services/customerApi.ts'den
import {
  useGetDetailedTimeSlotsQuery, // Yeni! Bu hook'u import ediyoruz
} from "@/services/customerApi"; // customerApi.ts'ten import ettiğimizden emin olun
import { DetailedTimeSlot } from "@/models/customer.model";
import { useGetAppointmentByTimeSlotQuery } from "@/services/businessApi";
// Eğer getDetailedTimeSlots'u artık kullanmayacaksak, bu import'u kaldırın:
// import { getDetailedTimeSlots } from "@/lib/api-requests";

const BusinessAppointmentsPage = () => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null); // Bu şu an kullanılmıyor gibi görünüyor, silinebilir
  const [formattedDate, setFormattedDate] = useState<string | null>(null); // Bu da kullanılmıyor gibi görünüyor, silinebilir
  const [selectedSlot, setSelectedSlot] = useState<DetailedTimeSlot | null>(
    null
  ); // Tipi DetailedTimeSlot olarak güncelledik

  // RTK Query useGetDetailedTimeSlotsQuery Hook'u ile veri çekme
  // businessId ve date değiştiğinde otomatik olarak yeniden çekme yapacak
  const {
    data: detailedSlots = [],
    isLoading: loadingDetailedSlots,
    error: detailedSlotsError,
  } = useGetDetailedTimeSlotsQuery(
    {
      businessId: selectedBusinessId || "", // businessId string olmalı
      date: selectedDate || "",
    },
    {
      // Eğer selectedBusinessId veya selectedDate null ise sorguyu atla
      skip: !selectedBusinessId || !selectedDate,
      // Zaman dilimleri çok sık değişebilir, bu yüzden cache yenileme stratejisi önemlidir.
      // Örneğin, 30 saniyede bir otomatik yenileme (polling):
      // pollingInterval: 30000,
      // veya verinin çok taze olması gerekiyorsa cache'i kapat:
      // keepUnusedDataFor: 0,
    }
  );

  // useGetAppointmentByTimeSlotQuery hook'u
  const { data: appointmentData } = useGetAppointmentByTimeSlotQuery(
    {
      businessId: Number(selectedBusinessId) || 0,
      date: selectedDate || "",
      time_slot_template_id: selectedSlot?.id ?? 0,
    },
    { skip: !selectedDate || !selectedSlot || !selectedBusinessId } // Skip koşullarına businessId'yi de ekledik
  );

  // Eski `useEffect`'i artık kaldırdık, çünkü RTK Query yönetiyor
  // useEffect(() => {
  //   const fetchSlots = async () => { /* ... */ };
  //   fetchSlots();
  // }, [selectedBusinessId, selectedDate]);

  return (
    <div className="p-10 md:flex md:space-x-4 w-full bg-gray-200 h-screen">
      <div className="md:w-1/2 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Randevu Seç</h1>
        <div className="w-full h-full border-2 border-gray-400 rounded-lg bg-gray-200 p-4 shadow-2xl">
          <BusinessSelector2
            selectedBusinessId={selectedBusinessId}
            onSelectBusiness={(id) => {
              setSelectedBusinessId(id);
              setSelectedSlot(null); // İşletme değişince seçili slotu sıfırla
              // RTK Query otomatik olarak detailedSlots'u güncelleyecek
              // setDetailedSlots([]); // Buna artık gerek yok
            }}
          />
          <DateSelector
            onSelectDate={(date, dayId, formatted) => {
              setSelectedDate(date);
              setSelectedDayId(dayId); // Eğer hala kullanıyorsanız kalsın
              setFormattedDate(formatted); // Eğer hala kullanıyorsanız kalsın
              setSelectedSlot(null); // Tarih değişince seçili slotu sıfırla
              // RTK Query otomatik olarak detailedSlots'u güncelleyecek
            }}
          />
          {loadingDetailedSlots ? (
            <p className="mt-4 text-center text-gray-500">
              Zaman dilimleri yükleniyor...
            </p>
          ) : detailedSlotsError ? (
            <p className="mt-4 text-center text-red-500">
              Zaman dilimlerini çekerken bir hata oluştu.
            </p>
          ) : detailedSlots.length === 0 ? (
            <p className="mt-4 text-center text-gray-500">
              Bu tarihte veya işletme için zaman dilimi bulunamadı.
            </p>
          ) : (
            <TimeSlots
              timeSlots={detailedSlots} // Doğrudan RTK Query'den gelen detailedSlots'u kullandık
              onSelect={(slot) => setSelectedSlot(slot)}
              selectedSlotId={selectedSlot?.id || null}
            />
          )}
        </div>
      </div>

      {/* Randevu detayları sadece bir slot seçildiğinde ve appointmentData varsa göster */}
      <div className="md:w-1/2 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Randevu Bilgileri</h1>
        <div className="w-full h-full border-2 border-gray-400 rounded-lg bg-gray-200 p-4 shadow-2xl">
          {selectedSlot && appointmentData?.[0] ? (
            <AppointmentDetails appointment={appointmentData?.[0]} />
          ) : (
            <div className="mt-4 p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold mb-2">
                Randevu Bilgisi Yok.
              </h3>
              <p className="text-gray-600">
                Detayları görmek için bir işletme, tarih ve zaman dilimi seçin.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessAppointmentsPage;
