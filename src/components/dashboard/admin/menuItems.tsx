import {
  Users,
  Building2,
  BarChart4,
  Settings,
  Shield,
  FileText,
  AlertCircle,
  CreditCard,
  Box,
} from "lucide-react";
import { ReactNode } from "react";

interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
  badge?: string; // Yeni özellik ekledik
}

export const adminMenuItems: MenuItem[] = [
  // Ana Dashboard
  {
    label: "Genel Bakış",
    icon: <BarChart4 size={20} />,
    path: "",
    badge: "Yeni",
  },

  // Kullanıcı Yönetimi
  {
    label: "Kullanıcılar",
    icon: <Users size={20} />,
    path: "users",
  },
  {
    label: "Admin Yöneticileri",
    icon: <Shield size={20} />,
    path: "admins",
  },

  // İşletme Yönetimi
  {
    label: "İşletmeler",
    icon: <Building2 size={20} />,
    path: "business",
  },
  {
    label: "Paketler",
    icon: <Box size={20} />,
    path: "packages",
  },

  // Finans & Raporlar
  {
    label: "Ödemeler",
    icon: <CreditCard size={20} />,
    path: "payments",
  },
  {
    label: "Raporlar",
    icon: <FileText size={20} />,
    path: "reports",
  },

  // Sistem Ayarları
  {
    label: "Sistem Ayarları",
    icon: <Settings size={20} />,
    path: "settings",
  },
  {
    label: "Şikayetler",
    icon: <AlertCircle size={20} />,
    path: "complaints",
    badge: "12", // Örnek badge
  },
];
