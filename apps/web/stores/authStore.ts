import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setUser: (user) => set({ user }),

  setSession: (session) => set({ session, user: session?.user ?? null }),

  setLoading: (loading) => set({ loading }),

  signOut: async () => {
    // Import dynamically to avoid circular dependencies
    const { supabase } = await import('@/lib/supabase/client');
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
