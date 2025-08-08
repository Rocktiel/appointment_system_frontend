// // components/business-appointment/VerificationDialog.tsx
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
// import { UseFormReturn } from "react-hook-form"; // UseFormReturn'ı import edin
// import { z } from "zod";

// // Telefon doğrulama formu için Zod şeması
// const verificationSchema = z.object({
//   code: z
//     .string()
//     .min(6, "Kod 6 haneli olmalıdır.")
//     .max(6, "Kod 6 haneli olmalıdır.")
//     .regex(/^\d+$/, "Kod sadece rakamlardan oluşmalıdır."),
// });
// export type VerificationFormValues = z.infer<typeof verificationSchema>;

// interface VerificationDialogProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   form: UseFormReturn<VerificationFormValues>; // Form hook'unun kendisini prop olarak al
//   onVerificationSubmit: (values: VerificationFormValues) => Promise<void>;
//   isSubmitting: boolean;
// }

// export default function VerificationDialog({
//   isOpen,
//   onOpenChange,
//   form,
//   onVerificationSubmit,
//   isSubmitting,
// }: VerificationDialogProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Telefon Doğrulama</DialogTitle>
//           <DialogDescription>
//             Randevunuzu tamamlamak için telefon numaranıza gönderilen 6 haneli
//             kodu girin.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onVerificationSubmit)}
//             className="space-y-4"
//           >
//             <FormField
//               control={form.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Doğrulama Kodu</FormLabel>
//                   <Input
//                     placeholder="XXXXXX"
//                     {...field}
//                     maxLength={6}
//                     inputMode="numeric"
//                     pattern="[0-9]*"
//                   />
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Doğrulanıyor...
//                   </>
//                 ) : (
//                   "Kodu Doğrula"
//                 )}
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
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
import {
  Loader2,
  Calendar,
  Clock,
  User,
  Phone,
  NotebookText,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Service } from "@/services/serviceApi";
import { DetailedTimeSlot } from "@/models/customer.model";

// ... (diğer importlar ve verificationSchema aynı)
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
  form: UseFormReturn<VerificationFormValues>;
  onVerificationSubmit: (values: VerificationFormValues) => Promise<void>;
  isSubmitting: boolean;
  appointmentData?: {
    customerName: string;
    customerPhone: string;
    selectedDate: Date;
    selectedService: number;
    note?: string;
    serviceName?: string;
    timeSlot?: DetailedTimeSlot;
  };
  services?: Service[];
}

export default function VerificationDialog({
  isOpen,
  onOpenChange,
  form,
  onVerificationSubmit,
  isSubmitting,
  appointmentData,
  services = [],
}: VerificationDialogProps) {
  // Seçilen servisin adını bul
  const selectedServiceName = services.find(
    (s) => s.id === appointmentData?.selectedService
  )?.name;

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

        {/* Randevu Bilgileri Özeti */}
        {appointmentData && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-medium mb-3 text-gray-900 dark:text-white">
              Randevu Bilgileri
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {appointmentData.customerName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {appointmentData.customerPhone}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {format(appointmentData.selectedDate, "dd.MM.yyyy")}
                </span>
              </div>

              {appointmentData.timeSlot && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {appointmentData.timeSlot.start_time} -{" "}
                    {appointmentData.timeSlot.end_time}
                  </span>
                </div>
              )}

              {selectedServiceName && (
                <div className="flex items-center gap-2">
                  <NotebookText className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedServiceName}
                  </span>
                </div>
              )}

              {appointmentData.note && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    <span className="font-medium">Müşterinin Notu:</span>{" "}
                    {appointmentData.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

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
