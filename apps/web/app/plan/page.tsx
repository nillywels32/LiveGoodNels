'use client';

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import type { MealPlan, PlannedMeal } from '../../../packages/types/src';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function PlanPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(DAYS[new Date().getDay() - 1] || 'Monday');

  useEffect(() => {
    if (!user) return;

    const loadMealPlan = async () => {
      try {
        // Get family ID
        const { data: familyMember } = await supabase
          .from('family_members')
          .select('family_id')
          .eq('user_id', user.id)
          .single();

        if (!familyMember) return;

        // Get current week's meal plan
        const today = new Date();
        const weekStart = new Date(today);
        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        weekStart.setDate(today.getDate() + daysToMonday);
        weekStart.setHours(0, 0, 0, 0);

        const { data: plan } = await supabase
          .from('meal_plans')
          .select('*')
          .eq('family_id', familyMember.family_id)
          .eq('week_start', weekStart.toISOString().split('T')[0])
          .single();

        if (plan) {
          setMealPlan(plan);

          // Get planned meals
          const { data: meals } = await supabase
            .from('planned_meals')
            .select('*')
            .eq('meal_plan_id', plan.id)
            .order('day_of_week');

          if (meals) {
            setPlannedMeals(meals);
          }
        }
      } catch (err) {
        console.error('Error loading meal plan:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMealPlan();
  }, [user]);

  const getMealsForDay = (day: string) => {
    return plannedMeals.filter((meal) => meal.day_of_week === day);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
            <p style={{ color: 'var(--color-dark-gray)' }}>Loading meal plan...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!mealPlan) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
              No Meal Plan Yet
            </h2>
            <p className="mb-6" style={{ color: 'var(--color-dark-gray)' }}>
              Start by completing the weekly questionnaire
            </p>
            <button onClick={() => router.push('/questionnaire')} className="btn-primary">
              Create Meal Plan
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-off-black)' }}>
            Your Meal Plan
          </h1>
          <p style={{ color: 'var(--color-dark-gray)' }}>
            Week of{' '}
            {new Date(mealPlan.week_start).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            })}{' '}
            -{' '}
            {new Date(mealPlan.week_end).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>

        {/* Day Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-forest-green text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Meals for Selected Day */}
        <div className="space-y-4">
          {getMealsForDay(selectedDay).length > 0 ? (
            getMealsForDay(selectedDay).map((meal) => (
              <div key={meal.id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm font-medium text-ocean-blue uppercase mb-1">
                      {meal.meal_type}
                    </div>
                    <h3 className="text-xl font-bold">{meal.meal_name}</h3>
                    {meal.is_fasting && (
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded mt-2">
                        Fasting Day
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    {meal.prep_time && (
                      <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                        ⏱️ {meal.prep_time + (meal.cook_time || 0)} min
                      </p>
                    )}
                    {meal.macros && (
                      <p className="text-sm font-medium">
                        {meal.macros.calories} cal
                      </p>
                    )}
                  </div>
                </div>

                {/* Ingredients Preview */}
                {meal.ingredients && meal.ingredients.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Ingredients:</p>
                    <div className="flex flex-wrap gap-2">
                      {meal.ingredients.slice(0, 5).map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 rounded text-sm"
                        >
                          {ing.name}
                        </span>
                      ))}
                      {meal.ingredients.length > 5 && (
                        <span className="px-2 py-1 text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                          +{meal.ingredients.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {meal.kid_friendly_notes && (
                  <div className="mb-4 p-3 bg-lime-50 rounded-lg">
                    <p className="text-sm">
                      👶 <strong>Kid-friendly:</strong> {meal.kid_friendly_notes}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => router.push(`/plan/meal/${meal.id}`)}
                  className="btn-secondary w-full"
                >
                  View Full Recipe
                </button>
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <p style={{ color: 'var(--color-dark-gray)' }}>No meals planned for {selectedDay}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button onClick={() => router.push('/shop')} className="btn-primary flex-1">
            View Shopping List
          </button>
          <button onClick={() => router.push('/questionnaire')} className="btn-secondary flex-1">
            New Meal Plan
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
