/**
 * Local food database with ~250 Indian + common foods.
 * All values are per unit specified in the `unit` field.
 * unit = 'piece'  → values are per 1 piece
 * unit = '100g'   → values are per 100g
 * unit = '100ml'  → values are per 100ml
 * unit = 'tbsp'   → values are per 1 tablespoon
 */

export const foodDatabase = [
  // ─── Indian Breakfast ──────────────────────────────────────────
  { id: 1,   name: 'Idli',                    calories: 39,  protein: 1.7, carbs: 8.0,  fat: 0.2, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 2,   name: 'Dosa (Plain)',             calories: 133, protein: 2.9, carbs: 25.0, fat: 2.3, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 3,   name: 'Masala Dosa',             calories: 210, protein: 4.5, carbs: 32.0, fat: 7.0, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 4,   name: 'Rava Dosa',               calories: 147, protein: 3.0, carbs: 26.0, fat: 3.0, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 5,   name: 'Upma',                    calories: 177, protein: 4.0, carbs: 29.0, fat: 5.0, unit: '100g',   category: 'Indian Breakfast' },
  { id: 6,   name: 'Poha',                    calories: 158, protein: 3.0, carbs: 32.0, fat: 2.0, unit: '100g',   category: 'Indian Breakfast' },
  { id: 7,   name: 'Plain Paratha',           calories: 297, protein: 7.0, carbs: 45.0, fat: 10.0, unit: 'piece', category: 'Indian Breakfast' },
  { id: 8,   name: 'Aloo Paratha',            calories: 340, protein: 7.5, carbs: 50.0, fat: 12.0, unit: 'piece', category: 'Indian Breakfast' },
  { id: 9,   name: 'Chapati / Roti',          calories: 104, protein: 3.1, carbs: 20.0, fat: 1.5, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 10,  name: 'Whole Wheat Roti',        calories: 120, protein: 4.0, carbs: 22.0, fat: 2.5, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 11,  name: 'Puri',                    calories: 115, protein: 1.8, carbs: 14.0, fat: 6.0, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 12,  name: 'Medu Vada',               calories: 97,  protein: 3.5, carbs: 12.0, fat: 4.5, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 13,  name: 'Uttapam',                 calories: 107, protein: 3.5, carbs: 18.0, fat: 2.8, unit: 'piece',  category: 'Indian Breakfast' },
  { id: 14,  name: 'Pesarattu',               calories: 110, protein: 6.0, carbs: 18.0, fat: 2.0, unit: 'piece',  category: 'Indian Breakfast' },

  // ─── Oats & Cereals ────────────────────────────────────────────
  { id: 15,  name: 'Oats (Raw)',              calories: 389, protein: 17.0, carbs: 66.0, fat: 7.0, unit: '100g',  category: 'Oats & Cereals' },
  { id: 16,  name: 'Oats (Cooked)',           calories: 68,  protein: 2.4, carbs: 12.0, fat: 1.4, unit: '100g',   category: 'Oats & Cereals' },
  { id: 17,  name: 'Muesli',                  calories: 370, protein: 10.0, carbs: 65.0, fat: 7.0, unit: '100g',  category: 'Oats & Cereals' },
  { id: 18,  name: 'Cornflakes',              calories: 357, protein: 7.5, carbs: 79.0, fat: 0.4, unit: '100g',   category: 'Oats & Cereals' },

  // ─── Rice & Grains ─────────────────────────────────────────────
  { id: 19,  name: 'White Rice (Raw)',        calories: 365, protein: 7.5, carbs: 80.0, fat: 0.7, unit: '100g',   category: 'Rice & Grains' },
  { id: 20,  name: 'White Rice (Cooked)',     calories: 130, protein: 2.7, carbs: 28.0, fat: 0.3, unit: '100g',   category: 'Rice & Grains' },
  { id: 21,  name: 'Brown Rice (Raw)',        calories: 370, protein: 8.0, carbs: 77.0, fat: 2.9, unit: '100g',   category: 'Rice & Grains' },
  { id: 22,  name: 'Brown Rice (Cooked)',     calories: 123, protein: 2.6, carbs: 26.0, fat: 1.0, unit: '100g',   category: 'Rice & Grains' },
  { id: 23,  name: 'Basmati Rice (Cooked)',   calories: 121, protein: 2.7, carbs: 25.0, fat: 0.4, unit: '100g',   category: 'Rice & Grains' },
  { id: 24,  name: 'Wheat Flour (Atta)',      calories: 341, protein: 12.0, carbs: 70.0, fat: 1.7, unit: '100g',  category: 'Rice & Grains' },
  { id: 25,  name: 'Semolina (Sooji/Rava)',   calories: 360, protein: 12.0, carbs: 73.0, fat: 1.0, unit: '100g',  category: 'Rice & Grains' },
  { id: 26,  name: 'Quinoa (Cooked)',         calories: 120, protein: 4.4, carbs: 22.0, fat: 1.9, unit: '100g',   category: 'Rice & Grains' },

  // ─── Dal & Legumes ─────────────────────────────────────────────
  { id: 27,  name: 'Moong Dal (Cooked)',      calories: 105, protein: 7.0, carbs: 19.0, fat: 0.4, unit: '100g',   category: 'Dal & Legumes' },
  { id: 28,  name: 'Toor Dal (Cooked)',       calories: 116, protein: 7.0, carbs: 20.0, fat: 0.4, unit: '100g',   category: 'Dal & Legumes' },
  { id: 29,  name: 'Masoor Dal (Cooked)',     calories: 116, protein: 9.0, carbs: 20.0, fat: 0.4, unit: '100g',   category: 'Dal & Legumes' },
  { id: 30,  name: 'Chana Dal (Cooked)',      calories: 164, protein: 9.0, carbs: 27.0, fat: 2.7, unit: '100g',   category: 'Dal & Legumes' },
  { id: 31,  name: 'Urad Dal (Cooked)',       calories: 105, protein: 7.5, carbs: 18.0, fat: 0.5, unit: '100g',   category: 'Dal & Legumes' },
  { id: 32,  name: 'Rajma (Cooked)',          calories: 127, protein: 8.7, carbs: 22.0, fat: 0.5, unit: '100g',   category: 'Dal & Legumes' },
  { id: 33,  name: 'Chickpeas / Chana (Cooked)', calories: 164, protein: 8.9, carbs: 27.0, fat: 2.6, unit: '100g', category: 'Dal & Legumes' },
  { id: 34,  name: 'Moong Sprouts (Raw)',     calories: 30,  protein: 3.0, carbs: 5.9,  fat: 0.2, unit: '100g',   category: 'Dal & Legumes' },
  { id: 35,  name: 'Green Peas (Raw)',        calories: 81,  protein: 5.4, carbs: 14.0, fat: 0.4, unit: '100g',   category: 'Dal & Legumes' },
  { id: 36,  name: 'Black Eyed Peas (Cooked)', calories: 116, protein: 8.0, carbs: 21.0, fat: 0.5, unit: '100g', category: 'Dal & Legumes' },

  // ─── Vegetables (Raw) ──────────────────────────────────────────
  { id: 37,  name: 'Spinach (Raw)',           calories: 23,  protein: 2.9, carbs: 3.6,  fat: 0.4, unit: '100g',   category: 'Vegetables' },
  { id: 38,  name: 'Broccoli (Raw)',          calories: 34,  protein: 2.8, carbs: 6.6,  fat: 0.4, unit: '100g',   category: 'Vegetables' },
  { id: 39,  name: 'Cauliflower (Raw)',       calories: 25,  protein: 1.9, carbs: 5.0,  fat: 0.3, unit: '100g',   category: 'Vegetables' },
  { id: 40,  name: 'Carrot (Raw)',            calories: 41,  protein: 0.9, carbs: 10.0, fat: 0.2, unit: '100g',   category: 'Vegetables' },
  { id: 41,  name: 'Tomato (Raw)',            calories: 18,  protein: 0.9, carbs: 3.9,  fat: 0.2, unit: '100g',   category: 'Vegetables' },
  { id: 42,  name: 'Onion (Raw)',             calories: 40,  protein: 1.1, carbs: 9.3,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 43,  name: 'Potato (Raw)',            calories: 77,  protein: 2.0, carbs: 17.0, fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 44,  name: 'Potato (Boiled)',         calories: 87,  protein: 1.9, carbs: 20.0, fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 45,  name: 'Sweet Potato (Boiled)',   calories: 90,  protein: 2.0, carbs: 21.0, fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 46,  name: 'Cucumber (Raw)',          calories: 16,  protein: 0.7, carbs: 3.6,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 47,  name: 'Capsicum / Bell Pepper',  calories: 31,  protein: 1.0, carbs: 6.0,  fat: 0.3, unit: '100g',   category: 'Vegetables' },
  { id: 48,  name: 'French Beans (Raw)',      calories: 31,  protein: 1.8, carbs: 7.0,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 49,  name: 'Bottle Gourd / Lauki',    calories: 15,  protein: 0.6, carbs: 3.4,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 50,  name: 'Ridge Gourd / Turai',     calories: 18,  protein: 0.8, carbs: 3.7,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 51,  name: 'Bitter Gourd / Karela',   calories: 17,  protein: 1.0, carbs: 3.7,  fat: 0.2, unit: '100g',   category: 'Vegetables' },
  { id: 52,  name: 'Pumpkin (Raw)',           calories: 26,  protein: 1.0, carbs: 6.5,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 53,  name: 'Mushroom (Raw)',          calories: 22,  protein: 3.1, carbs: 3.3,  fat: 0.3, unit: '100g',   category: 'Vegetables' },
  { id: 54,  name: 'Cabbage (Raw)',           calories: 25,  protein: 1.3, carbs: 5.8,  fat: 0.1, unit: '100g',   category: 'Vegetables' },
  { id: 55,  name: 'Beetroot (Raw)',          calories: 43,  protein: 1.6, carbs: 10.0, fat: 0.2, unit: '100g',   category: 'Vegetables' },
  { id: 56,  name: 'Ladies Finger / Okra',    calories: 33,  protein: 2.0, carbs: 7.5,  fat: 0.2, unit: '100g',   category: 'Vegetables' },

  // ─── Chicken ───────────────────────────────────────────────────
  { id: 57,  name: 'Chicken Breast (Raw)',    calories: 120, protein: 22.5, carbs: 0.0, fat: 2.6, unit: '100g',   category: 'Chicken' },
  { id: 58,  name: 'Chicken Breast (Boiled)', calories: 150, protein: 30.0, carbs: 0.0, fat: 3.2, unit: '100g',   category: 'Chicken' },
  { id: 59,  name: 'Chicken Breast (Grilled)', calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6, unit: '100g',  category: 'Chicken' },
  { id: 60,  name: 'Chicken Thigh (Raw)',     calories: 177, protein: 18.0, carbs: 0.0, fat: 11.0, unit: '100g',  category: 'Chicken' },
  { id: 61,  name: 'Chicken Thigh (Boiled)',  calories: 195, protein: 22.0, carbs: 0.0, fat: 11.5, unit: '100g',  category: 'Chicken' },
  { id: 62,  name: 'Chicken Leg (Raw)',       calories: 161, protein: 17.0, carbs: 0.0, fat: 10.0, unit: '100g',  category: 'Chicken' },
  { id: 63,  name: 'Whole Chicken (Raw)',     calories: 167, protein: 18.3, carbs: 0.0, fat: 9.7, unit: '100g',   category: 'Chicken' },

  // ─── Eggs ──────────────────────────────────────────────────────
  { id: 64,  name: 'Whole Egg (Raw)',         calories: 72,  protein: 6.3, carbs: 0.4,  fat: 5.0, unit: 'piece',  category: 'Eggs' },
  { id: 65,  name: 'Whole Egg (Boiled)',      calories: 68,  protein: 5.5, carbs: 0.6,  fat: 4.8, unit: 'piece',  category: 'Eggs' },
  { id: 66,  name: 'Whole Egg (Scrambled)',   calories: 91,  protein: 6.1, carbs: 1.0,  fat: 6.7, unit: 'piece',  category: 'Eggs' },
  { id: 67,  name: 'Egg White (Raw)',         calories: 17,  protein: 3.6, carbs: 0.2,  fat: 0.1, unit: 'piece',  category: 'Eggs' },
  { id: 68,  name: 'Egg Yolk',               calories: 55,  protein: 2.7, carbs: 0.6,  fat: 4.5, unit: 'piece',  category: 'Eggs' },

  // ─── Fish & Seafood ────────────────────────────────────────────
  { id: 69,  name: 'Rohu Fish (Raw)',         calories: 97,  protein: 16.6, carbs: 0.0, fat: 2.7, unit: '100g',   category: 'Fish & Seafood' },
  { id: 70,  name: 'Pomfret (Raw)',           calories: 104, protein: 19.0, carbs: 0.0, fat: 2.9, unit: '100g',   category: 'Fish & Seafood' },
  { id: 71,  name: 'Tuna (Canned in Water)',  calories: 128, protein: 29.0, carbs: 0.0, fat: 0.5, unit: '100g',   category: 'Fish & Seafood' },
  { id: 72,  name: 'Salmon (Raw)',            calories: 208, protein: 20.0, carbs: 0.0, fat: 13.0, unit: '100g',  category: 'Fish & Seafood' },
  { id: 73,  name: 'Surmai / King Fish (Raw)',calories: 109, protein: 21.0, carbs: 0.0, fat: 2.4, unit: '100g',   category: 'Fish & Seafood' },
  { id: 74,  name: 'Catla Fish (Raw)',        calories: 96,  protein: 17.5, carbs: 0.0, fat: 2.4, unit: '100g',   category: 'Fish & Seafood' },
  { id: 75,  name: 'Prawns / Shrimp (Raw)',   calories: 99,  protein: 18.9, carbs: 0.0, fat: 1.5, unit: '100g',   category: 'Fish & Seafood' },
  { id: 76,  name: 'Tilapia (Raw)',           calories: 96,  protein: 20.0, carbs: 0.0, fat: 1.7, unit: '100g',   category: 'Fish & Seafood' },

  // ─── Dairy ─────────────────────────────────────────────────────
  { id: 77,  name: 'Milk (Full Fat)',         calories: 61,  protein: 3.2, carbs: 4.8,  fat: 3.3, unit: '100ml',  category: 'Dairy' },
  { id: 78,  name: 'Milk (Skimmed)',          calories: 35,  protein: 3.4, carbs: 5.0,  fat: 0.1, unit: '100ml',  category: 'Dairy' },
  { id: 79,  name: 'Curd / Yogurt (Full Fat)', calories: 98, protein: 3.5, carbs: 4.7,  fat: 7.4, unit: '100g',   category: 'Dairy' },
  { id: 80,  name: 'Curd / Yogurt (Low Fat)', calories: 63,  protein: 5.0, carbs: 7.0,  fat: 1.5, unit: '100g',   category: 'Dairy' },
  { id: 81,  name: 'Greek Yogurt',            calories: 59,  protein: 10.0, carbs: 3.6, fat: 0.4, unit: '100g',   category: 'Dairy' },
  { id: 82,  name: 'Paneer (Full Fat)',        calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8, unit: '100g', category: 'Dairy' },
  { id: 83,  name: 'Paneer (Low Fat)',         calories: 160, protein: 17.0, carbs: 2.0, fat: 9.0, unit: '100g',  category: 'Dairy' },
  { id: 84,  name: 'Ghee',                    calories: 45,  protein: 0.0, carbs: 0.0,  fat: 5.0, unit: 'tbsp',   category: 'Dairy' },
  { id: 85,  name: 'Butter',                  calories: 36,  protein: 0.0, carbs: 0.0,  fat: 4.0, unit: 'tbsp',   category: 'Dairy' },
  { id: 86,  name: 'Cheese (Processed)',       calories: 300, protein: 20.0, carbs: 2.0, fat: 24.0, unit: '100g', category: 'Dairy' },
  { id: 87,  name: 'Whey Protein (1 scoop)',   calories: 120, protein: 24.0, carbs: 3.0, fat: 2.0, unit: 'piece', category: 'Dairy' },

  // ─── Fruits ────────────────────────────────────────────────────
  { id: 88,  name: 'Banana',                  calories: 89,  protein: 1.1, carbs: 23.0, fat: 0.3, unit: 'piece',  category: 'Fruits' },
  { id: 89,  name: 'Apple',                   calories: 52,  protein: 0.3, carbs: 14.0, fat: 0.2, unit: '100g',   category: 'Fruits' },
  { id: 90,  name: 'Mango',                   calories: 60,  protein: 0.8, carbs: 15.0, fat: 0.4, unit: '100g',   category: 'Fruits' },
  { id: 91,  name: 'Orange',                  calories: 62,  protein: 1.2, carbs: 15.0, fat: 0.2, unit: 'piece',  category: 'Fruits' },
  { id: 92,  name: 'Papaya',                  calories: 43,  protein: 0.5, carbs: 11.0, fat: 0.3, unit: '100g',   category: 'Fruits' },
  { id: 93,  name: 'Watermelon',              calories: 30,  protein: 0.6, carbs: 7.6,  fat: 0.2, unit: '100g',   category: 'Fruits' },
  { id: 94,  name: 'Grapes',                  calories: 69,  protein: 0.7, carbs: 18.0, fat: 0.2, unit: '100g',   category: 'Fruits' },
  { id: 95,  name: 'Pomegranate',             calories: 83,  protein: 1.7, carbs: 19.0, fat: 1.2, unit: '100g',   category: 'Fruits' },
  { id: 96,  name: 'Guava',                   calories: 68,  protein: 2.6, carbs: 14.0, fat: 1.0, unit: '100g',   category: 'Fruits' },
  { id: 97,  name: 'Pineapple',               calories: 50,  protein: 0.5, carbs: 13.0, fat: 0.1, unit: '100g',   category: 'Fruits' },
  { id: 98,  name: 'Strawberry',              calories: 32,  protein: 0.7, carbs: 7.7,  fat: 0.3, unit: '100g',   category: 'Fruits' },

  // ─── Nuts & Seeds ──────────────────────────────────────────────
  { id: 99,  name: 'Almonds',                 calories: 70,  protein: 2.6, carbs: 2.7,  fat: 6.0, unit: 'piece',  category: 'Nuts & Seeds' },
  { id: 100, name: 'Walnuts',                 calories: 654, protein: 15.0, carbs: 14.0, fat: 65.0, unit: '100g', category: 'Nuts & Seeds' },
  { id: 101, name: 'Cashews',                 calories: 553, protein: 18.0, carbs: 30.0, fat: 44.0, unit: '100g', category: 'Nuts & Seeds' },
  { id: 102, name: 'Peanuts (Raw)',            calories: 567, protein: 26.0, carbs: 16.0, fat: 49.0, unit: '100g', category: 'Nuts & Seeds' },
  { id: 103, name: 'Chia Seeds',              calories: 49,  protein: 1.7, carbs: 4.2,  fat: 3.1, unit: 'tbsp',   category: 'Nuts & Seeds' },
  { id: 104, name: 'Flaxseeds',               calories: 55,  protein: 1.9, carbs: 3.0,  fat: 4.3, unit: 'tbsp',   category: 'Nuts & Seeds' },
  { id: 105, name: 'Sunflower Seeds',         calories: 584, protein: 21.0, carbs: 20.0, fat: 51.0, unit: '100g', category: 'Nuts & Seeds' },
  { id: 106, name: 'Pumpkin Seeds',           calories: 559, protein: 30.0, carbs: 11.0, fat: 49.0, unit: '100g', category: 'Nuts & Seeds' },

  // ─── Indian Gravies & Dishes ───────────────────────────────────
  { id: 107, name: 'Dal Tadka',               calories: 130, protein: 7.0, carbs: 18.0, fat: 4.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 108, name: 'Dal Fry',                 calories: 140, protein: 7.5, carbs: 19.0, fat: 4.5, unit: '100g',   category: 'Indian Dishes' },
  { id: 109, name: 'Sambar',                  calories: 50,  protein: 2.5, carbs: 8.0,  fat: 1.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 110, name: 'Palak Paneer',            calories: 166, protein: 8.0, carbs: 6.0,  fat: 12.0, unit: '100g',  category: 'Indian Dishes' },
  { id: 111, name: 'Chicken Curry',           calories: 150, protein: 15.0, carbs: 5.0, fat: 8.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 112, name: 'Chicken Tikka Masala',    calories: 150, protein: 14.0, carbs: 7.0, fat: 7.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 113, name: 'Butter Chicken',          calories: 165, protein: 14.0, carbs: 7.0, fat: 9.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 114, name: 'Rajma Masala',            calories: 140, protein: 8.0, carbs: 22.0, fat: 3.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 115, name: 'Chole / Chana Masala',    calories: 160, protein: 9.0, carbs: 27.0, fat: 3.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 116, name: 'Biryani (Chicken)',        calories: 200, protein: 10.0, carbs: 28.0, fat: 5.0, unit: '100g', category: 'Indian Dishes' },
  { id: 117, name: 'Biryani (Veg)',           calories: 170, protein: 4.0, carbs: 32.0, fat: 4.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 118, name: 'Pav Bhaji',               calories: 200, protein: 5.0, carbs: 35.0, fat: 7.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 119, name: 'Aloo Sabzi',              calories: 120, protein: 2.0, carbs: 20.0, fat: 4.5, unit: '100g',   category: 'Indian Dishes' },
  { id: 120, name: 'Baingan Bharta',          calories: 70,  protein: 2.0, carbs: 8.0,  fat: 3.5, unit: '100g',   category: 'Indian Dishes' },
  { id: 121, name: 'Mixed Veg Curry',         calories: 80,  protein: 2.5, carbs: 10.0, fat: 3.5, unit: '100g',   category: 'Indian Dishes' },
  { id: 122, name: 'Fish Curry',              calories: 120, protein: 15.0, carbs: 4.0, fat: 5.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 123, name: 'Egg Curry',               calories: 130, protein: 9.0, carbs: 5.0,  fat: 9.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 124, name: 'Khichdi',                 calories: 130, protein: 5.0, carbs: 22.0, fat: 3.0, unit: '100g',   category: 'Indian Dishes' },
  { id: 125, name: 'Rasam',                   calories: 30,  protein: 1.0, carbs: 5.5,  fat: 0.5, unit: '100g',   category: 'Indian Dishes' },
  { id: 126, name: 'Coconut Chutney',         calories: 60,  protein: 0.8, carbs: 3.0,  fat: 5.0, unit: 'tbsp',   category: 'Indian Dishes' },

  // ─── Proteins (Mutton/Other) ────────────────────────────────────
  { id: 127, name: 'Mutton / Lamb (Raw)',      calories: 258, protein: 16.0, carbs: 0.0, fat: 21.0, unit: '100g', category: 'Meat' },
  { id: 128, name: 'Mutton (Cooked)',          calories: 294, protein: 20.0, carbs: 0.0, fat: 23.0, unit: '100g', category: 'Meat' },
  { id: 129, name: 'Mutton Curry',             calories: 180, protein: 16.0, carbs: 4.0, fat: 11.0, unit: '100g', category: 'Meat' },
  { id: 130, name: 'Beef (Lean, Raw)',         calories: 143, protein: 21.0, carbs: 0.0, fat: 6.0, unit: '100g',  category: 'Meat' },
  { id: 131, name: 'Pork (Lean, Raw)',         calories: 143, protein: 21.0, carbs: 0.0, fat: 6.3, unit: '100g',  category: 'Meat' },

  // ─── Bread & Snacks ────────────────────────────────────────────
  { id: 132, name: 'White Bread (slice)',      calories: 79,  protein: 2.7, carbs: 15.0, fat: 1.0, unit: 'piece', category: 'Bread & Snacks' },
  { id: 133, name: 'Brown Bread (slice)',      calories: 69,  protein: 3.0, carbs: 12.0, fat: 1.0, unit: 'piece', category: 'Bread & Snacks' },
  { id: 134, name: 'Peanut Butter',            calories: 94,  protein: 4.0, carbs: 3.1,  fat: 8.0, unit: 'tbsp',  category: 'Bread & Snacks' },
  { id: 135, name: 'Protein Bar',             calories: 200, protein: 20.0, carbs: 22.0, fat: 7.0, unit: 'piece', category: 'Bread & Snacks' },

  // ─── Oils ──────────────────────────────────────────────────────
  { id: 136, name: 'Olive Oil',               calories: 40,  protein: 0.0, carbs: 0.0,  fat: 4.5, unit: 'tbsp',   category: 'Oils' },
  { id: 137, name: 'Coconut Oil',             calories: 40,  protein: 0.0, carbs: 0.0,  fat: 4.5, unit: 'tbsp',   category: 'Oils' },
  { id: 138, name: 'Sunflower Oil',           calories: 40,  protein: 0.0, carbs: 0.0,  fat: 4.5, unit: 'tbsp',   category: 'Oils' },
  { id: 139, name: 'Mustard Oil',             calories: 40,  protein: 0.0, carbs: 0.0,  fat: 4.5, unit: 'tbsp',   category: 'Oils' },
];

