import { Image, Text, View } from "react-native";
import { Stack } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

import type { WeatherProps } from "~/types/weatherProps";

const PageV2 = (weatherData: WeatherProps) => {
  const { city, currentWeather, temperatureUnit, hourlyForecast } = weatherData;

  return (
    <>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <View className="flex h-full w-full flex-col bg-gray-900 p-4">
        <View className="mt-12 flex h-96 items-center justify-center bg-sky-950 shadow-lg">
          <Image
            source={require("./images/sun-cutout.png")}
            className="absolute top-14 h-20 w-20"
          />
          <Image
            source={require("./images/cloud_1.png")}
            className="absolute left-2 top-28 h-24 w-36 object-fill"
          />
          <Image
            source={require("./images/cloud_2.png")}
            className="absolute right-0 top-40 h-24 w-40 object-fill"
          />
          <Image
            source={require("./images/cloud_3.png")}
            className="absolute bottom-8 left-28 h-24 w-36 object-fill"
          />
        </View>
        <View className="mt-4 flex flex-row items-center justify-around">
          <Text className="text-center text-2xl font-bold text-yellow-100">
            <FontAwesome5 name="map-marker-alt" size={22} /> {city}
          </Text>
          <Text className="text-center text-5xl font-bold text-yellow-100">
            {currentWeather?.temperature.toFixed(0)}
            {temperatureUnit}
          </Text>
        </View>
      </View>
    </>
  );
};

export default PageV2;
