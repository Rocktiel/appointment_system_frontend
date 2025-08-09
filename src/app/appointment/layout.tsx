import React from "react";
interface AppointmentLayoutProps {
  children: React.ReactNode;
}
const AppointmentLayout = ({ children }: AppointmentLayoutProps) => {
  return <div>{children}</div>;
};

export default AppointmentLayout;
