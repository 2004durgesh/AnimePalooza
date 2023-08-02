/* eslint-disable prettier/prettier */
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import tw from 'twrnc';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecentAnimeEpisode from './src/components/Animes/RecentAnimeEpisode';
import AnimeEpisodeStreamingLinks from './src/components/Animes/AnimeEpisodeStreamingLinks';

const Stack = createNativeStackNavigator();
const App = () => {
  return (<>

      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="RecentAnimeEpisode" component={RecentAnimeEpisode}/>
          <Stack.Screen name="AnimeEpisodeStreamingLinks" component={AnimeEpisodeStreamingLinks} />
        </Stack.Navigator>
      </NavigationContainer>
  </>
  );
};

export default App;
