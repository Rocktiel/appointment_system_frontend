interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar vs. diğer layout elemanları */}
      {children}
    </div>
  );
};

export default DashboardLayout;
