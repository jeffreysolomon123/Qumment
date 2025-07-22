import { create } from "zustand";

type AuthStore = {
    user: any;
    setUser: (user: any) => void;
    clearUser: () => void;

    projects: any[]; // added projects state
    setProjects: (projects: any[]) => void;
    clearProjects: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),

    projects: [],
    setProjects: (projects) => set({ projects }),
    clearProjects: () => set({ projects: [] }),
}));
