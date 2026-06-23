import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type OutletType = 'AROMA' | 'COZY_CUP' | 'BIRYANI_SHOP';

interface OutletState {
  selectedOutlet: OutletType | null;
  setOutlet: (outlet: OutletType | null) => void;
}

export const useOutletStore = create<OutletState>()(
  persist(
    (set) => ({
      selectedOutlet: null,
      setOutlet: (selectedOutlet) => set({ selectedOutlet }),
    }),
    {
      name: 'aroma-outlet-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
