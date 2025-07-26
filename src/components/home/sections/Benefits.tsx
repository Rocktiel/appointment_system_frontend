import React from "react";

export default function Benefits() {
  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-amber-400">
        Kimler İçin Tasarlandı? Herkes İçin Faydalar 🚀
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-amber-300">
            İşletme Sahipleri
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Boş zamanları azaltın, geliri artırın.</li>
            <li>Operasyonel verimliliği maksimize edin.</li>
            <li>Müşteri memnuniyetini ve sadakatini güçlendirin.</li>
            <li>Personel ve hizmet yönetimini kolaylaştırın.</li>
          </ul>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-amber-300">
            Müşterileriniz
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>7/24 kolay ve hızlı online randevu alma.</li>
            <li>Bekleme süresi olmadan, istediği zaman hizmet alma.</li>
            <li>Otomatik hatırlatmalarla randevu kaçırma derdine son.</li>
            <li>Favori personelini seçme özgürlüğü.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
