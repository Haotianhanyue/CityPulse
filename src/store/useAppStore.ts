import { create } from "zustand";
import type { NavTab } from "@/types";

interface AppState {
  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Bottom Sheet
  bottomSheetExpanded: boolean;
  setBottomSheetExpanded: (expanded: boolean) => void;
  toggleBottomSheet: () => void;

  // FAB
  fabMenuOpen: boolean;
  toggleFabMenu: () => void;
  closeFabMenu: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeTab: "explore",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Bottom Sheet
  bottomSheetExpanded: false,
  setBottomSheetExpanded: (expanded) => set({ bottomSheetExpanded: expanded }),
  toggleBottomSheet: () =>
    set((state) => ({ bottomSheetExpanded: !state.bottomSheetExpanded })),

  // FAB
  fabMenuOpen: false,
  toggleFabMenu: () => set((state) => ({ fabMenuOpen: !state.fabMenuOpen })),
  closeFabMenu: () => set({ fabMenuOpen: false }),
}));
