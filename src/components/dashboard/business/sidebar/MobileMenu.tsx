import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";
import { menuItems } from "./menuItems";
interface MobileMenuProps {
  toggleSidebar: () => void;
  handleLogout: () => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
  pathname: string;
}
const BusinessMobileMenu = ({
  toggleSidebar,
  handleLogout,
  showMobileMenu,
  setShowMobileMenu,
  pathname,
}: MobileMenuProps) => {
  return (
    <div className="w-full fixed top-0 z-50">
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-4 bg-gray-900 text-white border-b border-gray-700">
        <h1 className="text-xl font-bold">İşletme Paneli</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="bg-gray-900 text-white w-full absolute shadow-lg">
          <nav className="space-y-2 px-2 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={`/dashboard/business/${item.path}`}
                onClick={() => setShowMobileMenu(false)}
              >
                <div
                  className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                    pathname === `/dashboard/business/${item.path}`
                      ? "bg-amber-500 text-white font-bold"
                      : ""
                  }`}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-center p-4 border-t border-gray-700">
            <Button
              className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-full h-10 justify-center text-white hover:text-black"
              onClick={handleLogout}
            >
              Çıkış Yap
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessMobileMenu;
