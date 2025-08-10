import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { menuItems } from "./menuItems";
interface DesktopMenuProps {
  toggleSidebar: () => void;
  handleLogout: () => void;
  isOpen?: boolean;
  pathname: string;
}
const BusinessDesktopMenu = ({
  toggleSidebar,
  handleLogout,
  isOpen = true,
  pathname,
}: DesktopMenuProps) => {
  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Desktop Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {isOpen && (
          <div>
            <h1 className="text-2xl font-bold">İşletme Paneli</h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Desktop Menu Links */}
      <nav className="flex-1 mt-4 space-y-2 px-2">
        {menuItems.map((item) => (
          <Link key={item.label} href={`/dashboard/business/${item.path}`}>
            <div
              className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                pathname === `/dashboard/business/${item.path}`
                  ? "bg-amber-500 text-white font-bold"
                  : ""
              }`}
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Desktop Logout Button */}
      {isOpen ? (
        <div className="flex items-center justify-center p-2">
          <Button
            className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-[70%] h-10 justify-around text-white hover:text-black mb-5"
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center p-2">
          <Button
            className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-10 h-10 justify-around text-white hover:text-black"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BusinessDesktopMenu;
