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
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { registerSchema } from "@/lib/zodSchemas";
import { useRegisterMutation } from "@/services/authApi";

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register({ ...values, userType: "BUSINESS" }).unwrap();
      router.push(`/confirmEmail?email=${encodeURIComponent(values.email)}`);
    } catch (err) {}
  };

  const errorMessage =
    (error as any)?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Kayıt Ol
      </h1>

      {error && (
        <p className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-3 rounded-md mb-4 text-sm text-center">
          {errorMessage}
        </p>
      )}
      {isSuccess && (
        <p className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-3 rounded-md mb-4 text-sm text-center">
          Kayıt başarılı! E-posta adresinize doğrulama kodu gönderildi.
        </p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          method="POST"
        >
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-300">
                  Şifre
                </FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="pl-10 pr-3 py-2"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full py-2.5 cursor-pointer hover:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? "Kaydolunuyor..." : "Kayıt Ol"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
        Zaten bir hesabın var mı?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
        >
          Giriş Yap
        </Link>
      </p>
    </>
  );
}
