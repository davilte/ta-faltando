import { useEffect } from "react";
import { create } from "zustand";
import { storage } from "~/src/storage/mmkv";
import { AuthState, User } from "~/src/types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: storage.getString("token") || null,
  user: storage.getString("user") ? JSON.parse(storage.getString("user")!) : null,
  isAuthenticated: storage.getBoolean("isAuthenticated") || false,

  login: (token, user) => {
    storage.set("token", token);
    storage.set("user", JSON.stringify(user));
    storage.set("isAuthenticated", true);
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    storage.delete("token");
    storage.delete("user");
    storage.delete("isAuthenticated");
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = storage.getString("token") || null;
    const user = storage.getString("user") ? JSON.parse(storage.getString("user")!) : null;
    const isAuthenticated = storage.getBoolean("isAuthenticated") || false;
    set({ token, user, isAuthenticated });
  }
}));

export const useAuthInit = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
};