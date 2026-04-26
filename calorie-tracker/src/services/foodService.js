import { supabase } from './supabase';

export const getTodayLogs = async (userId) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from('food_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('logged_at', todayStart.toISOString())
    .lte('logged_at', todayEnd.toISOString())
    .order('logged_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const getRecentMeals = async (userId) => {
  const { data, error } = await supabase
    .from('food_logs')
    .select('meal_name, meal_type, calories, protein, carbs, fat, fiber')
    .eq('user_id', userId)
    .order('logged_at', { ascending: false })
    .limit(30);
  if (error) throw error;

  const seen = new Set();
  return data.filter(({ meal_name }) => {
    if (seen.has(meal_name)) return false;
    seen.add(meal_name);
    return true;
  }).slice(0, 10);
};

export const addFoodLog = async (userId, log) => {
  const { data, error } = await supabase
    .from('food_logs')
    .insert({
      user_id: userId,
      meal_name: log.meal_name,
      meal_type: log.meal_type,
      calories: log.calories,
      protein: log.protein || 0,
      carbs:   log.carbs   || 0,
      fat:     log.fat     || 0,
      fiber:   log.fiber   || 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateFoodLog = async (id, updates) => {
  const { data, error } = await supabase
    .from('food_logs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteFoodLog = async (id) => {
  const { error } = await supabase
    .from('food_logs')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const getLogsForDateRange = async (userId, startDate, endDate) => {
  const { data, error } = await supabase
    .from('food_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('logged_at', startDate)
    .lte('logged_at', endDate)
    .order('logged_at', { ascending: true });
  if (error) throw error;
  return data;
};
