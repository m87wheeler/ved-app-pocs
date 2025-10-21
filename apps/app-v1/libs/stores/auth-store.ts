import { create } from "zustand";

interface IAuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isPlusMember: boolean;
  setIsPlusMember: (isPlusMember: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  // account authentication
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),

  // membership
  isPlusMember: false,
  setIsPlusMember: (isPlusMember: boolean) => set({ isPlusMember }),
}));
