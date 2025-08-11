import { Header } from "@/components/header/page";

import React from "react";
interface AppointmentLayoutProps {
  children: React.ReactNode;
}
const AppointmentLayout = ({ children }: AppointmentLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AppointmentLayout;
