import PageV1 from "~/components/PageV1";
import PageV2 from "~/components/PageV2";
import { api } from "~/utils/api";

const pageToUse = "v2" as string;

export default function Index() {
  const weatherQuery = api.weather.getLocation.useQuery({
    lat: "30.2672",
    lng: "-97.7431",
  });

  return (
    <>
      {pageToUse === "v1" && (
        <PageV1
          city={weatherQuery.data?.city}
          currentWeather={weatherQuery.data?.currentWeather}
          hourlyForecast={weatherQuery.data?.hourlyForecast}
          temperatureUnit={weatherQuery.data?.temperatureUnit}
        />
      )}
      {pageToUse === "v2" && (
        <PageV2
          city={weatherQuery.data?.city}
          currentWeather={weatherQuery.data?.currentWeather}
          hourlyForecast={weatherQuery.data?.hourlyForecast}
          temperatureUnit={weatherQuery.data?.temperatureUnit}
        />
      )}
    </>
  );
}
