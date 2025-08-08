// components/AppointmentDetails.tsx

import React from "react";

interface ServiceDetails {
  id: number;
  name: string;
  price: number;
  durationMinutes: number;
}

interface AppointmentDetailsProps {
  appointment: {
    customerName: string;
    customerPhone: string;
    note: string;
    status: string;
    end_time: string;
    start_time: string;
    date: string;
    // Buraya ServiceDetails tipindeki 'service' objesini ekliyoruz
    service: ServiceDetails; // Backend'den gelen servis objesinin tipi
  } | null;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  if (!appointment) return null;

  const DetailInput: React.FC<{
    label: string;
    value: string | undefined | null;
  }> = ({ label, value }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ""} // null/undefined durumlarını boş string ile ele al
        readOnly
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-default"
      />
    </div>
  );

  return (
    <div className="mt-6 p-6  rounded-lg  w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Müşteri Bilgileri */}
        <div className="col-span-full md:col-span-1">
          <DetailInput label="Ad Soyad" value={appointment.customerName} />
        </div>
        <div className="col-span-full md:col-span-1">
          <DetailInput label="Telefon" value={appointment.customerPhone} />
        </div>

        {/* Hizmet Bilgisi */}
        {appointment.service && (
          <div className="col-span-full">
            <DetailInput
              label="Müşterinin Almak İstediği Hizmet"
              value={appointment.service.name}
            />
          </div>
        )}

        {/* Tarih ve Zaman Bilgileri */}
        <div className="col-span-full md:col-span-1">
          <DetailInput label="Randevu Tarihi" value={appointment.date} />
        </div>
        <div className="col-span-full md:col-span-1">
          <DetailInput
            label="Başlangıç Zamanı"
            value={appointment.start_time}
          />
        </div>
        <div className="col-span-full md:col-span-1">
          <DetailInput label="Bitiş Zamanı" value={appointment.end_time} />
        </div>
        <div className="col-span-full md:col-span-1">
          <DetailInput label="Durum" value={appointment.status} />
        </div>

        {/* Müşteri Notu (Textarea olarak daha uygun olabilir) */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Müşteri Notu
          </label>
          <textarea
            value={appointment.note || "Not bulunmamaktadır."}
            readOnly
            rows={3} // Not için daha fazla satır
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-default resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
