import { useState, useEffect, useCallback } from 'react';
import { AdvisoryBulletin } from '../types/advisory';
import { advisoryService } from '../services/advisoryService';

export interface UseAdvisoryResult {
  bulletins: AdvisoryBulletin[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useAdvisory = (): UseAdvisoryResult => {
  const [bulletins, setBulletins] = useState<AdvisoryBulletin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBulletins = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await advisoryService.getBulletins();
      setBulletins(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bulletins.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBulletins();
  }, [fetchBulletins]);

  return {
    bulletins,
    isLoading,
    error,
    refetch: fetchBulletins
  };
};
