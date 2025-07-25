export interface LoginDTO {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}