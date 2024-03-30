import { Image, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

import type { WeatherProps } from "~/types/weatherProps";

const PageV1 = (weatherData: WeatherProps) => {
  const { city, currentWeather, temperatureUnit, hourlyForecast } = weatherData;

  return (
    <>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <View className="flex h-full w-full flex-col justify-center bg-blue-300 p-4">
        <View className="">
          <Text className="pb-2 text-center text-5xl font-bold text-black">
            {city}
          </Text>

          {/* Main Weather Display */}
          <View className="items-center p-4">
            <Text className="text-6xl">
              {currentWeather?.temperature.toFixed(0)}
              {temperatureUnit}
            </Text>
            <Text className="text-xl text-gray-700">
              <FontAwesome5 name="cloud-sun" size={24} color="black" />
              {currentWeather?.description}
            </Text>

            {/* Additional Details */}
            <View className="w-full flex-row justify-around">
              <Text className="text-gray-600">
                Rain: {currentWeather?.rainChance ?? 0}%
              </Text>
              <Text className="text-gray-600">
                Wind: {currentWeather?.windSpeedMph.toFixed(0)} mph{" "}
                {currentWeather?.windDirection.split("-").map((el) => el[0])}
              </Text>
            </View>
          </View>

          {/* Forecast Section */}
          <ScrollView className="h-64 flex-grow">
            {/* Replace with dynamic content */}
            <View className="flex p-4">
              {hourlyForecast?.slice(12, 24).map((hour) => {
                return (
                  <View
                    key={`item-${hour.time}`}
                    className="flex flex-row items-center justify-between px-2"
                  >
                    <Text>{new Date(hour.time + "Z").toLocaleString()}</Text>
                    {/* <Text>{hour.time}</Text> */}
                    <Text>{hour.temperature}</Text>
                    <Image
                      source={{ uri: "https://cataas.com/cat" }}
                      className="h-12 w-12"
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default PageV1;
