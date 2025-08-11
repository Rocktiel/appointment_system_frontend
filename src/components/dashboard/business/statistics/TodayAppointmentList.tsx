import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Clock, User } from "lucide-react";

const TodayAppointmentsList = () => {
  // const { data: todayAppointments } = useGetTodayAppointmentsQuery();
  const todayAppointments = [
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

  return (
    <Card className="shadow-md max-w-full">
      <CardHeader>
        <CardTitle>Bugünün Randevuları</CardTitle>
        <CardDescription>Tüm günün planı</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {todayAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex items-center">
                <User className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium">{apt.name}</p>
                  <p className="text-xs text-gray-500">{apt.service}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                {apt.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodayAppointmentsList;
