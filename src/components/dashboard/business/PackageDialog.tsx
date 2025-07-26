"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PackageCard from "./PackageCard";

interface Package {
  id: number;
  name: string;
  description: string;
  maxBusinesses: number;
  price: string;
}

interface PackageDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  packages: Package[];
  selectedPackageId: number | null;
  onSelectPackage: (id: number) => void;
  onSubscribe: () => void;
  error: string | null;
  isSubscribing: boolean;
}

const PackageDialog: React.FC<PackageDialogProps> = ({
  open,
  onOpenChange,
  packages,
  selectedPackageId,
  onSelectPackage,
  onSubscribe,
  error,
  isSubscribing,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[1200px] p-6">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900">
            Paket Seçimi Gerekli
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600">
            İşletmenizi kullanmaya başlamak için lütfen bir abonelik paketi
            seçin.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
            role="alert"
          >
            <strong className="font-bold">Hata!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-8 max-h-[400px] overflow-y-auto">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                isSelected={selectedPackageId === pkg.id}
                onSelect={onSelectPackage}
                isSubscribing={isSubscribing}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Mevcut paket bulunamadı.
            </p>
          )}
        </div>

        <Button
          className="w-full text-xl py-4 mt-4"
          onClick={onSubscribe}
          disabled={
            selectedPackageId === null || isSubscribing || packages.length === 0
          }
        >
          {isSubscribing ? "Abone Olunuyor..." : "Şimdi Abone Ol"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PackageDialog;
