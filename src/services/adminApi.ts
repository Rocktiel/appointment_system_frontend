// services/adminApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GÜNCELLENDİ: Package interface'i, sağladığınız response'a göre ayarlandı
export interface Package {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  maxBusinesses: number;
  price: string; // Fiyatı string olarak tutuyoruz, çünkü API'den öyle geliyor
  description: string;
  isActive: boolean;
}

// PackageRequest interface'ini olduğu gibi bırakıyorum, sizin dto'larınıza göre ayarlarsınız.
export interface PackageRequest {
  name: string;
  price: number;
  durationMonths: number; // Bu alanın paket response'unda olmadığını unutmayın
  features: string[]; // Bu alanın paket response'unda olmadığını unutmayın
}

// BaseResponse'a benzer bir yapıya ihtiyacımız var
interface BaseApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/admin`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createPackage: builder.mutation<BaseApiResponse<Package>, PackageRequest>({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
    }),
    // getPackages endpoint'i BaseApiResponse<Package[]> döndürecek şekilde güncellendi
    getPackages: builder.query<BaseApiResponse<Package[]>, void>({
      query: () => "/getPackages",
    }),
  }),
});

export const { useCreatePackageMutation, useGetPackagesQuery } = adminApi;
