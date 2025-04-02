import { useEffect } from "react";
import { create } from "zustand";
import { storage } from "~/storage/mmkv";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: storage.getBoolean("isAuthenticated") || false,

  login: () => {
    storage.set("isAuthenticated", true);
    set({ isAuthenticated: true });
  },

  logout: () => {
    storage.delete("isAuthenticated");
    set({ isAuthenticated: false });
  },

  checkAuth: () => {
    const value = storage.getBoolean("isAuthenticated");
    set({ isAuthenticated: value || false });
  },
}));

export const useAuthInit = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
};