// // components/TimeSlots.tsx
// import React from "react";

// interface TimeSlot {
//   id: number;
//   start_time: string;
//   end_time: string;
//   day: {
//     id: number;
//     day_name: string;
//   };
// }

// interface TimeSlotsProps {
//   timeSlots: TimeSlot[];
//   onSelect: (slot: TimeSlot) => void;
//   selectedSlotId: number | null;
// }

// const TimeSlots: React.FC<TimeSlotsProps> = ({
//   timeSlots,
//   onSelect,
//   selectedSlotId,
// }) => {
//   return (
//     <div className="grid grid-cols-2 gap-3">
//       {timeSlots.map((slot) => (
//         <button
//           key={slot.id}
//           onClick={() => onSelect(slot)}
//           className={`p-3 rounded-md border ${
//             selectedSlotId === slot.id ? "bg-blue-500 text-white" : "bg-white"
//           }`}
//         >
//           {slot.start_time} - {slot.end_time}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default TimeSlots;
import React from "react";
import { cn } from "@/lib/utils"; // cn utility'nizi import ettiğinizden emin olun

interface DetailedTimeSlot {
  // Tip adını API çıktınıza göre güncelledik
  id: number;
  start_time: string;
  end_time: string;
  isAvailableForBooking: boolean; // Yeni eklenen özellik
  // Eğer API'den gelen day objesine ihtiyacınız varsa burada tutabilirsiniz,
  // ancak şimdilik bu bileşenin kendisi için doğrudan kullanılmıyor gibi görünüyor.
  // day: {
  //   id: number;
  //   day_name: string;
  // };
}

interface TimeSlotsProps {
  timeSlots: DetailedTimeSlot[]; // Tipi DetailedTimeSlot[] olarak değiştirdik
  onSelect: (slot: DetailedTimeSlot) => void;
  selectedSlotId: number | null;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  timeSlots,
  onSelect,
  selectedSlotId,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
      {timeSlots.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
          Seçilen tarih için müsait zaman dilimi bulunmamaktadır.
        </p>
      ) : (
        timeSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => onSelect(slot)}
            // Basılabilir olmasını istiyorsunuz ama rengi değişecek
            // Bu yüzden `disabled` kullanmıyoruz, sadece stil ile belirtiyoruz
            className={cn(
              "p-3 rounded-md border flex items-center justify-center text-sm font-medium transition-colors duration-200",
              selectedSlotId === slot.id
                ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600 cursor-pointer" // Seçili ve müsaitse (mavi)
                : slot.isAvailableForBooking
                ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-300 dark:bg-green-800 " // Müsaitse (yeşil)
                : "bg-red-100 text-red-800 hover:bg-red-100 border-red-300 cursor-pointer  opacity-90 " // Müsait değilse (kırmızı, basılabilir ama görsel olarak farklı)
            )}
            // Eğer "basılabilir" derken gerçekten tıklanmasını istiyorsanız `disabled`'ı kaldırın.
            // Ancak genellikle müsait olmayan slotlar tıklanamaz olur.
            // Eğer sadece görsel olarak farklı olup tıklanmasını istiyorsanız `disabled={!slot.isAvailableForBooking}` satırını yorum satırı yapın veya kaldırın.
            // Ben "basılabilir" olarak yorumlayıp `disabled`'ı kaldırdım, sadece görsel olarak farkını belirttim.
            // Eğer gerçekten tıklanamaz olmalıysa, aşağıdaki satırı aktif edin:
            // disabled={!slot.isAvailableForBooking}
          >
            {slot.start_time} - {slot.end_time}
          </button>
        ))
      )}
    </div>
  );
};

export default TimeSlots;
