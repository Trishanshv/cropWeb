import { WeatherData } from '../types/weather';

/**
 * Weather Service client supporting custom inputs and coordinates
 * for future integration of HTML5 Geolocation (navigator.geolocation).
 */
export const weatherService = {
  getWeatherData: async (coords?: { latitude: number; longitude: number }): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Dynamic address / weather depending on coords if provided
    let location = 'DURG, IN';
    let address = 'Chhattisgarh Plains / Durg / Durg';
    let currentTemp = 45.12;
    let maxTemp = 35.6; // In screenshot 2, max temp is 35.6 and current display in header is 45.12
    let sky = 'CLEAR SKY';

    if (coords) {
      // Mock different weather stats depending on GPS coordinates
      location = `LAT:${coords.latitude.toFixed(2)}, LON:${coords.longitude.toFixed(2)}`;
      address = `GPS Location Coordinates (Lat: ${coords.latitude.toFixed(4)}, Lon: ${coords.longitude.toFixed(4)})`;
      currentTemp = 32.4;
      maxTemp = 34.0;
      sky = 'PARTLY CLOUDY';
    }

    return {
      summary: {
        location,
        date: '26-05-2026',
        temperature: currentTemp,
        skyCondition: sky
      },
      details: {
        registeredAddress: address,
        date: '26-05-2026',
        temperature: maxTemp, // 35.6 max
        maxTemperature: maxTemp,
        minTemperature: 28.0,
        rainfall: 5.4,
        humidity: '69/ 41', // Matches layout hum/idit/y
        windSpeed: 4.7,
        windDirection: 'N'
      }
    };
  }
};
