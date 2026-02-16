/**
 * Inventory store — owned gear collection.
 * Gear is awarded on level-up and stored here.
 * Equip/unequip actions live in character-store (equippedGear is part of Character).
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { GearItem, GearSlot } from "@/types/game";

interface InventoryState {
  ownedGear: GearItem[];
}

interface InventoryActions {
  addGear: (gear: GearItem) => void;
  hasGear: (gearId: string) => boolean;
  getGearBySlot: (slot: GearSlot) => GearItem[];
  reset: () => void;
}

const STORAGE_KEY = "questhabit-inventory";

export const useInventoryStore = create<InventoryState & InventoryActions>()(
  persist(
    (set, get) => ({
      ownedGear: [],

      addGear: (gear) => {
        const { ownedGear } = get();
        // Prevent duplicates
        if (ownedGear.some((g) => g.id === gear.id)) return;
        set({ ownedGear: [...ownedGear, gear] });
      },

      hasGear: (gearId) => {
        return get().ownedGear.some((g) => g.id === gearId);
      },

      getGearBySlot: (slot) => {
        return get().ownedGear.filter((g) => g.slot === slot);
      },

      reset: () => set({ ownedGear: [] }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
