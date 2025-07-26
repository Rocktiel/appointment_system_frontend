import { authApi } from "@/services/authApi";
import { store } from "@/lib/store";
import {
  setAuthStatus,
  logout as authSliceLogout,
} from "@/lib/slices/authSlice"; // authSlice yolunuza göre ayarlayın

export const checkAuth = async () => {
  const dispatch = store.dispatch;

  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      dispatch(authSliceLogout());
      return { isAuthenticated: false, role: null };
    }

    // `verifyToken` çağrısı, `prepareHeaders` sayesinde tokenı otomatik göndermelidir.
    const { data, error } = await dispatch(
      authApi.endpoints.verifyToken.initiate(undefined, { forceRefetch: true })
    );

    if (data && data.isValid && data.user) {
      dispatch(setAuthStatus({ isAuthenticated: true, user: data.user }));
      return { isAuthenticated: true, role: data.user.role };
    } else if (error) {
      // API'den hata döndüğünde
      console.error("Token verification failed with error:", error);
      dispatch(authSliceLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { isAuthenticated: false, role: null };
    } else {
      // data.isValid false ise veya data.user yoksa
      console.warn(
        "Token verification returned invalid data or no user.",
        data
      );
      dispatch(authSliceLogout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return { isAuthenticated: false, role: null };
    }
  } catch (error) {
    console.error(
      "Unexpected error during auth verification in checkAuth:",
      error
    );
    dispatch(authSliceLogout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return { isAuthenticated: false, role: null };
  }
};
