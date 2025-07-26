"use client";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/dashboard/business/Sidebar";
import React from "react";
// Sidebar bileşeninizin yolunu doğru şekilde import edin

interface BusinessLayoutProps {
  children: React.ReactNode;
}

const BusinessLayout = ({ children }: BusinessLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <AuthGuard requiredRole="BUSINESS">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-white w-full">{children}</div>
      </AuthGuard>
    </div>
  );
};

export default BusinessLayout;
