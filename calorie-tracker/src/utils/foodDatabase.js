/**
 * All nutrition values per 100g (or 100ml for liquids).
 * Fields: cal, p (protein), c (carbs), f (fat), fi (fiber)
 * weightPerPiece — average grams of 1 piece (for piece-based foods).
 */

export const foodDatabase = [
  // ─── Indian Breakfast ──────────────────────────────────────────
  { id: 1,   name: 'Idli',                     cal: 156, p: 6.8,  c: 31.0, f: 0.5,  fi: 0.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 25,  hint: '1 idli ≈ 25g' },
  { id: 2,   name: 'Dosa (Plain)',              cal: 89,  p: 3.5,  c: 17.0, f: 1.5,  fi: 0.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 150, hint: '1 dosa ≈ 150g' },
  { id: 3,   name: 'Masala Dosa',              cal: 105, p: 3.2,  c: 18.0, f: 3.5,  fi: 0.8,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 200, hint: '1 masala dosa ≈ 200g' },
  { id: 4,   name: 'Rava Dosa',                cal: 122, p: 3.0,  c: 22.0, f: 3.0,  fi: 0.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 120, hint: '1 rava dosa ≈ 120g' },
  { id: 5,   name: 'Upma',                     cal: 177, p: 4.0,  c: 29.0, f: 5.0,  fi: 1.2,  category: 'Indian Breakfast',  measures: ['grams'] },
  { id: 6,   name: 'Poha',                     cal: 158, p: 3.0,  c: 32.0, f: 2.0,  fi: 1.5,  category: 'Indian Breakfast',  measures: ['grams'] },
  { id: 7,   name: 'Plain Paratha',            cal: 371, p: 7.5,  c: 48.0, f: 14.0, fi: 2.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 80,  hint: '1 paratha ≈ 80g' },
  { id: 8,   name: 'Aloo Paratha',             cal: 340, p: 7.5,  c: 50.0, f: 12.0, fi: 2.8,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 100, hint: '1 aloo paratha ≈ 100g' },
  { id: 9,   name: 'Chapati / Roti',           cal: 300, p: 9.5,  c: 55.0, f: 4.6,  fi: 3.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 30,  hint: '1 roti ≈ 30g' },
  { id: 10,  name: 'Whole Wheat Roti',         cal: 343, p: 10.0, c: 57.0, f: 7.0,  fi: 4.2,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 35,  hint: '1 roti ≈ 35g' },
  { id: 11,  name: 'Puri',                     cal: 460, p: 6.5,  c: 52.0, f: 24.0, fi: 2.0,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 25,  hint: '1 puri ≈ 25g' },
  { id: 12,  name: 'Medu Vada',                cal: 243, p: 8.5,  c: 28.0, f: 11.5, fi: 2.5,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 40,  hint: '1 vada ≈ 40g' },
  { id: 13,  name: 'Uttapam',                  cal: 107, p: 3.5,  c: 18.0, f: 2.8,  fi: 0.8,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 100, hint: '1 uttapam ≈ 100g' },
  { id: 14,  name: 'Pesarattu',                cal: 180, p: 8.0,  c: 28.0, f: 4.0,  fi: 2.0,  category: 'Indian Breakfast',  measures: ['grams','pieces'], weightPerPiece: 60,  hint: '1 pesarattu ≈ 60g' },

  // ─── Oats & Cereals ────────────────────────────────────────────
  { id: 15,  name: 'Oats (Raw)',               cal: 389, p: 17.0, c: 66.0, f: 7.0,  fi: 10.6, category: 'Oats & Cereals',    measures: ['grams'] },
  { id: 16,  name: 'Oats (Cooked)',            cal: 68,  p: 2.4,  c: 12.0, f: 1.4,  fi: 1.7,  category: 'Oats & Cereals',    measures: ['grams'] },
  { id: 17,  name: 'Muesli',                   cal: 370, p: 10.0, c: 65.0, f: 7.0,  fi: 7.0,  category: 'Oats & Cereals',    measures: ['grams'] },
  { id: 18,  name: 'Cornflakes',               cal: 357, p: 7.5,  c: 79.0, f: 0.4,  fi: 3.0,  category: 'Oats & Cereals',    measures: ['grams'] },

  // ─── Rice & Grains ─────────────────────────────────────────────
  { id: 19,  name: 'White Rice (Raw)',         cal: 365, p: 7.5,  c: 80.0, f: 0.7,  fi: 0.4,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 20,  name: 'White Rice (Cooked)',      cal: 130, p: 2.7,  c: 28.0, f: 0.3,  fi: 0.4,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 21,  name: 'Brown Rice (Raw)',         cal: 370, p: 8.0,  c: 77.0, f: 2.9,  fi: 3.5,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 22,  name: 'Brown Rice (Cooked)',      cal: 123, p: 2.6,  c: 26.0, f: 1.0,  fi: 1.8,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 23,  name: 'Basmati Rice (Cooked)',    cal: 121, p: 2.7,  c: 25.0, f: 0.4,  fi: 0.4,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 24,  name: 'Wheat Flour (Atta)',       cal: 341, p: 12.0, c: 70.0, f: 1.7,  fi: 10.7, category: 'Rice & Grains',     measures: ['grams'] },
  { id: 25,  name: 'Semolina (Sooji)',         cal: 360, p: 12.0, c: 73.0, f: 1.0,  fi: 3.9,  category: 'Rice & Grains',     measures: ['grams'] },
  { id: 26,  name: 'Quinoa (Cooked)',          cal: 120, p: 4.4,  c: 22.0, f: 1.9,  fi: 2.8,  category: 'Rice & Grains',     measures: ['grams'] },

  // ─── Dal & Legumes ─────────────────────────────────────────────
  { id: 27,  name: 'Moong Dal (Cooked)',       cal: 105, p: 7.0,  c: 19.0, f: 0.4,  fi: 7.6,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 28,  name: 'Toor Dal (Cooked)',        cal: 116, p: 7.0,  c: 20.0, f: 0.4,  fi: 6.7,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 29,  name: 'Masoor Dal (Cooked)',      cal: 116, p: 9.0,  c: 20.0, f: 0.4,  fi: 7.9,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 30,  name: 'Chana Dal (Cooked)',       cal: 164, p: 9.0,  c: 27.0, f: 2.7,  fi: 8.0,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 31,  name: 'Urad Dal (Cooked)',        cal: 105, p: 7.5,  c: 18.0, f: 0.5,  fi: 6.7,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 32,  name: 'Rajma (Cooked)',           cal: 127, p: 8.7,  c: 22.0, f: 0.5,  fi: 6.4,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 33,  name: 'Chickpeas / Chana (Cooked)', cal: 164, p: 8.9, c: 27.0, f: 2.6, fi: 7.6,  category: 'Dal & Legumes',    measures: ['grams'] },
  { id: 34,  name: 'Moong Sprouts (Raw)',      cal: 30,  p: 3.0,  c: 5.9,  f: 0.2,  fi: 1.8,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 35,  name: 'Green Peas (Raw)',         cal: 81,  p: 5.4,  c: 14.0, f: 0.4,  fi: 5.1,  category: 'Dal & Legumes',     measures: ['grams'] },
  { id: 36,  name: 'Black Eyed Peas (Cooked)', cal: 116, p: 8.0,  c: 21.0, f: 0.5,  fi: 6.5,  category: 'Dal & Legumes',    measures: ['grams'] },

  // ─── Vegetables ────────────────────────────────────────────────
  { id: 37,  name: 'Spinach (Raw)',            cal: 23,  p: 2.9,  c: 3.6,  f: 0.4,  fi: 2.2,  category: 'Vegetables',        measures: ['grams'] },
  { id: 38,  name: 'Broccoli (Raw)',           cal: 34,  p: 2.8,  c: 6.6,  f: 0.4,  fi: 2.6,  category: 'Vegetables',        measures: ['grams'] },
  { id: 39,  name: 'Cauliflower (Raw)',        cal: 25,  p: 1.9,  c: 5.0,  f: 0.3,  fi: 2.0,  category: 'Vegetables',        measures: ['grams'] },
  { id: 40,  name: 'Carrot (Raw)',             cal: 41,  p: 0.9,  c: 10.0, f: 0.2,  fi: 2.8,  category: 'Vegetables',        measures: ['grams'] },
  { id: 41,  name: 'Tomato (Raw)',             cal: 18,  p: 0.9,  c: 3.9,  f: 0.2,  fi: 1.2,  category: 'Vegetables',        measures: ['grams'] },
  { id: 42,  name: 'Onion (Raw)',              cal: 40,  p: 1.1,  c: 9.3,  f: 0.1,  fi: 1.7,  category: 'Vegetables',        measures: ['grams'] },
  { id: 43,  name: 'Potato (Raw)',             cal: 77,  p: 2.0,  c: 17.0, f: 0.1,  fi: 2.2,  category: 'Vegetables',        measures: ['grams'] },
  { id: 44,  name: 'Potato (Boiled)',          cal: 87,  p: 1.9,  c: 20.0, f: 0.1,  fi: 1.8,  category: 'Vegetables',        measures: ['grams'] },
  { id: 45,  name: 'Sweet Potato (Boiled)',    cal: 90,  p: 2.0,  c: 21.0, f: 0.1,  fi: 3.0,  category: 'Vegetables',        measures: ['grams'] },
  { id: 46,  name: 'Cucumber (Raw)',           cal: 16,  p: 0.7,  c: 3.6,  f: 0.1,  fi: 0.5,  category: 'Vegetables',        measures: ['grams'] },
  { id: 47,  name: 'Capsicum / Bell Pepper',  cal: 31,  p: 1.0,  c: 6.0,  f: 0.3,  fi: 1.7,  category: 'Vegetables',        measures: ['grams'] },
  { id: 48,  name: 'French Beans (Raw)',       cal: 31,  p: 1.8,  c: 7.0,  f: 0.1,  fi: 3.4,  category: 'Vegetables',        measures: ['grams'] },
  { id: 49,  name: 'Bottle Gourd / Lauki',    cal: 15,  p: 0.6,  c: 3.4,  f: 0.1,  fi: 0.5,  category: 'Vegetables',        measures: ['grams'] },
  { id: 50,  name: 'Bitter Gourd / Karela',   cal: 17,  p: 1.0,  c: 3.7,  f: 0.2,  fi: 2.8,  category: 'Vegetables',        measures: ['grams'] },
  { id: 51,  name: 'Pumpkin (Raw)',            cal: 26,  p: 1.0,  c: 6.5,  f: 0.1,  fi: 0.5,  category: 'Vegetables',        measures: ['grams'] },
  { id: 52,  name: 'Mushroom (Raw)',           cal: 22,  p: 3.1,  c: 3.3,  f: 0.3,  fi: 1.0,  category: 'Vegetables',        measures: ['grams'] },
  { id: 53,  name: 'Cabbage (Raw)',            cal: 25,  p: 1.3,  c: 5.8,  f: 0.1,  fi: 2.5,  category: 'Vegetables',        measures: ['grams'] },
  { id: 54,  name: 'Beetroot (Raw)',           cal: 43,  p: 1.6,  c: 10.0, f: 0.2,  fi: 2.8,  category: 'Vegetables',        measures: ['grams'] },
  { id: 55,  name: 'Ladies Finger / Okra',    cal: 33,  p: 2.0,  c: 7.5,  f: 0.2,  fi: 3.2,  category: 'Vegetables',        measures: ['grams'] },
  { id: 56,  name: 'Ridge Gourd / Turai',     cal: 18,  p: 0.8,  c: 3.7,  f: 0.1,  fi: 0.5,  category: 'Vegetables',        measures: ['grams'] },

  // ─── Chicken ───────────────────────────────────────────────────
  { id: 57,  name: 'Chicken Breast (Raw)',     cal: 120, p: 22.5, c: 0.0,  f: 2.6,  fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 58,  name: 'Chicken Breast (Boiled)',  cal: 150, p: 30.0, c: 0.0,  f: 3.2,  fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 59,  name: 'Chicken Breast (Grilled)', cal: 165, p: 31.0, c: 0.0,  f: 3.6,  fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 60,  name: 'Chicken Thigh (Raw)',      cal: 177, p: 18.0, c: 0.0,  f: 11.0, fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 61,  name: 'Chicken Thigh (Boiled)',   cal: 195, p: 22.0, c: 0.0,  f: 11.5, fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 62,  name: 'Chicken Leg (Raw)',        cal: 161, p: 17.0, c: 0.0,  f: 10.0, fi: 0.0,  category: 'Chicken',           measures: ['grams'] },
  { id: 63,  name: 'Whole Chicken (Raw)',      cal: 167, p: 18.3, c: 0.0,  f: 9.7,  fi: 0.0,  category: 'Chicken',           measures: ['grams'] },

  // ─── Eggs ──────────────────────────────────────────────────────
  { id: 64,  name: 'Whole Egg (Raw)',          cal: 155, p: 13.0, c: 1.1,  f: 11.0, fi: 0.0,  category: 'Eggs',              measures: ['grams','pieces'], weightPerPiece: 60,  hint: '1 egg ≈ 60g' },
  { id: 65,  name: 'Whole Egg (Boiled)',       cal: 155, p: 13.0, c: 1.6,  f: 11.0, fi: 0.0,  category: 'Eggs',              measures: ['grams','pieces'], weightPerPiece: 60,  hint: '1 boiled egg ≈ 60g' },
  { id: 66,  name: 'Whole Egg (Scrambled)',    cal: 149, p: 10.0, c: 1.6,  f: 11.5, fi: 0.0,  category: 'Eggs',              measures: ['grams','pieces'], weightPerPiece: 75,  hint: '1 scrambled egg ≈ 75g' },
  { id: 67,  name: 'Egg White (Raw)',          cal: 52,  p: 11.0, c: 0.7,  f: 0.2,  fi: 0.0,  category: 'Eggs',              measures: ['grams','pieces'], weightPerPiece: 33,  hint: '1 egg white ≈ 33g' },
  { id: 68,  name: 'Egg Yolk',                cal: 322, p: 16.0, c: 3.6,  f: 27.0, fi: 0.0,  category: 'Eggs',              measures: ['grams','pieces'], weightPerPiece: 17,  hint: '1 yolk ≈ 17g' },

  // ─── Fish & Seafood ────────────────────────────────────────────
  { id: 69,  name: 'Rohu Fish (Raw)',          cal: 97,  p: 16.6, c: 0.0,  f: 2.7,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 70,  name: 'Pomfret (Raw)',            cal: 104, p: 19.0, c: 0.0,  f: 2.9,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 71,  name: 'Tuna (Canned in Water)',  cal: 128, p: 29.0, c: 0.0,  f: 0.5,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 72,  name: 'Salmon (Raw)',             cal: 208, p: 20.0, c: 0.0,  f: 13.0, fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 73,  name: 'Surmai / King Fish (Raw)', cal: 109, p: 21.0, c: 0.0,  f: 2.4,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 74,  name: 'Prawns / Shrimp (Raw)',   cal: 99,  p: 18.9, c: 0.0,  f: 1.5,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 75,  name: 'Catla Fish (Raw)',         cal: 96,  p: 17.5, c: 0.0,  f: 2.4,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },
  { id: 76,  name: 'Tilapia (Raw)',            cal: 96,  p: 20.0, c: 0.0,  f: 1.7,  fi: 0.0,  category: 'Fish & Seafood',    measures: ['grams'] },

  // ─── Dairy ─────────────────────────────────────────────────────
  { id: 77,  name: 'Milk (Full Fat)',          cal: 61,  p: 3.2,  c: 4.8,  f: 3.3,  fi: 0.0,  category: 'Dairy',             measures: ['ml','grams'] },
  { id: 78,  name: 'Milk (Skimmed)',           cal: 35,  p: 3.4,  c: 5.0,  f: 0.1,  fi: 0.0,  category: 'Dairy',             measures: ['ml','grams'] },
  { id: 79,  name: 'Curd / Yogurt (Full Fat)', cal: 98,  p: 3.5,  c: 4.7,  f: 7.4,  fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 80,  name: 'Curd / Yogurt (Low Fat)',  cal: 63,  p: 5.0,  c: 7.0,  f: 1.5,  fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 81,  name: 'Greek Yogurt',             cal: 59,  p: 10.0, c: 3.6,  f: 0.4,  fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 82,  name: 'Paneer (Full Fat)',         cal: 265, p: 18.3, c: 1.2,  f: 20.8, fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 83,  name: 'Paneer (Low Fat)',          cal: 160, p: 17.0, c: 2.0,  f: 9.0,  fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 84,  name: 'Ghee',                     cal: 900, p: 0.0,  c: 0.0,  f: 99.0, fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 85,  name: 'Butter',                   cal: 717, p: 0.9,  c: 0.1,  f: 81.0, fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 86,  name: 'Cheese (Processed)',        cal: 300, p: 20.0, c: 2.0,  f: 24.0, fi: 0.0,  category: 'Dairy',             measures: ['grams'] },
  { id: 87,  name: 'Whey Protein (1 scoop)',    cal: 400, p: 80.0, c: 10.0, f: 6.7,  fi: 0.0,  category: 'Dairy',             measures: ['grams'], hint: '1 scoop ≈ 30g' },

  // ─── Fruits ────────────────────────────────────────────────────
  { id: 88,  name: 'Banana',                   cal: 89,  p: 1.1,  c: 23.0, f: 0.3,  fi: 2.6,  category: 'Fruits',            measures: ['grams','pieces'], weightPerPiece: 100, hint: '1 medium banana ≈ 100g' },
  { id: 89,  name: 'Apple',                    cal: 52,  p: 0.3,  c: 14.0, f: 0.2,  fi: 2.4,  category: 'Fruits',            measures: ['grams','pieces'], weightPerPiece: 150, hint: '1 medium apple ≈ 150g' },
  { id: 90,  name: 'Mango',                    cal: 60,  p: 0.8,  c: 15.0, f: 0.4,  fi: 1.6,  category: 'Fruits',            measures: ['grams'] },
  { id: 91,  name: 'Orange',                   cal: 47,  p: 0.9,  c: 12.0, f: 0.1,  fi: 2.4,  category: 'Fruits',            measures: ['grams','pieces'], weightPerPiece: 130, hint: '1 orange ≈ 130g' },
  { id: 92,  name: 'Papaya',                   cal: 43,  p: 0.5,  c: 11.0, f: 0.3,  fi: 1.7,  category: 'Fruits',            measures: ['grams'] },
  { id: 93,  name: 'Watermelon',               cal: 30,  p: 0.6,  c: 7.6,  f: 0.2,  fi: 0.4,  category: 'Fruits',            measures: ['grams'] },
  { id: 94,  name: 'Grapes',                   cal: 69,  p: 0.7,  c: 18.0, f: 0.2,  fi: 0.9,  category: 'Fruits',            measures: ['grams'] },
  { id: 95,  name: 'Pomegranate',              cal: 83,  p: 1.7,  c: 19.0, f: 1.2,  fi: 4.0,  category: 'Fruits',            measures: ['grams'] },
  { id: 96,  name: 'Guava',                    cal: 68,  p: 2.6,  c: 14.0, f: 1.0,  fi: 5.4,  category: 'Fruits',            measures: ['grams'] },
  { id: 97,  name: 'Pineapple',                cal: 50,  p: 0.5,  c: 13.0, f: 0.1,  fi: 1.4,  category: 'Fruits',            measures: ['grams'] },
  { id: 98,  name: 'Strawberry',               cal: 32,  p: 0.7,  c: 7.7,  f: 0.3,  fi: 2.0,  category: 'Fruits',            measures: ['grams'] },

  // ─── Nuts & Seeds ──────────────────────────────────────────────
  { id: 99,  name: 'Almonds',                  cal: 579, p: 21.0, c: 22.0, f: 50.0, fi: 12.5, category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 100, name: 'Walnuts',                  cal: 654, p: 15.0, c: 14.0, f: 65.0, fi: 6.7,  category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 101, name: 'Cashews',                  cal: 553, p: 18.0, c: 30.0, f: 44.0, fi: 3.3,  category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 102, name: 'Peanuts (Raw)',             cal: 567, p: 26.0, c: 16.0, f: 49.0, fi: 8.5,  category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 103, name: 'Chia Seeds',               cal: 486, p: 17.0, c: 42.0, f: 31.0, fi: 34.4, category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 104, name: 'Flaxseeds',                cal: 534, p: 18.0, c: 29.0, f: 42.0, fi: 27.3, category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 105, name: 'Sunflower Seeds',          cal: 584, p: 21.0, c: 20.0, f: 51.0, fi: 8.6,  category: 'Nuts & Seeds',      measures: ['grams'] },
  { id: 106, name: 'Pumpkin Seeds',            cal: 559, p: 30.0, c: 11.0, f: 49.0, fi: 6.0,  category: 'Nuts & Seeds',      measures: ['grams'] },

  // ─── Indian Dishes ─────────────────────────────────────────────
  { id: 107, name: 'Dal Tadka',                cal: 130, p: 7.0,  c: 18.0, f: 4.0,  fi: 3.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 108, name: 'Dal Fry',                  cal: 140, p: 7.5,  c: 19.0, f: 4.5,  fi: 3.8,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 109, name: 'Sambar',                   cal: 50,  p: 2.5,  c: 8.0,  f: 1.0,  fi: 2.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 110, name: 'Palak Paneer',             cal: 166, p: 8.0,  c: 6.0,  f: 12.0, fi: 1.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 111, name: 'Chicken Curry',            cal: 150, p: 15.0, c: 5.0,  f: 8.0,  fi: 0.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 112, name: 'Butter Chicken',           cal: 165, p: 14.0, c: 7.0,  f: 9.0,  fi: 0.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 113, name: 'Chicken Tikka Masala',     cal: 150, p: 14.0, c: 7.0,  f: 7.0,  fi: 0.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 114, name: 'Rajma Masala',             cal: 140, p: 8.0,  c: 22.0, f: 3.0,  fi: 5.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 115, name: 'Chole / Chana Masala',     cal: 160, p: 9.0,  c: 27.0, f: 3.0,  fi: 6.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 116, name: 'Biryani (Chicken)',         cal: 200, p: 10.0, c: 28.0, f: 5.0,  fi: 1.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 117, name: 'Biryani (Veg)',            cal: 170, p: 4.0,  c: 32.0, f: 4.0,  fi: 2.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 118, name: 'Khichdi',                  cal: 130, p: 5.0,  c: 22.0, f: 3.0,  fi: 2.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 119, name: 'Rasam',                    cal: 30,  p: 1.0,  c: 5.5,  f: 0.5,  fi: 0.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 120, name: 'Fish Curry',               cal: 120, p: 15.0, c: 4.0,  f: 5.0,  fi: 0.3,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 121, name: 'Egg Curry',                cal: 130, p: 9.0,  c: 5.0,  f: 9.0,  fi: 0.3,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 122, name: 'Mutton Curry',             cal: 180, p: 16.0, c: 4.0,  f: 11.0, fi: 0.3,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 123, name: 'Mixed Veg Curry',          cal: 80,  p: 2.5,  c: 10.0, f: 3.5,  fi: 2.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 124, name: 'Aloo Sabzi',               cal: 120, p: 2.0,  c: 20.0, f: 4.5,  fi: 1.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 125, name: 'Baingan Bharta',           cal: 70,  p: 2.0,  c: 8.0,  f: 3.5,  fi: 2.5,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 126, name: 'Coconut Chutney',          cal: 200, p: 2.5,  c: 8.0,  f: 18.0, fi: 2.0,  category: 'Indian Dishes',     measures: ['grams'] },
  { id: 127, name: 'Pav Bhaji',                cal: 200, p: 5.0,  c: 35.0, f: 7.0,  fi: 3.0,  category: 'Indian Dishes',     measures: ['grams'] },

  // ─── Meat ──────────────────────────────────────────────────────
  { id: 128, name: 'Mutton / Lamb (Raw)',       cal: 258, p: 16.0, c: 0.0,  f: 21.0, fi: 0.0,  category: 'Meat',              measures: ['grams'] },
  { id: 129, name: 'Mutton (Cooked)',           cal: 294, p: 20.0, c: 0.0,  f: 23.0, fi: 0.0,  category: 'Meat',              measures: ['grams'] },
  { id: 130, name: 'Beef (Lean, Raw)',          cal: 143, p: 21.0, c: 0.0,  f: 6.0,  fi: 0.0,  category: 'Meat',              measures: ['grams'] },
  { id: 131, name: 'Pork (Lean, Raw)',          cal: 143, p: 21.0, c: 0.0,  f: 6.3,  fi: 0.0,  category: 'Meat',              measures: ['grams'] },

  // ─── Bread & Snacks ────────────────────────────────────────────
  { id: 132, name: 'White Bread',              cal: 265, p: 9.0,  c: 51.0, f: 3.2,  fi: 2.7,  category: 'Bread & Snacks',    measures: ['grams','pieces'], weightPerPiece: 25, hint: '1 slice ≈ 25g' },
  { id: 133, name: 'Brown Bread',              cal: 247, p: 10.0, c: 45.0, f: 3.5,  fi: 6.0,  category: 'Bread & Snacks',    measures: ['grams','pieces'], weightPerPiece: 25, hint: '1 slice ≈ 25g' },
  { id: 134, name: 'Peanut Butter',            cal: 588, p: 25.0, c: 20.0, f: 50.0, fi: 6.0,  category: 'Bread & Snacks',    measures: ['grams'] },
  { id: 135, name: 'Protein Bar',              cal: 333, p: 33.0, c: 37.0, f: 12.0, fi: 3.0,  category: 'Bread & Snacks',    measures: ['grams','pieces'], weightPerPiece: 60, hint: '1 bar ≈ 60g' },

  // ─── Oils & Fats ───────────────────────────────────────────────
  { id: 136, name: 'Olive Oil',                cal: 884, p: 0.0,  c: 0.0,  f: 100.0, fi: 0.0, category: 'Oils',              measures: ['grams'] },
  { id: 137, name: 'Coconut Oil',              cal: 892, p: 0.0,  c: 0.0,  f: 100.0, fi: 0.0, category: 'Oils',              measures: ['grams'] },
  { id: 138, name: 'Sunflower Oil',            cal: 884, p: 0.0,  c: 0.0,  f: 100.0, fi: 0.0, category: 'Oils',              measures: ['grams'] },
  { id: 139, name: 'Mustard Oil',              cal: 884, p: 0.0,  c: 0.0,  f: 100.0, fi: 0.0, category: 'Oils',              measures: ['grams'] },
];

export const searchFoods = (query) => {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  return foodDatabase.filter((f) => f.name.toLowerCase().includes(q)).slice(0, 8);
};

export const calcNutrition = (food, quantity, measure = 'grams') => {
  if (!food || !quantity || quantity <= 0) return null;
  let grams = quantity;
  if (measure === 'pieces' && food.weightPerPiece) grams = quantity * food.weightPerPiece;
  const r = grams / 100;
  return {
    calories: Math.round(food.cal * r),
    protein:  Math.round(food.p   * r * 10) / 10,
    carbs:    Math.round(food.c   * r * 10) / 10,
    fat:      Math.round(food.f   * r * 10) / 10,
    fiber:    Math.round(food.fi  * r * 10) / 10,
    grams:    Math.round(grams),
  };
};

export const getQuickPresets = (measure) => {
  if (measure === 'pieces') return [1, 2, 3, 4];
  if (measure === 'ml') return [100, 150, 200, 250];
  return [50, 100, 150, 200];
};
