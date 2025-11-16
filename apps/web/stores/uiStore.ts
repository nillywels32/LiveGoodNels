import { create } from 'zustand';

interface UIState {
  currentWeek: string;
  selectedDay: string;
  showPlanBModal: boolean;
  setCurrentWeek: (week: string) => void;
  setSelectedDay: (day: string) => void;
  togglePlanBModal: () => void;
}

const getCurrentWeek = (): string => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  return startOfWeek.toISOString().split('T')[0];
};

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const useUIStore = create<UIState>((set) => ({
  currentWeek: getCurrentWeek(),
  selectedDay: getTodayString(),
  showPlanBModal: false,
  setCurrentWeek: (week) => set({ currentWeek: week }),
  setSelectedDay: (day) => set({ selectedDay: day }),
  togglePlanBModal: () => set((state) => ({ showPlanBModal: !state.showPlanBModal })),
}));
