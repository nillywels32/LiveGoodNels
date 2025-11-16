'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function GenerateMealPlanPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [status, setStatus] = useState<'loading' | 'generating' | 'success' | 'error'>('loading');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const generateMealPlan = async () => {
      try {
        setStatus('loading');
        setMessage('Loading your questionnaire responses...');
        setProgress(10);

        // Get family ID
        const { data: familyMember } = await supabase
          .from('family_members')
          .select('family_id')
          .eq('user_id', user.id)
          .single();

        if (!familyMember) {
          throw new Error('Family not found');
        }

        setProgress(20);
        setMessage('Fetching family profile and nutrition preferences...');

        // Get latest questionnaire response
        const { data: questionnaireResponse } = await supabase
          .from('questionnaire_responses')
          .select('*')
          .eq('family_id', familyMember.family_id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (!questionnaireResponse) {
          throw new Error('No questionnaire found. Please complete the questionnaire first.');
        }

        setProgress(30);
        setMessage('Getting nutrition profile...');

        // Get nutrition profile
        const { data: nutritionProfile } = await supabase
          .from('nutrition_profiles')
          .select('*')
          .eq('family_id', familyMember.family_id)
          .single();

        setProgress(40);
        setMessage('Getting top 15 food frequency rules...');

        // Get food frequency rules
        const { data: foodRules } = await supabase
          .from('food_frequency_rules')
          .select('*')
          .eq('nutrition_profile_id', nutritionProfile?.id || '')
          .eq('is_top_15', true);

        setProgress(50);
        setMessage('Generating your AI-powered meal plan...');
        setStatus('generating');

        // Call the generate-meal-plan Edge Function
        const { data: functionData, error: functionError } = await supabase.functions.invoke(
          'generate-meal-plan',
          {
            body: {
              familyId: familyMember.family_id,
              questionnaireId: questionnaireResponse.id,
              nutritionProfileId: nutritionProfile?.id || null,
            },
          }
        );

        if (functionError) throw functionError;

        setProgress(90);
        setMessage('Saving your meal plan...');

        // The Edge Function should have created the meal plan
        // Redirect to view it
        setProgress(100);
        setStatus('success');
        setMessage('Meal plan generated successfully!');

        setTimeout(() => {
          router.push('/plan');
        }, 1500);
      } catch (err: any) {
        console.error('Error generating meal plan:', err);
        setStatus('error');
        setError(err.message || 'Failed to generate meal plan');
      }
    };

    generateMealPlan();
  }, [user, router]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="card p-8 max-w-2xl w-full">
          <div className="text-center">
            {status === 'loading' || status === 'generating' ? (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-forest-green mx-auto mb-6"></div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-forest-green)' }}>
                  {status === 'generating' ? 'Creating Your Meal Plan' : 'Loading'}
                </h2>
                <p className="mb-6" style={{ color: 'var(--color-dark-gray)' }}>
                  {message}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-forest-green h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                  {progress}% complete
                </p>

                {status === 'generating' && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm" style={{ color: 'var(--color-ocean-blue)' }}>
                      Our AI is crafting a personalized 7-day meal plan based on your preferences,
                      schedule, and nutrition goals. This may take 30-60 seconds.
                    </p>
                  </div>
                )}
              </>
            ) : status === 'success' ? (
              <>
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-forest-green)' }}>
                  Success!
                </h2>
                <p style={{ color: 'var(--color-dark-gray)' }}>{message}</p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">❌</div>
                <h2 className="text-2xl font-bold mb-2 text-red-600">Error</h2>
                <p className="mb-6" style={{ color: 'var(--color-dark-gray)' }}>
                  {error}
                </p>
                <div className="flex gap-4 justify-center">
                  <button onClick={() => router.push('/questionnaire')} className="btn-secondary">
                    Back to Questionnaire
                  </button>
                  <button onClick={() => window.location.reload()} className="btn-primary">
                    Try Again
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
