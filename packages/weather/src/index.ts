import type { WeatherDataSchema } from "./data";
import { getMeteoData } from "./data/meteo-api";

// TODO: Have env control weather data source
const weatherSource = "meteo";

export const getByLocation = async (lat: string, lon: string) => {
  let mappedData: WeatherDataSchema;

  switch (weatherSource) {
    case "meteo":
      mappedData = await getMeteoData(lat, lon);
  }

  // TODO: add actual city location data
  return { ...mappedData, city: "Austin" };
};