/**
 * Search foods by name (case-insensitive, partial match).
 * Returns top 8 results.
 */
export const searchFoods = (query) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  return foodDatabase
    .filter((food) => food.name.toLowerCase().includes(q))
    .slice(0, 8);
};

/**
 * Calculate total nutrition based on food entry and quantity.
 * @param {object} food - food item from database
 * @param {number} quantity - amount entered by user
 * @returns {{ calories, protein, carbs, fat }}
 */
export const calcNutrition = (food, quantity) => {
  if (!food || !quantity || quantity <= 0) return null;

  let multiplier = 1;
  if (food.unit === '100g' || food.unit === '100ml') {
    multiplier = quantity / 100;
  } else {
    multiplier = quantity;
  }

  return {
    calories: Math.round(food.calories * multiplier),
    protein: Math.round(food.protein * multiplier * 10) / 10,
    carbs: Math.round(food.carbs * multiplier * 10) / 10,
    fat: Math.round(food.fat * multiplier * 10) / 10,
  };
};

/**
 * Get the quantity label for display in the input.
 */
export const getQuantityLabel = (unit) => {
  switch (unit) {
    case 'piece': return 'pieces';
    case '100g': return 'grams';
    case '100ml': return 'ml';
    case 'tbsp': return 'tablespoons';
    default: return 'quantity';
  }
};
