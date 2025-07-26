"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailCheck, Loader2, Info } from "lucide-react";
import { useConfirmEmailMutation } from "@/services/authApi";
export default function ConfirmEmail() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [confirmEmail, { isLoading, isSuccess, error }] =
    useConfirmEmailMutation();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    if (emailFromUrl) {
      setUserEmail(emailFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!userEmail) {
      setMessage("Email adresi bulunamadı. Lütfen tekrar deneyin.");
      return;
    }

    try {
      await confirmEmail({ confirmCode: code, email: userEmail }).unwrap();
      setMessage("Email başarıyla doğrulandı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      const msg =
        err?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
      setMessage(msg);
    }
  };

  const isSuccessMessage = message && message.toLowerCase().includes("başarı");

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 sm:p-10 max-w-md w-full text-center">
      <MailCheck className="h-16 w-16 mx-auto text-blue-500 dark:text-blue-400 mb-6" />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Email Doğrulama
      </h1>

      {userEmail ? (
        <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm flex items-center">
          <Info className="h-5 w-5 mr-2 mb-4 text-blue-500 flex-shrink-0" />
          <span>
            <span className="font-bold">{userEmail}</span> adresinize gönderilen
            6 haneli doğrulama kodunu girin.
          </span>
        </p>
      ) : (
        <p className="mb-6 text-red-500 dark:text-red-400">
          Email adresi bulunamadı. Lütfen kayıt sayfasından tekrar deneyin.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-start">
          <label
            htmlFor="confirmCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Doğrulama Kodu
          </label>
          <Input
            id="confirmCode"
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="123456"
            required
            className="text-center text-lg tracking-widest"
          />
        </div>

        <Button
          type="submit"
          className="w-full py-2.5 cursor-pointer hover:bg-gray-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Doğrulanıyor...
            </>
          ) : (
            "Doğrula"
          )}
        </Button>
      </form>

      {message && (
        <p
          className={`mt-6 text-center text-sm ${
            isSuccessMessage
              ? "text-green-600 font-semibold dark:text-green-400"
              : "text-red-500 font-semibold dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
