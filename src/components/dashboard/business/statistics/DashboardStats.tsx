// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Calendar, Users, Briefcase } from "lucide-react";

// const DashboardStats = () => {
//   // const { data } = useGetBusinessStatsQuery();
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//       <Card className="shadow-md border-l-4 border-blue-500">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">
//             Bugünkü Randevular
//           </CardTitle>
//           <Calendar className="h-5 w-5 text-blue-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">8</div>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md border-l-4 border-green-500">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
//           <Users className="h-5 w-5 text-green-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">124</div>
//         </CardContent>
//       </Card>

//       <Card className="shadow-md border-l-4 border-amber-500">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Aktif Hizmetler</CardTitle>
//           <Briefcase className="h-5 w-5 text-amber-500" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">12</div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DashboardStats;
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const DashboardStats = () => {
  // API Entegrasyonu için:
  // const { data } = useGetDashboardStats(); // GET /api/dashboard/stats

  const stats = [
    { title: "Bugünkü Randevular", value: "12", trend: "+2%" },
    { title: "Onay Bekleyen", value: "3", trend: "0%" },
    { title: "Toplam Müşteri", value: "154", trend: "+5%" },
    { title: "Aylık Gelir", value: "₺8,450", trend: "+12%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-green-500">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
