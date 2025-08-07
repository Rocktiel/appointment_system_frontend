export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "BUSINESS";
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest extends LoginRequest {
  userType: "BUSINESS" | "ADMIN";
}
interface AuthResponse {
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export type { LoginRequest, RegisterRequest, AuthResponse };
