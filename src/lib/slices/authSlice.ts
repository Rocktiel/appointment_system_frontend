// features/auth/authSlice.ts (Güncellenmiş)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialAuthState,
  type AuthState,
  type User,
} from "@/models/auth.model";
import { authApi } from "@/services/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // --- YENİ EKLENEN REDUCER ---
    setAuthStatus: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        user: User | null; // Sadece id, email, role gibi temel bilgiler içerebilir
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      // Eğer kimlik doğrulanmamışsa tokenları temizle
      if (!action.payload.isAuthenticated) {
        state.accessToken = null;
        state.refreshToken = null;
      }
    },
    // -------------------------
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data.user;
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.isAuthenticated = true;
        // ****** BURADA TOKENLARI LOCALSTORAGE'A KAYDEDİN! ******
        localStorage.setItem("accessToken", payload.data.accessToken);
        localStorage.setItem("refreshToken", payload.data.refreshToken);
      }
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
    // --- YENİ EKLEME: verifyToken başarılı olduğunda state güncelleme ---
    builder.addMatcher(
      authApi.endpoints.verifyToken.matchFulfilled,
      (state, { payload }) => {
        if (payload.isValid && payload.user) {
          state.isAuthenticated = true;
          state.user = payload.user;
          // Tokenlar zaten localStorage'da olduğu için burada tekrar set etmeye gerek yok
        } else {
          // Token geçerli değilse veya kullanıcı bilgisi yoksa
          state.isAuthenticated = false;
          state.user = null;
          state.accessToken = null; // Tokenları temizle
          state.refreshToken = null;
        }
      }
    );
    // --- YENİ EKLEME: verifyToken başarısız olduğunda state temizleme ---
    builder.addMatcher(authApi.endpoints.verifyToken.matchRejected, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null; // Tokenları temizle
      state.refreshToken = null;
    });
  },
});

export const { setCredentials, logout, updateUser, setAuthStatus } =
  authSlice.actions;
export default authSlice.reducer;
