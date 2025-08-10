"use client";

import React from "react";
import { MapPin, Info, Mail, Phone, Globe, Navigation } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BusinessDetails } from "@/models/customer.model";

interface BusinessInfoCardProps {
  business: BusinessDetails;
}

export default function BusinessInfoCard({ business }: BusinessInfoCardProps) {
  const mapsUrl =
    business.businessLocationUrl ||
    `https://www.google.com/maps?q=${business.lat},${business.lng}`;

  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden my-4">
      {/* Header */}
      <CardHeader className="bg-amber-100 dark:bg-amber-700 p-6 text-center">
        <CardTitle className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">
          {business.businessName}
        </CardTitle>
        <CardDescription className="text-amber-800 dark:text-amber-200 mt-2 text-lg">
          Online Randevu Sistemi
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-8">
        {/* İşletme Hakkında */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white  pb-2 mb-4">
            İşletme Hakkında
          </h2>

          {/* Açıklama */}
          <p className="text-gray-700 dark:text-gray-300 flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <span>
              {business.businessDescription || "Açıklama bulunmamaktadır."}
            </span>
          </p>

          {/* Adres */}
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>
              {business.businessAddress}{" "}
              {business.county && business.city
                ? `- ${business.county}, ${business.city}`
                : ""}
            </span>
          </p>

          {/* Email (tıklanabilir) */}
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
            <a
              href={`mailto:${business.businessEmail}`}
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              {business.businessEmail}
            </a>
          </p>

          {/* Telefon (tıklanabilir) */}
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <Phone className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <a
              href={`tel:${business.businessPhone}`}
              className="hover:underline text-blue-600 dark:text-blue-400"
            >
              {business.businessPhone}
            </a>
          </p>

          {/* Web sitesi */}
          {business.businessWebsite && (
            <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
              <Globe className="h-5 w-5 text-indigo-500 flex-shrink-0" />
              <a
                href={business.businessWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                {business.businessWebsite}
              </a>
            </p>
          )}
        </section>

        {/* Harita Önizleme */}
        {business.lat && business.lng && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white pb-2 mb-4">
              Konum
            </h2>
            <div className="rounded-lg overflow-hidden shadow-md border-3 border-gray-900 ">
              <iframe
                title="İşletme Konumu"
                width="100%"
                height="250"
                style={{ border: 4, borderColor: "#000" }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${business.lat},${business.lng}&z=15&output=embed`}
              />
            </div>
            <Button
              variant="default"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white cursor-pointer"
              onClick={() => window.open(mapsUrl, "_blank")}
            >
              <Navigation className="w-4 h-4" />
              Yol Tarifi Al
            </Button>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
