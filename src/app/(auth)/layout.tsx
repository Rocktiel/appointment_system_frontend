import { Header } from "@/components/header/page";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen  bg-gray-900">
      <Header />

      <div className="mt-30">{children}</div>
    </div>
  );
};

export default AuthLayout;
