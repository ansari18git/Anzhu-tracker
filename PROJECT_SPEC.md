# 🍎 Calorie & Macro Tracker App - Project Specification

> **Last Updated:** April 25, 2026  
> **Project Type:** Weekend Mobile App (React Native)  
> **Purpose:** Simple, minimalist calorie, macro, water, and weight tracking app  
> **Inspiration:** MyFitnessPal UI (simplified and improved)

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Database Schema](#database-schema)
4. [App Architecture](#app-architecture)
5. [Feature Specifications](#feature-specifications)
6. [UI/UX Design](#uiux-design)
7. [Screen Specifications](#screen-specifications)
8. [Development Roadmap](#development-roadmap)
9. [Customization Notes](#customization-notes)

---

## 🎯 Project Overview

### Problem Statement
Existing calorie tracking apps (like HealthifyMe, MyFitnessPal) are:
- Not personalized enough
- Require premium subscriptions for basic features
- Too cluttered with unnecessary features
- Complex to use daily

### Solution
A **minimalist, free, personalized** calorie and macro tracker that:
- Tracks calories, macros (protein/carbs/fat), water, and weight
- Provides meal presets for quick logging
- Shows progress with clean visualizations
- Works offline with local caching
- Supports multiple users with secure authentication

### Target User
The developer (Ansari) and friends who want simple, effective health tracking without bloat.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React Native (Expo)
- **Language:** JavaScript/TypeScript (optional)
- **Navigation:** React Navigation v6
- **State Management:** React Context API (or Zustand if needed)
- **UI Library:** React Native Paper (Material Design)
- **Charts:** `react-native-chart-kit` or `victory-native`
- **Storage (Cache):** AsyncStorage (for offline support)

### Backend
- **BaaS:** Supabase
  - Built-in PostgreSQL database
  - Built-in Authentication (email/password)
  - Auto-generated REST APIs
  - Row-Level Security (RLS) for user data privacy
  - Real-time subscriptions (optional feature)

### Database
- **Type:** PostgreSQL (managed by Supabase)
- **ORM:** Supabase JS Client (no separate ORM needed)

### Authentication
- **System:** Supabase Auth
- **Methods:** Email/Password (simple)
- **Optional:** Google OAuth, Apple Sign-In (can add later)

### Deployment
- **Frontend:** Expo build (iOS/Android)
- **Backend:** Supabase (cloud-hosted, free tier)

---

## 🗄️ Database Schema

### Tables Overview

```
users (auto-created by Supabase Auth)
├── id (UUID, PK)
├── email
├── created_at
└── last_sign_in_at

profiles
├── id (UUID, PK, FK -> users.id)
├── daily_calorie_goal (integer)
├── daily_protein_goal (integer)
├── daily_carbs_goal (integer)
├── daily_fat_goal (integer)
├── daily_water_goal (integer, glasses)
├── target_weight (decimal, kg)
├── created_at
└── updated_at

food_logs
├── id (UUID, PK)
├── user_id (UUID, FK -> users.id)
├── meal_name (text)
├── meal_type (text: 'breakfast', 'lunch', 'dinner', 'snack')
├── calories (integer)
├── protein (decimal)
├── carbs (decimal)
├── fat (decimal)
├── logged_at (timestamp)
└── created_at

weight_logs
├── id (UUID, PK)
├── user_id (UUID, FK -> users.id)
├── weight (decimal, kg)
├── logged_at (timestamp)
└── created_at

water_logs
├── id (UUID, PK)
├── user_id (UUID, FK -> users.id)
├── glasses (integer)
├── logged_at (date)
└── created_at

meal_presets
├── id (UUID, PK)
├── user_id (UUID, FK -> users.id)
├── meal_name (text)
├── meal_type (text: 'breakfast', 'lunch', 'dinner', 'snack')  ← added: pre-fills dropdown on quick-add
├── calories (integer)
├── protein (decimal)
├── carbs (decimal)
├── fat (decimal)
├── created_at
└── updated_at
```

### SQL Schema (To run in Supabase)

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  daily_calorie_goal INTEGER DEFAULT 2000,
  daily_protein_goal INTEGER DEFAULT 150,
  daily_carbs_goal INTEGER DEFAULT 200,
  daily_fat_goal INTEGER DEFAULT 67,
  daily_water_goal INTEGER DEFAULT 8,
  target_weight DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Food logs table
CREATE TABLE food_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories INTEGER NOT NULL,
  protein DECIMAL(6,2) DEFAULT 0,
  carbs DECIMAL(6,2) DEFAULT 0,
  fat DECIMAL(6,2) DEFAULT 0,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weight logs table
CREATE TABLE weight_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  weight DECIMAL(5,2) NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Water logs table
CREATE TABLE water_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  glasses INTEGER NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, logged_at)
);

-- Meal presets table
-- meal_type added so quick-add can pre-fill the meal type dropdown
CREATE TABLE meal_presets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories INTEGER NOT NULL,
  protein DECIMAL(6,2) DEFAULT 0,
  carbs DECIMAL(6,2) DEFAULT 0,
  fat DECIMAL(6,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_presets ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own food logs" ON food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own food logs" ON food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food logs" ON food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food logs" ON food_logs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own weight logs" ON weight_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own weight logs" ON weight_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own weight logs" ON weight_logs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own water logs" ON water_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own water logs" ON water_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own water logs" ON water_logs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own meal presets" ON meal_presets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own meal presets" ON meal_presets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own meal presets" ON meal_presets FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own meal presets" ON meal_presets FOR DELETE USING (auth.uid() = user_id);
```

---

## 🏗️ App Architecture

### High-Level Architecture

```
┌─────────────────────────────────────┐
│   React Native App (Expo)          │
│                                     │
│   ┌─────────────────────────────┐  │
│   │  UI Layer (Screens)         │  │
│   │  - Auth, Home, Log, etc.    │  │
│   └──────────┬──────────────────┘  │
│              │                      │
│   ┌──────────▼──────────────────┐  │
│   │  State Management           │  │
│   │  - AuthContext              │  │
│   │  - DataContext (optional)   │  │
│   └──────────┬──────────────────┘  │
│              │                      │
│   ┌──────────▼──────────────────┐  │
│   │  Services Layer             │  │
│   │  - Supabase Client          │  │
│   │  - API Functions            │  │
│   │  - AsyncStorage (cache)     │  │
│   └──────────┬──────────────────┘  │
└──────────────┼──────────────────────┘
               │
               │ HTTPS / WebSocket
               │
┌──────────────▼──────────────────────┐
│         SUPABASE (Backend)          │
│  ┌─────────────────────────────┐   │
│  │  Authentication             │   │
│  │  - Email/Password           │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  PostgreSQL Database        │   │
│  │  - All tables defined above │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Auto REST APIs             │   │
│  │  - CRUD operations          │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │  Row Level Security         │   │
│  │  - User data isolation      │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### Project Folder Structure

```
calorie-tracker/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js
│   │   │   └── SignupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LogFoodScreen.js
│   │   ├── ProgressScreen.js
│   │   └── SettingsScreen.js
│   │
│   ├── components/
│   │   ├── CalorieRing.js          # Circular progress indicator
│   │   ├── MacroBar.js              # Protein/Carbs/Fat breakdown
│   │   ├── WaterTracker.js          # Water glasses UI
│   │   ├── WeightChart.js           # Line chart for weight
│   │   ├── MealCard.js              # Individual meal display
│   │   └── MealPresetButton.js      # Quick add preset meal
│   │
│   ├── navigation/
│   │   ├── AuthNavigator.js         # Login/Signup flow
│   │   └── AppNavigator.js          # Main app navigation
│   │
│   ├── context/
│   │   └── AuthContext.js           # User authentication state
│   │
│   ├── hooks/                       # Custom React hooks (keeps screens clean)
│   │   ├── useFood.js               # Food log queries and mutations
│   │   ├── useWater.js              # Water log queries and mutations
│   │   ├── useWeight.js             # Weight log queries and mutations
│   │   └── useProfile.js            # Profile queries and mutations
│   │
│   ├── services/
│   │   ├── supabase.js              # Supabase client initialization
│   │   ├── authService.js           # Login, signup, logout
│   │   ├── foodService.js           # CRUD for food logs
│   │   ├── weightService.js         # CRUD for weight logs
│   │   ├── waterService.js          # CRUD for water logs
│   │   ├── presetService.js         # CRUD for meal presets
│   │   └── profileService.js        # User profile management
│   │
│   ├── utils/
│   │   ├── calculations.js          # Macro calculations, percentages
│   │   ├── dateHelpers.js           # Date formatting utilities
│   │   └── constants.js             # App-wide constants
│   │
│   └── theme/
│       ├── colors.js                # Color palette
│       └── typography.js            # Font styles
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── App.js                            # Root component
├── app.config.js                     # Expo config (use instead of .env — see Environment Variables note)
├── app.json                          # Expo configuration
├── package.json
└── README.md
```

---

## ✨ Feature Specifications

### Core Features (MVP - Weekend Build)

#### 1. **User Authentication**
- Email/password signup
- Email/password login
- Logout
- Persist login session
- Password reset (optional - can add later)

#### 2. **Calorie Tracking**
- Log meals with:
  - Meal name
  - Meal type (Breakfast, Lunch, Dinner, Snack)
  - Calories
  - Protein, Carbs, Fat (macros)
- View daily calorie total
- See remaining calories for the day
- Edit/delete logged meals

#### 3. **Water Tracking**
- Log water intake (in glasses)
- Visual indicator (filled/empty glasses)
- Daily goal tracking
- Reset daily at midnight

#### 4. **Weight Tracking**
- Log weight entries
- View weight trend over time (line chart)
- Show weight change (delta from previous entry)
- Weekly/Monthly/All-time views

#### 5. **Meal Presets**
- Save frequently eaten meals
- Quick-add presets to daily log
- Edit/delete presets
- Show recent meals automatically

#### 6. **Progress Visualization**
- Weight trend chart (30-day default)
- Daily calorie average
- Macro split (pie chart or bar)
- Streak counter (consecutive logging days)

#### 7. **User Settings**
- Set daily goals:
  - Calorie goal
  - Protein goal
  - Carbs goal
  - Fat goal
  - Water goal (glasses)
  - Target weight
- Update profile
- Logout

### Optional Features (Can Add/Remove Later)

#### Phase 2 Enhancements:
- [ ] Photo logging (progress photos)
- [ ] Weekly reports (email/in-app)
- [ ] Dark mode
- [ ] Export data (CSV/JSON)
- [ ] Barcode scanner (food database API)
- [ ] Social features (share progress)
- [ ] Reminders/notifications
- [ ] Multi-language support
- [ ] Apple Health / Google Fit integration
- [ ] Fasting timer
- [ ] Exercise tracking

---

## 🎨 UI/UX Design

### Design Principles

1. **Minimalist First**
   - White space is your friend
   - Only essential elements on screen
   - No clutter

2. **Thumb-Friendly**
   - Big touch targets (min 44x44 points)
   - Bottom navigation for easy reach
   - Primary actions at thumb level

3. **Glanceable**
   - Important info visible at first glance
   - Clear visual hierarchy
   - Use color to draw attention

4. **Fast Input**
   - Minimize taps to log food/water
   - Smart defaults
   - Recent/preset shortcuts

5. **Consistent**
   - Same patterns across screens
   - Predictable navigation
   - Uniform spacing and typography

### Color Palette

```javascript
// colors.js
export const colors = {
  primary: '#4CAF50',      // Green - health, growth
  secondary: '#2196F3',    // Blue - calm, trust
  accent: '#FF9800',       // Orange - energy
  success: '#66BB6A',      // Light green
  warning: '#FFA726',      // Light orange
  error: '#EF5350',        // Red
  
  background: '#FFFFFF',
  surface: '#F5F5F5',
  
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  
  border: '#E0E0E0',
  divider: '#EEEEEE',
};
```

### Typography

```javascript
// typography.js
export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};
```

### Layout Grid

- **Spacing Scale:** 4px base unit
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px

- **Container Padding:** 16px (left/right)
- **Card Border Radius:** 12px
- **Button Border Radius:** 8px

---

## 📱 Screen Specifications

### 1. Login/Signup Screen

**Components:**
- App logo/name
- Email input field
- Password input field
- "Login" button
- "Don't have an account? Sign up" link

**Validation:**
- Email format check
- Password min 6 characters
- Error messages for failed auth

---

### 2. Home Screen (Dashboard)

**Layout:**

```
┌─────────────────────────────────────┐
│  Header: "Today - Apr 25"           │
├─────────────────────────────────────┤
│                                     │
│     [Circular Calorie Ring]         │
│       1,450 / 2,000 cal            │
│         550 remaining               │
│                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │
│  Carbs  │  Protein  │  Fat         │
│  45%    │   30%     │  25%         │
│                                     │
│  ──────────────────────────────    │
│  🍳 Breakfast           [+ Add]     │
│    • Oatmeal (250 cal)             │
│    • Banana (105 cal)              │
│                          355 cal    │
│                                     │
│  🥗 Lunch               [+ Add]     │
│    • Chicken Rice (450 cal)        │
│                          450 cal    │
│                                     │
│  🍽️ Dinner              [+ Add]     │
│    (Not logged yet)                │
│                                     │
│  🍿 Snacks              [+ Add]     │
│    • Protein Shake (200 cal)       │
│                          200 cal    │
│                                     │
│  ──────────────────────────────    │
│  💧 Water                           │
│  ●●●●●●○○  6 / 8 glasses           │
│  [Tap to add]                      │
│                                     │
│  ──────────────────────────────    │
│  ⚖️ Weight Today                    │
│  75.2 kg  (↓ 0.3 kg)               │
│  [Log Weight]                      │
│                                     │
└─────────────────────────────────────┘
  [🏠 Home] [📊 Progress] [⚙️ Settings]
```

**Features:**
- Circular progress ring shows calorie intake vs. goal
- Macro breakdown bar (visual percentage)
- Meals grouped by type (Breakfast/Lunch/Dinner/Snacks)
- Each meal card shows:
  - Meal name
  - Calorie count
  - Total for that meal type
- Quick add button for each meal type
- Water tracker (tap glasses to increment)
- Weight display with trend indicator
- Bottom tab navigation

**Actions:**
- Tap "+ Add" → Navigate to LogFoodScreen with meal type pre-selected
- Tap meal card → Edit/delete that meal
- Tap water glass → Increment water count
- Tap "Log Weight" → Modal to enter weight

---

### 3. Log Food Screen

**Layout:**

```
┌─────────────────────────────────────┐
│  ← Back        Log Meal             │
├─────────────────────────────────────┤
│                                     │
│  Meal Type                          │
│  [Breakfast ▼]                      │
│                                     │
│  Meal Name                          │
│  [________________]                 │
│                                     │
│  Calories (required)                │
│  [________] cal                     │
│                                     │
│  ──────────────────────────────    │
│  Macros (optional)                  │
│                                     │
│  Protein   [____] g                 │
│  Carbs     [____] g                 │
│  Fat       [____] g                 │
│                                     │
│  ☑️ Save as preset                  │
│                                     │
│  ──────────────────────────────    │
│  Recent Meals                       │
│                                     │
│  [Oatmeal - 250 cal] [Add]          │
│  [Chicken Rice - 450 cal] [Add]     │
│  [Protein Shake - 200 cal] [Add]    │
│                                     │
│  ──────────────────────────────    │
│  Your Presets                       │
│                                     │
│  [Morning Smoothie - 300 cal] [Add] │
│  [Lunch Bowl - 500 cal] [Add]       │
│                                     │
│                                     │
│         [Save Entry]                │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Meal type dropdown (Breakfast/Lunch/Dinner/Snack)
- Meal name text input
- Calorie input (required)
- Macro inputs (optional - protein/carbs/fat)
- Checkbox to save as preset
- Recent meals (last 10) - tap to auto-fill
- User's saved presets - tap to auto-fill (including meal type)
- Save button to log the meal

**Actions:**
- Tap recent meal → Auto-fill form
- Tap preset → Auto-fill form (including meal type from preset)
- Tap "Save as preset" → Saves to meal_presets table
- Tap "Save Entry" → Saves to food_logs table, navigate back to Home

---

### 4. Progress Screen

**Layout:**

```
┌─────────────────────────────────────┐
│  Progress                           │
├─────────────────────────────────────┤
│                                     │
│  📊 Weight Trend (30 Days)          │
│                                     │
│  [Line Chart]                       │
│  76 kg ┤                            │
│        │     ╱╲                     │
│  75 kg ┤    ╱  ╲  ╱                │
│        │   ╱    ╲╱                 │
│  74 kg ┤  ╱                         │
│        └─────────────────────       │
│         Apr 1      Apr 15    Apr 30│
│                                     │
│  Current: 75.2 kg                   │
│  Change: ↓ 0.8 kg (1.1%)            │
│  Goal: 70 kg (5.2 kg to go)         │
│                                     │
│  [7D] [30D] [90D] [All]             │
│                                     │
│  ──────────────────────────────    │
│  📈 Calorie Average (7 Days)        │
│                                     │
│  Average: 1,850 cal/day             │
│  Goal: 2,000 cal/day                │
│  Adherence: 92%                     │
│                                     │
│  ──────────────────────────────    │
│  🎯 Macro Split (This Week)         │
│                                     │
│      [Pie Chart]                    │
│   Protein: 30%                      │
│   Carbs: 45%                        │
│   Fat: 25%                          │
│                                     │
│  ──────────────────────────────    │
│  🔥 Streak                           │
│                                     │
│  12 days of consistent logging!     │
│  Keep it up! 💪                     │
│                                     │
└─────────────────────────────────────┘
  [🏠 Home] [📊 Progress] [⚙️ Settings]
```

**Features:**
- Weight trend line chart
  - Toggle between 7D/30D/90D/All time
  - Show data points on chart
  - Trend line (optional - moving average)
- Weight stats:
  - Current weight
  - Change from start (absolute + percentage)
  - Distance to goal
- Calorie average (past 7 days)
  - Average intake
  - Goal comparison
  - Adherence percentage
- Macro split pie chart (past 7 days average)
- Streak counter (consecutive days logged)

**Charts:**
- Use `react-native-chart-kit` or `victory-native`
- Clean, minimal design
- Touch to see data points

---

### 5. Settings Screen

**Layout:**

```
┌─────────────────────────────────────┐
│  Settings                           │
├─────────────────────────────────────┤
│                                     │
│  Daily Goals                        │
│  ──────────────────────────────    │
│                                     │
│  Calories                           │
│  [2000] cal/day                     │
│                                     │
│  Protein                            │
│  [150] g/day                        │
│                                     │
│  Carbs                              │
│  [200] g/day                        │
│                                     │
│  Fat                                │
│  [67] g/day                         │
│                                     │
│  Water                              │
│  [8] glasses/day                    │
│                                     │
│  ──────────────────────────────    │
│  Weight Goal                        │
│  ──────────────────────────────    │
│                                     │
│  Target Weight                      │
│  [70] kg                            │
│                                     │
│  ──────────────────────────────    │
│  Account                            │
│  ──────────────────────────────    │
│                                     │
│  Email: user@example.com            │
│                                     │
│  [Change Password]                  │
│  [Logout]                           │
│                                     │
│  ──────────────────────────────    │
│  About                              │
│  ──────────────────────────────    │
│                                     │
│  Version 1.0.0                      │
│  Made with ❤️                       │
│                                     │
└─────────────────────────────────────┘
  [🏠 Home] [📊 Progress] [⚙️ Settings]
```

**Features:**
- Editable daily goals (calories, macros, water)
- Target weight input
- Display user email
- Change password (optional)
- Logout button
- App version info

**Actions:**
- Modify any goal → Auto-saves to profiles table
- Tap "Logout" → Sign out and return to login screen

---

## 🚀 Development Roadmap

### Phase 1: Setup & Foundation (Saturday Morning - 2 hours)

**Tasks:**
1. Create Supabase project
2. Set up database schema (run SQL)
3. Enable RLS policies
4. Initialize Expo React Native project
5. Install dependencies
6. Configure Supabase client
7. Set up project folder structure

**Dependencies to install:**
```bash
npx create-expo-app calorie-tracker
cd calorie-tracker

npm install @supabase/supabase-js
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-paper
npm install react-native-chart-kit react-native-svg
npm install @react-native-async-storage/async-storage
npm install react-native-safe-area-context react-native-screens
```

---

### Phase 2: Authentication (Saturday Late Morning - 2 hours)

**Tasks:**
1. Build AuthContext
2. Create LoginScreen
3. Create SignupScreen
4. Implement login/signup/logout logic
5. Add session persistence
6. Test auth flow

**Deliverable:**
- Users can sign up, log in, and log out
- Session persists across app restarts

---

### Phase 3: Home Screen & Calorie Tracking (Saturday Afternoon - 3 hours)

**Tasks:**
1. Build HomeScreen layout
2. Create CalorieRing component
3. Create MacroBar component
4. Fetch today's food logs from Supabase
5. Display meals grouped by type
6. Calculate totals and remaining calories
7. Add pull-to-refresh

**Deliverable:**
- Home screen shows today's calorie intake
- Displays meals by type
- Shows macro breakdown

---

### Phase 4: Log Food Screen (Saturday Evening - 2 hours)

**Tasks:**
1. Build LogFoodScreen UI
2. Implement form inputs (meal name, calories, macros)
3. Add meal type dropdown
4. Save food log to Supabase
5. Show recent meals (fetch last 10)
6. Show user's presets
7. Implement "Save as preset" feature

**Deliverable:**
- Users can log meals with macros
- Recent meals and presets auto-fill the form
- Data saves to Supabase

---

### Phase 5: Water & Weight Tracking (Sunday Morning - 2 hours)

**Tasks:**
1. Build WaterTracker component
2. Add water logging (increment/decrement)
3. Save water logs to Supabase
4. Add "Log Weight" modal/screen
5. Save weight logs to Supabase
6. Display current weight on Home

**Deliverable:**
- Users can track water intake
- Users can log weight entries
- Data persists in Supabase

---

### Phase 6: Progress Screen (Sunday Afternoon - 3 hours)

**Tasks:**
1. Build ProgressScreen layout
2. Create WeightChart component (line chart)
3. Fetch weight logs and render chart
4. Calculate calorie averages (past 7 days)
5. Create macro split pie chart
6. Implement streak counter logic
7. Add time range toggles (7D/30D/90D)

**Deliverable:**
- Users see weight trend chart
- Calorie and macro analytics displayed
- Streak counter motivates users

---

### Phase 7: Settings Screen (Sunday Late Afternoon - 1.5 hours)

**Tasks:**
1. Build SettingsScreen layout
2. Fetch user profile from Supabase
3. Display current goals
4. Implement goal editing (input fields)
5. Save changes to profiles table
6. Add logout functionality

**Deliverable:**
- Users can edit daily goals
- Changes persist in Supabase
- Logout works correctly

---

### Phase 8: Polish & Testing (Sunday Evening - 1.5 hours)

**Tasks:**
1. Add loading states (spinners)
2. Add error handling (toast messages)
3. Improve UI spacing and colors
4. Test on iOS/Android (Expo Go)
5. Fix bugs
6. Add app icon and splash screen (optional)

**Deliverable:**
- App is polished and bug-free
- Works smoothly on both platforms
- Ready to use!

---

### Total Time Estimate: ~17 hours (Weekend Project)

**Saturday:** ~9 hours  
**Sunday:** ~8 hours

---

## 🔧 Customization Notes

### This Project is MODULAR and FLEXIBLE

All features are **customizable** based on your needs:

#### ✅ Easy to ADD:
- New meal types (e.g., "Pre-workout", "Post-workout")
- Additional macros (e.g., fiber, sugar, sodium)
- Exercise tracking
- Photo logging
- Dark mode
- Export data feature
- Notifications/reminders
- Barcode scanner (via API)

#### ✅ Easy to REMOVE:
- Water tracking (just hide the component)
- Macro tracking (remove macro fields, use calories only)
- Weight tracking (remove weight logs)
- Meal presets (remove the feature)
- Progress charts (simplify Progress screen)

#### ✅ Easy to ENHANCE:
- Add more chart types (bar charts, heatmaps)
- Improve macro calculations (auto-calculate from calories)
- Add meal recommendations
- Integrate with nutrition APIs (e.g., Nutritionix, Edamam)
- Add social features (share progress with friends)
- Multi-language support

#### ✅ Easy to REPLACE:
- Switch from Supabase to Firebase
- Replace React Native Paper with another UI library
- Use different chart library
- Change navigation structure
- Swap AsyncStorage for SecureStore

---

## 📝 Notes for Claude Code

### When you start development:

1. **Read this spec carefully** - all decisions are documented here
2. **Start with Phase 1** - set up Supabase and Expo project first
3. **Build incrementally** - complete one phase before moving to next
4. **Test frequently** - use Expo Go on your phone to test
5. **Ask for clarification** - if any requirement is unclear, ask the user

### Key Supabase Setup Steps:

1. Go to https://supabase.com
2. Create new project
3. Run the SQL schema (from Database Schema section)
4. Get your API keys:
   - Project URL
   - Anon public key
5. Add to `app.config.js` under `extra:` (see Environment Variables note below)

### Environment Variables

> ⚠️ Expo does not support `.env` files natively. Use `app.config.js` with the `extra` field instead.

**app.config.js:**
```javascript
export default {
  expo: {
    name: 'calorie-tracker',
    // ...other config
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};
```

**Access in code via:**
```javascript
import Constants from 'expo-constants';
const { supabaseUrl, supabaseAnonKey } = Constants.expoConfig.extra;
```

**Create a `.env` file (gitignored) for local development:**
```
SUPABASE_URL=your-project-url
SUPABASE_ANON_KEY=your-anon-key
```

### Testing Strategy:

- Use Expo Go app on your phone
- Test each feature as you build it
- Create a test user account
- Log sample data to verify database

---

## 🎯 Success Criteria

The project is complete when:

✅ Users can sign up and log in  
✅ Users can log meals with calories and macros  
✅ Users can track water intake  
✅ Users can log weight entries  
✅ Home screen displays today's data accurately  
✅ Progress screen shows weight trends and analytics  
✅ Settings allow users to customize goals  
✅ Data persists across sessions  
✅ App works on both iOS and Android  
✅ UI is clean, minimal, and easy to use  

---

## 📚 Resources

### Documentation Links:
- [Supabase Docs](https://supabase.com/docs)
- [Expo Docs](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [React Native Chart Kit](https://www.npmjs.com/package/react-native-chart-kit)

### Design Inspiration:
- MyFitnessPal (app)
- Calory (iOS app)
- Happy Scale (iOS app)
- Way of Life (habit tracker)

---

## 🏁 Final Notes

This spec is your **blueprint**. Everything discussed during the brainstorming session is captured here.

**Remember:**
- Start simple, iterate often
- Focus on core features first
- Test on real device frequently
- The app should solve YOUR problem
- Customization is easy - build the base first

**Happy coding! 🚀**

---

**Project Status:** Ready to Build  
**Next Step:** Set up Supabase project and initialize Expo app  
**Contact:** Ansari (Software Engineer)
