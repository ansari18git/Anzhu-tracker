import { supabase } from './supabase';

export const getPresets = async (userId) => {
  const { data, error } = await supabase
    .from('meal_presets')
    .select('*')
    .eq('user_id', userId)
    .order('meal_name', { ascending: true });
  if (error) throw error;
  return data;
};

export const addPreset = async (userId, preset) => {
  const { data, error } = await supabase
    .from('meal_presets')
    .insert({
      user_id: userId,
      meal_name: preset.meal_name,
      meal_type: preset.meal_type || null,
      calories: preset.calories,
      protein: preset.protein || 0,
      carbs: preset.carbs || 0,
      fat: preset.fat || 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deletePreset = async (id) => {
  const { error } = await supabase
    .from('meal_presets')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
