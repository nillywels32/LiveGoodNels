# GoodLifeNels - Wireframe & UI Descriptions

**Version:** 1.0
**Last Updated:** November 15, 2025
**Platform:** iOS (Mobile) + Web

---

## Table of Contents
1. [Design System](#design-system)
2. [Navigation Structure](#navigation-structure)
3. [Onboarding Flow](#onboarding-flow)
4. [Home Screen](#home-screen)
5. [Weekly Questionnaire](#weekly-questionnaire)
6. [Meal Plan View](#meal-plan-view)
7. [Shopping List](#shopping-list)
8. [Inventory Management](#inventory-management)
9. [Daily Check-in](#daily-check-in)
10. [Settings & Profile](#settings--profile)
11. [Component Library](#component-library)

---

## Design System

### Brand Identity: GoodLifeNels

**Color Palette:**

```
Primary Colors:
- Deep Forest Green: #2C5F2D (primary actions, headers)
- Ocean Blue: #1B4965 (secondary actions, links)
- Earth Brown: #8B4513 (accents, warm touches)
- Pure White: #F8F9FA (backgrounds, cards)

Accent Colors:
- Vibrant Lime: #9ACD32 (success states, fresh produce)
- Sunset Orange: #FF8C42 (alerts, energy)
- Berry Purple: #6A4C93 (premium features, antioxidants)

Neutrals:
- Soft Beige: #F5F5DC (secondary backgrounds)
- Light Gray: #E5E5E5 (borders, dividers)
- Dark Gray: #4A4A4A (body text)
- Off-Black: #2D2D2D (headings)
```

**Typography:**

```
Headings:
- Font: Inter Bold / Poppins Bold
- Sizes: H1 (28px), H2 (24px), H3 (20px), H4 (18px)
- Color: Off-Black (#2D2D2D)

Body Text:
- Font: Inter Regular / Open Sans
- Size: 16px (mobile), 18px (web)
- Line Height: 1.6
- Color: Dark Gray (#4A4A4A)

Captions:
- Font: Inter Regular
- Size: 14px
- Color: Light Gray (#9E9E9E)
```

**Spacing System:**

```
Base unit: 8px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px
```

**Shadows & Glow Effects:**

```css
/* Card Shadow (layered depth) */
.card {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 8px 16px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

/* Button Glow (interactive elements) */
.button-primary {
  box-shadow:
    0 4px 8px rgba(44, 95, 45, 0.2),
    0 0 16px rgba(154, 205, 50, 0.3);
}

/* Success Glow */
.success-glow {
  box-shadow: 0 0 20px rgba(154, 205, 50, 0.6);
  animation: pulse-glow 2s infinite;
}
```

**Iconography:**

- Line-based icons (Feather Icons or custom)
- Nature-inspired: leaves, water droplets, sun
- Custom icons for Top 15 foods (illustrated)
- 24px standard size, 32px for primary actions

---

## Navigation Structure

### Mobile App Navigation (Tab Bar)

```
┌─────────────────────────────────────┐
│                                     │
│         [Screen Content]            │
│                                     │
│                                     │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│  🏠 Home  📅 Plan  🛒 Shop  📊 Track │
└─────────────────────────────────────┘
```

**Tabs:**
1. **Home** - Dashboard, today's view, quick actions
2. **Plan** - Meal plan, questionnaire, recipes
3. **Shop** - Shopping list, inventory
4. **Track** - Progress, feedback, analytics

### Web App Navigation (Sidebar)

```
┌──────────┬──────────────────────────┐
│  Logo    │                          │
│          │                          │
│ 🏠 Home  │     [Main Content]       │
│ 📅 Plan  │                          │
│ 🛒 Shop  │                          │
│ 📊 Track │                          │
│          │                          │
│ ⚙️ Settings                         │
└──────────┴──────────────────────────┘
```

---

## Onboarding Flow

### Screen 1: Welcome

```
┌─────────────────────────────────────┐
│                                     │
│     🌿 GoodLifeNels Logo 🌿         │
│                                     │
│   Welcome to Your Family's          │
│   Nutrition Journey                 │
│                                     │
│   [Illustration: Colorful produce   │
│    arranged in a vibrant bowl]      │
│                                     │
│   "Go back to nature - whole foods, │
│   plant-based nutrition, and        │
│   family health."                   │
│                                     │
│   [ Get Started ]                   │
│                                     │
│   Already have an account? Sign In  │
└─────────────────────────────────────┘
```

### Screen 2: Family Profile Setup

```
┌─────────────────────────────────────┐
│  ← Back          (Step 1 of 4)      │
│                                     │
│  Tell Us About Your Family          │
│                                     │
│  Family Name:                       │
│  [________________]                 │
│                                     │
│  How many adults?                   │
│  [ 1 ]  [●2●]  [ 3+ ]              │
│                                     │
│  How many children?                 │
│  [●2●]  [ 3 ]  [ 4+ ]              │
│                                     │
│  Children's ages:                   │
│  [●2●] [●3●] (tap to add more)     │
│                                     │
│                                     │
│           [ Continue ]              │
└─────────────────────────────────────┘
```

### Screen 3: Nutrition Goals

```
┌─────────────────────────────────────┐
│  ← Back          (Step 2 of 4)      │
│                                     │
│  Your Nutrition Philosophy          │
│                                     │
│  What matters most to you?          │
│  (Select all that apply)            │
│                                     │
│  ☑️ Whole, unprocessed foods        │
│  ☑️ Organic & non-GMO               │
│  ☑️ Plant-based emphasis            │
│  ☑️ Daily fresh juice               │
│  ☑️ Gut health                      │
│  ☑️ High-quality protein            │
│  ☐ Intermittent fasting             │
│  ☐ Ketosis-friendly                 │
│                                     │
│  Activity level:                    │
│  [ Light ]  [●Active●]  [ Athlete ] │
│                                     │
│           [ Continue ]              │
└─────────────────────────────────────┘
```

### Screen 4: Dietary Preferences

```
┌─────────────────────────────────────┐
│  ← Back          (Step 3 of 4)      │
│                                     │
│  Foods to Avoid                     │
│                                     │
│  Any allergies or restrictions?     │
│                                     │
│  [ + Add Allergy/Restriction ]      │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  Dairy (for Child 1)      [x]│  │
│  └───────────────────────────────┘  │
│                                     │
│  Foods you want MORE of:            │
│                                     │
│  [Search foods...]                  │
│                                     │
│  Suggested (Top 15):                │
│  [+] Dark Leafy Greens              │
│  [+] Blueberries                    │
│  [+] Turmeric                       │
│  [+] Broccoli                       │
│                                     │
│           [ Continue ]              │
└─────────────────────────────────────┘
```

### Screen 5: Notifications

```
┌─────────────────────────────────────┐
│  ← Back          (Step 4 of 4)      │
│                                     │
│  Stay Engaged                       │
│                                     │
│  We'll help you stay on track with  │
│  timely reminders and suggestions.  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📅 Saturday Questionnaire   │    │
│  │ Every Saturday at 10:00 AM  │    │
│  │                    [ ON  ]  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ☀️ Daily Morning Check-in   │    │
│  │ Every day at 9:00 AM        │    │
│  │                    [ ON  ]  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🌙 Evening Prep Reminders   │    │
│  │ Every evening at 9:00 PM    │    │
│  │                    [ ON  ]  │    │
│  └─────────────────────────────┘    │
│                                     │
│      [ Finish Setup ]               │
└─────────────────────────────────────┘
```

---

## Home Screen

### Home Dashboard (First-Time User - No Plan Yet)

```
┌─────────────────────────────────────┐
│  Good morning, Sarah! ☀️            │
│  Today is Saturday, November 17     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🌿 Ready to Plan This Week? │    │
│  │                             │    │
│  │ Let's create your first     │    │
│  │ weekly meal plan!           │    │
│  │                             │    │
│  │ It takes just 10 minutes    │    │
│  │ to answer a few questions.  │    │
│  │                             │    │
│  │  [ Start Questionnaire ]    │    │
│  └─────────────────────────────┘    │
│                                     │
│  Quick Actions:                     │
│  ┌──────────┐ ┌──────────┐          │
│  │ 📖 Browse│ │ 🛒 Add   │          │
│  │  Recipes │ │ Items    │          │
│  └──────────┘ └──────────┘          │
│                                     │
└─────────────────────────────────────┘
```

### Home Dashboard (Active Week)

```
┌─────────────────────────────────────┐
│  Good morning, Sarah! ☀️            │
│  Today is Monday, November 19       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ TODAY'S PLAN                │    │
│  │                             │    │
│  │ Breakfast • 9:00 AM         │    │
│  │ Berry Protein Smoothie Bowl │    │
│  │ [View Recipe]               │    │
│  │                             │    │
│  │ Juice • Anytime             │    │
│  │ Green Power Juice           │    │
│  │ [Prepped Sunday ✓]          │    │
│  │                             │    │
│  │ Lunch • 12:30 PM            │    │
│  │ Quinoa Buddha Bowl          │    │
│  │ [Needs Prep]                │    │
│  │                             │    │
│  │ Dinner • 6:00 PM            │    │
│  │ Grilled Salmon + Veggies    │    │
│  │ You're cooking tonight 👨‍🍳  │    │
│  └─────────────────────────────┘    │
│                                     │
│  Quick Actions:                     │
│  ┌──────────┐ ┌──────────┐          │
│  │ 🛒 Shop  │ │ 📊 Track │          │
│  │  List    │ │ Feedback │          │
│  └──────────┘ └──────────┘          │
│                                     │
│  🔥 Streak: 5 days no eating out!   │
└─────────────────────────────────────┘
```

---

## Weekly Questionnaire

### Questionnaire Home

```
┌─────────────────────────────────────┐
│  ← Back                             │
│                                     │
│  Weekly Planning Questionnaire      │
│  Week of November 17-23             │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 👤 Sarah                    │    │
│  │ ✅ Completed                │    │
│  │ Saturday at 10:15 AM        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 👤 Mike                     │    │
│  │ ⏳ Not yet started          │    │
│  │                             │    │
│  │  [ Start Questionnaire ]    │    │
│  └─────────────────────────────┘    │
│                                     │
│  Once both questionnaires are       │
│  complete, we'll generate your      │
│  personalized meal plan!            │
│                                     │
│  ⏱️ Takes about 10 minutes          │
└─────────────────────────────────────┘
```

### Questionnaire - Step 1 (Cravings)

```
┌─────────────────────────────────────┐
│  ← Back      Question 1 of 8        │
│                                     │
│  What are you craving this week?    │
│                                     │
│  (Select all that apply)            │
│                                     │
│  ┌─────────┐ ┌─────────┐            │
│  │ 🌮 Tacos│ │ 🍝 Pasta│            │
│  │   ●     │ │         │            │
│  └─────────┘ └─────────┘            │
│                                     │
│  ┌─────────┐ ┌─────────┐            │
│  │🐟 Salmon│ │🍛 Curry │            │
│  │   ●     │ │         │            │
│  └─────────┘ └─────────┘            │
│                                     │
│  ┌─────────┐ ┌─────────┐            │
│  │🥗 Salads│ │🍲 Soups │            │
│  │         │ │   ●     │            │
│  └─────────┘ └─────────┘            │
│                                     │
│  Other:                             │
│  [________________________]         │
│                                     │
│           [ Next ]                  │
└─────────────────────────────────────┘
```

### Questionnaire - Step 2 (Energy & Workouts)

```
┌─────────────────────────────────────┐
│  ← Back      Question 2 of 8        │
│                                     │
│  How's your energy this week?       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  Low    Medium    High      │    │
│  │   ●──────────●──────────○   │    │
│  └─────────────────────────────┘    │
│                                     │
│  What's your workout plan?          │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Mon: Strength Training      │    │
│  │ Tue: Rest                   │    │
│  │ Wed: Cardio (Running)       │    │
│  │ Thu: Rest                   │    │
│  │ Fri: Strength Training      │    │
│  │ Sat: Yoga                   │    │
│  │ Sun: Rest                   │    │
│  │                             │    │
│  │ [ Edit Schedule ]           │    │
│  └─────────────────────────────┘    │
│                                     │
│  Intensity this week:               │
│  [ Light ] [●Moderate●] [ Intense ] │
│                                     │
│           [ Next ]                  │
└─────────────────────────────────────┘
```

### Questionnaire - Final Step (Review)

```
┌─────────────────────────────────────┐
│  ← Back      Review & Submit        │
│                                     │
│  Review Your Responses              │
│                                     │
│  ✅ Cravings: Tacos, Salmon, Soups  │
│  ✅ Energy: Medium                  │
│  ✅ Workouts: 3 days, Moderate      │
│  ✅ Social Events: None             │
│  ✅ Work Schedule: Busy Mon-Wed     │
│  ✅ Cooking: You cook Mon/Wed/Fri   │
│  ✅ Kids Feedback: Loved smoothies  │
│  ✅ Special Notes: Quick lunches    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ [ Edit Responses ]          │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ [ Submit Questionnaire ]    │    │
│  └─────────────────────────────┘    │
│                                     │
│  Once your partner completes their  │
│  questionnaire, we'll generate your │
│  meal plan!                         │
└─────────────────────────────────────┘
```

### Generating Meal Plan (Loading State)

```
┌─────────────────────────────────────┐
│                                     │
│         🌿 GoodLifeNels 🌿          │
│                                     │
│   Creating Your Perfect Week...     │
│                                     │
│   [Animated progress circle]        │
│                                     │
│   ✓ Analyzing preferences           │
│   ✓ Balancing nutrition             │
│   ⏳ Crafting recipes                │
│   ⏳ Building shopping list          │
│                                     │
│   This takes 15-30 seconds          │
│                                     │
└─────────────────────────────────────┘
```

### Meal Plan Ready (Success)

```
┌─────────────────────────────────────┐
│                                     │
│            ✨ Success! ✨           │
│                                     │
│   Your meal plan is ready!          │
│                                     │
│   [Animated checkmark with glow]    │
│                                     │
│   We've created a delicious,        │
│   balanced week tailored to your    │
│   family's needs.                   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ [ View Meal Plan ]          │   │
│   └─────────────────────────────┘   │
│                                     │
│   ┌─────────────────────────────┐   │
│   │ [ See Shopping List ]       │   │
│   └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## Meal Plan View

### Week Overview

```
┌─────────────────────────────────────┐
│  ← Back          Meal Plan          │
│                                     │
│  Week of Nov 17-23                  │
│  ┌─────┬─────┬─────┬─────┬─────┐    │
│  │ Mon │ Tue │ Wed │ Thu │ Fri │    │
│  │ ●   │     │     │     │     │    │
│  └─────┴─────┴─────┴─────┴─────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ MONDAY                      │    │
│  │ Training Day | 2,200 cal    │    │
│  │                             │    │
│  │ Breakfast • 420 cal         │    │
│  │ Berry Protein Smoothie Bowl │    │
│  │ P: 28g C: 45g F: 14g        │    │
│  │                             │    │
│  │ Juice • 120 cal             │    │
│  │ Green Power Juice           │    │
│  │                             │    │
│  │ Lunch • 580 cal             │    │
│  │ Quinoa Buddha Bowl          │    │
│  │ P: 32g C: 65g F: 18g        │    │
│  │                             │    │
│  │ Snack • 180 cal             │    │
│  │ Apple + Almond Butter       │    │
│  │                             │    │
│  │ Dinner • 720 cal            │    │
│  │ Grilled Salmon + Roasted... │    │
│  │ P: 45g C: 52g F: 28g        │    │
│  │                             │    │
│  │ [Swipe for Tuesday →]       │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ Add to Calendar ] [ Plan B ]     │
└─────────────────────────────────────┘
```

### Meal Detail Modal

```
┌─────────────────────────────────────┐
│  ✕ Close                            │
│                                     │
│  [Recipe Image: Colorful bowl]      │
│                                     │
│  Berry Protein Smoothie Bowl        │
│  Monday Breakfast                   │
│                                     │
│  ⏱️ 10 min prep • 0 min cook        │
│  👨‍👩‍👧‍👦 2 adult servings + 2 kids     │
│                                     │
│  Macros (per serving):              │
│  Protein: 28g | Carbs: 45g          │
│  Fats: 14g | Fiber: 12g             │
│  Calories: 420                      │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Ingredients:                       │
│  ☑️ 1 cup frozen blueberries        │
│  ☑️ 1 cup organic spinach           │
│  ☑️ 2 tbsp flaxseed                 │
│  ☑️ 1 scoop grass-fed whey protein  │
│  ☐ 1 cup almond milk                │
│                                     │
│  [ Show Full Recipe ]               │
│                                     │
│  Kid-Friendly Notes:                │
│  💡 Spinach is hidden in the purple │
│  color! Let kids add toppings.      │
│                                     │
│  Age Tasks (2-3 years):             │
│  • Wash berries                     │
│  • Pour toppings                    │
│                                     │
│  [ Add to Reminders ]               │
└─────────────────────────────────────┘
```

### Plan B Modal

```
┌─────────────────────────────────────┐
│  ✕ Close                            │
│                                     │
│  Don't want this meal?              │
│                                     │
│  Current: Berry Protein Smoothie... │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Generating alternatives     │    │
│  │ using your current          │    │
│  │ inventory...                │    │
│  │                             │    │
│  │ [Loading animation]         │    │
│  └─────────────────────────────┘    │
│                                     │
│  ─ After loading ─                  │
│                                     │
│  Alternative Options:               │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🥑 Avocado Toast Power Bowl │    │
│  │ Prep: 8 min | Similar macros│    │
│  │ Uses: Avocado, Eggs (have)  │    │
│  │                             │    │
│  │ [ Swap to This ]            │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🥞 Protein Pancakes         │    │
│  │ Prep: 15 min | Higher carbs │    │
│  │ Needs: Oat flour (buy)      │    │
│  │                             │    │
│  │ [ Swap to This ]            │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ Keep Original ]                  │
└─────────────────────────────────────┘
```

---

## Shopping List

### Shopping List - By Store

```
┌─────────────────────────────────────┐
│  ← Back          Shopping List      │
│                                     │
│  Week of Nov 17-23                  │
│  42 items • 18 purchased            │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🛒 Costco (12 items)        │    │
│  │ ───────────────────────     │    │
│  │ ☑️ Organic Spinach (10 cups)│    │
│  │ ☑️ Frozen Blueberries (2 lb)│    │
│  │ ☐ Grass-fed Ground Beef     │    │
│  │ ☐ Wild Salmon Fillets       │    │
│  │ ☐ ...                       │    │
│  │                             │    │
│  │ [ Expand All ]              │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🌿 Sprouts (8 items)        │    │
│  │ ───────────────────────     │    │
│  │ ☐ Broccoli Sprouts          │    │
│  │ ☐ Organic Kale              │    │
│  │ ☐ Kakadu Plum               │    │
│  │ ☐ ...                       │    │
│  │                             │    │
│  │ [ Expand All ]              │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ Sync to Apple Lists ]            │
└─────────────────────────────────────┘
```

### Shopping List - Item Detail

```
┌─────────────────────────────────────┐
│  ← Back                             │
│                                     │
│  Organic Spinach                    │
│                                     │
│  Amount: 10 cups                    │
│  Category: Produce                  │
│  Priority: High                     │
│                                     │
│  Suggested Store: Costco            │
│  (bulk pricing)                     │
│                                     │
│  Used in:                           │
│  • Monday Breakfast                 │
│  • Tuesday Juice                    │
│  • Wednesday Dinner                 │
│  • Friday Juice                     │
│                                     │
│  Notes:                             │
│  [__________________________]       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ ☑️ Mark as Purchased        │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ Add to Reminders ]               │
└─────────────────────────────────────┘
```

---

## Inventory Management

### Inventory List

```
┌─────────────────────────────────────┐
│  ← Back          Inventory          │
│                                     │
│  [ All ] [ Expiring ] [ By Category]│
│                                     │
│  🔍 Search inventory...             │
│                                     │
│  ⚠️ EXPIRING SOON (3)               │
│  ┌─────────────────────────────┐    │
│  │ 🥬 Organic Kale             │    │
│  │ 3 cups • Expires in 2 days  │    │
│  │ Location: Fridge            │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 🥑 Avocados                 │    │
│  │ 2 whole • Expires tomorrow  │    │
│  │ Location: Counter           │    │
│  └─────────────────────────────┘    │
│                                     │
│  PRODUCE (12 items)                 │
│  ┌─────────────────────────────┐    │
│  │ 🫐 Frozen Blueberries       │    │
│  │ 1.5 lbs • Good for 6 months │    │
│  │ Location: Freezer           │    │
│  └─────────────────────────────┘    │
│                                     │
│  [ + Add Item Manually ]            │
└─────────────────────────────────────┘
```

### Add Inventory Item

```
┌─────────────────────────────────────┐
│  ✕ Close                            │
│                                     │
│  Add to Inventory                   │
│                                     │
│  Item Name:                         │
│  [Organic Spinach__________]        │
│                                     │
│  Quantity:                          │
│  [_5_] [cups ▼]                     │
│                                     │
│  Category:                          │
│  [Produce ▼]                        │
│                                     │
│  Purchase Date:                     │
│  [Nov 17, 2025 📅]                  │
│                                     │
│  Expiration Date:                   │
│  [Nov 24, 2025 📅] (estimated)      │
│                                     │
│  Location:                          │
│  ( ) Fridge  (●) Freezer  ( ) Pantry│
│                                     │
│  ☑️ Organic                         │
│                                     │
│  Notes:                             │
│  [__________________________]       │
│                                     │
│  [ Cancel ]    [ Add Item ]         │
└─────────────────────────────────────┘
```

---

## Daily Check-in

### Morning Check-in Notification

```
┌─────────────────────────────────────┐
│  🌿 GoodLifeNels                    │
│                                     │
│  Good morning, Sarah!               │
│                                     │
│  Ready for today's meal plan?       │
│  Do you have spinach for dinner?    │
│                                     │
│  [View] [Later]                     │
└─────────────────────────────────────┘
```

### Check-in Modal (Opened from Notification)

```
┌─────────────────────────────────────┐
│  ✕ Close                            │
│                                     │
│  Good Morning, Sarah! ☀️            │
│                                     │
│  You have a busy day ahead with     │
│  back-to-back meetings. Here's      │
│  your plan for today:               │
│                                     │
│  TODAY'S MEALS:                     │
│  • Breakfast: Berry Smoothie ✅     │
│  • Lunch: Quinoa Bowl (quick prep)  │
│  • Dinner: Salmon (Mike cooking)    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Quick Questions:                   │
│                                     │
│  1. Do you have spinach for         │
│     tonight's dinner?               │
│     [ Yes ] [ No - remind me ]      │
│                                     │
│  2. Your schedule looks packed.     │
│     Want a simpler lunch?           │
│     [ Keep plan ] [ Show easier ]   │
│                                     │
│  3. Are you doing IF today?         │
│     [ No ] [ Yes - skip breakfast ] │
│                                     │
│  💡 Tip: Prep tonight's veggies     │
│  this morning while making coffee.  │
│                                     │
│  [ All Set! ]                       │
└─────────────────────────────────────┘
```

---

## Settings & Profile

### Settings Home

```
┌─────────────────────────────────────┐
│  ← Back          Settings           │
│                                     │
│  Profile                            │
│  ┌─────────────────────────────┐    │
│  │ 👤 Sarah                    │    │
│  │ sarah@example.com           │    │
│  │ [ Edit Profile ]            │    │
│  └─────────────────────────────┘    │
│                                     │
│  Family                             │
│  ┌─────────────────────────────┐    │
│  │ The Nels Family             │    │
│  │ 2 adults, 2 kids (ages 2,3) │    │
│  │ [ Manage Family ]           │    │
│  └─────────────────────────────┘    │
│                                     │
│  Nutrition Preferences              │
│  ┌─────────────────────────────┐    │
│  │ Philosophy: Go Back to...   │    │
│  │ Top 15 Foods • Macro Targets│    │
│  │ [ Edit Preferences ]        │    │
│  └─────────────────────────────┘    │
│                                     │
│  Notifications                      │
│  ┌─────────────────────────────┐    │
│  │ Questionnaire: Sat 10:00 AM │    │
│  │ Daily Check-in: 9:00 AM     │    │
│  │ [ Manage Notifications ]    │    │
│  └─────────────────────────────┘    │
│                                     │
│  Account                            │
│  • Change Password                  │
│  • Privacy Policy                   │
│  • Sign Out                         │
└─────────────────────────────────────┘
```

---

## Component Library

### Buttons

```
Primary Button:
┌──────────────────┐
│  [ Action Text ] │  <- Deep green, white text, glow shadow
└──────────────────┘

Secondary Button:
┌──────────────────┐
│  [ Action Text ] │  <- Ocean blue outline, blue text
└──────────────────┘

Text Button:
  Action Text       <- No background, green text
```

### Cards

```
Standard Card:
┌────────────────────────────────┐
│  Card Title                    │
│  ──────────────────────────    │
│  Card content goes here with   │
│  appropriate spacing and text. │
│                                │
│  [Action Button]               │
└────────────────────────────────┘
^-- Layered shadow, rounded corners

Meal Card (Today View):
┌────────────────────────────────┐
│  [Meal Image]                  │
│  ──────────────────────────    │
│  🍳 Breakfast • 420 cal        │
│  Berry Protein Smoothie Bowl   │
│                                │
│  P: 28g  C: 45g  F: 14g        │
│                                │
│  [View Recipe] [Plan B]        │
└────────────────────────────────┘
```

### Progress Indicators

```
Circular Progress (Macros):
    P: 28g
   ┌──○──┐
   │  ●  │  <- Filled arc, glow effect
   └─────┘
   80% of goal

Linear Progress (Shopping):
   18 / 42 items purchased
   ████████░░░░░░░░  43%
```

### Badges & Tags

```
[Top 15]  <- Vibrant lime background
[Organic] <- Earth brown background
[Quick]   <- Ocean blue background
```

---

**Document Status:** Complete wireframe descriptions
**Next Steps:**
1. Create high-fidelity mockups (Figma recommended)
2. Build component library in code
3. Implement screens according to development phases
4. User test with family for feedback
