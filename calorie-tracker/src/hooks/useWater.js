import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodayWater, upsertWater } from '../services/waterService';

export const useWater = () => {
  const { user } = useAuth();
  const [glasses, setGlasses] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWater = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getTodayWater(user.id);
      setGlasses(data?.glasses ?? 0);
    } catch (err) {
      console.error('useWater fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWater();
  }, [fetchWater]);

  const setWater = useCallback(async (newCount) => {
    if (!user || newCount < 0) return;
    setGlasses(newCount);
    try {
      await upsertWater(user.id, newCount);
    } catch (err) {
      console.error('useWater upsert error:', err.message);
      fetchWater();
    }
  }, [user, fetchWater]);

  const addGlass = useCallback(() => setWater(glasses + 1), [glasses, setWater]);
  const removeGlass = useCallback(() => setWater(Math.max(0, glasses - 1)), [glasses, setWater]);

  return { glasses, loading, addGlass, removeGlass, refetch: fetchWater };
};
