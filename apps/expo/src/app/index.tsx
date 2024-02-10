import { useState } from "react";
import { Button, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";

import { api } from "~/utils/api";

export default function Index() {
  const weatherQuery = api.weather.getLocation.useQuery({
    lat: "30.2672",
    lng: "-97.7431",
  });

  return (
    <>
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page", headerShown: false }} />
      <View className="flex h-full w-full flex-col justify-center bg-blue-300 p-4">
        <View className="">
          <Text className="pb-2 text-center text-5xl font-bold text-black">
            {weatherQuery.data?.city}
          </Text>

          {/* Main Weather Display */}
          <View className="items-center p-4">
            <Text className="text-6xl">
              {weatherQuery.data?.currentWeather.temperature.toFixed(0)}
              {weatherQuery.data?.temperatureUnit}
            </Text>
            <Text className="text-xl text-gray-700">
              {weatherQuery.data?.currentWeather?.description}
            </Text>

            {/* Additional Details */}
            <View className="w-full flex-row justify-around">
              <Text className="text-gray-600">
                Rain: {weatherQuery.data?.currentWeather.rainChance ?? 0}%
              </Text>
              <Text className="text-gray-600">
                Wind:{" "}
                {weatherQuery.data?.currentWeather.windSpeedMph.toFixed(0)} mph{" "}
                {weatherQuery.data?.currentWeather.windDirection
                  .split("-")
                  .map((el) => el[0])}
              </Text>
            </View>
          </View>

          {/* Forecast Section */}
          <ScrollView horizontal className="flex-grow">
            {/* Replace with dynamic content */}
            <View className="flex-row p-4">
              <View className="items-center px-2">
                <Text>10 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>11 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>12 PM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>1 PM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>10 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>10 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>10 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              <View className="items-center px-2">
                <Text>10 AM</Text>
                <Image
                  source={{ uri: "https://cataas.com/cat" }}
                  className="h-12 w-12"
                />
                <Text>24°C</Text>
              </View>
              {/* Repeat for other times */}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}
