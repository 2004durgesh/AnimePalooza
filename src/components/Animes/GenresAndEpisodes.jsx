import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AnimeEpisodeStreamingLinks from "./AnimeEpisodeStreamingLinks";

const GenresAndEpisodes = ({ genres, episodes }) => {
  const navigation = useNavigation();

  // Render genre tags in horizontal scroll view
  const renderGenres = () => {
    return (
      <ScrollView horizontal={true}>
        <View style={tw`flex-row`}>
          {genres.map((ele, index) => (
            <View key={index} style={tw`border p-2 h-10 rounded-md mx-1 bg-gray-700`}>
              <Text style={tw`text-white`}>{ele}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  // Render episodes list in vertical scroll view
  const renderEpisodes = () => {
    return (
      <ScrollView>
        <View>
          <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>{episodes.length} Episodes</Text>
          {episodes.map((ele, index) => (
            <View key={index} style={tw`border p-2 py-3 my-1 h-16`}>
              <TouchableOpacity onPress={() => navigation.navigate('AnimeEpisodeStreamingLinks', { episodeId: ele.id })}>
                <Text style={tw`text-white text-lg`}>Episode {ele.number}</Text>
              </TouchableOpacity>
            </View>
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
