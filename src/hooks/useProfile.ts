import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types/profile';
import { profileService } from '../services/profileService';

export interface UseProfileResult {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateProfileInfo: (updatedInfo: Partial<UserProfile['userInfo']>) => Promise<boolean>;
}

export const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await profileService.getProfile();
      setProfile(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfileInfo = useCallback(async (updatedInfo: Partial<UserProfile['userInfo']>) => {
    if (!profile) return false;
    try {
      const success = await profileService.updateProfile(updatedInfo);
      if (success) {
        setProfile({
          ...profile,
          userInfo: {
            ...profile.userInfo,
            ...updatedInfo
          }
        });
        return true;
      }
      return false;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update profile.');
      return false;
    }
  }, [profile]);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfileInfo
  };
};
