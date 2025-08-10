"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLogoutMutation } from "@/services/authApi";
import BusinessDesktopMenu from "./DesktopMenu";
import BusinessMobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/useIsMobile";

const Sidebar = () => {
  const isMobile = useIsMobile(768);
  const [isOpen, setIsOpen] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
      alert("Çıkış yapılırken bir sorun oluştu.");
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return isMobile ? (
    <BusinessMobileMenu
      toggleSidebar={toggleSidebar}
      handleLogout={handleLogout}
      showMobileMenu={showMobileMenu}
      setShowMobileMenu={setShowMobileMenu}
      pathname={pathname}
    />
  ) : (
    <BusinessDesktopMenu
      isOpen={isOpen}
      toggleSidebar={toggleSidebar}
      handleLogout={handleLogout}
      pathname={pathname}
    />
  );
};

export default Sidebar;
