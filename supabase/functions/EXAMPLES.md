# Edge Functions - Usage Examples

Quick reference for using the GoodLifeNels Edge Functions.

---

## 1. Generate Meal Plan

### Request

```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-meal-plan`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    weekStart: '2025-11-17',
    questionnaireResponses: [
      {
        userId: 'user-1',
        responses: {
          cravings: ['tacos', 'salmon', 'smoothie bowls'],
          energyLevel: 'high',
          workoutSchedule: ['Monday', 'Wednesday', 'Friday'],
          socialEvents: ['Friday dinner out'],
          cookingTime: {
            Monday: 45,
            Tuesday: 30,
            Wednesday: 45,
            Thursday: 30,
            Friday: 0,
            Saturday: 60,
            Sunday: 60,
          },
          fastingDays: ['Tuesday morning'],
          preferences: ['Quick weeknight meals', 'Batch prep on Sunday'],
        },
      },
      {
        userId: 'user-2',
        responses: {
          cravings: ['pasta', 'stir-fry'],
          energyLevel: 'medium',
          workoutSchedule: ['Tuesday', 'Thursday'],
          cookingTime: {
            Monday: 30,
            Tuesday: 45,
            Wednesday: 30,
            Thursday: 30,
            Friday: 0,
            Saturday: 45,
            Sunday: 60,
          },
        },
      },
    ],
    nutritionProfile: {
      familyId: 'family-1',
      avoidFoods: ['dairy', 'gluten'],
      favoriteFoods: ['salmon', 'quinoa', 'blueberries'],
      dietaryRestrictions: ['gluten-free'],
      healthGoals: ['increase protein', 'more vegetables', 'gut health'],
    },
    inventory: [
      { name: 'Organic spinach', quantity: 2, unit: 'cups', category: 'produce' },
      { name: 'Quinoa', quantity: 1, unit: 'lb', category: 'grains' },
      { name: 'Chicken breast', quantity: 2, unit: 'lbs', category: 'protein' },
      { name: 'Blueberries', quantity: 1, unit: 'pint', category: 'produce', expirationDate: '2025-11-20' },
    ],
    foodFrequencyRules: {
      top15Foods: [
        'broccoli sprouts',
        'turmeric',
        'blueberries',
        'broccoli',
        'flaxseed',
        'dark leafy greens',
        'garlic',
        'mushrooms',
        'cacao',
        'tigernuts',
        'ginger root',
        'grapes',
        'tomatoes',
        'lemon',
        'quinoa',
      ],
      targetFrequency: {
        'broccoli sprouts': 3,
        turmeric: 5,
        blueberries: 5,
      },
    },
    macroTargets: {
      Monday: { protein: 130, carbs: 160, fats: 55, fiber: 40, calories: 1680 },
      Tuesday: { protein: 100, carbs: 120, fats: 45, fiber: 35, calories: 1350 },
      Wednesday: { protein: 130, carbs: 160, fats: 55, fiber: 40, calories: 1680 },
      Thursday: { protein: 110, carbs: 130, fats: 50, fiber: 35, calories: 1480 },
      Friday: { protein: 120, carbs: 140, fats: 50, fiber: 35, calories: 1540 },
      Saturday: { protein: 120, carbs: 140, fats: 50, fiber: 35, calories: 1540 },
      Sunday: { protein: 120, carbs: 140, fats: 50, fiber: 35, calories: 1540 },
    },
    historicalContext: {
      lovedMeals: ['Quinoa Buddha Bowl', 'Salmon with Roasted Vegetables', 'Berry Smoothie Bowl'],
      dislikedMeals: ['Cauliflower Rice Stir-Fry'],
      kidPreferences: {
        loved: ['Berry smoothies', 'Chicken fingers', 'Mac and cheese'],
        disliked: ['Brussels sprouts', 'Visible onions', 'Mushrooms'],
        neutral: ['Broccoli (sometimes)', 'Sweet potatoes'],
      },
    },
    constraints: {
      expiringItems: ['Blueberries (Nov 20)'],
      socialEvents: ['Friday: Dinner out'],
      cookingSchedule: {
        Monday: 'Sarah (45 min)',
        Tuesday: 'John (30 min)',
        Wednesday: 'Sarah (45 min)',
        Thursday: 'John (30 min)',
        Friday: 'Eating out',
        Saturday: 'Both (60 min)',
        Sunday: 'Sarah (60 min)',
      },
      specialDays: {
        Tuesday: 'Sarah fasting until noon',
      },
    },
  }),
});

