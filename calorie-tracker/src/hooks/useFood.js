import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getTodayLogs,
  getRecentMeals,
  addFoodLog,
  deleteFoodLog,
} from '../services/foodService';
import { getPresets, addPreset, deletePreset } from '../services/presetService';

export const useFood = () => {
  const { user } = useAuth();
  const [todayLogs, setTodayLogs] = useState([]);
  const [recentMeals, setRecentMeals] = useState([]);
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [logs, recent, savedPresets] = await Promise.all([
        getTodayLogs(user.id),
        getRecentMeals(user.id),
        getPresets(user.id),
      ]);
      setTodayLogs(logs);
      setRecentMeals(recent);
      setPresets(savedPresets);
    } catch (err) {
      console.error('useFood fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addLog = useCallback(async (logData, saveAsPreset = false) => {
    if (!user) return;
    const newLog = await addFoodLog(user.id, logData);
    setTodayLogs((prev) => [...prev, newLog]);

    if (saveAsPreset) {
      const newPreset = await addPreset(user.id, logData);
      setPresets((prev) => [...prev, newPreset]);
    }

    setRecentMeals((prev) => {
      const filtered = prev.filter((m) => m.meal_name !== logData.meal_name);
      return [logData, ...filtered].slice(0, 10);
    });

    return newLog;
  }, [user]);

  const removeLog = useCallback(async (id) => {
    await deleteFoodLog(id);
    setTodayLogs((prev) => prev.filter((log) => log.id !== id));
  }, []);

  const savePreset = useCallback(async (presetData) => {
    if (!user) return;
    const newPreset = await addPreset(user.id, presetData);
    setPresets((prev) => [...prev, newPreset]);
    return newPreset;
  }, [user]);

  const removePreset = useCallback(async (id) => {
    await deletePreset(id);
    setPresets((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return {
    todayLogs,
    recentMeals,
    presets,
    loading,
    addLog,
    removeLog,
    savePreset,
    removePreset,
    refetch: fetchAll,
  };
};
