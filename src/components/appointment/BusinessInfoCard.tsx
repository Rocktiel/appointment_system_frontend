"use client";

import type { BusinessDetails } from "@/lib/api-requests";
import React from "react";
import { MapPin, Info, Mail, Phone, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BusinessInfoCardProps {
  business: BusinessDetails;
}
export default function BusinessInfoCard({ business }: BusinessInfoCardProps) {
  return (
    <Card className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden my-4">
      <CardHeader className="bg-amber-100 dark:bg-amber-700 p-6 text-center">
        <CardTitle className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">
          {business.businessName}
        </CardTitle>
        <CardDescription className="text-amber-800 dark:text-amber-200 mt-2 text-lg">
          Online Randevu Sistemi
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-2 mb-4">
            İşletme Hakkında
          </h2>
          <p className="text-gray-700 dark:text-gray-300 flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
            <span>
              {business.businessDescription || "Açıklama bulunmamaktadır."}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>{business.businessAddress}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <Mail className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span>{business.businessEmail}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
            <Phone className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <span>{business.businessPhone}</span>
          </p>
          {business.businessWebsite && (
            <p className="text-gray-700 dark:text-gray-300 flex items-center space-x-3">
              <Globe className="h-5 w-5 text-indigo-500 flex-shrink-0" />
              <a
                href={business.businessWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {business.businessWebsite}
              </a>
            </p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
