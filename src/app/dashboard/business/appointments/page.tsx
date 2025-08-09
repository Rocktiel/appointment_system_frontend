// "use client";
// import AppointmentDetails from "@/components/dashboard/business/appointments/AppointmentDetails";
// import BusinessSelector2 from "@/components/dashboard/business/shared/BusinessSelector2";
// import DateSelector from "@/components/dashboard/business/DateSelection";
// import TimeSlots from "@/components/dashboard/business/time-slots/TimeSlots"; // Güncellenmiş TimeSlots bileşeni
// import { useState } from "react";
// // DetailedTimeSlot tipi için, models/customer.model'dan değil,
// // artık API tanımlarınızla uyumlu olan lib/api-requests.ts veya services/customerApi.ts'den import etmek daha doğru olacaktır.
// // veya services/customerApi.ts'den
// import {
//   useGetDetailedTimeSlotsQuery, // Yeni! Bu hook'u import ediyoruz
// } from "@/services/customerApi"; // customerApi.ts'ten import ettiğimizden emin olun
// import { DetailedTimeSlot } from "@/models/customer.model";
// import { useGetAppointmentByTimeSlotQuery } from "@/services/businessApi";
// // Eğer getDetailedTimeSlots'u artık kullanmayacaksak, bu import'u kaldırın:
// // import { getDetailedTimeSlots } from "@/lib/api-requests";

// const BusinessAppointmentsPage = () => {
//   const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
//     null
//   );
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedDayId, setSelectedDayId] = useState<number | null>(null); // Bu şu an kullanılmıyor gibi görünüyor, silinebilir
//   const [formattedDate, setFormattedDate] = useState<string | null>(null); // Bu da kullanılmıyor gibi görünüyor, silinebilir
//   const [selectedSlot, setSelectedSlot] = useState<DetailedTimeSlot | null>(
//     null
//   ); // Tipi DetailedTimeSlot olarak güncelledik

//   // RTK Query useGetDetailedTimeSlotsQuery Hook'u ile veri çekme
//   // businessId ve date değiştiğinde otomatik olarak yeniden çekme yapacak
//   const {
//     data: detailedSlots = [],
//     isLoading: loadingDetailedSlots,
//     error: detailedSlotsError,
//   } = useGetDetailedTimeSlotsQuery(
//     {
//       businessId: selectedBusinessId || "", // businessId string olmalı
//       date: selectedDate || "",
//     },
//     {
//       // Eğer selectedBusinessId veya selectedDate null ise sorguyu atla
//       skip: !selectedBusinessId || !selectedDate,
//       // Zaman dilimleri çok sık değişebilir, bu yüzden cache yenileme stratejisi önemlidir.
//       // Örneğin, 30 saniyede bir otomatik yenileme (polling):
//       // pollingInterval: 30000,
//       // veya verinin çok taze olması gerekiyorsa cache'i kapat:
//       // keepUnusedDataFor: 0,
//     }
//   );

//   // useGetAppointmentByTimeSlotQuery hook'u
//   const { data: appointmentData } = useGetAppointmentByTimeSlotQuery(
//     {
//       businessId: Number(selectedBusinessId) || 0,
//       date: selectedDate || "",
//       time_slot_template_id: selectedSlot?.id ?? 0,
//     },
//     { skip: !selectedDate || !selectedSlot || !selectedBusinessId } // Skip koşullarına businessId'yi de ekledik
//   );

//   // Eski `useEffect`'i artık kaldırdık, çünkü RTK Query yönetiyor
//   // useEffect(() => {
//   //   const fetchSlots = async () => { /* ... */ };
//   //   fetchSlots();
//   // }, [selectedBusinessId, selectedDate]);

