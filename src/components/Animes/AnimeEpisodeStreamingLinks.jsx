import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
  const video = useRef(null);
  const [streamingLinks, setStreamingLinks] = useState();
  const { episodeId } = route.params;

  // API URL to fetch streaming links for the episode
  const url = `https://api.consumet.org/anime/gogoanime/watch/${episodeId}`;

  // Function to fetch streaming links from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url, { params: { server: 'gogocdn' } });
      setStreamingLinks(data.sources[0].url);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Fetch streaming links on component mount
  useEffect(() => {
    fetchData();
    // Lock the screen orientation to portrait mode initially
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // Unlock the screen orientation when the component is unmounted
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);


  // Function to handle orientation change
  const handleFullscreenUpdate = async () => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      console.log('Entered fullscreen mode');
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
      console.log('Exited fullscreen mode');
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
  };

  return (<SafeAreaView  style={tw`bg-black h-full`}>
    {/* Header with Back Button*/}
    <View style={tw`flex-row justify-between`}>
      <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={tw` m-6 mt-10`} onPress={() => { navigation.goBack() }} />
    </View>
    <View style={tw`flex-1 bg-white items-center justify-center bg-black`}>
      <Video
        ref={video}
        style={tw`flex-1 self-stretch`}
        source={{ uri: streamingLinks }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
        onFullscreenUpdate={handleFullscreenUpdate}
      />
    </View>
  </SafeAreaView>
  );
};

export default AnimeEpisodeStreamingLinks;
