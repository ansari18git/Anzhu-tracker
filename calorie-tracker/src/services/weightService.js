import { supabase } from './supabase';

export const getLatestWeight = async (userId) => {
  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', userId)
    .order('logged_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getWeightLogs = async (userId, days = 30) => {
  const from = new Date();
  from.setDate(from.getDate() - days);

  const { data, error } = await supabase
    .from('weight_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('logged_at', from.toISOString())
    .order('logged_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const addWeightLog = async (userId, weight) => {
  const { data, error } = await supabase
    .from('weight_logs')
    .insert({ user_id: userId, weight })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteWeightLog = async (id) => {
  const { error } = await supabase
    .from('weight_logs')
    .delete()
    .eq('id', id);
  if (error) throw error;
};
