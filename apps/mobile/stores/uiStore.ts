import { create } from 'zustand';

interface UIState {
  currentWeek: string;
  selectedDay: string;
  showPlanBModal: boolean;
  setCurrentWeek: (week: string) => void;
  setSelectedDay: (day: string) => void;
  togglePlanBModal: () => void;
}

// Helper function to get current week start date (Monday)
const getCurrentWeek = (): string => {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
};

// Helper function to get today's date string
const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useUIStore = create<UIState>((set) => ({
  currentWeek: getCurrentWeek(),
  selectedDay: getTodayString(),
  showPlanBModal: false,

  setCurrentWeek: (week) => set({ currentWeek: week }),

  setSelectedDay: (day) => set({ selectedDay: day }),

  togglePlanBModal: () => set((state) => ({
    showPlanBModal: !state.showPlanBModal
  })),
}));
