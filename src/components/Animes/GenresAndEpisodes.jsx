import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Animated,{FadeInLeft, FadeOutRight} from 'react-native-reanimated';

const GenresAndEpisodes = ({ genres, episodes }) => {
  const navigation = useNavigation();

  // Render genre tags in horizontal scroll view
  const renderGenres = () => {
    return (
      <View>
        <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>Genres</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row`}>
            {genres.map((ele, index) => (
              <Animated.View entering={FadeInLeft.delay(200*index)} exiting={FadeOutRight.delay(200*index)} key={index} style={tw`border p-2 h-10 rounded-md mx-1 bg-gray-700`}>
                <Text style={tw`text-white`}>{ele}</Text>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  // Render episodes list in vertical scroll view
  const renderEpisodes = () => {
    return (
      <ScrollView>
        <View >
          <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>{episodes.length} Episodes</Text>
          {episodes.map((ele, index) => (
            <Animated.View entering={FadeInLeft.delay(200*index)} exiting={FadeOutRight.delay(200*index)} key={index} style={tw`border-b border-gray-800 p-2 py-3 my-1 h-16`}>
              <TouchableOpacity onPress={() => navigation.navigate('AnimeEpisodeStreamingLinks', { episodeId: ele.id,episodeNumber:ele.number })}>
                <Text style={tw`text-white text-lg`}>Episode {ele.number}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {/* Render genre tags */}
      <View>
        {renderGenres()}
      </View>

      {/* Render episodes */}
      <View>
        {renderEpisodes()}
      </View>
    </>
  );
};

export default GenresAndEpisodes;
