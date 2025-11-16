-- =====================================================
-- GoodLifeNels - Seed Data
-- Version: 1.0
-- Created: 2025-11-15
-- Description: Curated recipes and essential data aligned
--              with "Go Back to Nature" philosophy
-- =====================================================

-- =====================================================
-- PART 1: CURATED RECIPES (Top 15 Superfood Focus)
-- =====================================================

-- Recipe 1: Green Power Juice (Daily Essential)
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Green Power Juice',
  'Cold-pressed juice packed with dark leafy greens, anti-inflammatory ginger, and alkalizing lemon. Perfect for daily nutrient boost.',
  ARRAY['juice'],
  10,
  0,
  2,
  '{"protein": 4, "carbs": 28, "fats": 1, "fiber": 6, "calories": 120}'::jsonb,
  ARRAY[
    '{"name": "Spinach", "quantity": 2, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Kale", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Cucumber", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Lemon", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Ginger root", "quantity": 1, "unit": "inch", "category": "produce"}'::jsonb,
    '{"name": "Green apple", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb
  ],
  ARRAY[
    'Wash all produce thoroughly',
    'Cut cucumber and apple into chunks',
    'Feed all ingredients through cold-press juicer in order: leafy greens first, then cucumber, apple, lemon, and ginger',
    'Stir well and serve immediately over ice, or store in airtight glass container for up to 3 days'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'anti-inflammatory'],
  ARRAY['Dark leafy greens', 'Lemon', 'Ginger root'],
  true,
  'easy',
  'curated'
);

-- Recipe 2: Berry Antioxidant Smoothie
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Berry Antioxidant Smoothie',
  'Antioxidant-rich smoothie with wild blueberries, flaxseed, and cacao. Brain-boosting and delicious!',
  ARRAY['breakfast', 'snack', 'smoothie'],
  5,
  0,
  2,
  '{"protein": 12, "carbs": 42, "fats": 8, "fiber": 10, "calories": 280}'::jsonb,
  ARRAY[
    '{"name": "Wild blueberries (frozen)", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Banana", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Ground flaxseed", "quantity": 2, "unit": "tbsp", "category": "grains"}'::jsonb,
    '{"name": "Raw cacao powder", "quantity": 1, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Spinach", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Almond milk (unsweetened)", "quantity": 1, "unit": "cup", "category": "dairy"}'::jsonb,
    '{"name": "Hemp seeds", "quantity": 1, "unit": "tbsp", "category": "grains"}'::jsonb
  ],
  ARRAY[
    'Add all ingredients to high-speed blender',
    'Blend on high for 60 seconds until smooth and creamy',
    'Add more almond milk if too thick',
    'Pour into glasses and serve immediately'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'brain-food'],
  ARRAY['Blueberries', 'Flaxseed', 'Cacao', 'Dark leafy greens'],
  true,
  'easy',
  'curated'
);

-- Recipe 3: Turmeric Golden Milk Latte
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Turmeric Golden Milk Latte',
  'Anti-inflammatory golden milk with turmeric, ginger, and warming spices. Perfect evening ritual.',
  ARRAY['snack', 'smoothie'],
  5,
  5,
  2,
  '{"protein": 4, "carbs": 18, "fats": 8, "fiber": 2, "calories": 160}'::jsonb,
  ARRAY[
    '{"name": "Coconut milk (full-fat)", "quantity": 2, "unit": "cups", "category": "dairy"}'::jsonb,
    '{"name": "Turmeric powder", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Fresh ginger root", "quantity": 0.5, "unit": "inch", "category": "produce"}'::jsonb,
    '{"name": "Cinnamon", "quantity": 0.5, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Black pepper", "quantity": 1, "unit": "pinch", "category": "pantry"}'::jsonb,
    '{"name": "Raw honey", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Grate fresh ginger',
    'Heat coconut milk in small saucepan over medium heat',
    'Add turmeric, ginger, cinnamon, and black pepper',
    'Whisk continuously for 3-4 minutes',
    'Remove from heat, strain if desired, add honey',
    'Serve warm in mugs'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'anti-inflammatory', 'warming'],
  ARRAY['Turmeric', 'Ginger root'],
  true,
  'easy',
  'curated'
);

