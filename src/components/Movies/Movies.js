import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Providers from './Providers';

// Import screens for FlixHQ
import TopAiringFlixHQ from './FlixHQ/TopAiringFlixHQ';
import RecentFlixHQEpisode from './FlixHQ/RecentFlixHQEpisode';
import FlixHQSearch from './FlixHQ/FlixHQSearch';
import FlixHQInfo from './FlixHQ/FlixHQInfo';
import FlixHQStreamingLinks from './FlixHQ/FlixHQStreamingLinks';
import Recommendations from './FlixHQ/Recommendations';

// Import screens for Dramacool
import DramacoolSearch from './Dramacool/DramacoolSearch';
import DramacoolInfo from './Dramacool/DramacoolInfo';
import DramacoolStreamingLinks from './Dramacool/DramacoolStreamingLinks';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { topTabScreenOptions } from '../constants/navigation.constants';

// Create Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
// Create Stack Navigator
const Stack = createNativeStackNavigator();

// Movies component contains navigation stack for different screens
const Movies = () => {
  const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    console.log(routeName)
    if (routeName === 'FlixHQStreamingLinks') {
      return 'none'
    }
    else {
      return 'flex'
    }
  }

  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        {/* Providers Screen */}
        <Stack.Screen
          name="Providers"
          component={Providers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DramacoolSearch"
          component={DramacoolSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DramacoolInfo"
          component={DramacoolInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DramacoolStreamingLinks"
          component={DramacoolStreamingLinks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FlixHQ"
          component={TopTabs}
          options={({ route }) => ({ headerShown: false, tabBarStyle: { display: getRouteName(route) } })}
        />
        <Stack.Screen
          name="FlixHQInfo"
          component={FlixHQInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FlixHQStreamingLinks"
          component={FlixHQStreamingLinks}
          options={({ route }) => ({ headerShown: false, tabBarStyle: { display: getRouteName(route) } })}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={topTabScreenOptions}
      >
      <Tab.Screen
        name="Trending"
        component={TopAiringFlixHQ}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="fiber-new" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Latest"
        component={RecentFlixHQEpisode}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="fiber-new" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={FlixHQSearch}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name="search" size={25} color={focused ? "white" : "gray"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Movies;
