// Import required libraries
import React, { useEffect,useState } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux';
import { PaperProvider } from 'react-native-paper';
import store from './components/redux/Store';
import SplashScreen from 'react-native-splash-screen';
import NetInfo, { addEventListener } from "@react-native-community/netinfo";

// Import screen components
import News from './components/News/News';
import Anime from './components/Animes/Anime';
import Movies from './components/Movies/Movies';
import Manga from './components/Manga/Manga';
import tw from 'twrnc';
import Favorites from './components/Favorites/Favorites';
import { bottomTabScreenOptions } from './components/constants/navigation.constants';

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();
// const [isConnected, setIsConnected] = useState(null);
// Main App Component
const App = () => {
  useEffect(() => {
    // Hide the splash screen once your app is ready
    SplashScreen.hide();

  }, []);

  const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    if (routeName === 'AnimeEpisodeStreamingLinks' || routeName === 'FlixHQStreamingLinks' || routeName === 'DramacoolStreamingLinks') {
      return 'none'
    }
    else {
      return 'flex'
    }
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={tw`bg-black flex-1`}>
          <NavigationContainer>
            {/* Bottom Tab Navigator */}
            <Tab.Navigator
              screenOptions={bottomTabScreenOptions}
            >
              {/* Screen for Anime */}
              <Tab.Screen
                name="Anime"
                component={Anime}
                options={({ route }) => ({
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="video-library" size={30} color={color} />
                  ),
                  tabBarStyle: [{
                    display: getRouteName(route),
                    height: 60,
                    borderTopColor: 'white',
                    borderTopWidth: 2,
                    backgroundColor: 'black',
                  }]
                })}
              />
              {/* Screen for Manga */}
              <Tab.Screen
                name="Manga"
                component={Manga}
                options={(route) => ({
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons
                      name="my-library-books"
                      size={30}
                      color={color}
                    />
                  ),
                })}
              />
              {/* Screen for Movies */}
              <Tab.Screen
                name="Movies"
                component={Movies}
                options={({ route }) => ({
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="movie" size={30} color={color} />
                  ),
                  tabBarStyle: [{
                    display: getRouteName(route),
                    height: 60,
                    borderTopColor: 'white',
                    borderTopWidth: 2,
                    backgroundColor: 'black',
                  }]
                })}
              />
              {/* Screen for News */}
              <Tab.Screen
                name="News"
                component={News}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="newspaper" size={30} color={color} />
                  ),
                }}
              />
              {/* Screen for Favorites */}
              <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="favorite" size={30} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

export default App;
