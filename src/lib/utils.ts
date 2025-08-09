import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function compareTimes(time1: string, time2: string): number {
  const [h1, m1] = time1.split(":").map(Number);
  const [h2, m2] = time2.split(":").map(Number);
  if (h1 !== h2) return h1 - h2;
  return m1 - m2;
}

export function formatPhoneNumber(phone?: string | null): string {
  if (!phone) return "";

  // Sadece rakamları al
  let digits = phone.replace(/\D/g, "");

  // +90 ile başlayanları düzelt
  if (digits.startsWith("90")) {
    digits = "0" + digits.slice(2);
  } else if (!digits.startsWith("0") && digits.length === 10) {
    digits = "0" + digits;
  }

  // Format: 0XXX XXX XX XX
  return digits.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
}
