import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTodayWater, upsertWater } from '../services/waterService';

export const useWater = () => {
  const { user } = useAuth();
  const [amountMl, setAmountMl] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWater = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getTodayWater(user.id);
      setAmountMl(data?.glasses ?? 0);
    } catch (err) {
      console.error('useWater fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWater();
  }, [fetchWater]);

  const setWater = useCallback(async (newAmountMl) => {
    if (!user || newAmountMl < 0) return;
    setAmountMl(newAmountMl);
    try {
      await upsertWater(user.id, newAmountMl);
    } catch (err) {
      console.error('useWater upsert error:', err.message);
      fetchWater();
    }
  }, [user, fetchWater]);

  const addWater = useCallback((ml) => setWater(amountMl + ml), [amountMl, setWater]);
  const removeWater = useCallback((ml) => setWater(Math.max(0, amountMl - ml)), [amountMl, setWater]);

  return { amountMl, loading, addWater, removeWater, refetch: fetchWater };
};
