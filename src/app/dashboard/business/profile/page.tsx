"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useGetUserBusinessesQuery,
  useUpdateBusinessMutation,
} from "@/services/businessApi";
import MapSelector from "@/components/MapSelector";

// Import Shadcn/ui components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import BusinessSelector from "@/components/dashboard/business/BusinessSelector";

// Zod schema for validation
const updateSchema = z.object({
  businessId: z.number().int("Lütfen bir işletme seçin.").optional(),
  businessName: z.string().min(2, "İşletme adı en az 2 karakter olmalıdır."),
  businessPhone: z
    .string()
    .regex(
      /^\+?\d{10,14}$/,
      "Geçerli bir telefon numarası giriniz (örn: +905xx xxx xx xx)"
    ),
  isPhoneVisible: z.boolean(),
  lat: z.number().min(-90, "Lütfen haritadan bir konum seçiniz.").max(90),
  lng: z.number().min(-180, "Lütfen haritadan bir konum seçiniz.").max(180),
  isLocationVisible: z.boolean(),
});

type UpdateFormData = z.infer<typeof updateSchema>;

const ManageBusinessesPage = () => {
  const { data: businesses } = useGetUserBusinessesQuery();
  const [
    updateBusiness,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
    },
  ] = useUpdateBusinessMutation();

  const form = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    // Set default values matching your Zod schema to avoid type mismatches
    defaultValues: {
      businessId: undefined, // Will be set on selection
      businessName: "",
      businessPhone: "",
      isPhoneVisible: false,
      lat: 20, // Default to Istanbul
      lng: 50, // Default to Istanbul
      isLocationVisible: false,
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = form; // Add watch and trigger
  let currentLat = watch("lat");
  let currentLng = watch("lng");
  const selectedBusinessId = watch("businessId");

  // Effect to set default map location when a business is selected
  useEffect(() => {
    // Only reset if a business is selected and its data is valid
    if (watch("businessId") !== undefined) {
      const selectedBiz = businesses?.find((b) => b.id === watch("businessId"));

      if (selectedBiz) {
        // Ensure that lat and lng are numbers when resetting
        reset({
          businessId: selectedBiz.id,
          businessName: selectedBiz.businessName,
          businessPhone: selectedBiz.businessPhone,
          isPhoneVisible: selectedBiz.isPhoneVisible,
          lat: Number(selectedBiz.lat),
          lng: Number(selectedBiz.lng),
          isLocationVisible: selectedBiz.isLocationVisible,
        });
        currentLat = Number(selectedBiz.lat);
        currentLng = Number(selectedBiz.lng);
        // Manually trigger validation for lat/lng after reset if needed
        trigger(["lat", "lng"]);
      }
    }
  }, [watch("businessId"), businesses, reset, trigger]); // Dependency on businessId, businesses, reset, and trigger

  const handleBusinessSelect = (id: number | undefined) => {
    setValue("businessId", id, { shouldValidate: true });
  };
  const onLocationSelect = (lat: number, lng: number) => {
    setValue("lat", lat, { shouldValidate: true });
    setValue("lng", lng, { shouldValidate: true });
    trigger(["lat", "lng"]); // Re-validate lat/lng when map location changes
  };

  const onSubmit = async (data: UpdateFormData) => {
    if (data.businessId === undefined) {
      alert("Lütfen güncellemek için bir işletme seçin.");
      return;
    }

    const locationUrl = `http://maps.google.com/maps?q=${data.lat},${data.lng}`; // Standard Google Maps URL format

    const updatePayload = {
      id: data.businessId,
      data: {
        businessName: data.businessName,
        businessPhone: data.businessPhone,
        isPhoneVisible: data.isPhoneVisible,
        lat: data.lat,
        lng: data.lng,
        isLocationVisible: data.isLocationVisible,
        businessLocationUrl: locationUrl,
      },
    };

    try {
      await updateBusiness(updatePayload).unwrap();
      alert("İşletme başarıyla güncellendi!"); // Replace with toast
    } catch (e: any) {
      console.error("Güncelleme hatası:", e);
      alert(e?.data?.message || "Güncelleme sırasında bir hata oluştu."); // Replace with toast
    }
  };

  // Watch selected lat/lng to pass to MapSelector
  // const currentLat = useWatch({ control: form.control, name: "lat" });
  // const currentLng = useWatch({ control: form.control, name: "lng" });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            İşletmeleri Yönet
          </CardTitle>
          <CardDescription className="text-center">
            Mevcut işletmelerinizi buradan güncelleyebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
              {/* Business Selector Dropdown */}
              <BusinessSelector
                onBusinessSelect={handleBusinessSelect}
                selectedValue={selectedBusinessId}
                errorMessage={form.formState.errors.businessId?.message}
              />
              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>İşletme Adı</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="İşletme Adı"
                        {...field}
                        disabled={selectedBusinessId === undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Phone */}
              <FormField
                control={form.control}
                name="businessPhone"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Telefon Numarası</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Telefon Numarası"
                        {...field}
                        disabled={selectedBusinessId === undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Is Phone Visible Checkbox */}
              <FormField
                control={form.control}
                name="isPhoneVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow md:col-span-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={selectedBusinessId === undefined}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Telefon numaranız müşterilere görünsün mü?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* Is Location Visible Checkbox */}
              <FormField
                control={form.control}
                name="isLocationVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow md:col-span-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={selectedBusinessId === undefined}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        İşletme konumunuz müşterilere görünsün mü?
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* Map Selector for Lat/Lng */}
              <div className="md:col-span-2">
                <FormLabel className="mb-2 block">
                  Konumu Haritada İşaretle
                </FormLabel>
                {selectedBusinessId ? (
                  <MapSelector
                    key={selectedBusinessId} // seçilen işletme değiştiğinde MapSelector'ü yeniden oluşturur
                    onLocationSelect={onLocationSelect}
                    defaultLocation={{ lat: currentLat, lng: currentLng }}
                  />
                ) : (
                  <div className="h-[400px] w-full bg-gray-200 flex items-center justify-center rounded-md text-gray-500">
                    Lütfen bir işletme seçin.
                  </div>
                )}
                {/* Manual display of map related errors */}
                {errors.lat && (
                  <p className="text-destructive text-sm mt-2">
                    {errors.lat.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full md:col-span-2"
                disabled={selectedBusinessId === undefined || isUpdating}
              >
                {isUpdating ? "Güncelleniyor..." : "İşletmeyi Güncelle"}
              </Button>

              {/* Submission Status */}
              {isUpdateSuccess && (
                <p className="text-green-600 text-center md:col-span-2">
                  İşletme başarıyla güncellendi! 🎉
                </p>
              )}
              {isUpdateError && (
                <p className="text-red-600 text-center md:col-span-2">
                  Hata: {"Güncelleme başarısız oldu."}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageBusinessesPage;
