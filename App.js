import React from 'react';
import { View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider} from 'react-native-safe-area-context';

import RecentAnimeEpisode from './src/components/Animes/RecentAnimeEpisode';
import AllLinks from './src/components/Movies/AllLinks';
import AllServer from './src/components/Manga/AllServer';
import News from './src/components/News/News';
import Anime from './src/components/Animes/Anime';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer>
          {/* Bottom Tab Navigator */}
          <Tab.Navigator
            screenOptions={{
              headerShown: false, // Hide the default header for all screens
              tabBarActiveTintColor: "#DB202C",
              tabBarInactiveTintColor: "#000",
            }}
          >
            {/* Screen for Anime */}
            <Tab.Screen
              name="Anime"
              component={Anime}
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="video-library" size={30} color="black" />
                ),
              }}
            />
            {/* Screen for Movies */}
            <Tab.Screen
              name="Movies"
              component={AllLinks}
              options={{
                tabBarIcon: () => (
                  <MaterialIcons name="movie" size={30} color="black" />
                ),
              }}
            />
            {/* Screen for Manga */}
            <Tab.Screen
              name="Manga"
              component={AllServer}
              options={{
                tabBarIcon: () => (
                  <MaterialIcons
                    name="my-library-books"
                    size={30}
                    color="black"
                  />
                ),
              }}
            />
            {/* Screen for News */}
            <Tab.Screen
              name="News"
              component={News}
              options={{
                tabBarIcon: () => (
                  <Ionicons name="ios-newspaper" size={30} color="black" />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
