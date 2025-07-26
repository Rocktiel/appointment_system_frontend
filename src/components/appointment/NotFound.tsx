import { Frown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 text-center">
      <Frown className="w-24 h-24 text-red-500 mb-6 animate-bounce-slow" />{" "}
      {/* Hata simgesi */}
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">İşletme Bulunamadı!</h2>
      <p className="text-lg mb-8 max-w-md">
        Aradığınız işletme şu anda mevcut değil veya yanlış bir bağlantıyı takip
        ettiniz.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Ana Sayfaya Dön
        </Link>
        {/* İsteğe bağlı olarak, farklı bir sayfaya yönlendirme veya iletişim bilgileri */}
        {/* <Link href="/contact" className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
          Yardım Al
        </Link> */}
      </div>
    </div>
  );
}
