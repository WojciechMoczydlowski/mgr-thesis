import { create } from "zustand";

export enum Authority {
  student = "STUDENT",
  teacher = "TEACHER",
}

interface AuthState {
  authority?: Authority;
  setAuthority: (authority: Authority) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  setAuthority: (authority) => set(() => ({ authority })),
}));
