"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserPlus, LogIn, X, Menu } from "lucide-react";

export const MobileHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
            <Menu className="!h-6 !w-6 text-white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[250px] sm:w-[300px] flex flex-col bg-gray-900 border-l border-gray-700"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between pl-2">
              <span className="text-xl font-bold text-white">Menü</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSheetOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="!h-6 !w-6" />
              </Button>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 pl-6 mt-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-lg"
              onClick={() => setIsSheetOpen(false)}
            >
              Ana Sayfa
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors text-lg"
              onClick={() => setIsSheetOpen(false)}
            >
              Hakkında
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors text-lg"
              onClick={() => setIsSheetOpen(false)}
            >
              İletişim
            </Link>
            <Link
              href="/packages"
              className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"
              onClick={() => setIsSheetOpen(false)}
            >
              <span>Paketler</span>
            </Link>
            <Link
              href="/business"
              className="text-gray-300 hover:text-white transition-colors text-lg flex items-center space-x-2"
              onClick={() => setIsSheetOpen(false)}
            >
              <span>Bizimle Çalışanlar</span>
            </Link>
          </nav>

          <div className="flex items-center flex-col gap-5 mt-8 border-t pt-6 border-gray-700">
            <Button
              asChild
              className="w-4/5 bg-white text-gray-900 border-2 border-gray-800 focus:bg-gray-900 focus:text-white focus:border-gray-600"
            >
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2"
                onClick={() => setIsSheetOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Giriş Yap</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-4/5 text-white border-2 border-gray-600 bg-gray-900 focus:bg-gray-900 focus:text-white focus:border-gray-600"
            >
              <Link
                href="/register"
                className="flex items-center justify-center space-x-2"
                onClick={() => setIsSheetOpen(false)}
              >
                <UserPlus className="h-4 w-4" />
                <span>Kayıt Ol</span>
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
