import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
  const {episodeId}=route.params
  console.log(episodeId)

  return (
    <View>
      <Text style={tw`text-black bg-white`}>hello</Text>
      
    </View>
  );
}

export default AnimeEpisodeStreamingLinks;