-- Recipe 4: Quinoa Power Bowl
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Quinoa Power Bowl',
  'Complete protein bowl with quinoa, broccoli, and tahini dressing. Nutrient-dense and satisfying.',
  ARRAY['lunch', 'dinner'],
  15,
  20,
  2,
  '{"protein": 18, "carbs": 52, "fats": 16, "fiber": 12, "calories": 420}'::jsonb,
  ARRAY[
    '{"name": "Quinoa (dry)", "quantity": 1, "unit": "cup", "category": "grains"}'::jsonb,
    '{"name": "Broccoli florets", "quantity": 2, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Cherry tomatoes", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Chickpeas (cooked)", "quantity": 1, "unit": "cup", "category": "pantry"}'::jsonb,
    '{"name": "Tahini", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Lemon juice", "quantity": 2, "unit": "tbsp", "category": "produce"}'::jsonb,
    '{"name": "Garlic clove", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 1, "unit": "tbsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Rinse quinoa and cook according to package directions (usually 15 minutes)',
    'Steam broccoli for 5-7 minutes until tender-crisp',
    'Halve cherry tomatoes',
    'Make dressing: whisk tahini, lemon juice, minced garlic, and 2 tbsp water',
    'Assemble bowls: quinoa base, top with broccoli, tomatoes, and chickpeas',
    'Drizzle with tahini dressing and serve'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'high-protein', 'meal-prep'],
  ARRAY['Quinoa', 'Broccoli', 'Tomatoes', 'Lemon', 'Garlic'],
  true,
  'easy',
  'curated'
);

-- Recipe 5: Broccoli Sprout Salad
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Broccoli Sprout Super Salad',
  'Sulforaphane-rich broccoli sprouts with mixed greens, grapes, and lemon vinaigrette. Cancer-fighting powerhouse!',
  ARRAY['lunch', 'dinner', 'snack'],
  10,
  0,
  2,
  '{"protein": 8, "carbs": 24, "fats": 14, "fiber": 8, "calories": 260}'::jsonb,
  ARRAY[
    '{"name": "Broccoli sprouts", "quantity": 2, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Mixed greens", "quantity": 4, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Red grapes", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Walnuts (raw)", "quantity": 0.25, "unit": "cup", "category": "nuts"}'::jsonb,
    '{"name": "Lemon juice", "quantity": 2, "unit": "tbsp", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Dijon mustard", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Wash and dry all greens and sprouts',
    'Halve grapes',
    'Chop walnuts roughly',
    'Make dressing: whisk lemon juice, olive oil, mustard, pinch of salt',
    'Combine greens, sprouts, and grapes in large bowl',
    'Toss with dressing and top with walnuts'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'raw', 'cancer-fighting'],
  ARRAY['Broccoli sprouts', 'Dark leafy greens', 'Grapes', 'Lemon'],
  false,
  'easy',
  'curated'
);

-- Recipe 6: Garlic Mushroom Sauté
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Garlic Mushroom Sauté',
  'Immune-boosting mushrooms sautéed with garlic. Perfect side dish or protein topper.',
  ARRAY['lunch', 'dinner', 'snack'],
  5,
  10,
  2,
  '{"protein": 6, "carbs": 12, "fats": 8, "fiber": 3, "calories": 140}'::jsonb,
  ARRAY[
    '{"name": "Mixed mushrooms (shiitake, oyster, cremini)", "quantity": 3, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Garlic cloves", "quantity": 4, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Fresh thyme", "quantity": 1, "unit": "tsp", "category": "produce"}'::jsonb,
    '{"name": "Coconut aminos", "quantity": 1, "unit": "tbsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Clean mushrooms with damp cloth and slice',
    'Mince garlic cloves',
    'Heat olive oil in large skillet over medium-high heat',
    'Add mushrooms and sauté for 5-6 minutes until golden',
    'Add garlic and thyme, cook 1-2 minutes until fragrant',
    'Add coconut aminos, toss to coat, and serve hot'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'immune-boost'],
  ARRAY['Mushrooms', 'Garlic'],
  true,
  'easy',
  'curated'
);

