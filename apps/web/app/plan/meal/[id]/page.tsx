'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import type { PlannedMeal, MealFeedback } from '@packages/types';

export default function MealDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuthStore();
  const [meal, setMeal] = useState<PlannedMeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<Partial<MealFeedback>>({
    rating: 5,
    kid_rating: null,
    would_make_again: null,
    comments: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadMeal = async () => {
      try {
        const { data } = await supabase
          .from('planned_meals')
          .select('*')
          .eq('id', params.id)
          .single();

        if (data) {
          setMeal(data);
        }
      } catch (err) {
        console.error('Error loading meal:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [params.id]);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !meal) return;

    setSubmitting(true);

    try {
      const { error } = await supabase.from('meal_feedback').insert({
        planned_meal_id: meal.id,
        user_id: user.id,
        rating: feedback.rating || 5,
        kid_rating: feedback.kid_rating,
        would_make_again: feedback.would_make_again,
        comments: feedback.comments,
      });

      if (error) throw error;

      alert('Feedback submitted! Thank you.');
      setShowFeedback(false);
    } catch (err) {
      console.error('Error submitting feedback:', err);
      alert('Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
            <p style={{ color: 'var(--color-dark-gray)' }}>Loading recipe...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!meal) {
    return (
      <ProtectedRoute>
        <div className="p-8">
          <p>Meal not found</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <button onClick={() => router.back()} className="mb-6 text-ocean-blue hover:underline">
          ← Back to Meal Plan
        </button>

        <div className="card p-8">
          <div className="mb-6">
            <div className="text-sm font-medium text-ocean-blue uppercase mb-2">
              {meal.meal_type} • {meal.day_of_week}
            </div>
            <h1 className="text-4xl font-bold mb-4">{meal.meal_name}</h1>

            {/* Metadata */}
            <div className="flex flex-wrap gap-6 text-sm">
              {meal.prep_time && (
                <div>
                  <span className="font-medium">Prep:</span> {meal.prep_time} min
                </div>
              )}
              {meal.cook_time && (
                <div>
                  <span className="font-medium">Cook:</span> {meal.cook_time} min
                </div>
              )}
              <div>
                <span className="font-medium">Servings:</span> {meal.serving_size}
                </div>
            </div>

            {/* Macros */}
            {meal.macros && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{meal.macros.calories}</div>
                    <div className="text-xs text-gray-600">Calories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meal.macros.protein}g</div>
                    <div className="text-xs text-gray-600">Protein</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meal.macros.carbs}g</div>
                    <div className="text-xs text-gray-600">Carbs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meal.macros.fats}g</div>
                    <div className="text-xs text-gray-600">Fats</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{meal.macros.fiber}g</div>
                    <div className="text-xs text-gray-600">Fiber</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Kid-Friendly Notes */}
          {meal.kid_friendly_notes && (
            <div className="mb-6 p-4 bg-lime-50 rounded-lg">
              <h3 className="font-semibold mb-2">👶 Kid-Friendly Tips</h3>
              <p>{meal.kid_friendly_notes}</p>
            </div>
          )}

          {/* Age-Appropriate Tasks */}
          {meal.age_appropriate_tasks && meal.age_appropriate_tasks.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">👨‍👩‍👧‍👦 Kids Can Help With</h3>
              <ul className="list-disc list-inside space-y-1">
                {meal.age_appropriate_tasks.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
            <div className="space-y-2">
              {meal.ingredients.map((ingredient, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {meal.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-forest-green text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <p className="flex-1 pt-1">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Notes */}
          {meal.notes && (
            <div className="mb-8 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold mb-2">📝 Notes</h3>
              <p>{meal.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="btn-primary flex-1"
            >
              {showFeedback ? 'Cancel Feedback' : 'Rate This Meal'}
            </button>
            <button className="btn-secondary flex-1">Share Recipe</button>
          </div>

          {/* Feedback Form */}
          {showFeedback && (
            <form onSubmit={handleSubmitFeedback} className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold mb-4">How was this meal?</h3>

              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback({ ...feedback, rating: star })}
                        className="text-3xl"
                      >
                        {star <= (feedback.rating || 0) ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Kids' Rating (optional)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedback({ ...feedback, kid_rating: star })}
                        className="text-3xl"
                      >
                        {star <= (feedback.kid_rating || 0) ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Would you make this again?</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setFeedback({ ...feedback, would_make_again: true })}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        feedback.would_make_again === true
                          ? 'border-forest-green bg-forest-green bg-opacity-10'
                          : 'border-gray-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedback({ ...feedback, would_make_again: false })}
                      className={`px-4 py-2 rounded-lg border-2 ${
                        feedback.would_make_again === false
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2">Comments (optional)</label>
                  <textarea
                    value={feedback.comments}
                    onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Any notes, modifications, or suggestions..."
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
