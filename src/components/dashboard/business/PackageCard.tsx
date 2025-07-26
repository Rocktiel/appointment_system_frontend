import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon } from "lucide-react";

interface Package {
  id: number;
  name: string;
  description: string;
  maxBusinesses: number;
  price: string;
}

interface PackageCardProps {
  pkg: Package;
  isSelected: boolean;
  onSelect: (id: number) => void;
  isSubscribing: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isSelected,
  onSelect,
  isSubscribing,
}) => {
  return (
    <Card
      key={pkg.id}
      className={`relative flex flex-col justify-between p-6 border-2 ${
        isSelected ? "border-blue-500 shadow-lg" : "border-gray-200"
      } hover:border-blue-400 transition-all duration-300 cursor-pointer`}
      onClick={() => onSelect(pkg.id)}
    >
      {isSelected && (
        <CheckCircleIcon className="absolute top-3 right-3 text-blue-500 w-6 h-6" />
      )}
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {pkg.name}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {pkg.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 mb-6">
        <div className="text-4xl font-extrabold text-gray-900">
          {parseFloat(pkg.price) === 0
            ? "Ücretsiz"
            : `${parseFloat(pkg.price).toFixed(2)} TL`}
          {parseFloat(pkg.price) !== 0 && (
            <span className="text-base font-medium text-gray-500">/ay</span>
          )}
        </div>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>Maksimum İşletme Sayısı: {pkg.maxBusinesses}</li>
        </ul>
      </CardContent>
      <CardFooter className="p-0 mt-auto">
        <Button
          className="w-full text-lg py-3"
          onClick={(e) => {
            e.stopPropagation(); // Kart tıklamasından ayrıştır
            onSelect(pkg.id);
          }}
          disabled={isSelected || isSubscribing}
        >
          {isSelected ? "Seçildi" : "Paketi Seç"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageCard;
