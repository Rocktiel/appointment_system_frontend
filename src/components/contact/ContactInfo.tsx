import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-amber-300 mb-6">
        İletişim Bilgilerimiz
      </h2>
      <div className="space-y-6">
        {/* E-posta */}
        <div className="flex items-center space-x-4">
          <Mail className="h-6 w-6 text-amber-400" />
          <a
            href="mailto:info@brand.com"
            className="text-lg text-gray-200 hover:text-amber-400 transition-colors"
          >
            info@brand.com
          </a>
        </div>

        {/* Telefon */}
        <div className="flex items-center space-x-4">
          <Phone className="h-6 w-6 text-amber-400" />
          <a
            href="tel:+905551234567"
            className="text-lg text-gray-200 hover:text-amber-400 transition-colors"
          >
            +90 (555) 123 45 67
          </a>
        </div>

        {/* Adres */}
        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
          <span className="text-lg text-gray-200">
            Örnek Mah. Deneme Sok. No: 123
            <br />
            Çankaya, Ankara, Türkiye
          </span>
        </div>
      </div>
    </div>
  );
}
