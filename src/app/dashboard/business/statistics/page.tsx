import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

const BusinessStatisticsPage = () => {
  return (
    <main className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        İşletme Kontrol Paneli
      </h1>
      <p className="text-lg text-gray-600">
        Hoş geldiniz! İşletmenizi buradan yönetebilirsiniz. 🎉
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Genel Bakış</CardTitle>
          <CardDescription>İşletmenizin güncel durumu.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Bugün için bekleyen randevular: 5</p>
          <p>Toplam aktif hizmetler: 12</p>
        </CardContent>
      </Card>
    </main>
  );
};

export default BusinessStatisticsPage;
