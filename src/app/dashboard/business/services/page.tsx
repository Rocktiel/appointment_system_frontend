"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import {
  useGetServicesByBusinessIdQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  Service,
} from "@/services/serviceApi";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Business } from "@/models/business.model";
import { useGetUserBusinessesQuery } from "@/services/businessApi";

export default function ServicesPage() {
  useParams();

  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );

  const { data: businesses, isLoading: isLoadingBusinesses } =
    useGetUserBusinessesQuery();

  const {
    data: services = [],
    refetch,
    isLoading: isLoadingServices,
  } = useGetServicesByBusinessIdQuery(Number(selectedBusinessId), {
    skip: !selectedBusinessId,
  });

  const [createService, { isLoading: isCreating }] = useCreateServiceMutation();
  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();
  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const [newServiceForm, setNewServiceForm] = useState({
    name: "",
    price: "",
    duration_minutes: "",
  });

  // editedServices state'ini güncelledik.
  // Bu Map, sadece kullanıcı inputlarda değişiklik yaptığında dolacak.
  // API'den gelen veriyi doğrudan kullanacağız, bu Map sadece override için.
  const [editedServiceValues, setEditedServiceValues] = useState<
    Map<number, Partial<Service>>
  >(new Map());

  // ✅ DÜZELTME 1: selectedBusinessId değiştiğinde editedServiceValues'ı sıfırla.
  // Bu, farklı bir işletmeye geçildiğinde önceki düzenlemelerin karışmasını önler.
  useEffect(() => {
    setEditedServiceValues(new Map()); // Yeni işletme seçildiğinde düzenlemeleri sıfırla
  }, [selectedBusinessId]);

  // ✅ DÜZELTME 2: Mevcut servis inputları için handleChange
  const handleEditedServiceChange = (
    serviceId: number,
    field: keyof Service,
    value: string | number
  ) => {
    setEditedServiceValues((prev) => {
      const newMap = new Map(prev);
      const currentValues = newMap.get(serviceId) || {};
      newMap.set(serviceId, { ...currentValues, [field]: value });
      return newMap;
    });
  };

  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewServiceForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddService = async () => {
    if (!selectedBusinessId) {
      toast.error("Lütfen önce bir işletme seçin.");
      return;
    }
    try {
      await createService({
        businessId: Number(selectedBusinessId),
        name: newServiceForm.name,
        price: Number(newServiceForm.price),
        duration_minutes: Number(newServiceForm.duration_minutes),
      }).unwrap();
      toast.success("Hizmet başarıyla eklendi!");
      setNewServiceForm({ name: "", price: "", duration_minutes: "" });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Hizmet eklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (serviceId: number) => {
    if (!selectedBusinessId) {
      toast.error("İşletme seçili değil.");
      return;
    }
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      try {
        await deleteService({
          businessId: Number(selectedBusinessId),
          serviceId,
        }).unwrap();
        toast.success("Hizmet başarıyla silindi!");
        refetch();
      } catch (err: any) {
        toast.error(err?.data?.message || "Hizmet silinirken bir hata oluştu.");
      }
    }
  };

  const handleUpdateService = async (serviceId: number) => {
    if (!selectedBusinessId) {
      toast.error("İşletme seçili değil.");
      return;
    }

    // ✅ DÜZELTME 3: Güncellenecek servisin orijinal verisini bul
    const originalService = services.find((s) => s.id === serviceId);
    if (!originalService) {
      toast.error("Güncellenecek hizmet bulunamadı veya henüz yüklenmedi.");
      return;
    }

    // ✅ DÜZELTME 4: editedServiceValues'dan sadece o servise ait değişen değerleri al
    const changes = editedServiceValues.get(serviceId);

    // Eğer hiçbir değişiklik yapılmamışsa API'ye istek gönderme
    if (!changes || Object.keys(changes).length === 0) {
      toast("Güncellenecek bir değişiklik bulunamadı.");
      return;
    }

    // Fiyat ve sürenin sayı olduğundan emin ol
    const dataToSend: Partial<Omit<Service, "id">> = {};
    if (changes.name !== undefined) dataToSend.name = changes.name;
    if (changes.price !== undefined) dataToSend.price = Number(changes.price);
    if (changes.duration_minutes !== undefined)
      dataToSend.duration_minutes = Number(changes.duration_minutes);

    try {
      await updateService({
        businessId: Number(selectedBusinessId),
        serviceId: serviceId,
        data: dataToSend, // Sadece değişen veriyi gönder
      }).unwrap();
      toast.success("Hizmet başarıyla güncellendi!");
      // Başarılı güncelleme sonrası editedServiceValues'tan bu servisi temizle
      setEditedServiceValues((prev) => {
        const newMap = new Map(prev);
        newMap.delete(serviceId);
        return newMap;
      });
      refetch();
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Hizmet güncellenirken bir hata oluştu."
      );
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Hizmetleri Yönet</CardTitle>
          <CardDescription>
            İşletmenize ait hizmetleri buradan ekleyebilir, güncelleyebilir ve
            silebilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* İşletme Seçim Dropdown'ı */}
          <div>
            <Label
              htmlFor="business-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              İşletme Seç
            </Label>
            <Select
              value={selectedBusinessId || ""}
              onValueChange={(val) => {
                setSelectedBusinessId(val);
                // Artık burada setEditedServiceValues'ı sıfırlıyoruz (useEffect'e taşıdık)
              }}
              disabled={isLoadingBusinesses}
            >
              <SelectTrigger className="w-full md:w-[250px]">
                <SelectValue
                  placeholder={
                    isLoadingBusinesses
                      ? "İşletmeler yükleniyor..."
                      : "İşletme Seç"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {businesses?.map((b: Business) => (
                  <SelectItem key={b.id} value={b.id.toString()}>
                    {b.businessName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Yeni Hizmet Ekleme Formu */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-lg font-semibold mb-3">Yeni Hizmet Ekle</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                name="name"
                placeholder="Hizmet adı"
                value={newServiceForm.name}
                onChange={handleNewServiceChange}
                disabled={!selectedBusinessId || isCreating}
              />
              <Input
                name="price"
                placeholder="Fiyat (₺)"
                type="number"
                value={newServiceForm.price}
                onChange={handleNewServiceChange}
                disabled={!selectedBusinessId || isCreating}
              />
              <Input
                name="duration_minutes"
                placeholder="Süre (dk)"
                type="number"
                value={newServiceForm.duration_minutes}
                onChange={handleNewServiceChange}
                disabled={!selectedBusinessId || isCreating}
              />
              <Button
                onClick={handleAddService}
                disabled={
                  !selectedBusinessId ||
                  isCreating ||
                  !newServiceForm.name ||
                  !newServiceForm.price ||
                  !newServiceForm.duration_minutes
                }
              >
                {isCreating ? "Ekleniyor..." : "Ekle"}
              </Button>
            </div>
          </div>

          {/* Mevcut Hizmetler Listesi */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-lg font-semibold mb-3">Mevcut Hizmetler</h2>
            {isLoadingServices ? (
              <p className="text-center text-gray-500">
                Hizmetler yükleniyor...
              </p>
            ) : services.length === 0 ? (
              <p className="text-center text-gray-500">
                Seçilen işletmeye ait hizmet bulunamadı.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {services.map((s) => {
                  // ✅ DÜZELTME 5: Input değerini belirlerken, editedServiceValues'da ilgili servisin alanı varsa onu kullan, yoksa orijinal s nesnesinden al
                  const currentName =
                    editedServiceValues.get(s.id)?.name ?? s.name;
                  const currentPrice =
                    editedServiceValues.get(s.id)?.price ?? s.price;
                  const currentDuration =
                    editedServiceValues.get(s.id)?.duration_minutes ??
                    s.duration_minutes;

                  // ✅ DÜZELTME 6: Güncelleme butonu sadece değişiklik yapılmışsa aktif olsun
                  const hasChanges =
                    currentName !== s.name ||
                    Number(currentPrice) !== s.price || // Number() ile karşılaştırma yap
                    Number(currentDuration) !== s.duration_minutes;

                  return (
                    <Card key={s.id} className="p-4">
                      <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-0">
                        <Input
                          value={currentName as string}
                          onChange={(e) =>
                            handleEditedServiceChange(
                              s.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="Hizmet Adı"
                          disabled={isUpdating || isDeleting}
                        />
                        <Input
                          type="number"
                          value={currentPrice}
                          onChange={(e) =>
                            handleEditedServiceChange(
                              s.id,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="Fiyat"
                          disabled={isUpdating || isDeleting}
                        />
                        <Input
                          type="number"
                          value={currentDuration}
                          onChange={(e) =>
                            handleEditedServiceChange(
                              s.id,
                              "duration_minutes",
                              e.target.value
                            )
                          }
                          placeholder="Süre"
                          disabled={isUpdating || isDeleting}
                        />
                        <span className="text-gray-600 text-sm">dk</span>
                        <Button
                          variant="default"
                          onClick={() => handleUpdateService(s.id)}
                          disabled={isUpdating || isDeleting || !hasChanges} // Değişiklik yoksa butonu devre dışı bırak
                          className="w-full"
                        >
                          {isUpdating ? "Güncelleniyor..." : "Güncelle"}
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(s.id)}
                          disabled={isUpdating || isDeleting}
                          className="w-full"
                        >
                          {isDeleting ? "Siliniyor..." : "Sil"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