-- Recipe 7: Chia Tigernut Porridge
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Chia Tigernut Porridge',
  'Creamy breakfast porridge with chia seeds, tigernut flour, and warm spices. Gut-friendly and satisfying.',
  ARRAY['breakfast'],
  5,
  10,
  2,
  '{"protein": 8, "carbs": 38, "fats": 12, "fiber": 14, "calories": 290}'::jsonb,
  ARRAY[
    '{"name": "Tigernut flour", "quantity": 0.25, "unit": "cup", "category": "grains"}'::jsonb,
    '{"name": "Chia seeds", "quantity": 3, "unit": "tbsp", "category": "grains"}'::jsonb,
    '{"name": "Almond milk", "quantity": 1.5, "unit": "cups", "category": "dairy"}'::jsonb,
    '{"name": "Cinnamon", "quantity": 0.5, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Blueberries (fresh)", "quantity": 0.5, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Raw honey", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Sliced almonds", "quantity": 2, "unit": "tbsp", "category": "nuts"}'::jsonb
  ],
  ARRAY[
    'In small saucepan, whisk tigernut flour with almond milk',
    'Add chia seeds and cinnamon',
    'Heat over medium, stirring constantly for 5-7 minutes until thick',
    'Remove from heat, let sit 2 minutes to thicken more',
    'Divide into bowls and top with blueberries, honey, and almonds'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'high-fiber', 'gut-health'],
  ARRAY['Tigernuts', 'Blueberries'],
  true,
  'easy',
  'curated'
);

-- Recipe 8: Roasted Tomato Basil Soup
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Roasted Tomato Basil Soup',
  'Lycopene-rich roasted tomato soup with fresh basil. Comforting and heart-healthy.',
  ARRAY['lunch', 'dinner'],
  10,
  35,
  4,
  '{"protein": 6, "carbs": 28, "fats": 8, "fiber": 7, "calories": 210}'::jsonb,
  ARRAY[
    '{"name": "Roma tomatoes", "quantity": 8, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Garlic cloves", "quantity": 6, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 3, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Fresh basil", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Vegetable broth", "quantity": 2, "unit": "cups", "category": "pantry"}'::jsonb,
    '{"name": "Onion", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Sea salt", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Preheat oven to 400°F',
    'Cut tomatoes in half, place on baking sheet with whole garlic cloves',
    'Drizzle with 2 tbsp olive oil, roast for 30 minutes',
    'Meanwhile, dice onion and sauté in 1 tbsp olive oil until soft',
    'Add roasted tomatoes, garlic, onion, broth, and basil to blender',
    'Blend until smooth, return to pot to warm through',
    'Season with salt and serve with fresh basil garnish'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'lycopene-rich', 'comfort-food'],
  ARRAY['Tomatoes', 'Garlic'],
  true,
  'easy',
  'curated'
);

-- Recipe 9: Flax Crackers with Hummus
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Flax Crackers with Hummus',
  'Omega-3 rich flax crackers paired with creamy hummus. Perfect snack or appetizer.',
  ARRAY['snack'],
  15,
  120,
  4,
  '{"protein": 10, "carbs": 22, "fats": 16, "fiber": 12, "calories": 270}'::jsonb,
  ARRAY[
    '{"name": "Ground flaxseed", "quantity": 1.5, "unit": "cups", "category": "grains"}'::jsonb,
    '{"name": "Water", "quantity": 0.75, "unit": "cup", "category": "pantry"}'::jsonb,
    '{"name": "Garlic powder", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Sea salt", "quantity": 0.5, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Chickpeas (cooked)", "quantity": 1.5, "unit": "cups", "category": "pantry"}'::jsonb,
    '{"name": "Tahini", "quantity": 0.25, "unit": "cup", "category": "pantry"}'::jsonb,
    '{"name": "Lemon juice", "quantity": 3, "unit": "tbsp", "category": "produce"}'::jsonb
  ],
  ARRAY[
    'For crackers: Mix flaxseed, water, garlic powder, and salt. Let sit 15 min',
    'Preheat oven to 300°F',
    'Spread mixture thinly on parchment paper, score into squares',
    'Bake for 90-120 minutes until crispy, break into crackers',
    'For hummus: Blend chickpeas, tahini, lemon juice, garlic, and 2 tbsp water until smooth',
    'Serve crackers with hummus'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'omega-3', 'meal-prep'],
  ARRAY['Flaxseed', 'Lemon', 'Garlic'],
  true,
  'medium',
  'curated'
);