const { mealPlan, usage } = await response.json();
console.log('Meal plan generated!', mealPlan);
console.log('Token usage:', usage);
```

### Response

```json
{
  "mealPlan": {
    "weekStart": "2025-11-17",
    "weekEnd": "2025-11-23",
    "meals": [
      {
        "day": "Monday",
        "dayType": "training_day",
        "breakfast": {
          "name": "Berry Protein Smoothie Bowl",
          "prepTime": 10,
          "cookTime": 0,
          "servings": 2,
          "macros": {
            "protein": 28,
            "carbs": 45,
            "fats": 14,
            "fiber": 12,
            "calories": 410
          },
          "ingredients": [...],
          "instructions": [...],
          "kidFriendlyNotes": "Let kids add their own toppings!",
          "ageTasks": ["Wash berries", "Pour toppings"],
          "top15Foods": ["blueberries", "flaxseed", "cacao"]
        },
        "lunch": {...},
        "dinner": {...},
        "snacks": [{...}],
        "juice": {...},
        "smoothie": {...},
        "dailyMacros": {
          "protein": 130,
          "carbs": 160,
          "fats": 55,
          "fiber": 40,
          "calories": 1680
        }
      }
      // ... 6 more days
    ],
    "weeklyMacros": {
      "protein": 840,
      "carbs": 1050,
      "fats": 350,
      "fiber": 245,
      "calories": 11060
    },
    "shoppingList": [
      {
        "name": "Organic Spinach",
        "quantity": 10,
        "unit": "cups",
        "category": "produce",
        "suggestedStore": "Sprouts",
        "priority": "high",
        "usedInMeals": ["Monday Breakfast", "Tuesday Juice"]
      }
      // ... more items
    ],
    "topFoodsCoverage": {
      "broccoliSprouts": 2,
      "turmeric": 4,
      "blueberries": 5,
      "broccoli": 3,
      "flaxseed": 6,
      "darkLeafyGreens": 7
    }
  },
  "usage": {
    "inputTokens": 28543,
    "outputTokens": 3821
  }
}
```

---

## 2. Generate Plan B

### Request

```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-plan-b`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    rejectedMeal: {
      id: 'meal-123',
      name: 'Quinoa Buddha Bowl',
      macros: {
        protein: 25,
        carbs: 40,
        fats: 12,
        fiber: 8,
        calories: 360,
      },
      mealType: 'lunch',
    },
    rejectionReason: 'Not feeling quinoa today, want something warm',
    inventory: [
      { name: 'Chicken breast', quantity: 2, unit: 'lbs', category: 'protein' },
      { name: 'Broccoli', quantity: 1, unit: 'head', category: 'produce' },
      { name: 'Brown rice', quantity: 2, unit: 'cups', category: 'grains' },
      { name: 'Garlic', quantity: 5, unit: 'cloves', category: 'produce' },
      { name: 'Ginger', quantity: 1, unit: 'inch', category: 'produce' },
      { name: 'Soy sauce', quantity: 1, unit: 'bottle', category: 'pantry' },
    ],
    preferences: {
      favoriteFoods: ['chicken', 'stir-fry', 'asian flavors'],
      avoidFoods: [],
      cuisinePreferences: ['Asian', 'Mediterranean'],
      prepTimeMax: 30,
    },
    mealType: 'lunch',
  }),
});

const { alternativeMeal, usage } = await response.json();
console.log('Alternative meal:', alternativeMeal);
```

### Response

```json
{
  "alternativeMeal": {
    "name": "Ginger Garlic Chicken Stir-Fry",
    "prepTime": 15,
    "cookTime": 12,
    "servings": 2,
    "macros": {
      "protein": 28,
      "carbs": 38,
      "fats": 10,
      "fiber": 7,
      "calories": 345
    },
    "ingredients": [
      {
        "name": "Chicken breast",
        "quantity": 8,
        "unit": "oz",
        "category": "protein"
      },
      {
        "name": "Broccoli",
        "quantity": 2,
        "unit": "cups",
        "category": "produce"
      },
      {
        "name": "Brown rice",
        "quantity": 1,
        "unit": "cup",
        "category": "grains"
      },
      {
        "name": "Garlic",
        "quantity": 3,
        "unit": "cloves",
        "category": "produce"
      },
      {
        "name": "Ginger",
        "quantity": 1,
        "unit": "inch",
        "category": "produce"
      },
      {
        "name": "Soy sauce",
        "quantity": 2,
        "unit": "tbsp",
        "category": "pantry"
      }
    ],
    "instructions": [
      "Cook brown rice according to package directions",
      "Cut chicken into bite-sized pieces",
      "Mince garlic and ginger",
      "Heat wok or large skillet over high heat",
      "Add chicken and cook until golden, 5-6 minutes",
      "Add broccoli, garlic, ginger, and stir-fry 3-4 minutes",
      "Add soy sauce and toss to combine",
      "Serve over brown rice"
    ],
    "kidFriendlyNotes": "Cut broccoli into small trees and let kids 'plant' them in their rice. Serve chicken and veggies separately for picky eaters.",
    "ageTasks": ["Wash broccoli", "Pour rice into bowl", "Stir sauce"],
    "top15Foods": ["garlic", "ginger root", "broccoli"],
    "missingIngredients": []
  },
  "usage": {
    "inputTokens": 9234,
    "outputTokens": 1876
  }
}
```

