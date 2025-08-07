import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store";
import { setCredentials, logout } from "@/lib/slices/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { accessToken } = (refreshResult.data as any).data;
      api.dispatch(setCredentials({ accessToken, refreshToken: null }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.pathname
        )}`;
      }
    }
  }

  return result;
};
// import {
//   fetchBaseQuery,
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { RootState } from "@/lib/store";
// import { setCredentials, logout } from "@/lib/slices/authSlice";
// import { Mutex } from "async-mutex";
// import { toast } from "sonner";

// // Yeniden deneme için mutex kullanımı
// const mutex = new Mutex();

// export const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.accessToken;
//     if (token) {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const baseQueryWithReauth: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   // İlk isteği yap
//   let result = await baseQuery(args, api, extraOptions);

//   // 401 hatası alındıysa ve refresh token denenmediyse
//   if (result.error?.status === 401) {
//     // Mutex ile aynı anda sadece bir refresh işlemi yapılmasını sağla
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();

//       try {
//         // Refresh token isteği yap
//         const refreshResult = await baseQuery(
//           {
//             url: "/auth/refresh",
//             method: "POST",
//             credentials: "include",
//           },
//           api,
//           extraOptions
//         );

//         if (refreshResult.data) {
//           const { accessToken, refreshToken } = (refreshResult.data as any)
//             .data;

//           // Store'u güncelle
//           api.dispatch(
//             setCredentials({
//               accessToken,
//               refreshToken,
//             })
//           );

//           // Orijinal isteği yeni token ile tekrar dene
//           result = await baseQuery(args, api, extraOptions);
//         } else {
//           // Refresh başarısız olduysa logout yap
//           api.dispatch(logout());

//           // Login sayfasına yönlendir
//           if (typeof window !== "undefined") {
//             window.location.href = `/login?redirect=${encodeURIComponent(
//               window.location.pathname
//             )}`;
//           }
//         }
//       } finally {
//         release();
//       }
//     } else {
//       // Mutex locked ise, diğer isteğin bitmesini bekle
//       await mutex.waitForUnlock();
//       // Orijinal isteği tekrar dene
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   // Diğer hata durumlarını yönet
//   if (result.error && result.error.status !== 401) {
//     const errorMessage =
//       (result.error.data as any)?.message ||
//       "Bir hata oluştu. Lütfen tekrar deneyin.";

//     // Toast mesajı göster (uygun bir toast kütüphanesi kullanarak)
//     if (typeof window !== "undefined") {
//       // Örnek: react-hot-toast kullanımı

//       toast.error(errorMessage);
//     }
//   }

//   return result;
// };
