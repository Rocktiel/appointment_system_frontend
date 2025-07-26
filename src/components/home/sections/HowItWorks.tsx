import React from "react";

export default function HowItWorks() {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">
        Randevu Yönetimi Hiç Bu Kadar Kolay Olmamıştı!
      </h2>
      <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-300">
        İşletmenizi dijitalleştirmek sadece üç basit adımda mümkün.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="flex flex-col items-center">
          <div className="bg-amber-500 text-gray-900 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">İşletmenizi Kaydedin</h3>
          <p className="text-gray-300">
            Hızlı ve basit kayıt süreciyle dakikalar içinde platforma katılın.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-amber-500 text-gray-900 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Hizmetlerinizi ve Takviminizi Tanımlayın
          </h3>
          <p className="text-gray-300">
            Sunulan hizmetleri, fiyatları ve müsaitlik durumunu kolayca
            ayarlayın.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-amber-500 text-gray-900 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold mb-4">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Randevuları Kabul Edin</h3>
          <p className="text-gray-300">
            Müşterileriniz online randevu alırken, siz rahatlayın ve işinize
            odaklanın.
          </p>
        </div>
      </div>
    </section>
  );
}
