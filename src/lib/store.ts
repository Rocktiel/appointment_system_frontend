import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/authApi";

import authReducer from "@/lib/slices/authSlice";
import businessReducer from "@/lib/slices/businessSlice";
import { businessApi } from "@/services/businessApi";
import { serviceApi } from "@/services/serviceApi";
import { customerApi } from "@/services/customerApi";
import { adminApi } from "@/services/adminApi";

export const store = configureStore({
  reducer: {
    // RTK Query API reducers
    [authApi.reducerPath]: authApi.reducer,
    [businessApi.reducerPath]: businessApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    // Local slice reducers
    auth: authReducer,
    business: businessReducer,
    customer: customerApi.reducer,
    service: serviceApi.reducer,
    admin: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(businessApi.middleware)
      .concat(serviceApi.middleware)
      .concat(customerApi.middleware)
      .concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
