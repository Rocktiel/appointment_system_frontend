import Sidebar from "@/components/dashboard/business/Sidebar";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface BusinessLayoutProps {
  children: React.ReactNode;
}

const BusinessLayout = async ({ children }: BusinessLayoutProps) => {
  const cookieStore = cookies();
  const refreshToken = (await cookieStore).get("refresh_token");

  if (!refreshToken) {
    redirect("/login");
  }
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-white w-full">{children}</div>
    </div>
  );
};

export default BusinessLayout;
