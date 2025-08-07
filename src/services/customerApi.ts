// services/customerApi.ts

import {
  InitiateAppointmentBookingResponse,
  InitiateAppointmentBookingRequest,
  FinalizeAppointmentRequest,
  FinalizeAppointmentResponse,
  VerifyPhoneNumberRequest,
  VerifyPhoneNumberResponse,
  BusinessDetails,
  DetailedTimeSlot,
} from "@/models/customer.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/customers` }),
  endpoints: (builder) => ({
    initiateAppointmentBooking: builder.mutation<
      InitiateAppointmentBookingResponse, // API'den dönen veri
      InitiateAppointmentBookingRequest // Gönderilen veri
    >({
      query: (body) => ({
        url: "/initiate-appointment-booking",
        method: "POST",
        body,
      }),
    }),
    verifyPhoneNumber: builder.mutation<
      VerifyPhoneNumberResponse, // API'den dönen veri
      VerifyPhoneNumberRequest // Gönderilen veri
    >({
      query: (body) => ({
        url: "/verify-phone",
        method: "POST",
        body,
      }),
    }),

    // finalizeAppointment
    finalizeAppointment: builder.mutation<
      FinalizeAppointmentResponse, // API'den dönen veri
      FinalizeAppointmentRequest // Gönderilen veri
    >({
      query: (body) => ({
        url: "/finalize-appointment",
        method: "POST",
        body,
      }),
    }),

    // İşletme Detaylarını Çekme (Query)
    // Sizin BusinessDetails'ınızda id string, bu yüzden sorgu parametresi string
    getBusinessBySlug: builder.query<BusinessDetails, string>({
      query: (slug) => `/business/${slug}`,
      // Opsiyonel: verinin güncel tutulması için cache'i yeniden doğrulama
      // providesTags: (result, error, slug) => [{ type: 'Business', id: slug }],
    }),

    // Detaylı Zaman Dilimlerini Çekme (Query)
    getDetailedTimeSlots: builder.query<
      DetailedTimeSlot[],
      { businessId: string; date: string }
    >({
      query: ({ businessId, date }) =>
        `/business/${businessId}/detailed-slots/${date}`,
      // Opsiyonel: Zaman dilimleri sık değişir, bu yüzden cache'leme stratejisi önemli.
      // Örneğin, 5 dakikada bir yeniden doğrulama:
      // keepUnusedDataFor: 300, // 5 dakika (varsayılan 60 saniye)
      // providesTags: (result, error, { businessId, date }) => [{ type: 'TimeSlots', id: `${businessId}-${date}` }],
    }),
  }),
});

// Hook'ları dışa aktarın
export const {
  useInitiateAppointmentBookingMutation,
  useVerifyPhoneNumberMutation,
  useFinalizeAppointmentMutation,
  useGetBusinessBySlugQuery, // Artık bu bir RTK Query hook'u
  useGetDetailedTimeSlotsQuery, // Artık bu bir RTK Query hook'u
} = customerApi;
