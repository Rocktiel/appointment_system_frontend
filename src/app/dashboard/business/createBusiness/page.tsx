"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useCreateBusinessMutation,
  useCheckBusinessAddPermissionQuery, // 👈 Yeni eklenen hook
} from "@/services/businessApi";
import { BusinessTypes } from "@/models/business.model"; // Assuming this is defined correctly
import MapSelector from "@/components/MapSelector";
import { cityData } from "@/lib/cities_districts";
// Import Shadcn/ui components for better styling
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Using shadcn/ui form
import { toast } from "sonner";
import CityCountySelector from "@/components/appointment/business/CityCountySelector";

const businessSchema = z.object({
  businessName: z.string().min(2, "İşletme adı en az 2 karakter olmalıdır."),
  businessAddress: z.string().min(5, "Lütfen geçerli bir adres giriniz."),
  businessPhone: z
    .string()
    .regex(
      /^\+?\d{10,14}$/,
      "Geçerli bir telefon numarası giriniz (örn: +905xx xxx xx xx)"
    ),
  businessEmail: z.string().email("Geçerli bir e-posta adresi giriniz."),
  businessType: z.nativeEnum(BusinessTypes, {
    error: () => ({ message: "Lütfen bir işletme türü seçiniz." }),
  }),
  lat: z.number().min(-90, "Lütfen haritadan bir konum seçiniz.").max(90),
  lng: z.number().min(-180, "Lütfen haritadan bir konum seçiniz.").max(180),
  isPhoneVisible: z.boolean(),
  isLocationVisible: z.boolean(),
  city: z.string().min(1, "Lütfen bir şehir seçiniz."),
  county: z.string().min(1, "Lütfen bir ilçe seçiniz."),
  businessWebsite: z.string().url("Geçerli bir URL giriniz.").optional(),
  businessDescription: z.string().optional(),
  businessLogo: z.string().url("Geçerli bir logo URL’si giriniz.").optional(),
});
type BusinessFormData = z.infer<typeof businessSchema>;

