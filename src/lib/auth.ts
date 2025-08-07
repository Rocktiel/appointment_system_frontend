import { authApi } from "@/services/authApi";
import { store } from "@/lib/store";
import {
  setCredentials,
  logout as authSliceLogout,
  setAuthStatus,
} from "@/lib/slices/authSlice";

export const checkAuth = async () => {
  const dispatch = store.dispatch;
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  try {
    // Eğer accessToken yoksa refresh dene
    if (!accessToken) {
      const refreshResult = await dispatch(
        authApi.endpoints.refreshToken.initiate(undefined)
      ).unwrap();

      const { accessToken: newAccessToken } = refreshResult.data || {};

      if (newAccessToken) {
        dispatch(
          setCredentials({
            accessToken: newAccessToken,
            refreshToken: null,
          })
        );
      } else {
        dispatch(authSliceLogout());
        return { isAuthenticated: false, role: null };
      }
    }

    // Access token varsa verify et
    const verifyResult = await dispatch(
      authApi.endpoints.verifyToken.initiate(undefined)
    ).unwrap();
    const { isValid, user } = verifyResult.data || {};

    if (isValid && user) {
      dispatch(setAuthStatus({ isAuthenticated: true, user: user }));

      return { isAuthenticated: true, role: user.role };
    } else {
      dispatch(authSliceLogout());
      return { isAuthenticated: false, role: null };
    }
  } catch (err) {
    dispatch(authSliceLogout());
    return { isAuthenticated: false, role: null };
  }
};
