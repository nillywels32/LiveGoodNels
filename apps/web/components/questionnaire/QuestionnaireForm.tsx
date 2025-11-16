'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import type { QuestionnaireResponseData, WorkoutSchedule, SocialEvent, WorkSchedule, WorkDay } from '../../../../packages/types/src';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export function QuestionnaireForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [cravings, setCravings] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<string>('medium');
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutSchedule>({});
  const [socialEvents, setSocialEvents] = useState<SocialEvent[]>([]);
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule>({});
  const [fastingPlans, setFastingPlans] = useState<string[]>([]);
  const [openEnded, setOpenEnded] = useState('');

  const totalSteps = 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Get family ID
      const { data: familyMember } = await supabase
        .from('family_members')
        .select('family_id')
        .eq('user_id', user.id)
        .single();

      if (!familyMember) {
        throw new Error('Family not found');
      }

      // Calculate week start (upcoming Monday)
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek) % 7 || 7;
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + daysUntilMonday);
      weekStart.setHours(0, 0, 0, 0);

      const responses: QuestionnaireResponseData = {
        cravings,
        energyLevel,
        workoutSchedule,
        socialEvents,
        workSchedule,
        fastingPlans,
        openEnded,
      };

      // Save questionnaire response
      const { error: responseError } = await supabase
        .from('questionnaire_responses')
        .insert({
          user_id: user.id,
          family_id: familyMember.family_id,
          week_start: weekStart.toISOString().split('T')[0],
          responses,
        });

      if (responseError) throw responseError;

      // Redirect to meal plan generation
      router.push('/plan/generate');
    } catch (err: any) {
      setError(err.message || 'Failed to save questionnaire');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleCraving = (craving: string) => {
    setCravings((prev) =>
      prev.includes(craving)
        ? prev.filter((c) => c !== craving)
        : [...prev, craving]
    );
  };

  const toggleFastingPlan = (day: string) => {
    setFastingPlans((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="card p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-forest-green)' }}>
            Weekly Questionnaire
          </h1>
          <p className="mb-4" style={{ color: 'var(--color-dark-gray)' }}>
            Help us create your perfect meal plan for the week
          </p>
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-forest-green' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Cravings & Energy */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  What are you craving this week?
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Sweet', 'Salty', 'Spicy', 'Savory', 'Fresh', 'Hearty', 'Light', 'Comfort'].map(
                    (craving) => (
                      <button
                        key={craving}
                        type="button"
                        onClick={() => toggleCraving(craving.toLowerCase())}
                        className={`p-3 rounded-lg border-2 transition-colors ${
                          cravings.includes(craving.toLowerCase())
                            ? 'border-forest-green bg-forest-green bg-opacity-10'
                            : 'border-gray-200 hover:border-forest-green'
                        }`}
                      >
                        {craving}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  How's your energy level lately?
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'low', label: 'Low - Need extra energy boost' },
                    { value: 'medium', label: 'Medium - Normal energy' },
                    { value: 'high', label: 'High - Feeling great!' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors hover:border-forest-green"
                    >
                      <input
                        type="radio"
                        name="energy"
                        value={option.value}
                        checked={energyLevel === option.value}
                        onChange={(e) => setEnergyLevel(e.target.value)}
                        className="mr-3"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Workout Schedule */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                What's your workout schedule this week?
              </h3>
              {DAYS.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <label className="w-32 font-medium">{day}</label>
                  <input
                    type="text"
                    value={workoutSchedule[day] || ''}
                    onChange={(e) =>
                      setWorkoutSchedule({ ...workoutSchedule, [day]: e.target.value })
                    }
                    placeholder="e.g., HIIT 30min, Rest, etc."
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Social Events */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                Any social events or special occasions?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-dark-gray)' }}>
                We'll plan lighter meals or suggest make-ahead options
              </p>
              {socialEvents.map((event, index) => (
                <div key={index} className="flex gap-3">
                  <select
                    value={event.day}
                    onChange={(e) => {
                      const newEvents = [...socialEvents];
                      newEvents[index].day = e.target.value;
                      setSocialEvents(newEvents);
                    }}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select day</option>
                    {DAYS.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={event.event}
                    onChange={(e) => {
                      const newEvents = [...socialEvents];
                      newEvents[index].event = e.target.value;
                      setSocialEvents(newEvents);
                    }}
                    placeholder="e.g., Dinner with friends"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSocialEvents(socialEvents.filter((_, i) => i !== index))
                    }
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSocialEvents([...socialEvents, { day: '', event: '' }])}
                className="btn-secondary"
              >
                Add Event
              </button>
            </div>
          )}

          {/* Step 4: Work Schedule */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                What's your work schedule like?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-dark-gray)' }}>
                Help us suggest quick meals for busy days
              </p>
              {DAYS.map((day) => (
                <div key={day} className="space-y-2">
                  <label className="font-medium">{day}</label>
                  <div className="flex gap-3">
                    <input
                      type="time"
                      value={workSchedule[day]?.start || ''}
                      onChange={(e) =>
                        setWorkSchedule({
                          ...workSchedule,
                          [day]: {
                            ...(workSchedule[day] || { end: '', cooking: false }),
                            start: e.target.value,
                          },
                        })
                      }
                      className="px-4 py-2 border rounded-lg"
                      placeholder="Start"
                    />
                    <input
                      type="time"
                      value={workSchedule[day]?.end || ''}
                      onChange={(e) =>
                        setWorkSchedule({
                          ...workSchedule,
                          [day]: {
                            ...(workSchedule[day] || { start: '', cooking: false }),
                            end: e.target.value,
                          },
                        })
                      }
                      className="px-4 py-2 border rounded-lg"
                      placeholder="End"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={workSchedule[day]?.cooking || false}
                        onChange={(e) =>
                          setWorkSchedule({
                            ...workSchedule,
                            [day]: {
                              ...(workSchedule[day] || { start: '', end: '' }),
                              cooking: e.target.checked,
                            },
                          })
                        }
                      />
                      <span className="text-sm">Time to cook?</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 5: Fasting Plans */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                Planning to fast any days?
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-dark-gray)' }}>
                We'll plan lighter meals or juice-only days
              </p>
              <div className="grid grid-cols-2 gap-3">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleFastingPlan(day)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      fastingPlans.includes(day)
                        ? 'border-forest-green bg-forest-green bg-opacity-10'
                        : 'border-gray-200 hover:border-forest-green'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Open-ended */}
          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">
                Anything else we should know?
              </h3>
              <textarea
                value={openEnded}
                onChange={(e) => setOpenEnded(e.target.value)}
                placeholder="Special requests, preferences, goals for the week..."
                rows={6}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {error && (
            <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="btn-secondary"
            >
              Previous
            </button>

            {step < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Next
              </button>
            ) : (
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Submitting...' : 'Generate Meal Plan'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
