import z from "zod";

export const weatherDataSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  temperatureUnit: z.enum(["°C", "°F"]),
  currentWeather: z.object({
    time: z.string(),
    temperature: z.number(),
    rainChance: z.number(),
    windSpeedMph: z.number(),
    windDirection: z.string(),
    description: z.string(),
  }),
  hourlyForecast: z.array(
    z.object({
      time: z.string(),
      temperature: z.number(),
    }),
  ),
});

export type WeatherDataSchema = z.infer<typeof weatherDataSchema>;

export const getDirectionFromAngle = (angle: number) => {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ] as const;
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
};
