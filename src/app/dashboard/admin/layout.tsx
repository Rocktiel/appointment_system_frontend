"use client";

import React from "react";
import AdminSidebar from "@/components/dashboard/admin/Sidebar";
import { AuthGuard } from "@/components/AuthGuard";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <AuthGuard>
      <div className="flex h-screen w-full bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </AuthGuard>
  );
};

export default AdminLayout;
