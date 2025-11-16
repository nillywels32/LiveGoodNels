# @goodlifenels/types

Shared TypeScript types for GoodLifeNels mobile, web, and backend applications.

## Overview

This package contains all shared TypeScript interfaces, types, enums, and constants used across the GoodLifeNels ecosystem. It ensures type consistency between the mobile app (React Native), web app (Next.js), and backend (Node.js/Supabase).

## Installation

```bash
npm install @goodlifenels/types
```

## Usage

```typescript
import {
  User,
  MealPlan,
  Recipe,
  MealType,
  DayOfWeek,
  ApiResponse,
  TOP_15_FOODS,
} from '@goodlifenels/types';

// Use the types in your application
const user: User = {
  id: '123',
  email: 'user@example.com',
  name: 'John Doe',
  avatar_url: null,
  push_token: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

// Use enums for type safety
const mealType: MealType = MealType.Breakfast;
const day: DayOfWeek = DayOfWeek.Monday;

// Use constants
console.log(TOP_15_FOODS); // Array of top 15 longevity foods
```

## Package Structure

```
src/
├── index.ts          # Main export file
├── enums.ts          # All enum definitions
├── database.ts       # Database model types
├── api.ts            # API request/response types
├── utility.ts        # Utility types and helpers
└── constants.ts      # Constants and readonly values
```

## Key Type Categories

### Database Types

Types that match the PostgreSQL schema exactly:

- `User` - User accounts
- `FamilyProfile` - Family units
- `FamilyMember` - Family membership
- `MealPlan` - Weekly meal plans
- `PlannedMeal` - Individual meals
- `Recipe` - Recipe database
- `ShoppingList` - Shopping lists
- `ShoppingItem` - Shopping items
- `Inventory` - Ingredient inventory
- `QuestionnaireResponse` - Weekly questionnaires
- `MealFeedback` - Meal feedback
- `NutritionProfile` - Nutrition preferences
- `FoodFrequencyRule` - Food frequency rules
- `MacroTarget` - Macro targets
- `JuicePlan` - Juice plans
- `UserPreferences` - User preferences

### API Types

Request and response types for all API endpoints:

- `ApiResponse<T>` - Standard success response
- `ApiError` - Error response
- `PaginatedResponse<T>` - Paginated data
- Request types for create/update operations
- Response types for all endpoints

### Enums

Strongly-typed enumerations:

- `DayOfWeek` - Days of the week
- `MealType` - Types of meals
- `FamilyRole` - Family member roles
- `MealPlanStatus` - Meal plan status
- `RecipeSource` - Recipe sources
- `RecipeDifficulty` - Difficulty levels
- And more...

### Constants

- `TOP_15_FOODS` - Top 15 longevity foods
- `DIETARY_RESTRICTIONS` - Common dietary restrictions
- `RECIPE_TAGS` - Recipe tags
- `SUGGESTED_STORES` - Grocery stores
- `DEFAULT_MACRO_TARGETS` - Default macro targets
- And more...

### Utility Types

Helper types for common patterns:

- `PartialBy<T, K>` - Make specific fields optional
- `RequiredBy<T, K>` - Make specific fields required
- `CreateInput<T>` - Type for create operations
- `UpdateInput<T>` - Type for update operations
- `AsyncState<T>` - Async operation state
- `PaginationParams` - Pagination parameters
- `QueryOptions<T>` - Query options

## Development

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

### Watch Mode

```bash
npm run watch
```

### Cleaning Build Artifacts

```bash
npm run clean
```

## TypeScript Configuration

This package uses strict TypeScript settings:

- `strict: true` - All strict type-checking options enabled
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused parameters
- `noImplicitReturns: true` - Error on missing return statements
- `noFallthroughCasesInSwitch: true` - Error on fallthrough cases

## Type Safety Best Practices

1. **Always use enums** instead of string literals for fixed sets of values
2. **Use utility types** for create/update operations to avoid repeating type definitions
3. **Leverage constants** for readonly values like TOP_15_FOODS
4. **Use API types** to ensure consistency between frontend and backend
5. **Add JSDoc comments** when creating new types for better IDE support

## Schema Alignment

All database types in this package are designed to match the PostgreSQL schema defined in `docs/DATABASE_SCHEMA.md`. When the database schema changes:

1. Update the corresponding types in `src/database.ts`
2. Update related API types in `src/api.ts` if needed
3. Run type checking to ensure no breaking changes
4. Update version number following semantic versioning

## Contributing

When adding new types:

1. Place them in the appropriate file (`database.ts`, `api.ts`, etc.)
2. Add JSDoc comments for clarity
3. Export them from `src/index.ts`
4. Update this README if adding new type categories
5. Run `npm run typecheck` to ensure everything compiles

## License

MIT
