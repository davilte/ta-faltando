import { useAuthStore } from "~/src/store/auth";

export const useUser = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return { user, isAuthenticated };
};