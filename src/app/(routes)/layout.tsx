import React from "react";

import { Footer } from "@/components/footer/page";
import { Header } from "@/components/header/page";

interface RoutesLayoutProps {
  children: React.ReactNode;
}
const RoutesLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default RoutesLayout;
