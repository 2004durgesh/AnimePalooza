import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GenresAndEpisodes = ({ genres, episodes, title }) => {
  const navigation = useNavigation();
  const [parsedWatchedData, setParsedWatchedData] = useState([]);
  useEffect(() => {
    const fetchWatchTimeData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('watched');
        console.log('Stored Data:', storedData);
        if (storedData) {
          setParsedWatchedData(await JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching watch time data:', error);
      }
    };

    fetchWatchTimeData();
  }, [])
  console.log('Parsed Watched Data:', parsedWatchedData)
  // Render genre tags in horizontal scroll view
  const renderGenres = () => {
    return (
      <View>
        <Text style={tw`text-white text-xl p-2 pt-4 font-semibold`}>Genres</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={tw`flex-row`}>
            {genres.map((ele, index) => (
              <Animated.View entering={FadeInLeft.delay(200 * index)} exiting={FadeOutRight.delay(200 * index)} key={index} style={tw`border p-2 h-10 rounded-md mx-1 bg-gray-700`}>
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
            <Animated.View entering={FadeInLeft.delay(200 * index)} exiting={FadeOutRight.delay(200 * index)} key={index} style={tw`border-b border-gray-800 p-2 py-3 my-1 h-16`}>
              <TouchableOpacity onPress={() => navigation.navigate('AnimeEpisodeStreamingLinks', {
                episodeId: ele.id,
                episodeNumber: ele.number,
                title
              })}>
                <Text style={tw`text-white text-lg`}>Episode {ele.number}</Text>
                {parsedWatchedData.map((watchedEle) => (
                  (watchedEle.episodeId === ele.id ?
                    <>
                      <Text style={tw`text-gray-500 text-lg bottom-8.1`}>Episode {ele.number}</Text>
                      <Text key={watchedEle.episodeId} style={tw`text-gray-500 text-xs bottom-8.1`}>{watchedEle.currentTime}</Text>
                    </> :
                    null
                  )
                ))}
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
