import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import TopAiringAnime from './TopAiringAnime';
import RecentAnimeEpisode from './RecentAnimeEpisode';
import AnimeSearch from './AnimeSearch';
import AnimeInfo from './AnimeInfo';
import AnimeEpisodeStreamingLinks from './AnimeEpisodeStreamingLinks';
import { topTabScreenOptions } from '../constants/navigation.constants';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const Anime = ({route}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <Stack.Navigator>
        <Stack.Screen
          name="TopTabs"
          component={TopTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AnimeInfo"
          component={AnimeInfo}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="AnimeEpisodeStreamingLinks"
          component={AnimeEpisodeStreamingLinks}
          options={{ headerShown:false}}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={topTabScreenOptions}
    >
      <Tab.Screen
        name="Trending"
        component={TopAiringAnime}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="whatshot"
              size={25}
              color={focused ? 'white' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Latest"
        component={RecentAnimeEpisode}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="fiber-new"
              size={25}
              color={focused ? 'white' : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={AnimeSearch}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="search"
              size={25}
              color={focused ? 'white' : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Anime;
