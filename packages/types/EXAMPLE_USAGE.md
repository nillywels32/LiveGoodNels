# Example Usage

## Import Types

```typescript
// Import database types
import {
  User,
  FamilyProfile,
  MealPlan,
  Recipe,
  ShoppingList,
  Ingredient,
  Macros,
} from '@goodlifenels/types';

// Import enums
import {
  MealType,
  DayOfWeek,
  MealPlanStatus,
  RecipeDifficulty,
} from '@goodlifenels/types';

// Import API types
import {
  ApiResponse,
  ApiError,
  GenerateMealPlanRequest,
  MealPlanResponse,
  RecipeSearchRequest,
} from '@goodlifenels/types';

// Import utility types
import {
  CreateInput,
  UpdateInput,
  PaginationParams,
} from '@goodlifenels/types';

// Import constants
import {
  TOP_15_FOODS,
  DIETARY_RESTRICTIONS,
  DEFAULT_MACRO_TARGETS,
} from '@goodlifenels/types';
```

## Create a User

```typescript
const newUser: CreateInput<User> = {
  email: 'john@example.com',
  name: 'John Doe',
  avatar_url: null,
  push_token: null,
};

// API response
const userResponse: ApiResponse<User> = {
  data: {
    id: '123',
    email: 'john@example.com',
    name: 'John Doe',
    avatar_url: null,
    push_token: null,
    created_at: '2025-11-15T00:00:00Z',
    updated_at: '2025-11-15T00:00:00Z',
  },
  error: null,
};
```

## Create a Meal Plan

```typescript
const mealPlanRequest: GenerateMealPlanRequest = {
  family_id: 'family-123',
  week_start: '2025-11-17',
  questionnaire_response: {
    cravings: ['tacos', 'salmon'],
    energyLevel: 'high',
    workoutSchedule: {
      Monday: 'strength',
      Wednesday: 'cardio',
      Friday: 'strength',
    },
  },
};
```

## Use Enums

```typescript
const breakfast: MealType = MealType.Breakfast;
const monday: DayOfWeek = DayOfWeek.Monday;
const difficulty: RecipeDifficulty = RecipeDifficulty.Easy;
```

## Recipe with Macros and Ingredients

```typescript
const recipe: Recipe = {
  id: 'recipe-123',
  name: 'Green Power Juice',
  description: 'Nutrient-dense morning juice',
  image_url: null,
  source: RecipeSource.Curated,
  meal_type: [MealType.Juice, MealType.Breakfast],
  prep_time: 10,
  cook_time: 0,
  servings: 2,
  macros: {
    protein: 4,
    carbs: 28,
    fats: 1,
    fiber: 6,
    calories: 120,
  },
  ingredients: [
    {
      name: 'Spinach',
      quantity: 2,
      unit: 'cups',
      category: 'produce',
    },
    {
      name: 'Kale',
      quantity: 1,
      unit: 'cup',
      category: 'produce',
    },
  ],
  instructions: [
    'Wash all produce thoroughly',
    'Feed through cold-press juicer',
    'Serve immediately',
  ],
  tags: ['vegan', 'gluten-free', 'juice-cleanse'],
  top_15_foods: ['dark leafy greens', 'lemon'],
  kid_friendly: true,
  kid_adaptations: 'Add apple for sweetness',
  difficulty: RecipeDifficulty.Easy,
  created_by: null,
  is_favorite: false,
  times_used: 0,
  avg_rating: null,
  created_at: '2025-11-15T00:00:00Z',
  updated_at: '2025-11-15T00:00:00Z',
  deleted_at: null,
};
```

## Use Constants

```typescript
// Check if a food is in top 15
const isTop15 = (food: string) => TOP_15_FOODS.includes(food as any);

// Get default macros for training day
const trainingMacros = DEFAULT_MACRO_TARGETS.training_day;
console.log(trainingMacros.protein_min); // 120
console.log(trainingMacros.calories_max); // 2600
```

## Type-Safe API Calls

```typescript
// Search for recipes
async function searchRecipes(
  filters: RecipeSearchRequest
): Promise<RecipeListResponse> {
  // Implementation
}

// Generate meal plan
async function generateMealPlan(
  request: GenerateMealPlanRequest
): Promise<MealPlanResponse> {
  // Implementation
}

// Handle API errors
function handleResponse<T>(response: ApiResult<T>): T {
  if (response.error) {
    throw new Error(response.error.message);
  }
  return response.data;
}
```

## Utility Types

```typescript
// Create input (no ID or timestamps)
type CreateRecipeInput = CreateInput<Recipe>;

// Update input (partial, no ID or timestamps)
type UpdateRecipeInput = UpdateInput<Recipe>;

// Pagination
const pagination: PaginationParams = {
  page: 1,
  pageSize: 20,
};
```
