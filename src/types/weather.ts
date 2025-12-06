export interface HourlyWeather {
  time: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface DailyWeather {
  day: string;
  condition: string;
  icon: string;
  high: number;
  low: number;
  precipitation?: number;
}

export interface CityWeather {
  id: string;
  city: string;
  country: string;
  temperature: number;
  condition: string;
  high: number;
  low: number;
  localTime: string;
  icon: string;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  uvIndex: number;
  uvLabel: string;
  windSpeed: number;
  windDirection: string;
  windDegree: number;
  humidity: number;
  dewPoint: number;
  aqi: number;
  aqiLabel: string;
  sunrise: string;
  sunset: string;
  precipitation: number;
  precipitationForecast: string;
}

export type TimeOfDay = 'earlyMorning' | 'morning' | 'afternoon' | 'evening' | 'night';
