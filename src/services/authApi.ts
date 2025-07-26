import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/models/auth.model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
    credentials: "include", // Çerezler için gerekli
    prepareHeaders: (headers, {}) => {
      // 1. LocalStorage'dan almayı dene (login sonrası ilk yükleme veya sayfa yenileme durumunda)
      const accessToken = localStorage.getItem("accessToken");

      // 2. Eğer localStorage'da yoksa veya varsa ama Redux'ta farklıysa, Redux store'dan al
      // Bu kısım, Redux state'inin de güncel olmasını garanti eder.
      // const state = getState() as RootState;
      // const accessTokenFromRedux = state.auth.accessToken;

      // Hangi token'ı kullanacağınıza karar verin.
      // Genellikle localStorage'dan almak ilk yüklemede daha garantidir.
      if (accessToken) {
        // Veya accessTokenFromRedux
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"], // Cache tags
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    confirmEmail: builder.mutation<
      { message: string },
      { email: string; confirmCode: string }
    >({
      query: (body) => ({
        url: "/confirm-email",
        method: "POST",
        body,
      }),
    }),
    // Yeni eklenen endpointler
    verifyToken: builder.query<{ user: User; isValid: boolean }, void>({
      query: () => ({
        url: "verify",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    refreshToken: builder.mutation<
      { accessToken: string },
      { refreshToken: string }
    >({
      query: (body) => ({
        url: "refresh",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getUser: builder.query<User, void>({
      query: () => "me",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useConfirmEmailMutation,
  useVerifyTokenQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
