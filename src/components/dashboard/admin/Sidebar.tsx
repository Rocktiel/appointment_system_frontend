"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { adminMenuItems } from "./menuItems";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {isOpen && (
          <div>
            <h1 className="text-xl font-bold">Admin Paneli</h1>
            <p className="text-sm text-gray-400 mt-1">Yönetim Sistemi</p>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Menu links - Gruplandırılmış */}
      <nav className="flex-1 mt-4 space-y-1 px-2 overflow-y-auto">
        {/* Yönetim Grubu */}
        {isOpen && (
          <p className="text-xs font-semibold text-gray-400 px-3 py-2 uppercase tracking-wider">
            Yönetim
          </p>
        )}
        {adminMenuItems.slice(0, 4).map((item) => (
          <Link key={item.label} href={`/dashboard/admin/${item.path}`}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                pathname === `/dashboard/admin/${item.path}`
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* İşletmeler Grubu */}
        {isOpen && (
          <p className="text-xs font-semibold text-gray-400 px-3 py-2 mt-4 uppercase tracking-wider">
            İşletmeler
          </p>
        )}
        {adminMenuItems.slice(4, 6).map((item) => (
          <Link key={item.label} href={`/dashboard/admin/${item.path}`}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                pathname === `/dashboard/admin/${item.path}`
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* Sistem Grubu */}
        {isOpen && (
          <p className="text-xs font-semibold text-gray-400 px-3 py-2 mt-4 uppercase tracking-wider">
            Sistem
          </p>
        )}
        {adminMenuItems.slice(6).map((item) => (
          <Link key={item.label} href={`/dashboard/admin/${item.path}`}>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                pathname === `/dashboard/admin/${item.path}`
                  ? "bg-gray-800"
                  : ""
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isOpen && (
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer - Kullanıcı bilgisi */}
      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-xs font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-400">Yönetici</p>
              </div>
            </div>
            <div>
              <button className="text-gray-400 hover:text-white transition-colors flex space-x-2 items-center cursor-pointer justify-center">
                <p> Çıkış Yap</p>
                <LogOut size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button className="text-gray-400 hover:text-white transition-colors flex space-x-2 items-center cursor-pointer justify-center">
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
