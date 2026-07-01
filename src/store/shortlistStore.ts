import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, ShortlistItem } from "@/types";

function makeKey(platform: Platform, user_id: string) {
  return `${platform}:${user_id}`;
}

interface ShortlistState {
  items: ShortlistItem[];
  addProfile: (item: ShortlistItem) => void;
  removeProfile: (platform: Platform, user_id: string) => void;
  isSelected: (platform: Platform, user_id: string) => boolean;
  clear: () => void;
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addProfile: (item) => {
        const exists = get().items.some(
          (i) => makeKey(i.platform, i.user_id) === makeKey(item.platform, item.user_id)
        );
        if (exists) return;
        set((state) => ({ items: [...state.items, item] }));
      },

      removeProfile: (platform, user_id) => {
        set((state) => ({
          items: state.items.filter(
            (i) => makeKey(i.platform, i.user_id) !== makeKey(platform, user_id)
          ),
        }));
      },

      isSelected: (platform, user_id) => {
        return get().items.some(
          (i) => makeKey(i.platform, i.user_id) === makeKey(platform, user_id)
        );
      },

      clear: () => set({ items: [] }),
    }),
    {
      name: "wobb-shortlist", // localStorage key
    }
  )
);