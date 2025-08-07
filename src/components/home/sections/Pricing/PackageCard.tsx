"use client";

import { Check } from "lucide-react";
import React from "react";

interface PackageCardProps {
  name: string;
  price: string;
  description: string;
  maxBusinesses: number;
  onSelect?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  name,
  price,
  description,
  maxBusinesses,
  onSelect,
}) => {
  return (
    <div className="bg-gray-700 p-8 rounded-lg shadow-xl flex flex-col items-center border border-transparent hover:border-amber-500 transition-all duration-300 hover:scale-105">
      <h3 className="text-2xl font-bold text-amber-400 mb-4">{name}</h3>
      <p className="text-5xl font-extrabold mb-6">
        {price} <span className="text-xl font-normal text-gray-300">TL/Ay</span>
      </p>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="text-gray-200 text-left w-full max-w-[200px] mx-auto space-y-2 mb-6">
        <li className="flex items-center">
          <Check className="h-5 w-5 text-green-400 mr-2" />
          {maxBusinesses === 1
            ? "1 İşletme Kaydı"
            : `${maxBusinesses} İşletme Kaydı`}
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-green-400 mr-2" />
          Sınırsız Randevu
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-green-400 mr-2" />
          Otomatik Hatırlatmalar
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-green-400 mr-2" />
          Müşteri Yönetimi
        </li>
      </ul>
      <button
        className="mt-auto px-8 py-3 bg-amber-500 text-gray-900 font-bold rounded-lg shadow-md hover:bg-amber-400 transition-colors cursor-pointer"
        onClick={onSelect}
      >
        Bu Planı Seç
      </button>
    </div>
  );
};

export default PackageCard;
