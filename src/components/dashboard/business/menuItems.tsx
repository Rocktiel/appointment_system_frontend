import {
  Building2,
  CalendarCheck,
  Scissors,
  Clock4,
  Settings,
  Home,
} from "lucide-react";
import { ReactNode } from "react";

interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    label: "Ana Sayfa",
    icon: <Home size={20} />,
    path: "/",
  },
  {
    label: "İşletme Bilgileri",
    icon: <Building2 size={20} />,
    path: "profile",
  },
  {
    label: "İşletme Ekle",
    icon: <Building2 size={20} />,
    path: "createBusiness",
  },
  {
    label: "Randevu Yönetimi",
    icon: <CalendarCheck size={20} />,
    path: "appointments",
  },
  {
    label: "Hizmetler",
    icon: <Scissors size={20} />,
    path: "services",
  },
  {
    label: "Zaman Dilimleri",
    icon: <Clock4 size={20} />,
    path: "time-slots",
  },
  {
    label: "Ayarlar",
    icon: <Settings size={20} />,
    path: "settings",
  },
];
