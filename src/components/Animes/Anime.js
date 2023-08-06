// Import required libraries
import React from 'react';
import tw from 'twrnc';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screen components
import TopAiringAnime from './TopAiringAnime';
import RecentAnimeEpisode from './RecentAnimeEpisode';
import AnimeSearch from './AnimeSearch';
import AnimeInfo from './AnimeInfo';
import AnimeEpisodeStreamingLinks from './AnimeEpisodeStreamingLinks';

// Create Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Main App Component
const Anime = () => {
  return (
    <SafeAreaProvider>
      {/* Stack Navigator for handling screen transitions */}
      <Stack.Navigator>
        {/* Screen for Top Tabs */}
        <Stack.Screen
          name="TopTabs"
          component={TopTabs}
          options={{ headerShown: false }} // Hide the default header for TopTabs
        />
        {/* Screen for Anime Info */}
        <Stack.Screen
          name="AnimeInfo"
          component={AnimeInfo}
          options={{ headerShown: false }} // If you want to hide the header for AnimeInfo screen
        />
        <Stack.Screen
          name="AnimeEpisodeStreamingLinks"
          component={AnimeEpisodeStreamingLinks}
          options={{ headerShown: false }} // If you want to hide the header for AnimeInfo screen
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

// Component for Top Tabs
const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#dc2626"
        },
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "white",
          borderTopWidth: 2,
        },
        tabBarAndroidRipple: {
          color: '#DB202C',
          borderless: true,
        }
      }}
      // Add some padding to the top to prevent the tabs from being too close to the camera
      style={tw`mt-10`}
    >
      {/* Screen for Trending */}
      <Tab.Screen
        name="Trending"
        component={TopAiringAnime}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="whatshot" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
      {/* Screen for Latest */}
      <Tab.Screen
        name="Latest"
        component={RecentAnimeEpisode}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="fiber-new" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
      {/* Screen for Search */}
      <Tab.Screen
        name="Search"
        component={AnimeSearch}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="search" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Anime;
