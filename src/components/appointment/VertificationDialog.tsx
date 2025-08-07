// components/business-appointment/VerificationDialog.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin
import { z } from "zod";

// Telefon doğrulama formu için Zod şeması
const verificationSchema = z.object({
  code: z
    .string()
    .min(6, "Kod 6 haneli olmalıdır.")
    .max(6, "Kod 6 haneli olmalıdır.")
    .regex(/^\d+$/, "Kod sadece rakamlardan oluşmalıdır."),
});
export type VerificationFormValues = z.infer<typeof verificationSchema>;

interface VerificationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<VerificationFormValues>; // Form hook'unun kendisini prop olarak al
  onVerificationSubmit: (values: VerificationFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export default function VerificationDialog({
  isOpen,
  onOpenChange,
  form,
  onVerificationSubmit,
  isSubmitting,
}: VerificationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Telefon Doğrulama</DialogTitle>
          <DialogDescription>
            Randevunuzu tamamlamak için telefon numaranıza gönderilen 6 haneli
            kodu girin.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onVerificationSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doğrulama Kodu</FormLabel>
                  <Input
                    placeholder="XXXXXX"
                    {...field}
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Doğrulanıyor...
                  </>
                ) : (
                  "Kodu Doğrula"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
