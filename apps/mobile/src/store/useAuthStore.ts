import { create } from 'zustand';

interface TempProfile {
  fullName: string;
  email?: string;
  referralCode?: string;
}

interface AuthState {
  phone: string;
  tempProfile: TempProfile | null;
  isLoading: boolean;
  error: string | null;
  setPhone: (phone: string) => void;
  setTempProfile: (profile: TempProfile) => void;
  clearTempProfile: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  phone: '',
  tempProfile: null,
  isLoading: false,
  error: null,
  setPhone: (phone) => set({ phone }),
  setTempProfile: (tempProfile) => set({ tempProfile }),
  clearTempProfile: () => set({ tempProfile: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
