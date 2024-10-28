import { useEffect, useState } from "react";
// TODO: put this within the page
import { Alert, Text } from "react-native";
import * as Location from "expo-location";

import PageV1 from "~/components/PageV1";
import PageV2 from "~/components/PageV2";
import { api } from "~/utils/api";

const pageToUse = "v2" as string;

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      Alert.alert("Location", JSON.stringify(location.coords, null, 2));
      setLocation(location.coords);
    };

    getLocation();
  }, []);

  const weatherQuery = api.weather.getLocation.useQuery({
    lat: location?.latitude?.toString() ?? undefined,
      lng: location?.longitude?.toString() ?? undefined,
    },
    {
      // TODO: add loading state before location is retrieved
      enabled: !!location,
    },
  );

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

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
