import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserPlus, LogIn } from "lucide-react";

export const DesktopHeader = () => {
  return (
    <>
      {/* Ana Navigasyon - Büyük Ekranlar İçin */}
      <nav className="hidden md:flex flex-grow justify-center space-x-6 lg:space-x-8 ">
        <Link
          href="/"
          className="text-gray-300 font-semibold hover:scale-105 hover:text-white transition-colors"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/about"
          className="text-gray-300 font-semibold hover:scale-105 hover:text-white transition-colors"
        >
          Hakkında
        </Link>
        <Link
          href="/contact"
          className="text-gray-300 font-semibold hover:scale-105 hover:text-white transition-colors"
        >
          İletişim
        </Link>
        <Link
          href="/packages"
          className="text-gray-300 font-semibold hover:scale-105 hover:text-white transition-colors flex items-center space-x-1"
        >
          Paketler
        </Link>
        <Link
          href="/business"
          className="text-gray-300 font-semibold hover:scale-105 hover:text-white transition-colors flex items-center space-x-1"
        >
          Bizimle Çalışanlar
        </Link>
      </nav>

      {/* Auth Butonları - Büyük Ekranlar İçin */}
      <div className="hidden md:flex items-center space-x-3">
        <Button
          asChild
          variant="outline"
          className="text-white border-2 border-gray-600 bg-gray-900"
        >
          <Link href="/register" className="flex items-center space-x-1">
            <UserPlus className="h-4 w-4" />
            <span>Kayıt Ol</span>
          </Link>
        </Button>
        <Button
          asChild
          className="bg-white text-gray-900 border-2 border-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-600"
        >
          <Link href="/login" className="flex items-center space-x-1">
            <LogIn className="h-4 w-4" />
            <span>Giriş Yap</span>
          </Link>
        </Button>

        <Button
          asChild
          className="bg-amber-500 text-white font-bold border-2 border-amber-600 hover:bg-amber-600 hover:border-amber-700 hover:scale-105 transition-transform"
        >
          <Link href="/appointment/business">Randevu Al</Link>
        </Button>
      </div>
    </>
  );
};
