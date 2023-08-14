import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';

const StreamingLinks = ({ route, navigation }) => {
  const { episodeId, mediaId } = route.params;
  const videoRef = useRef(null);
  const [streamingLinks, setStreamingLinks] = useState();
  const [savedPosition, setSavedPosition] = useState(0);
  const isFocused = useIsFocused();

  // API URL to fetch streaming links for the episode
  const url = `https://consumet-api-pied.vercel.app/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}`;

  // Function to fetch streaming links from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url, { params: { server: 'asianload' } });
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

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        if (isFocused) {
          // Start playing when tab is in focus
          await videoRef.current.playFromPositionAsync(savedPosition);
        } else {
          // Pause when tab loses focus
          await videoRef.current.pauseAsync();
        }
      }
    };

    playVideo();

    return () => {
      // Save the current playback position when unmounted
      if (videoRef.current) {
        videoRef.current.getStatusAsync().then(({ positionMillis }) => {
          setSavedPosition(positionMillis);
        });
      }
    };
  }, [isFocused]);

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

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      {/* Header with Back Button */}
      <View style={tw`flex-row justify-between`}>
        <Ionicons
          name="arrow-back-circle-sharp"
          size={40}
          color="white"
          style={tw`m-6`}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={tw`flex-1 items-center justify-center`}>
        <Video
          ref={videoRef}
          style={tw`flex-1 self-stretch`}
          source={{ uri: streamingLinks }}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={true}
          onFullscreenUpdate={handleFullscreenUpdate}
        />
      </View>
    </SafeAreaView>
  );
};

export default StreamingLinks;
