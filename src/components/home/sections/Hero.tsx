// components/sections/Hero.tsx
"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-screen overflow-hidden pt-14 flex items-center justify-end">
      <img
        src="/zorr.png"
        alt="Randevu Yönetimi"
        className="absolute inset-0 w-full h-full object-cover object-left mt-20 md:object-cover"
      />
      <div className="absolute right-6 md:right-10 lg:right-30 top-3/4 md:top-1/2 -translate-y-1/2 text-right z-10 lg:w-[50%]">
        <p className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-96 md:max-w-full">
          RANDEVULARINIZI
        </p>
        <p className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-96 md:max-w-full">
          KOLAYCA
        </p>
        <p className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-96 md:max-w-full">
          YÖNETİN
        </p>
        <Link href="/register">
          <button className="mt-6 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-lg shadow-xl hover:bg-amber-600 transition-colors md:inline-block cursor-pointer">
            Hemen Başlayın
          </button>
        </Link>
      </div>
    </div>
  );
}
