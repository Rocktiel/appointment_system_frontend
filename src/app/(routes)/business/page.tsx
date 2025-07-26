"use client";

import { Building2, Handshake, Users2 } from "lucide-react";

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-400 mb-8 text-center">
          Bizimle Çalışanlar ve İş Birlikleri
        </h1>
        <p className="text-lg text-gray-300 mb-12 text-center">
          Güçlü ortaklıklar kurarak ve entegrasyonlar sağlayarak ekosistemimizi
          genişletiyoruz. Sizinle de iş birliği yapmaktan mutluluk duyarız.
        </p>

        <div className="space-y-16">
          <section className="text-center">
            <h2 className="text-3xl font-bold text-amber-300 mb-8">
              İş Birliği Alanları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Handshake className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">
                  Stratejik Ortaklıklar
                </h3>
                <p className="text-gray-300">
                  Teknoloji, pazarlama veya satış alanlarında karşılıklı fayda
                  sağlayacak ortaklıklar.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Building2 className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">
                  Sistem Entegrasyonları
                </h3>
                <p className="text-gray-300">
                  Mevcut yazılımlarınızla veya üçüncü taraf uygulamalarla
                  entegrasyon fırsatları.
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <Users2 className="h-12 w-12 text-amber-400 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Bayilik Programı</h3>
                <p className="text-gray-300">
                  Çözümlerimizi müşterilerinize sunmak isteyen bayiler için özel
                  programlar.
                </p>
              </div>
            </div>
          </section>

          {/* İŞBİRLİKLERİ (Örnek) */}
          <section className="text-center">
            <h2 className="text-3xl font-bold text-amber-300 mb-8">
              Başarılı Ortaklarımızdan Bazıları
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {/* <img
                src=""
                alt="Partner 1"
                className="h-16 opacity-75 hover:opacity-100 transition-opacity"
              />
              <img
                src=""
                alt="Partner 2"
                className="h-16 opacity-75 hover:opacity-100 transition-opacity"
              />
              <img
                src=""
                alt="Partner 3"
                className="h-16 opacity-75 hover:opacity-100 transition-opacity"
              /> */}
              {/* TODO: İŞBİRLİKLERİ VERİTABANINDAN GELECEK */}
            </div>
            <p className="text-gray-400 mt-8 text-lg">
              Siz de iş birliği ağımıza katılın!
            </p>
          </section>

          <section className="text-center bg-gray-800 p-10 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">
              İş Birliği Fırsatları İçin Bize Ulaşın
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              İşletmenizin potansiyelini birlikte keşfedelim. İş birliği için
              formu doldurun veya doğrudan bizimle iletişime geçin.
            </p>
            <a
              href={`/contact`}
              className="px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-full text-xl shadow-lg hover:bg-amber-400 transition-colors transform hover:scale-105 inline-block"
            >
              İletişim Formuna Git
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
