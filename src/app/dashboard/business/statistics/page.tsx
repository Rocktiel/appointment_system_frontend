import { DashboardStats } from "@/components/dashboard/business/statistics/DashboardStats";
import NextAppointmentCard from "@/components/dashboard/business/statistics/NextAppointmentCard";
import TodayAppointmentsList from "@/components/dashboard/business/statistics/TodayAppointmentList";
import React from "react";

const BusinessStatisticsPage = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        İşletme Kontrol Paneli
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Hoş geldiniz! İşletmenizi buradan yönetebilirsiniz. 🎉
      </p>

      {/* Genel İstatistikler */}
      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Sıradaki Randevu */}
        <NextAppointmentCard />

        {/* Bugünün Randevu Listesi */}
        <TodayAppointmentsList />
      </div>
    </main>
  );
};

export default BusinessStatisticsPage;