---

## 3. Daily Check-in

### Request

```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/daily-checkin`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 'user-1',
    userName: 'Sarah',
    date: '2025-11-17',
    dayOfWeek: 'Monday',
    todaysMeals: {
      breakfast: {
        name: 'Berry Protein Smoothie Bowl',
        prepTime: 10,
        cookTime: 0,
        ingredients: [
          { name: 'Blueberries', quantity: 1, unit: 'cup', category: 'frozen' },
          { name: 'Spinach', quantity: 1, unit: 'cup', category: 'produce' },
        ],
        macros: { protein: 28, carbs: 45, fats: 14, fiber: 12, calories: 410 },
      },
      lunch: {
        name: 'Mediterranean Quinoa Salad',
        prepTime: 15,
        cookTime: 0,
        ingredients: [],
        macros: { protein: 20, carbs: 35, fats: 12, fiber: 8, calories: 320 },
      },
      dinner: {
        name: 'Herb-Crusted Salmon with Roasted Vegetables',
        prepTime: 15,
        cookTime: 25,
        ingredients: [
          { name: 'Salmon fillet', quantity: 12, unit: 'oz', category: 'protein' },
          { name: 'Broccoli', quantity: 2, unit: 'cups', category: 'produce' },
        ],
        macros: { protein: 40, carbs: 25, fats: 18, fiber: 8, calories: 425 },
      },
      juice: {
        name: 'Green Detox Juice',
        prepTime: 10,
        cookTime: 0,
        ingredients: [],
        macros: { protein: 2, carbs: 18, fats: 1, fiber: 0, calories: 85 },
      },
    },
    schedule: [
      { time: '6:30 AM', activity: 'Morning workout', duration: 60 },
      { time: '9:00 AM', activity: 'Work meeting' },
      { time: '12:00 PM', activity: 'Lunch' },
      { time: '6:00 PM', activity: 'Dinner prep', duration: 45 },
    ],
    recentContext: {
      energyLevel: 'high',
      workoutToday: true,
      cookingTonight: 'Sarah',
      yesterdayFeedback: 'Loved the quinoa bowl, kids enjoyed it too',
    },
  }),
});

