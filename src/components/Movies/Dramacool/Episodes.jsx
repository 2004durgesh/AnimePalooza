import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';


const Episodes = ({ episodes, mediaId,title }) => {
  const navigation = useNavigation();

  // Render episodes list in vertical scroll view
  const renderEpisodes = () => {
    return (
      <ScrollView>
        <View>
          <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>{episodes.length} Episodes</Text>
          {episodes.map((ele, index) => (
            <Animated.View entering={FadeInLeft.delay(200 * index)} exiting={FadeOutRight.delay(200 * index)} key={index} style={tw`border-b border-gray-800 p-2 py-3 my-1 h-16`}>
              <TouchableOpacity onPress={() => navigation.navigate('DramacoolStreamingLinks',
                {
                  episodeId: ele.id,
                  mediaId: mediaId,
                  episodeNumber: ele.episode,
                  title
                })}>
                <Text style={tw`text-white text-lg`}>Episode {ele.episode}</Text>
                <Text style={tw`text-xs text-[#D3D3D3]`}>Episode {ele.releaseDate}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      {/* Render episodes */}
      <View>
        {renderEpisodes()}
      </View>
    </>
  );
};

export default Episodes;
