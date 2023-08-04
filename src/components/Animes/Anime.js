import React from 'react';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopAiringAnime from './TopAiringAnime';
import RecentAnimeEpisode from './RecentAnimeEpisode';
import AnimeSearch from './AnimeSearch';

const Tab = createMaterialTopTabNavigator();

const Anime = () => {
  return (
    <SafeAreaProvider>
      {/* <NavigationContainer> */}
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: tw`font-bold`,
            tabStyle: tw`flex-row`,
            style: tw`bg-black`,
            indicatorStyle: tw`bg-red-600`,
            activeTintColor: 'white',
            inactiveTintColor: 'gray',
          }}
          // Add some padding to the top to prevent the tabs from being too close to the camera
          style={tw`mt-10`}
        >
          <Tab.Screen
            name="Top Airing Anime"
            component={TopAiringAnime}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="whatshot" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Recent Anime Episodes"
            component={RecentAnimeEpisode}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="fiber-new" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Anime Search"
            component={AnimeSearch}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="fiber-new" size={size} color={color} />
              ),
            }}
          />
          {/* Add more screens/options as needed */}
        </Tab.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaProvider>
  );
};

export default Anime;