const { checkin, usage } = await response.json();
console.log('Check-in message:', checkin);
```

### Response

```json
{
  "checkin": {
    "greeting": "Good morning, Sarah!",
    "mainMessage": "It's Monday - time to crush those training goals! You have a great lineup today with your Berry Smoothie Bowl to fuel your morning workout and that delicious salmon dinner tonight. With 45 minutes for dinner prep, you'll have plenty of time to get those veggies roasted to perfection.",
    "questions": [
      "Do you have fresh salmon for tonight's dinner, or should I suggest a backup option?",
      "Your schedule shows a workout this morning - want to prep your smoothie bowl ingredients the night before for a quick post-workout breakfast?",
      "How are the kids feeling about broccoli these days? Should we try the 'little trees' presentation again?"
    ],
    "suggestions": [
      "Pre-wash and chop the broccoli this morning while making breakfast - it'll save 10 minutes at dinner time",
      "Your Green Detox Juice can be batch-made today for the next 2 days"
    ],
    "motivationalNote": "Yesterday's quinoa bowl was a hit with the whole family - you're building great healthy habits!"
  },
  "usage": {
    "inputTokens": 4821,
    "outputTokens": 892
  }
}
```

---

## 4. Adapt for Kids

### Request

```typescript
const response = await fetch(`${SUPABASE_URL}/functions/v1/adapt-for-kids`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.access_token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    recipe: {
      id: 'recipe-123',
      name: 'Herb-Crusted Salmon with Roasted Vegetables',
      prepTime: 15,
      cookTime: 25,
      servings: 2,
      macros: { protein: 40, carbs: 25, fats: 18, fiber: 8, calories: 425 },
      ingredients: [
        { name: 'Salmon fillet', quantity: 12, unit: 'oz', category: 'protein' },
        { name: 'Broccoli florets', quantity: 2, unit: 'cups', category: 'produce' },
        { name: 'Carrots', quantity: 1, unit: 'cup', category: 'produce' },
        { name: 'Fresh dill', quantity: 2, unit: 'tbsp', category: 'herbs' },
        { name: 'Lemon', quantity: 1, unit: 'whole', category: 'produce' },
        { name: 'Garlic', quantity: 2, unit: 'cloves', category: 'produce' },
        { name: 'Olive oil', quantity: 2, unit: 'tbsp', category: 'pantry' },
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Mix herbs, garlic, and olive oil',
        'Coat salmon with herb mixture',
        'Arrange vegetables on baking sheet',
        'Place salmon on vegetables',
        'Roast for 20-25 minutes',
        'Serve with lemon wedges',
      ],
      description: 'Healthy omega-3 rich salmon with colorful roasted vegetables',
    },
    kidAges: [2, 3],
    kidPreferences: {
      loved: ['Chicken fingers', 'Sweet potatoes', 'Berries', 'Mac and cheese'],
      disliked: ['Mushrooms', 'Onions', 'Brussels sprouts', 'Anything too spicy'],
      neutral: ['Broccoli (sometimes)', 'Carrots', 'Fish (rarely tried)'],
      texturePreferences: {
        likes: ['Crunchy', 'Crispy', 'Smooth'],
        dislikes: ['Mushy', 'Slimy', 'Too chewy'],
      },
      colorPreferences: ['Bright colors', 'Orange', 'Green'],
    },
    nutritionGoals: {
      increaseProtein: true,
      increaseFiber: true,
      reduceProcessedCarbs: true,
      reduceBadFats: false,
    },
  }),
});