//   return (
//     <div className="p-10 md:flex md:space-x-4 w-full bg-gray-200 h-screen">
//       <div className="md:w-1/2 flex flex-col items-center">
//         <h1 className="text-3xl font-bold mb-4">Randevu Seç</h1>
//         <div className="w-full h-full border-2 border-gray-400 rounded-lg bg-gray-200 p-4 shadow-2xl">
//           <BusinessSelector2
//             selectedBusinessId={selectedBusinessId}
//             onSelectBusiness={(id) => {
//               setSelectedBusinessId(id);
//               setSelectedSlot(null); // İşletme değişince seçili slotu sıfırla
//               // RTK Query otomatik olarak detailedSlots'u güncelleyecek
//               // setDetailedSlots([]); // Buna artık gerek yok
//             }}
//           />
//           <DateSelector
//             onSelectDate={(date, dayId, formatted) => {
//               setSelectedDate(date);
//               setSelectedDayId(dayId); // Eğer hala kullanıyorsanız kalsın
//               setFormattedDate(formatted); // Eğer hala kullanıyorsanız kalsın
//               setSelectedSlot(null); // Tarih değişince seçili slotu sıfırla
//               // RTK Query otomatik olarak detailedSlots'u güncelleyecek
//             }}
//           />
//           {loadingDetailedSlots ? (
//             <p className="mt-4 text-center text-gray-500">
//               Zaman dilimleri yükleniyor...
//             </p>
//           ) : detailedSlotsError ? (
//             <p className="mt-4 text-center text-red-500">
//               Zaman dilimlerini çekerken bir hata oluştu.
//             </p>
//           ) : detailedSlots.length === 0 ? (
//             <p className="mt-4 text-center text-gray-500">
//               Bu tarihte veya işletme için zaman dilimi bulunamadı.
//             </p>
//           ) : (
//             <TimeSlots
//               timeSlots={detailedSlots} // Doğrudan RTK Query'den gelen detailedSlots'u kullandık
//               onSelect={(slot) => setSelectedSlot(slot)}
//               selectedSlotId={selectedSlot?.id || null}
//             />
//           )}
//         </div>
//       </div>

