import { supabase } from './supabase';
import { getTodayString } from '../utils/dateHelpers';

export const getTodayWater = async (userId) => {
  const { data, error } = await supabase
    .from('water_logs')
    .select('*')
    .eq('user_id', userId)
    .eq('logged_at', getTodayString())
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

// glasses column repurposed to store ml amount
export const upsertWater = async (userId, amountMl) => {
  const { data, error } = await supabase
    .from('water_logs')
    .upsert(
      { user_id: userId, glasses: Math.max(0, amountMl), logged_at: getTodayString() },
      { onConflict: 'user_id,logged_at' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
};
