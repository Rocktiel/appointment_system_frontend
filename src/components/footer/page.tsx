import React from "react";
import Link from "next/link";
import {
  Mountain,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-amber-400" />
            <span className="font-bold text-xl text-white">Brand</span>
          </Link>
          <p className="text-gray-400">
            Kapsamlı çözümlerimizle işinizi bir sonraki seviyeye taşıyın.
          </p>
          <p className="text-gray-400">
            Yenilikçi ve güvenilir hizmetler sunuyoruz.
          </p>
          <div className="flex space-x-3 mt-4 justify-center md:justify-start">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <a href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <a href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <a href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Hızlı Bağlantılar */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-lg font-bold text-white mb-4">
            Hızlı Bağlantılar
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-center md:justify-start">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Ana Sayfa
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Hakkında
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/services"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Hizmetler
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Destek */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-lg font-bold text-white mb-4">Destek</h3>
          <ul className="space-y-2">
            <li className="flex justify-center md:justify-start">
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                İletişim
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors"
              >
                SSS
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Gizlilik Politikası
              </Link>
            </li>
            <li className="flex justify-center md:justify-start">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Kullanım Şartları
              </Link>
            </li>
          </ul>
        </div>

        {/* İletişim Bilgileri */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <h3 className="text-lg font-bold text-white mb-4">Bize Ulaşın</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <Mail className="h-4 w-4 text-amber-400" />
              <span>info@yourcompany.com</span>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <Phone className="h-4 w-4 text-amber-400" />
              <span>+90 123 456 7890</span>
            </li>
            <li className="flex items-center space-x-2 justify-center md:justify-start">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>Ankara, Türkiye</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Alt Telif Hakkı ve Linkler */}
      <div className="w-full mx-auto text-center mt-10 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Your Brand. Tüm Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};