//       {/* Randevu detayları sadece bir slot seçildiğinde ve appointmentData varsa göster */}
//       <div className="md:w-1/2 flex flex-col items-center">
//         <h1 className="text-3xl font-bold mb-4">Randevu Bilgileri</h1>
//         <div className="w-full h-full border-2 border-gray-400 rounded-lg bg-gray-200 p-4 shadow-2xl">
//           {selectedSlot && appointmentData?.[0] ? (
//             <AppointmentDetails appointment={appointmentData?.[0]} />
//           ) : (
//             <div className="mt-4 p-4 border rounded-lg shadow-sm bg-white">
//               <h3 className="text-lg font-semibold mb-2">
//                 Randevu Bilgisi Yok.
//               </h3>
//               <p className="text-gray-600">
//                 Detayları görmek için bir işletme, tarih ve zaman dilimi seçin.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessAppointmentsPage;
"use client";
import { useState } from "react";
import { useGetDetailedTimeSlotsQuery } from "@/services/customerApi";
import { useGetAppointmentByTimeSlotQuery } from "@/services/businessApi";
import { DetailedTimeSlot } from "@/models/customer.model";
import {
  PlusCircle,
  Calendar,
  Clock,
  Building,
  AlertCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BusinessSelector2 from "@/components/dashboard/business/shared/BusinessSelector2";
import DateSelector from "@/components/dashboard/business/DateSelection";
import TimeSlots from "@/components/dashboard/business/time-slots/TimeSlots";
import AppointmentDetails from "@/components/dashboard/business/appointments/AppointmentDetails";
import { CreateAppointmentForm } from "@/components/dashboard/business/appointments/CreateAppointmentForm";

const BusinessAppointmentsPage = () => {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<DetailedTimeSlot | null>(
    null
  );
  const [showCreateForm, setShowCreateForm] = useState(false);

  // RTK Query hooks
  const {
    data: detailedSlots = [],
    isLoading: loadingDetailedSlots,
    error: detailedSlotsError,
    isFetching,
  } = useGetDetailedTimeSlotsQuery(
    { businessId: selectedBusinessId || "", date: selectedDate || "" },
    { skip: !selectedBusinessId || !selectedDate }
  );

  const {
    data: appointmentData,
    isLoading: loadingAppointment,
    isError: appointmentError,
  } = useGetAppointmentByTimeSlotQuery(
    {
      businessId: Number(selectedBusinessId) || 0,
      date: selectedDate || "",
      time_slot_template_id: selectedSlot?.id ?? 0,
    },
    { skip: !selectedDate || !selectedSlot || !selectedBusinessId }
  );

  const handleSlotSelect = (slot: DetailedTimeSlot) => {
    setSelectedSlot(slot);
    setShowCreateForm(false);
  };

  const handleCreateNew = () => {
    setShowCreateForm(true);
  };

  const handleFormSuccess = () => {
    setShowCreateForm(false);
    // Burada verileri yenileyebilirsiniz
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Randevu Yönetimi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Seçim Paneli */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="text-blue-600" />
                <span>Randevu Seçimi</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Building className="h-4 w-4" />
                  <span>1. İşletme Seçimi</span>
                </div>
                <BusinessSelector2
                  selectedBusinessId={selectedBusinessId}
                  onSelectBusiness={(id) => {
                    setSelectedBusinessId(id);
                    setSelectedSlot(null);
                    setSelectedDate(null);
                    setShowCreateForm(false);
                  }}
                />
                {!selectedBusinessId && (
                  <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                    <AlertCircle className="h-4 w-4" />
                    <span>Lütfen bir işletme seçiniz</span>
                  </div>
                )}
              </div>

              {selectedBusinessId && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>2. Tarih Seçimi</span>
                  </div>
                  <DateSelector
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setSelectedSlot(null);
                      setShowCreateForm(false);
                    }}
                  />
                  {!selectedDate && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                      <AlertCircle className="h-4 w-4" />
                      <span>Lütfen bir tarih seçiniz</span>
                    </div>
                  )}
                </div>
              )}

              {selectedBusinessId && selectedDate && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>3. Zaman Dilimi Seçimi</span>
                  </div>

                  {loadingDetailedSlots || isFetching ? (
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded-md" />
                      ))}
                    </div>
                  ) : detailedSlotsError ? (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                      <AlertCircle className="h-4 w-4" />
                      <span>Zaman dilimleri yüklenirken hata oluştu</span>
                    </div>
                  ) : detailedSlots.length === 0 ? (
                    <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      <Info className="h-4 w-4" />
                      <span>Bu tarihte uygun zaman dilimi bulunamadı</span>
                    </div>
                  ) : (
                    <TimeSlots
                      timeSlots={detailedSlots}
                      onSelect={handleSlotSelect}
                      selectedSlotId={selectedSlot?.id || null}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detay Paneli */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="text-blue-600" />
                <span>Randevu Detayları</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {showCreateForm && selectedSlot ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">
                    Yeni Randevu Oluştur ({selectedSlot.start_time} -{" "}
                    {selectedSlot.end_time})
                  </h3>
                  <CreateAppointmentForm
                    timeSlot={selectedSlot}
                    businessId={Number(selectedBusinessId)}
                    date={selectedDate!}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowCreateForm(false)}
                  />
                </div>
              ) : loadingAppointment ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : selectedSlot && appointmentData?.[0] ? (
                <AppointmentDetails appointment={appointmentData[0]} />
              ) : selectedSlot ? (
                <div className="space-y-4 text-center py-8">
                  <div className="text-gray-500">
                    Bu zaman diliminde randevu bulunamadı
                  </div>
                  <Button
                    onClick={handleCreateNew}
                    variant="default"
                    className="gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Yeni Randevu Oluştur
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-2 text-gray-500">
                  <Info className="h-8 w-8" />
                  <p>
                    Detayları görmek için işletme, tarih ve zaman dilimi seçin
                  </p>
                </div>
              )}
            </CardContent>

            {/* {selectedSlot && !appointmentData?.[0] && !showCreateForm && (
              <CardFooter className="flex justify-center border-t pt-4">
                <Button
                  onClick={handleCreateNew}
                  variant="default"
                  className="gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Yeni Randevu Oluştur
                </Button>
              </CardFooter>
            )} */}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessAppointmentsPage;
