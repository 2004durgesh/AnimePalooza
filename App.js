/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import tw from 'twrnc';
import React from 'react';
import RecentAnimeEpisode from './src/components/Animes/RecentAnimeEpisode';

const App = () => {
  return (
    <SafeAreaView style={tw``}>
      <RecentAnimeEpisode/>
    </SafeAreaView>
  );
};

export default App;
