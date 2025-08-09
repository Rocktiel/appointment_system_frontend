"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useGetServicesByBusinessIdQuery } from "@/services/serviceApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateAppointmentMutation } from "@/services/businessApi";
import { InitiateAppointmentBookingRequest } from "@/models/business.model";

// Form şeması
const formSchema = z.object({
  customer_name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  customer_phone: z.string().min(10, "Geçerli bir telefon numarası girin"),
  service_id: z.string().min(1, "Lütfen bir hizmet seçin"),
  appointment_date: z.date(),
  notes: z.string().optional(),
});

type CreateAppointmentFormProps = {
  timeSlot: {
    id: number;
    start_time: string;
    end_time: string;
  };
  businessId: number;
  date: string;
  onSuccess: () => void;
  onCancel: () => void;
};
//TODO Randevuyu oluşturuyor ama hala yeşil kalıyor zaman dilimi
export function CreateAppointmentForm({
  timeSlot,
  businessId,
  date,
  onSuccess,
  onCancel,
}: CreateAppointmentFormProps) {
  const router = useRouter();
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const {
    data: services = [],
    isLoading: isLoadingServices,
    error: servicesError,
  } = useGetServicesByBusinessIdQuery(Number(businessId), {
    skip: !businessId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      service_id: "",
      appointment_date: new Date(date),
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const requestData: InitiateAppointmentBookingRequest = {
        businessId: businessId, // string olarak kullanıyoruz
        time_slot_template_id: timeSlot.id,
        date: format(values.appointment_date, "yyyy-MM-dd"),
        start_time: timeSlot.start_time,
        end_time: timeSlot.end_time,
        customerName: values.customer_name, // customer_name -> customerName
        customerPhone: values.customer_phone, // customer_phone -> customerPhone
        serviceId: Number(values.service_id), // service_id -> serviceId
        note: values.notes, // notes -> note
      };

      console.log("Randevu verisi:", requestData);
      await createAppointment(requestData).unwrap();

      toast.success("Randevu başarıyla oluşturuldu");
      onSuccess();
      router.refresh();
    } catch (error) {
      toast.error("Randevu oluşturulurken bir hata oluştu");
      console.error("Create appointment error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Müşteri Adı */}
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Müşteri Adı*</FormLabel>
                <FormControl>
                  <Input placeholder="Ad Soyad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Telefon Numarası */}
          <FormField
            control={form.control}
            name="customer_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon Numarası*</FormLabel>
                <FormControl>
                  <Input placeholder="5xx xxx xx xx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hizmet Seçimi */}
          <FormField
            control={form.control}
            name="service_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hizmet Seçimi*</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Bir hizmet seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingServices ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    ) : servicesError ? (
                      <div className="text-red-500 p-2 text-sm">
                        Hizmetler yüklenirken hata oluştu
                      </div>
                    ) : services.length === 0 ? (
                      <div className="text-gray-500 p-2 text-sm">
                        Hizmet bulunamadı
                      </div>
                    ) : (
                      services.map((service) => (
                        <SelectItem
                          key={service.id}
                          value={service.id.toString()}
                        >
                          {service.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Randevu Tarihi */}
          <FormField
            control={form.control}
            name="appointment_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Randevu Tarihi*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Tarih seçin</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Zaman Aralığı Bilgisi */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800">Randevu Saati</h4>
          <p className="text-blue-600">
            {timeSlot.start_time} - {timeSlot.end_time}
          </p>
        </div>

        {/* Notlar */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notlar</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Randevu ile ilgili notlar..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Butonları */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Randevu Oluştur
          </Button>
        </div>
      </form>
    </Form>
  );
}
