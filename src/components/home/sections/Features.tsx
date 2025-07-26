import { CalendarDays, Users, CheckCircle2, BarChart4 } from "lucide-react";
import React from "react";

export default function Features() {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">
        İşletmenizi Dijitalleştirin: Temel Özellikler
      </h2>
      <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-300">
        Randevu yönetimini yeniden tanımlayan kapsamlı çözümlerimizle tanışın.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CalendarDays className="h-10 w-10 text-amber-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Online Randevu</h3>
          <p className="text-gray-300">
            Müşterileriniz 7/24 randevu alsın, siz işinize odaklanın.
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Users className="h-10 w-10 text-amber-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Müşteri Yönetimi</h3>
          <p className="text-gray-300">
            Müşteri geçmişi, tercihleri ve iletişim bilgilerini kolayca yönetin.
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CheckCircle2 className="h-10 w-10 text-amber-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Otomatik Hatırlatmalar</h3>
          <p className="text-gray-300">
            Randevu kaçaklarını azaltmak için SMS ve e-posta hatırlatmaları
            gönderin.
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <BarChart4 className="h-10 w-10 text-amber-400 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Detaylı Raporlama</h3>
          <p className="text-gray-300">
            İşletme performansınızı gösteren kapsamlı raporlarla kararlarınızı
            destekleyin.
          </p>
        </div>
      </div>
    </section>
  );
}
