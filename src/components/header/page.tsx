"use client";

import Link from "next/link";
import { Mountain } from "lucide-react";
import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import { useState, useEffect } from "react";

export const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 300;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY || window.scrollY < scrollThreshold) {
        setShowHeader(true);
      } else if (
        window.scrollY > lastScrollY &&
        window.scrollY > scrollThreshold
      ) {
        setShowHeader(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, scrollThreshold]);

  return (
    <header
      className={`
        bg-gray-900 py-3 px-4 sm:px-6 lg:px-8 shadow-2xl border-b-0 border-gray-700
        fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
        ${showHeader ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className="h-7 w-7 text-amber-400" />
          <span className="font-bold text-lg text-white">Brand</span>
        </Link>

        <DesktopHeader />
        <MobileHeader />
      </div>
    </header>
  );
};
