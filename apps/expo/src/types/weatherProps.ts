export interface WeatherProps {
  city?: string;
  temperatureUnit?: string;
  currentWeather?: {
    temperature: number;
    description: string;
    rainChance: number;
    windSpeedMph: number;
    windDirection: string;
  };
  hourlyForecast?: {
    time: string;
    temperature: number;
  }[];
}
