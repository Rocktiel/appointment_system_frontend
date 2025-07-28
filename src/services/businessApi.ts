import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BusinessRequest,
  Business,
  SubscriptionPlan,
  TimeInterval, // 👈 yeni model
  CreateTimeIntervalRequest,
  Appointment,
  AppointmentRequest, // 👈 yeni model
} from "@/models/business.model";
interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  isAvailableForBooking: boolean;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Business", "SubscriptionPlan", "TimeInterval"],
  endpoints: (builder) => ({
    // 🔹 İşletme oluşturma
    createBusiness: builder.mutation<{ data: Business }, BusinessRequest>({
      query: (body) => ({
        url: "/business/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Business"],
    }),

    // 🔹 Kullanıcının paketi
    getUserPackage: builder.query<{ data: SubscriptionPlan }, void>({
      query: () => "/business/my-package",
      providesTags: ["SubscriptionPlan"],
    }),

    // 🔹 Kullanıcının işletmeleri
    getUserBusinesses: builder.query<Business[], void>({
      query: () => "/business/my-businesses",
      providesTags: ["Business"],
    }),

    // 🔹 İşletme güncelleme
    updateBusiness: builder.mutation<
      Business,
      { id: number; data: Partial<Business> }
    >({
      query: ({ id, data }) => ({
        url: `/business/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Business"],
    }),

    // ✅ 🔹 ZAMAN DİLİMLERİ - Başlangıç
    getTimeIntervals: builder.query<
      { data: TimeInterval[]; success: boolean }, // doğru response tipi
      { businessId: number; dayId: number }
    >({
      query: ({ businessId, dayId }) => ({
        url: `/business/${businessId}/time-slots/${dayId}`,
        method: "GET",
      }),
      providesTags: ["TimeInterval"],
    }),

    createTimeInterval: builder.mutation<
      TimeInterval,
      CreateTimeIntervalRequest
    >({
      query: (body) => ({
        url: `/business/time-slot/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["TimeInterval"],
    }),

    deleteTimeInterval: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/business/time-slots/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TimeInterval"],
    }),

    // (İsteğe bağlı) Tüm günleri dönen endpoint:
    getAllTimeIntervalsForBusiness: builder.query<
      { [dayId: number]: TimeInterval[] },
      number
    >({
      query: (businessId) => `/business/${businessId}/time-slots`,
      providesTags: ["TimeInterval"],
    }),
    getAppointmentByTimeSlot: builder.query<Appointment[], AppointmentRequest>({
      query: ({ businessId, date, time_slot_template_id }) =>
        `/business/appointment?businessId=${businessId}&date=${date}&time_slot_template_id=${time_slot_template_id}`,
    }),
    checkBusinessAddPermission: builder.query<
      { canAddBusiness: boolean; message?: string }, // Backend'den beklenen yanıt tipi
      void // Bu endpoint'e parametre göndermiyoruz, user ID JWT'den alınacak
    >({
      query: () => "/business/check-add-permission", // Backend'deki endpoint yolu
      // Bu endpoint bir resource'u değiştirmediği için invalidatesTags'e gerek yok.
      // providesTags de eklemeye gerek yok, çünkü bu sadece bir kontrol, bir veri listesi değil.
    }),
    getWeeklyDetailedSlots: builder.query<
      Record<string, TimeSlot[]>, // Örn: { "2025-07-28": [TimeSlot, ...], ... }
      { businessId: number; start: string; end: string }
    >({
      query: ({ businessId, start, end }) =>
        `/business/business/${businessId}/detailed-slots-range?start=${start}&end=${end}`,
    }),
  }),
});

export const {
  useCreateBusinessMutation,
  useGetUserPackageQuery,
  useGetUserBusinessesQuery,
  useUpdateBusinessMutation,
  // 👇 Zaman aralığı hook'ları
  useGetTimeIntervalsQuery,
  useCreateTimeIntervalMutation,
  useDeleteTimeIntervalMutation,
  useGetAllTimeIntervalsForBusinessQuery,
  useGetAppointmentByTimeSlotQuery,
  useCheckBusinessAddPermissionQuery,
  useGetWeeklyDetailedSlotsQuery,
} = businessApi;
