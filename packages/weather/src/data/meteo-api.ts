import z from "zod";

import type { WeatherDataSchema } from "../data";
import { getDirectionFromAngle } from "../data";
import { wmoCodes } from "./wmo-codes";

export const getDescriptionFromCode = (code: number) => {
  return wmoCodes[`${code}` as unknown as keyof typeof wmoCodes].day
    .description;
};

const url = "https://api.open-meteo.com/v1/forecast?";

export const meteoWeatherReturnSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),
  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    weather_code: z.string(),
  }),
  current: z.object({
    time: z.string(),
    interval: z.number(),
    weather_code: z.number(),
  }),
  hourly_units: z.object({
    time: z.string(),
    temperature_2m: z.enum(["°F", "°C"]),
    precipitation_probability: z.string(),
    wind_speed_10m: z.string(),
    wind_direction_10m: z.string(),
  }),
  hourly: z.object({
    time: z.array(z.string()),
    temperature_2m: z.array(z.number()),
    precipitation_probability: z.array(z.number()),
    wind_speed_10m: z.array(z.number()),
    wind_direction_10m: z.array(z.number()),
  }),
});

export type MetoData = z.infer<typeof meteoWeatherReturnSchema>;

export const mapMeteoData = (data: MetoData): WeatherDataSchema => {
  const currentTime = data.hourly.time[0];
  const currentTemperature = data.hourly.temperature_2m[0];
  const rainChance = data.hourly.precipitation_probability[0];
  const windSpeedMph = data.hourly.wind_speed_10m[0];
  const windDirectionValue = data.hourly?.wind_direction_10m[0];
  const windDirection = windDirectionValue
    ? getDirectionFromAngle(windDirectionValue)
    : undefined;
  if (
    !currentTime ||
    !currentTemperature ||
    !rainChance ||
    !windSpeedMph ||
    !windDirection
  ) {
    throw new Error(`Invalid temperature data.`);
  }

  const currentWeather = {
    time: currentTime,
    temperature: currentTemperature,
    rainChance,
    description: getDescriptionFromCode(data.current.weather_code),
    windSpeedMph,
    windDirection,
  };

  const hourlyForecast = data.hourly.time.map((time, i) => {
    const temp = data.hourly.temperature_2m[i];
    if (!temp) {
      throw new Error(`Invalid temperature data.`);
    }
    return {
      time,
      temperature: temp,
    };
  });

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    temperatureUnit: data.hourly_units.temperature_2m,
    currentWeather,
    hourlyForecast,
  };
};

export const getMeteoData = async (lat: string, lon: string) => {
  const params = {
    latitude: lat,
    longitude: lon,
    hourly:
      "temperature_2m,precipitation_probability,wind_speed_10m,wind_direction_10m",
    temperature_unit: "fahrenheit",
    wind_speed_unit: "mph",
    current: "weather_code",
  };

  const res = await fetch(url + new URLSearchParams(params).toString(), {
    method: "GET",
  }).then(async (res) => {
    const data = (await res.json()) as unknown;
    return meteoWeatherReturnSchema.parse(data);
  });

  return mapMeteoData(res);
};
