import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getWeightLogs,
  getLatestWeight,
  addWeightLog,
  deleteWeightLog,
} from '../services/weightService';

export const useWeight = (days = 30) => {
  const { user } = useAuth();
  const [weightLogs, setWeightLogs] = useState([]);
  const [latestWeight, setLatestWeight] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeight = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [logs, latest] = await Promise.all([
        getWeightLogs(user.id, days),
        getLatestWeight(user.id),
      ]);
      setWeightLogs(logs);
      setLatestWeight(latest);
    } catch (err) {
      console.error('useWeight fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user, days]);

  useEffect(() => {
    fetchWeight();
  }, [fetchWeight]);

  const logWeight = useCallback(async (weight) => {
    if (!user) return;
    try {
      const newLog = await addWeightLog(user.id, weight);
      setWeightLogs((prev) => [...prev, newLog]);
      setLatestWeight(newLog);
      return newLog;
    } catch (err) {
      console.error('useWeight log error:', err.message);
      throw err;
    }
  }, [user]);

  const removeWeightLog = useCallback(async (id) => {
    await deleteWeightLog(id);
    setWeightLogs((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { weightLogs, latestWeight, loading, logWeight, removeWeightLog, refetch: fetchWeight };
};
