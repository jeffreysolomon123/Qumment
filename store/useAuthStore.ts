import { create } from "zustand";

type AuthStore = {
    user: any;
    setUser: (user: any) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));