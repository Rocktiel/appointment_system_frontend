// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//   return (
//     <div className="flex h-screen w-full">
//       {/* Sidebar vs. diğer layout elemanları */}
//       {children}
//     </div>
//   );
// };

// export default DashboardLayout;
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}

      {/* İçerik alanı */}
      <div className="flex flex-1 pt-16 md:pt-0 overflow-auto">
        {/* Sidebar vs. diğer layout elemanları buraya eklenebilir */}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
