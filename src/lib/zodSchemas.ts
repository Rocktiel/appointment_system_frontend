import { z } from "zod";
import { compareTimes } from "./utils";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email boş bırakılamaz" })
    .email({ message: "Geçerli bir email adresi girin" }),

  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalı" })
    .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermeli" })
    .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermeli" })
    .regex(/[0-9]/, { message: "Şifre en az bir rakam içermeli" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Geçerli bir email girin" }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalı" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Geçerli bir email girin" }),
});

export const FormSchema = z
  .object({
    startTime: z.string({ error: "Başlangıç zamanı gerekli." }),
    endTime: z.string({ error: "Bitiş zamanı gerekli." }),
  })
  .refine((data) => compareTimes(data.endTime, data.startTime) > 0, {
    message: "Bitiş zamanı başlangıç zamanından sonra olmalıdır.",
    path: ["endTime"],
  });
