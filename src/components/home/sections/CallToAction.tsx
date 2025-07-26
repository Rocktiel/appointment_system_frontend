"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function CallToAction() {
  const router = useRouter();
  return (
    <section className="text-center bg-gray-700 p-12 rounded-lg shadow-xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-400">
        Hazır Mısınız? İşletmenizi Büyütün! 💪
      </h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
        Randevu yönetiminin zorluklarını bir kenara bırakın ve işinize
        odaklanın. Hemen kaydolun ve farkı yaşayın.
      </p>
      <button
        onClick={() => router.push("/register")}
        className="px-8 py-4 bg-amber-500 text-gray-900 font-bold rounded-full text-xl shadow-2xl hover:bg-amber-400 transition-colors transform hover:scale-105 cursor-pointer"
      >
        Hemen Deneyin!
      </button>
    </section>
  );
}
