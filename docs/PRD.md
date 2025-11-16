# GoodLifeNels - Product Requirements Document

**Version:** 1.0
**Last Updated:** November 15, 2025
**Status:** Planning Phase

---

## Table of Contents
1. [Vision & Philosophy](#vision--philosophy)
2. [Product Overview](#product-overview)
3. [User Personas](#user-personas)
4. [Core Features](#core-features)
5. [User Flows](#user-flows)
6. [Nutrition Intelligence](#nutrition-intelligence)
7. [Technical Architecture](#technical-architecture)
8. [Design & Aesthetics](#design--aesthetics)
9. [Roadmap](#roadmap)
10. [Success Metrics](#success-metrics)
11. [Open Questions & Future Considerations](#open-questions--future-considerations)

---

## Vision & Philosophy

### Mission Statement
GoodLifeNels empowers families to embrace vibrant, nature-based nutrition through intelligent meal planning, proactive engagement, and adaptive learning - transforming healthy eating from overwhelming to effortless.

### Core Philosophy: "Go Back to Nature"
Nature gives us what we need to survive, thrive, and heal. GoodLifeNels is built on these foundational principles:

- **Whole Foods First:** Majority plant-based, fruits, nuts, seeds, organic dairy, grass-fed beef, pasture-raised eggs
- **Daily Juice Ritual:** One cold-pressed, homemade juice per day
- **Organic & Non-GMO:** Prioritize clean, unprocessed ingredients
- **Cut the Bad:** Eliminate refined sugars and refined carbs; embrace high-fiber alternatives
- **Gut Health Focus:** Cultivate a healthy microbiome through nutrition
- **Quality Protein:** Essential for active lifestyles
- **Hydration:** Purified water as foundation
- **Flexibility:** Welcome intermittent fasting, ketosis, and caloric deficits when appropriate

### Vision of Success
- Stocked fridge bursting with bright colors
- Regular juicing sessions
- Daily smoothies
- Quality protein fueling active lifestyles
- Good energy, happy people, less laziness
- Family involvement in meal preparation
- Meals thoughtfully planned ahead
- Zero eating out
- Full fruit bowl always on the counter
- Antioxidant-rich nutrition
- Optimal fuel for workouts
- Thriving microbiome

---

## Product Overview

### What is GoodLifeNels?
An AI-powered nutrition planning app that proactively guides families through weekly meal planning, ingredient management, and daily nutrition decisions - deeply integrated with Apple ecosystem tools (Calendar, Reminders, Lists).

### Target Platform
- **Mobile:** iOS (primary)
- **Web:** Responsive web app (secondary)

### Primary Users
- Two adults managing household nutrition
- Supporting family of 4 (including two young children, ages 2-3)

### Key Differentiators
1. **Proactive AI Engagement:** App initiates conversations, asks questions, and adapts to family rhythms
2. **Dual-Adult Synthesis:** Merges preferences from both adults into unified meal plans
3. **Nature-First Intelligence:** Deeply encoded nutritional philosophy guides all suggestions
4. **Apple Ecosystem Native:** Seamless sync with Calendar, Reminders, Lists
5. **Adaptive Learning:** Continuous feedback loops refine suggestions over time
6. **Kid-Adaptation Layer:** Creative solutions for making healthy meals kid-friendly

---

## User Personas

### Primary Persona: "The Family Nutrition Leader"
**Demographics:**
- Adult, health-conscious, active lifestyle
- Parent of young children (ages 2-3)
- Works full-time, balances multiple responsibilities

**Goals:**
- Maintain family's health through proper nutrition
- Minimize decision fatigue around meals
- Reduce eating out to zero
- Involve family in healthy eating habits
- Stay energized for workouts and daily activities

**Pain Points:**
- Meal planning is mentally exhausting
- Kids are picky eaters
- Busy schedule makes prep time scarce
- Hard to track what ingredients are available
- Forgetting to buy specialty items
- Food waste from poor planning

**Motivations:**
- Setting healthy foundation for children
- Feeling energized and capable
- Creating family rituals around food
- Living aligned with natural health principles

---

## Core Features

### 1. Weekly Planning System

#### Saturday Morning Questionnaire (10:00 AM)
**Purpose:** Gather context for the week ahead from both adults

**Question Categories:**
- Cravings & preferences
- Energy levels
- Workout schedule (intensity, type, frequency)
- Social events
- School/work schedules
- Previous week feedback (what kids enjoyed, what worked/didn't work)
- Fasting intentions (IF days, juice-only days, ketosis goals)
- Who's cooking dinner each night

**Format:**
- ~10 minutes to complete
- Mostly multiple choice, true/false, quick response formats
- Few open-ended writing responses for complexities
- Evolves over time based on patterns and feedback

**Logic:**
- Both adults receive questionnaire
- If only one completes it, app uses that single response
- AI synthesizes both responses when available
- Generates unified weekly meal plan

#### Meal Plan Generation
**Output:**
- 7-day meal plan
- 3 meals per day + snacks
- Daily juice recipe
- Smoothie suggestions (morning/afternoon)
- Macro breakdowns per day (protein, carbs, fats, fiber)
- Nutritional summary for the week
- Adjustments for fasting/juice-only days as specified

**Presentation:**
- Day-by-day card view (one week at a time)
- Recipe details on demand
- "Plan B" button for alternative meals using available inventory
- Editable/swappable after generation

**Export Options:**
- "Add to Calendar" button (user approves)
- "Add to Reminders" button (user approves)
- "Add to Lists" button (user approves)

---

### 2. Shopping & Inventory Management

#### Master Shopping List (Sunday Prep)
**Generation:**
- Automated from weekly meal plan
- Organized by store (Costco, Walmart, Smart & Final, WinCo, Sprouts)
- Store suggestions based on item type (specialty items → Sprouts, bulk → Costco)

**Shopping Flow:**
1. Review generated list
2. Shop on Sunday
3. Mark items as "in inventory" as purchased
4. Items not bought → app creates follow-up reminders

**Inventory Tracking:**
- Expiration tracking for perishables
- Prioritizes recipes using items nearing expiration
- Thinks ahead for future days (mid-week ingredient needs)

**Mid-Week Reminders:**
- Apple Reminders integration for missing items
- Context-aware notifications ("Grab organic spinach on your way home from work")

---

### 3. Daily Engagement & Notifications

#### Morning Notifications (9:00 AM)
**Purpose:** Proactive check-in about upcoming meals

**Content:**
- Reminder about today's meals
- Questions about ingredient availability
- Suggestions based on schedule
- Adjustments if plans changed

#### Evening Notifications (9:00 PM)
**Purpose:** Prepare for next day

**Content:**
- Tomorrow's meal preview
- Prep reminders ("Soak quinoa tonight for tomorrow's lunch")
- Meal prep day alerts
- Encouragement & wins

#### Prep Reminders
**Timing:** Context-aware (night before, morning of)

**Content:**
- Batch prep tasks (e.g., "Juice prep session - make 2-3 days worth")
- Container usage suggestions
- Time estimates

---

### 4. Recipe Intelligence

#### Recipe Database
**Initial State:**
- Curated recipes aligned with "Go Back to Nature" philosophy
- Organized by meal type, prep time, complexity
- Tagged with nutritional profiles

**Evolution:**
- AI adapts suggestions based on preferences over time
- Learns from feedback logs
- Generates new recipes using Claude Sonnet 4.5
- Suggests recipes from trusted sources

**Features:**
- Save/favorite for repeat rotation
- Substitution suggestions when missing ingredients
- Kid-friendly adaptations
- Age-appropriate dinner tasks for children (2-3 years old)

---

### 5. Nutrition Intelligence Engine

#### Top 15 Essential Foods (Prioritized Rotation)
1. Broccoli sprouts
2. Turmeric
3. Blueberries
4. Broccoli
5. Flaxseed
6. Dark leafy greens
7. Garlic
8. Mushrooms (chaga)
9. Cacao
10. Tigernuts
11. Ginger root
12. Grapes (red preferred)
13. Tomatoes
14. Lemon
15. Quinoa

#### Secondary Good Foods
Walnuts, wheatgrass, beets, green tea, cauliflower, berries, celery, olive oil, artichokes, onion, cabbage, brussels sprouts, carrots, kakadu plum

#### Food Frequency Rules
**System tracks and enforces:**
- Daily foods (e.g., dark leafy greens, juice)
- Every 3-day foods (e.g., certain proteins, specific veggies)
- Custom intervals as defined by users

#### Macronutrient Management
**Tracking:**
- Protein (increase for active lifestyle)
- Carbs (high-fiber prioritized, refined eliminated)
- Fats (quality sources)
- Fiber (specific tracking)

**Adjustments:**
- Heavy training days → increased protein/calories
- Rest days → moderate intake
- Fasting days → zero/minimal
- Ketosis periods → high fat, low carb

#### Micronutrient Awareness
- Antioxidants
- Vitamins & minerals
- Gut-supporting nutrients
- Workout fuel optimization

---

### 6. Family & Kids Features

#### Kid-Friendly Meal Adaptations
**Challenge:** 2-3 year old picky eaters
**Goals:** More fiber, protein, nutrients; less processed carbs/bad fats

**AI Capabilities:**
- Suggests creative presentations (deconstructed bowls, hidden veggies)
- Learns what kids enjoyed from previous weeks
- Offers "kid versions" of adult meals
- Tracks acceptance patterns

#### Family Involvement
**Age-Appropriate Dinner Tasks (2-3 years):**
- Washing vegetables
- Stirring ingredients
- Simple assembly tasks
- Learning engagement

**Juice Portions:**
- Adults: Full serving
- Kids: Smaller portions (scaled appropriately)

---

### 7. Learning & Feedback System

#### Feedback Collection
**After meals:**
- "How was that meal?" ratings
- What did kids enjoy most?
- Time/effort vs. expectation
- Would you make again?

**Weekly retrospective:**
- What worked well?
- What didn't?
- Energy levels throughout week
- Workout performance
- Adherence to goals

#### Adaptive Intelligence
**AI learns:**
- Taste preferences (adults + kids)
- Scheduling patterns
- Prep time realities
- Shopping behaviors
- Seasonal preferences
- Success patterns

**Storage:**
- Comprehensive logs for LLM context
- Historical data for trend analysis
- Long-term memory across weeks/months

---

### 8. Progress & Celebration

#### Visual Progress Tracking
- Days with leafy greens streak
- Zero eating out counter
- Top 15 foods rotation heatmap
- Macro adherence trends
- Juice consistency
- Meal prep success rate

#### Celebration Moments
- Milestones achieved
- Streaks maintained
- Goals hit
- Family wins
- Positive reinforcement

---

## User Flows

### Flow 1: Weekly Planning (Saturday Morning)

```
10:00 AM → Notification: "Weekly Planning Time!"
         ↓
    Open app
         ↓
    Questionnaire (10 min)
    - Cravings
    - Energy levels
    - Workout schedule
    - Social events
    - Work/school schedule
    - Previous week feedback
    - Fasting plans
    - Cooking assignments
         ↓
    Submit responses
         ↓
    [Wait for partner to complete]
         ↓
    AI synthesizes both responses
         ↓
    Generates meal plan
    - 7 days, 3 meals + snacks
    - Daily juice recipes
    - Smoothie suggestions
    - Macro breakdowns
         ↓
    Review meal plan (day-by-day cards)
         ↓
    Option: Edit/swap meals
    Option: Approve as-is
         ↓
    Generates master shopping list
    - Organized by store
         ↓
    [Add to Calendar] button → creates meal prep blocks
    [Add to Lists] button → syncs to Apple Lists
```

### Flow 2: Sunday Shopping Trip

```
Review shopping list in app
         ↓
Shop at designated stores
    - Costco (bulk items)
    - Walmart
    - Smart & Final
    - WinCo
    - Sprouts (specialty)
         ↓
Mark items as "in inventory" as purchased
         ↓
Items not found/bought → flagged
         ↓
App creates mid-week reminders for missing items
         ↓
Home: Store ingredients
         ↓
Expiration dates logged (optional manual input or auto-estimate)
```

### Flow 3: Daily Morning Check-in

```
9:00 AM → Notification: "Good morning! Let's talk about today's meals"
         ↓
    Open notification
         ↓
    Quick questions:
    - "Ready for today's meal plan?"
    - "Do you have [ingredient X]?"
    - "Your schedule looks busy - want simpler options?"
         ↓
    AI adjusts if needed
         ↓
    Shows today's card:
    - Breakfast, lunch, dinner, snacks
    - Juice recipe
    - Prep reminders
         ↓
    [View Recipe] for details
    [Plan B] if you want alternative
         ↓
    [Add to Reminders] for specific tasks
```

### Flow 4: Evening Prep Reminder

```
9:00 PM → Notification: "Tomorrow prep reminder"
         ↓
    Shows tomorrow's meals
         ↓
    Prep tasks needed tonight:
    - "Soak quinoa for tomorrow's lunch"
    - "Prep juice ingredients for morning"
         ↓
    [Done] to confirm
         ↓
    [Add to Reminders] to set custom reminder
```

### Flow 5: Mid-Week Ingredient Reminder

```
Throughout week → Context-aware notification
"You're near [Store Name] - grab organic spinach for Thursday's meal"
         ↓
    [Add to Reminders] → Apple Reminders
         ↓
    Mark as purchased when complete
         ↓
    Updates inventory
```

### Flow 6: Meal Feedback

```
After eating meal → Optional prompt
"How was [meal name]?"
         ↓
    Quick rating (1-5 stars)
         ↓
    Optional: "What did the kids think?"
         ↓
    Optional: Free text feedback
         ↓
    AI logs feedback
         ↓
    Influences future suggestions
```

---

## Nutrition Intelligence

### Food Rotation System

#### Daily Requirements
- Dark leafy greens
- Fresh juice (cold-pressed, homemade)
- Quality protein
- High-fiber carbs
- Purified water

#### 3-Day Rotation
- Specific proteins (e.g., salmon, grass-fed beef)
- Certain vegetables (e.g., broccoli, cauliflower)
- Nuts/seeds variety

#### Custom Intervals
User-defined frequency for specific foods

### Macro Targets

**Baseline (moderate activity day):**
- Protein: High (supporting active lifestyle)
- Carbs: Moderate (high-fiber, whole food sources)
- Fats: Moderate (quality sources: olive oil, nuts, avocado)
- Fiber: High

**Training Day Adjustments:**
- Increase protein
- Increase overall calories
- Timing considerations (pre/post workout)

**Rest Day:**
- Moderate calories
- Maintain protein
- Lower carbs slightly

**Fasting/Ketosis Days:**
- Zero/minimal intake (IF)
- High fat, very low carb (keto)
- Protein moderate

### Gut Health Optimization
- Fermented foods suggestions
- Prebiotic fiber sources
- Probiotic-rich foods
- Anti-inflammatory ingredients

### Antioxidant Maximization
- Berry rotation
- Colorful vegetable variety
- Cacao, turmeric, ginger emphasis
- Red grapes, dark greens

---

## Technical Architecture

### Frontend

#### Mobile (iOS)
**Framework:** React Native
- Cross-platform capability (iOS priority, Android future)
- Rich UI component ecosystem
- Strong community support

**Key Libraries:**
- React Navigation (routing)
- React Native Paper or NativeBase (UI components)
- React Native Calendar (meal plan views)
- AsyncStorage (local data persistence)
- Push notifications (expo-notifications or react-native-push-notification)

#### Web
**Framework:** React (Next.js)
- Server-side rendering for performance
- Responsive design (desktop/tablet support)
- Shared component library with mobile where possible

### Backend

**Recommended:** Supabase (PostgreSQL + Real-time + Auth + Storage)
- Managed PostgreSQL database
- Built-in authentication
- Real-time subscriptions (for multi-user sync)
- Edge functions for serverless logic
- File storage for recipe images
- Row-level security
- Simple, scalable, cost-effective

**Alternative:** Firebase
- NoSQL database (Firestore)
- Strong mobile SDK
- Push notification support
- May be simpler for MVP, but less SQL flexibility

**Data Models:**
- Users (adults, family profiles)
- Meal Plans (weekly plans, generated meals)
- Recipes (curated + AI-generated)
- Inventory (current ingredients, expirations)
- Shopping Lists (master + ongoing)
- Feedback Logs (meal ratings, questionnaire responses, learning data)
- Nutrition Profiles (food frequency rules, macro targets, preferences)
- Calendar Events (synced items)
- Reminders (synced items)

### AI Integration

**Provider:** Anthropic Claude (Sonnet 4.5)

**Use Cases:**
1. **Questionnaire Synthesis:**
   - Input: Two questionnaire responses + historical data
   - Output: Unified context for meal planning

2. **Meal Plan Generation:**
   - Input: Synthesized preferences, nutrition rules, inventory, schedule
   - Output: 7-day meal plan with recipes, macros, shopping list

3. **Recipe Generation/Adaptation:**
   - Input: Ingredients available, preferences, nutritional targets
   - Output: New recipes or adaptations

4. **Plan B Suggestions:**
   - Input: Current inventory, rejected meal, preferences
   - Output: Alternative meal options

5. **Daily Engagement:**
   - Input: Today's plan, user context, schedule
   - Output: Personalized questions/suggestions

6. **Kid-Friendly Adaptations:**
   - Input: Adult recipe, kid preferences, past feedback
   - Output: Creative kid versions

7. **Feedback Analysis:**
   - Input: Historical logs, patterns
   - Output: Insights, adjusted preferences

**Implementation:**
- Anthropic API (REST)
- Streaming responses for real-time generation
- Prompt engineering for nutrition philosophy encoding
- Context management (pass historical logs for learning)
- Token optimization for cost efficiency

### Apple Ecosystem Integration

#### Calendar Sync
**Method:** EventKit framework (iOS)
- Create calendar events for meal prep, cooking times
- User approval required before adding
- Two-way sync (read user's schedule for questionnaire context)

#### Reminders Sync
**Method:** EventKit framework (iOS)
- Create reminders for missing ingredients, prep tasks
- User approval required
- Location-based reminders (near stores)

#### Lists Sync
**Method:** Reminders framework (Apple Lists via Reminders app)
- Shopping lists as shared lists
- Check-off functionality
- User approval required

**Permissions:**
- Request calendar access
- Request reminders access
- Clear user consent flow

### Data Flow Architecture

```
User Input → Frontend (React Native/Web)
    ↓
Supabase Backend
    ↓
AI Processing (Claude Sonnet 4.5 via API)
    ↓
Generated Output → Backend Storage
    ↓
Frontend Display → User Approval
    ↓
Apple Ecosystem Sync (Calendar, Reminders, Lists)
```

### Security & Privacy

**Data Storage:**
- Cloud-based (Supabase) with encryption at rest
- SSL/TLS for data in transit
- Row-level security (RLS) for multi-user access control

**AI Provider Considerations:**
- Family health data sent to Anthropic API
- Review Anthropic's data retention/privacy policies
- Consider anonymizing/pseudonymizing data if needed
- Option for future: Self-hosted LLM for full privacy control (v2+)

**Authentication:**
- Email/password (Supabase Auth)
- Optional: Social auth (Apple, Google)
- Multi-device support (both adults on separate devices)

---

## Design & Aesthetics

### Brand Identity: GoodLifeNels

**Name Origin:** Family name + Good Life philosophy

### Color Palette

**Primary Colors:**
- **Deep Forest Green:** #2C5F2D (growth, nature, vitality)
- **Ocean Blue:** #1B4965 (purity, clarity, calm)
- **Earth Brown:** #8B4513 (grounding, natural)
- **Pure White:** #F8F9FA (clean, fresh, simplicity)

**Accent Colors:**
- **Vibrant Lime:** #9ACD32 (energy, fresh produce)
- **Sunset Orange:** #FF8C42 (warmth, enthusiasm)
- **Berry Purple:** #6A4C93 (antioxidants, richness)

**Neutrals:**
- Soft beige, light gray, cream tones

### Visual Style

**Design Principles:**
- **Modern & Crisp:** Clean lines, ample whitespace, sharp typography
- **Fresh & Vibrant:** Bright food photography, colorful UI elements
- **Layered & Glowing:** Subtle depth effects, soft shadows, glowing accents
- **Nature-Inspired:** Organic shapes, leaf/plant motifs, natural textures

**UI Elements:**
- Glow effects on interactive elements (buttons, cards)
- Layered cards with subtle shadows for depth
- Smooth animations (page transitions, card swipes)
- Rounded corners (modern, friendly)
- Icons: Line-based with nature themes

### Typography

**Headings:**
- Sans-serif, bold, clean (e.g., Inter, Poppins, Montserrat)

**Body Text:**
- Sans-serif, readable (e.g., Inter, Open Sans)

**Accent/Quotes:**
- Serif for philosophy statements (e.g., Merriweather)

### Imagery

**Food Photography:**
- Bright, colorful, close-up shots
- Natural lighting
- Vibrant fruits/vegetables front and center
- Prep process shots (hands chopping, juicing, assembling)

**Iconography:**
- Custom icons for top 15 foods
- Nature elements (leaves, water droplets, sun)
- Minimal, line-based style

### Component Styles

**Meal Cards:**
- Large, swipeable cards (day-by-day)
- Image header (meal photo)
- Meal name, prep time, macro summary
- Glow border when selected
- "Plan B" button overlay

**Progress Indicators:**
- Circular progress rings (macro targets)
- Streak counters with glow effects
- Heatmaps for food frequency (greens = good)

**Notifications:**
- Clean, minimal design
- Icon + short text
- Actionable buttons ("View", "Remind Me Later")

**Buttons:**
- Primary: Deep green with glow
- Secondary: Ocean blue outline
- Tertiary: Text-only (gray)

---

## Roadmap

### MVP (Version 1.0) - All Features Included

**Timeline:** TBD
**Goal:** Launch fully functional app with all discussed features

#### Core Features (All Included)
1. ✅ Weekly Planning System
   - Saturday questionnaire (10:00 AM)
   - Dual-adult response synthesis
   - AI-powered meal plan generation
   - Day-by-day card view
   - Plan B alternatives

2. ✅ Shopping & Inventory Management
   - Master shopping list generation
   - Store-specific organization
   - In-app inventory tracking
   - Expiration tracking
   - Mid-week reminders for missing items

3. ✅ Daily Engagement & Notifications
   - Morning check-ins (9:00 AM)
   - Evening prep reminders (9:00 PM)
   - Context-aware suggestions

4. ✅ Recipe Intelligence
   - Curated recipe database
   - AI recipe generation (Claude Sonnet 4.5)
   - Kid-friendly adaptations
   - Substitution suggestions
   - Save/favorite functionality

5. ✅ Nutrition Intelligence Engine
   - Top 15 foods rotation
   - Food frequency tracking
   - Macro breakdowns (daily + weekly)
   - Micronutrient awareness
   - Workout-adjusted nutrition

6. ✅ Family & Kids Features
   - Kid meal adaptations
   - Age-appropriate task suggestions
   - Kid preference learning

7. ✅ Learning & Feedback System
   - Post-meal ratings
   - Weekly retrospectives
   - AI adaptation from feedback
   - Comprehensive logging

8. ✅ Progress & Celebration
   - Visual progress tracking
   - Streaks and milestones
   - Celebration moments

9. ✅ Apple Ecosystem Integration
   - Calendar sync (user-approved)
   - Reminders sync (user-approved)
   - Lists sync (user-approved)

10. ✅ Juice & Smoothie Planning
    - Daily juice recipes
    - 2-3 day batch prep suggestions
    - Smoothie timing (morning/afternoon)
    - Portion adjustments for kids

#### Platform Support
- iOS mobile app (React Native)
- Web app (React/Next.js)

#### Design Implementation
- Full brand identity (GoodLifeNels)
- Nature-inspired color palette
- Glowing, layered UI components
- Modern, crisp aesthetic

---

### Future Enhancements (Post-MVP)

#### Version 2.0 Considerations
- **Android Native Support:** Expanded mobile platform
- **Family Member Expansion:** Add profiles for kids (age-appropriate interfaces)
- **Voice Integration:** Siri shortcuts, voice-activated meal questions
- **Smart Home Integration:** Sync with smart refrigerators, grocery delivery services
- **Community Features:** Share favorite recipes with friends/family
- **Nutritionist Consultation:** Optional human expert review of plans
- **Advanced Analytics:** Deeper health correlations (energy, sleep, workout performance)
- **Meal Prep Video Guides:** Step-by-step visual instructions
- **Grocery Price Tracking:** Budget optimization over time
- **Seasonal Intelligence:** Emphasize seasonal produce for cost/freshness

#### Version 3.0+ Ideas
- **Self-Hosted LLM Option:** Full privacy control (local AI)
- **Wearable Integration:** Sync with Apple Watch, Fitbit (activity, sleep data)
- **Lab Integration:** Connect with health labs for personalized nutrition based on bloodwork
- **Extended Family Sharing:** Multi-household coordination (grandparents, etc.)
- **Meal Delivery Integration:** Auto-order missing ingredients
- **Restaurant Mode:** Rare occasions eating out - suggest healthy options
- **Travel Mode:** Maintain nutrition goals while traveling

---

## Success Metrics

### Primary KPIs (Key Performance Indicators)

#### Engagement Metrics
- **Weekly Planning Completion Rate:** % of weeks both adults complete questionnaire
- **Daily Notification Open Rate:** % of morning/evening notifications engaged with
- **Meal Plan Adherence:** % of planned meals actually prepared/eaten
- **Zero Eating Out:** Consecutive days without eating out

#### Nutrition Metrics
- **Top 15 Foods Coverage:** % of top foods consumed per week
- **Macro Target Achievement:** % of days hitting macro goals
- **Juice Consistency:** Days per week with juice consumption
- **Food Waste Reduction:** Estimated reduction in unused ingredients

#### System Effectiveness
- **Plan B Usage:** Frequency of alternative meal requests (should be low if AI learns well)
- **Feedback Submission Rate:** % of meals with user feedback
- **Shopping List Accuracy:** % of list items actually purchased
- **Prep Time Accuracy:** Estimated vs. actual prep time

#### Family Impact
- **Kid Meal Acceptance:** Ratings on kid-friendly adaptations
- **Family Involvement:** Frequency of family prep activities
- **Energy Levels:** Self-reported energy trends
- **Workout Performance:** Self-reported workout quality/consistency

#### Learning Curve
- **AI Adaptation Speed:** Time to reach 80% meal plan satisfaction
- **Questionnaire Evolution:** Reduction in questionnaire time as AI learns
- **Recipe Repeat Rate:** % of favorited recipes in rotation

### Qualitative Success Indicators
- Bright, colorful stocked fridge (photo evidence!)
- Consistent juicing habits
- Family excitement around meal prep
- Reduced stress around meal decisions
- Improved energy and mood
- Sustainable long-term adoption (6+ months active use)

---

## Open Questions & Future Considerations

### Technical Decisions to Finalize
- [ ] **Backend Choice:** Supabase vs. Firebase (recommendation: Supabase for SQL + real-time)
- [ ] **Hosting:** Where to deploy web app (Vercel, Netlify, AWS)
- [ ] **Image Storage:** Recipe photos, user uploads (Supabase Storage, Cloudinary)
- [ ] **Push Notification Service:** Expo vs. native vs. third-party
- [ ] **Analytics:** Which tool for tracking usage (Mixpanel, Amplitude, PostHog)

### Design Decisions to Finalize
- [ ] **Logo Design:** Visual identity for GoodLifeNels
- [ ] **Food Icons:** Custom illustration set for top 15 foods
- [ ] **Photography:** Stock vs. custom food photography
- [ ] **Animation Library:** Lottie, React Spring, or native animations

### AI Considerations
- [ ] **Prompt Engineering:** Refine system prompts for nutrition philosophy
- [ ] **Token Budgeting:** Estimate monthly AI costs based on usage
- [ ] **Context Window Management:** How much history to include in each request
- [ ] **Fallback Handling:** What happens if Claude API is down?
- [ ] **Response Time Optimization:** Streaming vs. batch responses

### User Experience Questions
- [ ] **Onboarding Flow:** How to set up initial preferences, family profiles
- [ ] **Tutorial/Help:** In-app guidance for first-time users
- [ ] **Offline Mode:** What functionality works without internet?
- [ ] **Multi-Device Sync:** How to handle conflicts between devices
- [ ] **Notification Preferences:** Customizable timing, frequency

### Data & Privacy
- [ ] **Data Retention Policy:** How long to keep historical data
- [ ] **Export Functionality:** Can users download their data?
- [ ] **Account Deletion:** Clean data removal process
- [ ] **GDPR/Privacy Compliance:** Even though family-only, best practices

### Testing & Validation
- [ ] **Beta Testing:** Internal family testing period before broader use
- [ ] **Nutrition Validation:** Consult with nutritionist on AI outputs
- [ ] **Kid Safety:** Age-appropriate content, allergy warnings
- [ ] **Recipe Testing:** Validate generated recipes are actually good

### Business Considerations
- [ ] **Cost Structure:** Monthly AI + backend + hosting costs
- [ ] **Scalability:** If other families want to use it, what changes?
- [ ] **Maintenance:** Long-term support plan
- [ ] **Updates:** Cadence for new features, improvements

---

## Appendix

### Food Lists Reference

#### Top 15 Essential Foods
1. Broccoli sprouts
2. Turmeric
3. Blueberries
4. Broccoli
5. Flaxseed
6. Dark leafy greens
7. Garlic
8. Mushrooms (chaga)
9. Cacao
10. Tigernuts
11. Ginger root
12. Grapes (red preferred)
13. Tomatoes
14. Lemon
15. Quinoa

#### Secondary Good Foods
- Walnuts
- Wheatgrass
- Beets
- Green tea
- Cauliflower
- Berries (variety)
- Celery
- Olive oil
- Artichokes
- Onion
- Cabbage
- Brussels sprouts
- Carrots
- Kakadu plum

### Store Reference
- **Costco:** Bulk items, nuts, frozen berries
- **Walmart:** General groceries
- **Smart & Final:** Bulk/restaurant supply
- **WinCo:** Budget-friendly staples
- **Sprouts:** Specialty organic items, unique produce

### Notification Schedule
- **Saturday 10:00 AM:** Weekly questionnaire
- **Daily 9:00 AM:** Morning check-in
- **Daily 9:00 PM:** Evening prep reminder
- **Context-aware:** Mid-week ingredient reminders, prep alerts

---

**Document Status:** Living document - to be updated as project evolves
**Next Steps:**
1. Review and refine PRD
2. Finalize technical stack decisions
3. Create wireframes/mockups
4. Set up development environment
5. Begin MVP development

**Contact:** Project Owner (Family)
**Maintained By:** GoodLifeNels Team