const { kidFriendlyRecipe, usage } = await response.json();
console.log('Kid-friendly version:', kidFriendlyRecipe);
```

### Response

```json
{
  "kidFriendlyRecipe": {
    "name": "Rainbow Fish Nuggets with Veggie Trees",
    "presentation": "Cut salmon into fun 'fish nuggets' shapes. Arrange broccoli as 'trees' and carrots as 'flowers' on the plate. Create a 'rainbow' with the colorful vegetables. Serve with a small bowl of lemon 'sunshine' dip on the side.",
    "modifications": [
      "Cut salmon into bite-sized nuggets instead of fillet",
      "Make the herb crust extra crispy by pan-searing first",
      "Cut broccoli into small 'tree' shapes",
      "Slice carrots into fun coin shapes or use cookie cutters for stars",
      "Serve components separately in a 'build-your-own' plate style",
      "Minimize visible garlic by mincing very fine",
      "Make a mild lemon-dill dipping sauce on the side"
    ],
    "hiddenNutrients": [
      "Minced garlic mixed into herb coating (not visible)",
      "Extra olive oil brushed on veggies for healthy fats"
    ],
    "ageTasks": {
      "2-3": [
        "Wash broccoli 'trees' in water",
        "Help arrange veggies on the baking sheet (with supervision)",
        "Squeeze lemon for the dip (with help)",
        "Sprinkle herbs on salmon (supervised)",
        "Count the fish nuggets"
      ]
    },
    "servingTips": [
      "Let kids choose which 'tree' (broccoli) they want first",
      "Use small portions - they can always ask for more nuggets",
      "Make it colorful - the orange carrots and green broccoli are appealing",
      "Praise them for trying the 'special fish nuggets'",
      "If they refuse fish, ensure they eat the protein-rich vegetables",
      "Dipping sauce makes everything more fun - even veggies!"
    ],
    "ingredients": [
      { "name": "Salmon fillet", "quantity": 12, "unit": "oz", "category": "protein" },
      { "name": "Broccoli florets", "quantity": 2, "unit": "cups", "category": "produce" },
      { "name": "Carrots", "quantity": 1, "unit": "cup", "category": "produce" },
      { "name": "Fresh dill", "quantity": 2, "unit": "tbsp", "category": "herbs" },
      { "name": "Lemon", "quantity": 1, "unit": "whole", "category": "produce" },
      { "name": "Garlic", "quantity": 2, "unit": "cloves", "category": "produce" },
      { "name": "Olive oil", "quantity": 3, "unit": "tbsp", "category": "pantry" }
    ],
    "instructions": [
      "Preheat oven to 400°F",
      "Cut salmon into nugget-sized pieces (about 1.5 inches each)",
      "Finely mince garlic and mix with dill, 2 tbsp olive oil",
      "Let kids help sprinkle herbs on salmon nuggets",
      "Cut broccoli into small tree shapes, slice carrots into coins",
      "Toss veggies with 1 tbsp olive oil",
      "Have kids help arrange veggies on baking sheet",
      "Place salmon nuggets on vegetables",
      "Roast for 15-20 minutes until salmon is cooked and veggies are tender",
      "Make dipping sauce: mix lemon juice with a bit of olive oil and dill",
      "Let kids help arrange their rainbow plate"
    ],
    "macros": {
      "protein": 42,
      "carbs": 26,
      "fats": 19,
      "fiber": 9,
      "calories": 445
    },
    "funFactor": "Kids love the 'fish nuggets' name and being able to dip them! Building their own rainbow plate with trees and flowers makes dinner an adventure. The crispy texture of the nuggets and crunchy vegetables appeals to toddler preferences."
  },
  "usage": {
    "inputTokens": 7821,
    "outputTokens": 1934
  }
}
```

---

## Error Handling Example

```typescript
try {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/generate-meal-plan`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const error = await response.json();

    if (response.status === 400) {
      // Validation error - bad input
      console.error('Invalid input:', error.details);
      alert(`Please check your input: ${error.error}`);
    } else if (response.status === 503) {
      // AI service unavailable
      console.error('AI service unavailable:', error.error);
      alert('AI service is temporarily unavailable. Please try again in a few minutes.');
    } else {
      // Other error
      console.error('Unexpected error:', error);
      alert('Something went wrong. Please try again.');
    }

    return;
  }

  const { mealPlan, usage } = await response.json();
  console.log('Success!', mealPlan);
  console.log('Cost estimate:', calculateCost(usage));

} catch (error) {
  console.error('Network error:', error);
  alert('Connection failed. Please check your internet and try again.');
}
```

---

## React Hook Example

```typescript
// hooks/useEdgeFunctions.ts
import { useMutation } from '@tanstack/react-query';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

export function useGenerateMealPlan() {
  const supabase = useSupabaseClient();
  const session = useSession();

  return useMutation({
    mutationFn: async (input: MealPlanInput) => {
      const response = await supabase.functions.invoke('generate-meal-plan', {
        body: input,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
    onSuccess: (data) => {
      console.log('Meal plan generated!');
      console.log('Token usage:', data.usage);
    },
    onError: (error) => {
      console.error('Failed to generate meal plan:', error);
    },
  });
}

export function useGeneratePlanB() {
  const supabase = useSupabaseClient();

  return useMutation({
    mutationFn: async (input: PlanBInput) => {
      const response = await supabase.functions.invoke('generate-plan-b', {
        body: input,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
}

export function useDailyCheckin() {
  const supabase = useSupabaseClient();

  return useMutation({
    mutationFn: async (input: CheckinInput) => {
      const response = await supabase.functions.invoke('daily-checkin', {
        body: input,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
}

export function useAdaptForKids() {
  const supabase = useSupabaseClient();

  return useMutation({
    mutationFn: async (input: AdaptForKidsInput) => {
      const response = await supabase.functions.invoke('adapt-for-kids', {
        body: input,
      });

      if (response.error) {
        throw response.error;
      }

      return response.data;
    },
  });
}
```

### Usage in Component

```typescript
import { useGenerateMealPlan } from '@/hooks/useEdgeFunctions';

function MealPlanGenerator() {
  const generateMealPlan = useGenerateMealPlan();

  const handleGenerate = () => {
    generateMealPlan.mutate({
      weekStart: '2025-11-17',
      // ... other input fields
    });
  };

  return (
    <div>
      <button
        onClick={handleGenerate}
        disabled={generateMealPlan.isLoading}
      >
        {generateMealPlan.isLoading ? 'Generating...' : 'Generate Meal Plan'}
      </button>

      {generateMealPlan.isError && (
        <div className="error">
          Error: {generateMealPlan.error.message}
        </div>
      )}

      {generateMealPlan.isSuccess && (
        <div className="success">
          <h2>Meal Plan Generated!</h2>
          <pre>{JSON.stringify(generateMealPlan.data.mealPlan, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

---

**Last Updated**: November 15, 2025
