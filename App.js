// Import required libraries
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated'

// Import screen components
import AllServer from './src/components/Manga/AllServer';
import News from './src/components/News/News';
import Anime from './src/components/Animes/Anime';
import Movies from './src/components/Movies/Movies';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Main App Component
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        {/* Bottom Tab Navigator */}
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Hide the default header for all screens
            tabBarActiveTintColor: "#DB202C",
            tabBarInactiveTintColor: "#fff",
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: 'bold',
              marginBottom: 4,
            },
            tabBarItemStyle: {
              justifyContent: 'center', // Center the tab icon and label
            },
            tabBarStyle: [
              {
                display: "flex",
                height: 60, // Height of the bottom tab bar
                borderTopColor: "white", // Color of the top border
                borderTopWidth: 2, // Width of the top border
                backgroundColor: "black", // Background color of the bottom tab bar
              },
              null,
            ],
          }}
        >
          {/* Screen for Anime */}
          <Tab.Screen
            name="Anime"
            component={Anime}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="video-library" size={30} color={color} />
              ),
            }}
          />
          {/* Screen for Manga */}
          <Tab.Screen
            name="Manga"
            component={AllServer}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="my-library-books"
                  size={30}
                  color={color}
                />
              ),
            }}
          />
          {/* Screen for Movies */}
          <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="movie" size={30} color={color} />
              ),
            }}
          />
          {/* Screen for News */}
          <Tab.Screen
            name="News"
            component={News}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-newspaper" size={30} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
