import WeeklyCalendar from "@/components/dashboard/business/calendar/WeeklyCalendar";
import DashboardHeader from "@/components/dashboard/business/home/DashboardHeader";
import NextAppointmentCard from "@/components/dashboard/business/home/NextAppointmentCard";
import { DashboardStats } from "@/components/dashboard/business/statistics/DashboardStats";

import StatisticsCard from "@/components/dashboard/business/statistics/StatisticsCard";
import TodayAppointmentsList from "@/components/dashboard/business/statistics/TodayAppointmentList";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BanknoteArrowDown,
  CalendarDays,
  Plus,
  Users,
} from "lucide-react";
import React from "react";
const mockAppointments = [
  {
    id: 1,
    name: "Ali Yılmaz",
    service: "Saç Kesimi",
    time: "10:30",
    note: "Lütfen zamanında gelin.",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    service: "Manikür",
    time: "11:00",
    note: "Lütfen zamanında gelin.",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    service: "Saç Boyama",
    time: "14:00",
    note: "Lütfen zamanında gelin.",
  },
  {
    id: 4,
    name: "Zeynep Arslan",
    service: "Cilt Bakımı",
    time: "15:30",
    note: "Lütfen zamanında gelin.",
  },
];
const BusinessHomePage = () => {
  const todayAppointmentCount = 5;
  const totalAppointmentCount = 521;
  const activeServices = "5.000 ₺";
  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <DashboardHeader />
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatisticsCard
          title="Bugünkü Randevu Sayısı"
          value={todayAppointmentCount}
          description="Bugün için bekleyen randevular"
          icon={<Users className="h-4 w-4 text-gray-500" />}
        />

        <StatisticsCard
          title="Bugün Tahmini Gelir"
          value={activeServices}
          description="Bugün için tahmini gelir"
          icon={<BanknoteArrowDown className="h-4 w-4 text-gray-500" />}
        />
        <NextAppointmentCard nextAppointment={mockAppointments[0]} />
      </section>
      {/* Genel İstatistikler */}
      {/* <DashboardStats /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Sıradaki Randevu */}
        {/* <NextAppointmentCard /> */}

        {/* Bugünün Randevu Listesi */}
        <TodayAppointmentsList />
      </div>
    </main>
  );
};

export default BusinessHomePage;