-- Recipe 10: Cacao Energy Balls
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Cacao Energy Balls',
  'No-bake energy balls with cacao, dates, and tigernuts. Perfect pre-workout snack.',
  ARRAY['snack'],
  10,
  0,
  12,
  '{"protein": 4, "carbs": 18, "fats": 8, "fiber": 4, "calories": 160}'::jsonb,
  ARRAY[
    '{"name": "Medjool dates (pitted)", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Raw cacao powder", "quantity": 0.25, "unit": "cup", "category": "pantry"}'::jsonb,
    '{"name": "Tigernut flour", "quantity": 0.5, "unit": "cup", "category": "grains"}'::jsonb,
    '{"name": "Almond butter", "quantity": 0.25, "unit": "cup", "category": "nuts"}'::jsonb,
    '{"name": "Chia seeds", "quantity": 2, "unit": "tbsp", "category": "grains"}'::jsonb,
    '{"name": "Vanilla extract", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Add all ingredients to food processor',
    'Pulse until mixture comes together (may need to add 1 tbsp water)',
    'Roll into 12 balls (about 1 inch diameter)',
    'Roll in extra cacao powder or shredded coconut if desired',
    'Store in airtight container in fridge for up to 2 weeks'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'no-bake', 'energy-boost'],
  ARRAY['Cacao', 'Tigernuts'],
  true,
  'easy',
  'curated'
);

-- Recipe 11: Ginger Carrot Soup
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Ginger Carrot Soup',
  'Warming soup with carrots, ginger, and turmeric. Anti-inflammatory and digestive-friendly.',
  ARRAY['lunch', 'dinner'],
  10,
  25,
  4,
  '{"protein": 4, "carbs": 32, "fats": 6, "fiber": 8, "calories": 200}'::jsonb,
  ARRAY[
    '{"name": "Carrots", "quantity": 6, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Fresh ginger root", "quantity": 2, "unit": "inches", "category": "produce"}'::jsonb,
    '{"name": "Turmeric powder", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Coconut milk", "quantity": 1, "unit": "cup", "category": "dairy"}'::jsonb,
    '{"name": "Vegetable broth", "quantity": 3, "unit": "cups", "category": "pantry"}'::jsonb,
    '{"name": "Onion", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Garlic cloves", "quantity": 2, "unit": "whole", "category": "produce"}'::jsonb
  ],
  ARRAY[
    'Peel and chop carrots, onion, and garlic',
    'Grate fresh ginger',
    'In large pot, sauté onion and garlic in 1 tbsp coconut oil',
    'Add carrots, ginger, turmeric, and broth',
    'Simmer 20 minutes until carrots are tender',
    'Blend until smooth, stir in coconut milk, warm through and serve'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'anti-inflammatory', 'digestive'],
  ARRAY['Ginger root', 'Turmeric', 'Garlic'],
  true,
  'easy',
  'curated'
);

-- Recipe 12: Grape & Walnut Salad
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Grape & Walnut Salad',
  'Resveratrol-rich grapes with omega-3 walnuts and mixed greens. Heart-healthy and delicious.',
  ARRAY['lunch', 'snack'],
  8,
  0,
  2,
  '{"protein": 6, "carbs": 28, "fats": 18, "fiber": 6, "calories": 290}'::jsonb,
  ARRAY[
    '{"name": "Red grapes", "quantity": 2, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Walnuts", "quantity": 0.5, "unit": "cup", "category": "nuts"}'::jsonb,
    '{"name": "Mixed greens", "quantity": 4, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Goat cheese (optional)", "quantity": 2, "unit": "oz", "category": "dairy"}'::jsonb,
    '{"name": "Balsamic vinegar", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Olive oil", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Halve grapes',
    'Toast walnuts in dry pan for 3-4 minutes, then chop',
    'Make dressing: whisk balsamic vinegar and olive oil',
    'Toss greens with dressing',
    'Top with grapes, walnuts, and crumbled goat cheese if using'
  ],
  ARRAY['vegetarian', 'gluten-free', 'quick', 'heart-healthy'],
  ARRAY['Grapes', 'Dark leafy greens'],
  true,
  'easy',
  'curated'
);

