import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import React from "react";
interface NextAppointmentCardProps {
  nextAppointment?: {
    time: string;
    service: string;
    name: string;
    note: string;
  };
}
const NextAppointmentCard = ({ nextAppointment }: NextAppointmentCardProps) => {
  return (
    <Card className="flex flex-col h-full shadow-md border-l-5 border-red-500 hover:scale-105 transition-transform">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Sıradaki Randevu</CardTitle>
        <Clock className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        {/* isLoading ? (
          <p>Yükleniyor...</p>
        ) : */}
        {nextAppointment ? (
          <>
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-bold">{nextAppointment.time}</span>
              <p className="text-sm font-medium text-gray-500">
                {nextAppointment.service}
              </p>
            </div>
            <p className="text-md text-gray-800 mt-2">
              <span className="font-semibold">{nextAppointment.name}</span> ile
              randevunuz var.
            </p>
          </>
        ) : (
          <p className="text-gray-500">Bugün başka randevunuz yok.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NextAppointmentCard;
