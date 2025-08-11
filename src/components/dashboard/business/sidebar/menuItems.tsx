import {
  Building2,
  Scissors,
  Clock4,
  Settings,
  Home,
  Boxes,
  MapPinPlus,
  ChartNoAxesCombined,
  CalendarPlus,
  CalendarDays,
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
    icon: <MapPinPlus size={20} />,
    path: "createBusiness",
  },
  {
    label: "Randevu Yönetimi",
    icon: <CalendarPlus size={20} />,
    path: "appointments",
  },
  {
    label: "Takvim",
    icon: <CalendarDays size={20} />,
    path: "calendar",
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
    label: "İstatistikler",
    icon: <ChartNoAxesCombined size={20} />,
    path: "statistics",
  },
  {
    label: "Aboneliğim",
    icon: <Boxes size={20} />,
    path: "subscription",
  },
  {
    label: "Ayarlar",
    icon: <Settings size={20} />,
    path: "settings",
  },
];
