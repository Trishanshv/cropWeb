export interface WeatherSummary {
  location: string;
  date: string;
  temperature: number; // e.g. 45.12
  skyCondition: string; // e.g. "CLEAR SKY"
}

export interface WeatherDetails {
  registeredAddress: string;
  date: string;
  temperature: number; // current temp, e.g. 35.6
  maxTemperature: number; // max temp, e.g. 35.6
  minTemperature: number; // min temp, e.g. 28.0
  rainfall: number; // e.g. 5.4 mm
  humidity: string; // e.g. "69 / 41" (Max/Min)
  windSpeed: number; // e.g. 4.7
  windDirection: string; // e.g. "N"
}

export interface WeatherData {
  summary: WeatherSummary;
  details: WeatherDetails;
}
