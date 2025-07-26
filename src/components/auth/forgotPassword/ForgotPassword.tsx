"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, Info } from "lucide-react"; // Lucide ikonları
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgotPasswordSchema } from "@/lib/zodSchemas";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        // API_URL'nizin doğru olduğundan emin olun
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.");
        form.reset();
      } else {
        setMessage(data.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg p-8 sm:p-10 max-w-md w-full text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Şifremi Unuttum
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
        Şifrenizi sıfırlamak için kayıtlı e-posta adresinizi girin. Size bir
        sıfırlama bağlantısı göndereceğiz.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Email
                </FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="email"
                    placeholder="ornek@email.com"
                    {...field}
                    className="pl-10 pr-3 py-2"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-2.5" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              "Sıfırlama Bağlantısı Gönder"
            )}
          </Button>
        </form>
      </Form>

      {message && (
        <p
          className={`mt-6 text-center text-sm ${
            message.includes("gönderildi")
              ? "text-green-600 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        <Link
          href="/login"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Giriş sayfasına geri dön
        </Link>
      </p>
    </div>
  );
}
