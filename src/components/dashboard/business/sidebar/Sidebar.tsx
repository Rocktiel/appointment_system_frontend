// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation"; // useRouter'ı import ediyoruz
// import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
// import { menuItems } from "./menuItems";
// import { Button } from "@/components/ui/button";
// import { useLogoutMutation } from "@/services/authApi"; // authApi'den useLogoutMutation'ı import ediyoruz

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const pathname = usePathname();
//   const router = useRouter(); // useRouter hook'unu kullanıyoruz
//   const [logout] = useLogoutMutation(); // logout mutation hook'unu çağırıyoruz

//   const handleLogout = async () => {
//     try {
//       await logout(undefined).unwrap(); // Logout isteğini gönderiyoruz
//       // Başarılı olursa localStorage'dan token'ı temizle ve giriş sayfasına yönlendir

//       // İhtiyaç duyulursa diğer oturum bilgilerini de temizle
//       router.push("/auth/login"); // Kullanıcıyı giriş sayfasına yönlendir
//     } catch (error) {
//       console.error("Çıkış yaparken hata oluştu:", error);
//       // Kullanıcıya hata mesajı gösterebilirsiniz (örn. bir toast bildirimi ile)
//       alert("Çıkış yapılırken bir sorun oluştu.");
//     }
//   };

//   return (
//     <div
//       className={`h-screen bg-gray-900 md:relative text-white flex flex-col transition-all duration-300 ${
//         isOpen ? "w-64 absolute z-50" : "w-16 relative"
//       }`}
//     >
//       {/* Sidebar header */}
//       <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
//         {isOpen && (
//           <div>
//             <h1 className="text-2xl font-bold">İşletme Paneli</h1>
//           </div>
//         )}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="ml-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
//         >
//           {isOpen ? <ChevronLeft /> : <ChevronRight />}
//         </button>
//       </div>

//       {/* Menu links */}
//       <nav className="flex-1 mt-4 space-y-2 px-2">
//         {menuItems.map((item) => (
//           <Link key={item.label} href={`/dashboard/business/${item.path}`}>
//             <div
//               className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
//                 pathname === `/dashboard/business/${item.path}`
//                   ? "bg-gray-800"
//                   : "" // Pathname'i tam olarak eşleştir
//               }`}
//             >
//               {item.icon}
//               {isOpen && <span className="text-sm">{item.label}</span>}
//             </div>
//           </Link>
//         ))}
//       </nav>

//       {/* Logout button */}
//       {isOpen ? (
//         <div className="flex items-center justify-center p-2">
//           <Button
//             className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-[70%] h-10 justify-around text-white hover:text-black"
//             onClick={handleLogout} // handleLogout fonksiyonunu çağırıyoruz
//           >
//             Çıkış Yap
//           </Button>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center p-2">
//           <Button
//             className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-10 h-10 justify-around text-white hover:text-black"
//             onClick={handleLogout} // handleLogout fonksiyonunu çağırıyoruz
//           >
//             <LogOut /> {/* Sadece iconu göster */}
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Menu, X } from "lucide-react";
import { menuItems } from "./menuItems";
import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "@/services/authApi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      router.push("/auth/login");
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
      alert("Çıkış yapılırken bir sorun oluştu.");
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileMenu(!showMobileMenu);
    } else {
      setIsOpen(!isOpen);
    }
  };

  if (isMobile) {
    return (
      <div className="w-full fixed top-0 z-50">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-gray-900 text-white border-b border-gray-700">
          <h1 className="text-xl font-bold">İşletme Paneli</h1>
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className="bg-gray-900 text-white w-full absolute shadow-lg">
            <nav className="space-y-2 px-2 py-4">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={`/dashboard/business/${item.path}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <div
                    className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                      pathname === `/dashboard/business/${item.path}`
                        ? "bg-gray-800"
                        : ""
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-center p-4 border-t border-gray-700">
              <Button
                className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-full h-10 justify-center text-white hover:text-black"
                onClick={handleLogout}
              >
                Çıkış Yap
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Desktop Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {isOpen && (
          <div>
            <h1 className="text-2xl font-bold">İşletme Paneli</h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Desktop Menu Links */}
      <nav className="flex-1 mt-4 space-y-2 px-2">
        {menuItems.map((item) => (
          <Link key={item.label} href={`/dashboard/business/${item.path}`}>
            <div
              className={`flex items-center gap-3 p-3.5 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                pathname === `/dashboard/business/${item.path}`
                  ? "bg-amber-500 text-white font-bold"
                  : ""
              }`}
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>

      {/* Desktop Logout Button */}
      {isOpen ? (
        <div className="flex items-center justify-center p-2">
          <Button
            className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-[70%] h-10 justify-around text-white hover:text-black mb-5"
            onClick={handleLogout}
          >
            Çıkış Yap
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center p-2">
          <Button
            className="cursor-pointer bg-red-600 hover:bg-red-500 transition-colors rounded-xl w-10 h-10 justify-around text-white hover:text-black"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