-- Recipe 13: Lemon Garlic Broccoli
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Lemon Garlic Broccoli',
  'Simple but powerful side dish with broccoli, garlic, and lemon. Sulforaphane-rich!',
  ARRAY['lunch', 'dinner'],
  5,
  8,
  2,
  '{"protein": 6, "carbs": 14, "fats": 8, "fiber": 6, "calories": 150}'::jsonb,
  ARRAY[
    '{"name": "Broccoli crowns", "quantity": 2, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Garlic cloves", "quantity": 4, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Lemon", "quantity": 1, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Red pepper flakes", "quantity": 0.25, "unit": "tsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Cut broccoli into florets',
    'Slice garlic thinly',
    'Steam broccoli for 5-6 minutes until tender-crisp',
    'In pan, heat olive oil and sauté garlic until fragrant',
    'Add steamed broccoli, toss with lemon juice and zest',
    'Sprinkle with red pepper flakes and serve'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'cancer-fighting'],
  ARRAY['Broccoli', 'Garlic', 'Lemon'],
  true,
  'easy',
  'curated'
);

-- Recipe 14: Quinoa Breakfast Bowl
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Quinoa Breakfast Bowl',
  'Savory breakfast bowl with quinoa, spinach, and soft-boiled egg. Complete protein start.',
  ARRAY['breakfast'],
  10,
  15,
  2,
  '{"protein": 18, "carbs": 42, "fats": 14, "fiber": 8, "calories": 370}'::jsonb,
  ARRAY[
    '{"name": "Quinoa (cooked)", "quantity": 1.5, "unit": "cups", "category": "grains"}'::jsonb,
    '{"name": "Spinach", "quantity": 2, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Eggs", "quantity": 2, "unit": "whole", "category": "dairy"}'::jsonb,
    '{"name": "Avocado", "quantity": 0.5, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Cherry tomatoes", "quantity": 0.5, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Lemon juice", "quantity": 1, "unit": "tbsp", "category": "produce"}'::jsonb,
    '{"name": "Olive oil", "quantity": 1, "unit": "tbsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Prepare soft-boiled eggs (6-7 minutes)',
    'Sauté spinach in olive oil until wilted',
    'Warm quinoa',
    'Assemble bowls: quinoa base, add spinach, halved tomatoes, sliced avocado',
    'Top with soft-boiled egg, drizzle with lemon juice',
    'Season with salt and pepper'
  ],
  ARRAY['vegetarian', 'gluten-free', 'high-protein', 'energizing'],
  ARRAY['Quinoa', 'Dark leafy greens', 'Tomatoes', 'Lemon'],
  true,
  'easy',
  'curated'
);

