import { useEffect, useState, useCallback } from 'react';
import { getProfile, upsertProfile, createDefaultProfile } from '../services/profileService';
import { useAuth } from '../context/AuthContext';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      let data = await getProfile(user.id);
      if (!data) {
        data = await createDefaultProfile(user.id);
      }
      setProfile(data);
    } catch (err) {
      console.error('useProfile fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (updates) => {
    if (!user) return;
    try {
      const updated = await upsertProfile(user.id, updates);
      setProfile(updated);
    } catch (err) {
      console.error('useProfile update error:', err.message);
      throw err;
    }
  }, [user]);

  return { profile, loading, updateProfile, refetch: fetchProfile };
};