const CreateBusinessPage = () => {
  // 🚀 Yeni: İşletme ekleme iznini kontrol eden hook
  const {
    data: permissionData,
    isLoading: isLoadingPermission,
    isError: isPermissionError,
  } = useCheckBusinessAddPermissionQuery();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");

  const handleLocationChange = (city: string, county: string) => {
    setSelectedCity(city);
    setSelectedCounty(county);
    // Burada API çağrısı yapabilirsin
    // örn: getBusinesses({ city, county })
  };
  const [createBusiness, { isLoading, isSuccess, isError, error }] =
    useCreateBusinessMutation();

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      businessEmail: "",
      businessType: undefined,
      lat: 41.0082, // İstanbul varsayılan konum
      lng: 28.9784, // İstanbul varsayılan konum
      isPhoneVisible: false,
      isLocationVisible: false,
      city: selectedCity,
      county: selectedCounty,
      businessWebsite: "",
      businessDescription: "",
      businessLogo: "",
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    console.log("Form submitted with data:", data);
    // 🚀 Yeni: Form gönderilmeden önce tekrar izin kontrolü
    if (!permissionData?.canAddBusiness) {
      alert(permissionData?.message || "Yeni işletme ekleme izniniz yok.");
      return; // İşlem durdurulur
    }

    try {
      // Ensure the URL format is correct. Use template literals for data.lat and data.lng
      // Not: Google Haritalar URL'si için doğru format: https://www.google.com/maps/search/?api=1&query=LAT,LNG
      const businessLocationUrl = `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`;

      await createBusiness({ ...data, businessLocationUrl }).unwrap();
      // Use a more subtle notification like a toast instead of alert for better UX
      alert("İşletme başarıyla eklendi!"); // Replace with toast notification if available
      form.reset(); // Formu sıfırla
    } catch (e: any) {
      // Backend'den gelen hata mesajını göstermek daha iyi olur
      toast.error(
        e?.data?.message || "İşletme oluşturulurken bir hata oluştu."
      ); // Replace with toast notification
    }
  };

  // 🚀 Yükleme veya hata durumları için erken çıkış
  if (isLoadingPermission) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold">Yükleniyor...</CardTitle>
          <CardDescription className="mt-2">
            İşletme ekleme izinleri kontrol ediliyor.
          </CardDescription>
        </Card>
      </div>
    );
  }

  if (isPermissionError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 text-center text-red-600">
          <CardTitle className="text-2xl font-bold">Hata! 🚨</CardTitle>
          <CardDescription className="mt-2">
            İzin kontrolü sırasında bir sorun oluştu: {"Bilinmeyen hata."}
            <p className="mt-4">
              Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
            </p>
          </CardDescription>
        </Card>
      </div>
    );
  }

  // 🚀 Eğer kullanıcının daha fazla işletme ekleme izni yoksa
  if (permissionData && !permissionData.canAddBusiness) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="text-2xl font-bold text-red-500">
            Sınırınıza Ulaştınız! 🛑
          </CardTitle>
          <CardDescription className="mt-2">
            {permissionData.message ||
              "Daha fazla işletme ekleyemezsiniz. Paket yükseltmek için lütfen yöneticinizle iletişime geçin."}
          </CardDescription>
          {/* İsteğe bağlı olarak paket yükseltme veya iletişim butonu eklenebilir */}
          {/* <Button className="mt-4">Paket Yükselt</Button> */}
        </Card>
      </div>
    );
  }

  // Eğer her şey yolundaysa, formu göster
  return (
    <div className="flex justify-center items-center bg-gray-100 p-4 min-h-screen">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Yeni İşletme Oluştur
          </CardTitle>
          <CardDescription className="text-center">
            İşletmenizin bilgilerini girerek hemen başlayın.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4"
            >
              <div className="md:flex md:flex-col md:space-y-5">
                {/* Business Name */}
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>İşletme Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Örn: Süper Kuaför" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Business Email */}
                <FormField
                  control={form.control}
                  name="businessEmail"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>E-posta</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Örn: info@superkuafor.com"
                          {...field}
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
                        <Input placeholder="Örn: +905xx xxx xx xx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Business Type */}
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>İşletme Türü</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bir tür seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(BusinessTypes).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>İl</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          // İlçe seçimini sıfırlamak için (opsiyonel)
                          form.setValue("county", "");
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bir il seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cityData.map((city) => (
                            <SelectItem key={city.plate} value={city.name}>
                              {city.name.toUpperCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="county"
                  render={({ field }) => {
                    // Seçilen şehri al
                    const selectedCity = form.watch("city");
                    // Seçilen şehrin ilçelerini bul
                    const cityCounties =
                      cityData.find((c) => c.name === selectedCity)?.counties ||
                      [];

                    return (
                      <FormItem className="md:col-span-1">
                        <FormLabel>İlçe</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!selectedCity} // Şehir seçilmediyse devre dışı bırak
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  selectedCity
                                    ? "Bir ilçe seçiniz"
                                    : "Önce il seçiniz"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cityCounties.map((county) => (
                              <SelectItem key={county} value={county}>
                                {county.toUpperCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {/* Business Address */}
                <FormField
                  control={form.control}
                  name="businessAddress"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Adres</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Örn: Barbaros Mah. xxx Sok. No: 123"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Müşterilerin sizi bulabilmesi için işletmenizin tam
                        adresi.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Website */}
                <FormField
                  control={form.control}
                  name="businessWebsite"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Web Sitesi</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Logo URL */}
                <FormField
                  control={form.control}
                  name="businessLogo"
                  render={({ field }) => (
                    <FormItem className="md:col-span-1">
                      <FormLabel>Logo URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://cdn.example.com/logo.png"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Description */}
                <FormField
                  control={form.control}
                  name="businessDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>İşletme Açıklaması</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                          rows={4}
                          placeholder="İşletmenizi kısaca tanıtın..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Map Selector for Lat/Lng */}
              <div className="md:flex md:flex-col md:space-y-9">
                <div className="md:col-span-2 ">
                  <FormLabel className="mb-2 block">
                    Konumu Haritada İşaretle
                  </FormLabel>
                  <MapSelector
                    onLocationSelect={(lat, lng) => {
                      form.setValue("lat", lat, { shouldValidate: true });
                      form.setValue("lng", lng, { shouldValidate: true });
                      form.trigger(["lat", "lng"]); // Manually trigger validation for lat/lng
                    }}
                    defaultLocation={{
                      lat: form.watch("lat"),
                      lng: form.watch("lng"),
                    }} // Pass current form values for default
                  />
                  {/* Manual display of map related errors since MapSelector doesn't use FormField directly */}
                  {form.formState.errors.lat && (
                    <p className="text-destructive text-sm mt-2">
                      {form.formState.errors.lat.message}
                    </p>
                  )}
                </div>
                {/* Visibility Checkboxes */}
                <FormField
                  control={form.control}
                  name="isPhoneVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow md:col-span-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
                <FormField
                  control={form.control}
                  name="isLocationVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow md:col-span-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
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
                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full md:col-span-2 cursor-pointer"
                  disabled={isLoading} // Form gönderilirken butonu devre dışı bırak
                >
                  {isLoading ? "Kaydediliyor..." : "İşletmeyi Kaydet"}
                </Button>
              </div>

              {/* Submission Status */}
              {isSuccess && (
                <p className="text-green-600 text-center md:col-span-2">
                  İşletme başarıyla eklendi! 🎉
                </p>
              )}
              {isError && (
                <p className="text-red-600 text-center md:col-span-2">
                  Hata:{" "}
                  {(error as any)?.data?.message || "İşlem başarısız oldu."}
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBusinessPage;
