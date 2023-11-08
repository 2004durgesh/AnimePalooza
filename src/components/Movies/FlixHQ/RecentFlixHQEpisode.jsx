import { View, Text } from 'react-native'
import React from 'react';
import tw from 'twrnc';
import RecentFlixHQMoviesAndShows from './RecentFlixHQMoviesAndShows'
import { SafeAreaView } from 'react-native-safe-area-context'

const RecentFlixHQEpisode = () => {
  return (
    <SafeAreaView  style={tw`bg-black flex-1`}>
      <RecentFlixHQMoviesAndShows typeOfService="recent-movies" />
      <RecentFlixHQMoviesAndShows typeOfService="recent-shows" />
    </SafeAreaView>
  )
}

export default RecentFlixHQEpisode