import { useState, useEffect, useCallback } from 'react';
import { IGKVData } from '../types/igkv';
import { igkvService } from '../services/igkvService';

export interface UseIGKVResult {
  data: IGKVData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  incrementVisitorCount: () => void;
}

export const useIGKV = (): UseIGKVResult => {
  const [data, setData] = useState<IGKVData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIGKVData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await igkvService.getIGKVData();
      setData(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch IGKV data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIGKVData();
  }, [fetchIGKVData]);

  const incrementVisitorCount = useCallback(() => {
    if (data) {
      setData({
        ...data,
        visitorCount: data.visitorCount + 1
      });
    }
  }, [data]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchIGKVData,
    incrementVisitorCount
  };
};