-- Recipe 15: Mushroom & Turmeric Stir-Fry
INSERT INTO recipes (name, description, meal_type, prep_time, cook_time, servings, macros, ingredients, instructions, tags, top_15_foods, kid_friendly, difficulty, source) VALUES
(
  'Mushroom & Turmeric Stir-Fry',
  'Quick stir-fry with immune-boosting mushrooms, turmeric, and ginger over quinoa.',
  ARRAY['lunch', 'dinner'],
  10,
  12,
  2,
  '{"protein": 14, "carbs": 48, "fats": 10, "fiber": 8, "calories": 340}'::jsonb,
  ARRAY[
    '{"name": "Mixed mushrooms", "quantity": 3, "unit": "cups", "category": "produce"}'::jsonb,
    '{"name": "Quinoa (cooked)", "quantity": 2, "unit": "cups", "category": "grains"}'::jsonb,
    '{"name": "Turmeric powder", "quantity": 1, "unit": "tsp", "category": "pantry"}'::jsonb,
    '{"name": "Fresh ginger", "quantity": 1, "unit": "inch", "category": "produce"}'::jsonb,
    '{"name": "Garlic cloves", "quantity": 3, "unit": "whole", "category": "produce"}'::jsonb,
    '{"name": "Broccoli florets", "quantity": 1, "unit": "cup", "category": "produce"}'::jsonb,
    '{"name": "Coconut aminos", "quantity": 2, "unit": "tbsp", "category": "pantry"}'::jsonb,
    '{"name": "Sesame oil", "quantity": 1, "unit": "tbsp", "category": "pantry"}'::jsonb
  ],
  ARRAY[
    'Slice mushrooms, mince garlic and ginger',
    'Heat sesame oil in wok or large pan over high heat',
    'Add mushrooms and broccoli, stir-fry 5 minutes',
    'Add garlic, ginger, turmeric - cook 1 minute',
    'Add coconut aminos, toss to coat',
    'Serve over warm quinoa'
  ],
  ARRAY['vegan', 'gluten-free', 'dairy-free', 'quick', 'immune-boost'],
  ARRAY['Mushrooms', 'Turmeric', 'Ginger root', 'Garlic', 'Broccoli', 'Quinoa'],
  true,
  'easy',
  'curated'
);

-- =====================================================
-- PART 2: TOP 15 ESSENTIAL SUPERFOODS REFERENCE
-- =====================================================

-- This is informational data for the app's food frequency tracking
-- These are the "Top 15" superfoods emphasized in the "Go Back to Nature" philosophy

COMMENT ON SCHEMA public IS
'Top 15 Essential Superfoods:
1. Broccoli sprouts - Highest sulforaphane content (cancer-fighting)
2. Turmeric - Curcumin for anti-inflammation
3. Blueberries - Anthocyanins for brain health
4. Broccoli - Sulforaphane and fiber
5. Flaxseed - Omega-3 ALA, lignans
6. Dark leafy greens - Kale, spinach, chard for minerals
7. Garlic - Allicin for immune function
8. Mushrooms - Beta-glucans for immunity
9. Cacao - Flavonoids for heart and brain
10. Tigernuts - Prebiotic fiber for gut health
11. Ginger root - Gingerol for inflammation
12. Grapes - Resveratrol for longevity
13. Tomatoes - Lycopene for heart health
14. Lemon - Vitamin C and alkalizing
15. Quinoa - Complete protein, high fiber';

-- =====================================================
-- PART 3: EXAMPLE NUTRITION PROFILE & TARGETS
-- =====================================================

-- This would be created when a family sets up their account
-- Example for reference:

COMMENT ON TABLE nutrition_profiles IS
'Example Nutrition Profile Setup:
- Philosophy: Go Back to Nature
- Dietary Style: Plant-based, Organic, Non-GMO
- Daily juice: Required
- Avoid: Refined sugar, processed carbs, artificial ingredients
- Emphasize: Whole foods, high fiber, omega-3s, top 15 superfoods
- Allow fasting: Yes (16:8 intermittent fasting)
- Allow ketosis: Yes (occasional for metabolic flexibility)
- Active lifestyle: Yes
- Gut health focus: Yes';

COMMENT ON TABLE macro_targets IS
'Example Macro Targets:
BASELINE (moderate activity):
- Protein: 90-120g
- Carbs: 120-150g
- Fats: 40-60g
- Fiber: 30g+
- Calories: 1800-2200

TRAINING DAY (high intensity workout):
- Protein: 120-150g
- Carbs: 150-200g
- Fats: 50-70g
- Fiber: 35g+
- Calories: 2200-2600

REST DAY (light activity):
- Protein: 80-100g
- Carbs: 100-130g
- Fats: 35-50g
- Fiber: 30g+
- Calories: 1600-1900

FASTING (juice only or 16:8 IF):
- Protein: 0-20g
- Carbs: 0-10g
- Fats: 0-5g
- Calories: 0-200';

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Verify seed data
SELECT
  'Recipes seeded: ' || COUNT(*) as summary
FROM recipes
WHERE source = 'curated';
