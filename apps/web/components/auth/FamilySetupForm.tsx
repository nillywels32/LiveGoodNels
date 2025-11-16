'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

interface FamilyMember {
  name: string;
  age: number | null;
  role: 'parent' | 'child';
  dietaryRestrictions: string[];
}

export function FamilySetupForm() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [familyName, setFamilyName] = useState('');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [currentMember, setCurrentMember] = useState<FamilyMember>({
    name: '',
    age: null,
    role: 'child',
    dietaryRestrictions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMember = () => {
    if (!currentMember.name) {
      setError('Please enter a name');
      return;
    }
    setMembers([...members, currentMember]);
    setCurrentMember({
      name: '',
      age: null,
      role: 'child',
      dietaryRestrictions: [],
    });
    setError(null);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('No user found. Please sign in again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create family profile
      const { data: family, error: familyError } = await supabase
        .from('family_profiles')
        .insert({
          name: familyName,
          created_by: user.id,
        })
        .select()
        .single();

      if (familyError) throw familyError;

      // Add the current user as a parent
      const { error: parentError } = await supabase
        .from('family_members')
        .insert({
          family_id: family.id,
          user_id: user.id,
          role: 'parent',
          name: null, // Name comes from users table
          age: null,
          dietary_restrictions: null,
        });

      if (parentError) throw parentError;

      // Add other family members
      if (members.length > 0) {
        const familyMembersData = members.map((member) => ({
          family_id: family.id,
          user_id: null, // Children don't have user accounts
          role: member.role,
          name: member.name,
          age: member.age,
          dietary_restrictions: member.dietaryRestrictions.length > 0
            ? member.dietaryRestrictions
            : null,
        }));

        const { error: membersError } = await supabase
          .from('family_members')
          .insert(familyMembersData);

        if (membersError) throw membersError;
      }

      // Create default nutrition profile
      const { data: nutritionProfile, error: nutritionError } = await supabase
        .from('nutrition_profiles')
        .insert({
          family_id: family.id,
          philosophy: 'Go Back to Nature - Whole foods, plant-based, organic',
          dietary_style: ['whole_foods', 'plant_forward', 'organic'],
          daily_juice_required: true,
          avoid_foods: ['refined_sugar', 'refined_carbs', 'processed_foods'],
          emphasize_foods: ['dark_leafy_greens', 'turmeric', 'blueberries', 'broccoli'],
          allow_fasting: true,
          allow_ketosis: false,
          active_lifestyle: true,
          gut_health_focus: true,
        })
        .select()
        .single();

      if (nutritionError) throw nutritionError;

      // Create top 15 food frequency rules
      const top15Foods = [
        { name: 'Broccoli sprouts', days: 2 },
        { name: 'Turmeric', days: 1 },
        { name: 'Blueberries', days: 2 },
        { name: 'Broccoli', days: 3 },
        { name: 'Flaxseed', days: 1 },
        { name: 'Dark leafy greens', days: 1 },
        { name: 'Garlic', days: 2 },
        { name: 'Mushrooms', days: 3 },
        { name: 'Cacao', days: 2 },
        { name: 'Tigernuts', days: 4 },
        { name: 'Ginger root', days: 1 },
        { name: 'Grapes', days: 3 },
        { name: 'Tomatoes', days: 2 },
        { name: 'Lemon', days: 1 },
        { name: 'Quinoa', days: 3 },
      ];

      const foodRules = top15Foods.map((food) => ({
        nutrition_profile_id: nutritionProfile.id,
        food_name: food.name,
        frequency_days: food.days,
        is_top_15: true,
        priority: 'high' as const,
      }));

      const { error: rulesError } = await supabase
        .from('food_frequency_rules')
        .insert(foodRules);

      if (rulesError) throw rulesError;

      // Success! Redirect to home
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to set up family');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <div className="card p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-forest-green)' }}>
            Set Up Your Family
          </h1>
          <p style={{ color: 'var(--color-dark-gray)' }}>
            Tell us about your family to personalize your meal plans
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Family Name */}
          <div>
            <label htmlFor="familyName" className="block text-sm font-medium mb-1">
              Family Name
            </label>
            <input
              id="familyName"
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
              placeholder="The Smith Family"
              required
              disabled={loading}
            />
          </div>

          {/* Family Members */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Family Members</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-dark-gray)' }}>
              Add children and other family members (optional)
            </p>

            {/* List of added members */}
            {members.length > 0 && (
              <div className="space-y-2 mb-4">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm" style={{ color: 'var(--color-dark-gray)' }}>
                        {member.age ? `Age ${member.age}` : 'Age not specified'} • {member.role}
                        {member.dietaryRestrictions.length > 0 &&
                          ` • ${member.dietaryRestrictions.join(', ')}`}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add member form */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={currentMember.name}
                    onChange={(e) =>
                      setCurrentMember({ ...currentMember, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Child's name"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <input
                    type="number"
                    value={currentMember.age || ''}
                    onChange={(e) =>
                      setCurrentMember({
                        ...currentMember,
                        age: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Age"
                    min="0"
                    max="120"
                    disabled={loading}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addMember}
                className="btn-secondary w-full"
                disabled={loading}
              >
                Add Family Member
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !familyName}
            className="btn-primary w-full"
          >
            {loading ? 'Creating family profile...' : 'Complete Setup'}
          </button>
        </form>
      </div>
    </div>
  );
}
