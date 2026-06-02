import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { weatherService } from '../services/weatherService';

export interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  refetch: (coords?: { latitude: number; longitude: number }) => Promise<void>;
  requestBrowserLocation: () => void;
}

export const useWeather = (initialCoords?: { latitude: number; longitude: number }): UseWeatherResult => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (coords?: { latitude: number; longitude: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await weatherService.getWeatherData(coords);
      setData(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(initialCoords);
  }, [fetchWeather, initialCoords]);

  // Support future GPS location retrieval
  const requestBrowserLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather({ latitude, longitude });
      },
      (err) => {
        setError(`Geolocation error: ${err.message}. Loading default weather data.`);
        fetchWeather(); // fallback
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [fetchWeather]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchWeather,
    requestBrowserLocation
  };
};
