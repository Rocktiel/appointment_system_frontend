import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Clock, User, NotebookText } from "lucide-react";

const NextAppointmentCard = () => {
  // const { data: nextAppointment } = useGetNextAppointmentQuery();

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Sıradaki Randevu</CardTitle>
        <CardDescription>En yakın zamanlı randevu bilgileri</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center text-gray-700">
          <User className="h-5 w-5 mr-2 text-blue-500" />
          <span className="font-medium">Ali Yılmaz</span>
        </div>
        <div className="flex items-center text-gray-700">
          <NotebookText className="h-5 w-5 mr-2 text-green-500" />
          <span>Saç Kesimi</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock className="h-5 w-5 mr-2 text-amber-500" />
          <span>14:00 - 14:30</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextAppointmentCard;
