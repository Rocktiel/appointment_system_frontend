"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { loginSchema } from "@/lib/zodSchemas";
import { useAppDispatch } from "@/lib/hooks";
import { useLoginMutation } from "@/services/authApi";
import { setCredentials } from "@/lib/slices/authSlice";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    setError(null); // Önceki hataları temizle
    setLoading(true); // Yükleme durumunu başlat (isteğe bağlı, isLoading zaten var)

    try {
      // login mutasyonuna doğrudan form verilerini gönder
      const result = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (result.success) {
        dispatch(
          setCredentials({
            accessToken: result.data.accessToken,
            refreshToken: null, // Refresh token backend'de cookie'de
          })
        );

        router.push("/dashboard/business"); // Başarılı giriş sonrası yönlendirme
      } else {
        setError(result.message || "Giriş başarısız oldu.");
      }
    } catch (err: any) {
      console.error("Giriş hatası:", err);
      setError(
        err.data?.message || err.message || "Giriş sırasında bir hata oluştu."
      );
    } finally {
      setLoading(false); // Yükleme durumunu bitir
    }
  };

  return (
    <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Giriş Yap
      </h1>

      {errorMsg && (
        <p className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm text-center">
          {errorMsg}
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    {...field}
                    placeholder="ornek@email.com"
                    className="pl-10"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="pl-10"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-right text-sm">
            <Link
              href="/forgotPassword"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Şifremi unuttum?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Giriş Yapılıyor...
              </>
            ) : (
              "Giriş Yap"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Hesabın yok mu?{" "}
        <Link
          href="/register"
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Şimdi Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
