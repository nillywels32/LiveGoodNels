'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasFamily, setHasFamily] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if user is authenticated
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth/login');
        return;
      }

      // Check if user has a family profile
      const { data: familyMember } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('user_id', session.user.id)
        .single();

      if (!familyMember) {
        router.push('/auth/family-setup');
        return;
      }

      setHasFamily(true);
      setLoading(false);
    };

    checkAuth();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
          <p style={{ color: 'var(--color-dark-gray)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !hasFamily) {
    return null;
  }

  return <>{children}</>;
}
