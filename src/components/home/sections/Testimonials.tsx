import React from "react";

export default function Testimonials() {
  return (
    <section className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">
        Müşterilerimiz Ne Diyor? 🗣️
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-left">
          <p className="italic mb-4 text-gray-200">
            "Bu sistem işletmemizin randevu süreçlerini tamamen değiştirdi.
            Artık daha az telefonla uğraşıyor, daha çok müşteriye hizmet
            veriyoruz!"
          </p>
          <p className="font-semibold text-amber-300">
            - Ayşe Yılmaz, Şık Kuaför Salonu Sahibi
          </p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-left">
          <p className="italic mb-4 text-gray-200">
            "Müşterilerimin online randevu alabilmesi, hem benim hem de onların
            hayatını kolaylaştırdı. Otomatik hatırlatmalar sayesinde randevu
            kaçırma oranımız sıfırlandı."
          </p>
          <p className="font-semibold text-amber-300">
            - Can Demir, Modern Berber Stüdyosu
          </p>
        </div>
      </div>
    </section>
  );
}
