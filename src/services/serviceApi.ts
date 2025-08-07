// services/serviceApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export interface Service {
  id: number;
  name: string;
  price: number;
  duration_minutes: number;
}

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getServicesByBusinessId: builder.query<Service[], number>({
      query: (businessId) => `/business/${businessId}/services`,
    }),
    createService: builder.mutation<
      Service,
      { businessId: number } & Omit<Service, "id">
    >({
      query: ({ businessId, ...body }) => ({
        url: `/business/${businessId}/services`,
        method: "POST",
        body,
      }),
    }),
    updateService: builder.mutation<
      Service,
      {
        businessId: number;
        serviceId: number;
        data: Partial<Omit<Service, "id">>;
      }
    >({
      query: ({ businessId, serviceId, data }) => ({
        url: `/business/${businessId}/services/${serviceId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteService: builder.mutation<
      void,
      { businessId: number; serviceId: number }
    >({
      query: ({ businessId, serviceId }) => ({
        url: `/business/${businessId}/services/${serviceId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServicesByBusinessIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
