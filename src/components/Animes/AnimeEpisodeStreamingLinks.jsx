import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { Ionicons, Octicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';
import { Overlay } from '@rneui/themed';

const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
  const videoRef = useRef(null);
  const [streamingSource, setStreamingSource] = useState('');
  const [downloadLinks, setDownloadLinks] = useState('');
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [streamingQuality, setStreamingQuality] = useState('');
  const [savedPosition, setSavedPosition] = useState(0);
  const isFocused = useIsFocused();
  const { episodeId, episodeNumber } = route.params;
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleOpenLink = () => {
    // Use the Linking module to open the URL
    Linking.openURL(downloadLinks).catch((err) =>
      console.error('An error occurred: ', err)
    );
  };

  // Fetch streaming links on component mount
  useEffect(() => {
    // API URL to fetch streaming links for the episode
    const url = `https://consumet-api-pied.vercel.app/anime/gogoanime/watch/${episodeId}`;

    // Function to fetch streaming links from the API
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url, { params: { server: 'gogocdn' } });
        setStreamingLinks(data.sources);
        setDownloadLinks(data.download);
        const initialQuality = data.sources[3].quality; // Access quality from data
        setStreamingQuality(initialQuality); // Set the initial quality
        setStreamingSource(data.sources[3].url); // Set the initial source
        return data;
      } catch (err) {
        throw new Error(err.message);
      }
    };
    fetchData();
    // Lock the screen orientation to portrait mode initially
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    // Unlock the screen orientation when the component is unmounted
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [episodeId]);

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
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
  };

  const renderLoadingIndicator = () => (
    <ActivityIndicator size="large" color="#DB202C" />
  );

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Error Fetching Video',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
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
        <View style={tw` flex-row items-center justify-center gap-8 mr-4`}>
          <Octicons name="download" size={35} color="white" onPress={handleOpenLink} />
          <Octicons name="gear" size={35} color="white" onPress={toggleOverlay} />
        </View>
      </View>

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        style={tw`justify-center items-center`}
      >
        <View style={tw`p-2 w-80`}>
          <View>
            {streamingLinks.map((source, index) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => {
                    setStreamingSource(source.url);
                    setStreamingQuality(source.quality);
                  }}
                  style={tw`p-2`}
                >
                  <Text style={tw`text-[#DB202C]`}>Quality: {source.quality}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={tw`bg-[#DB202C] py-2 px-4 mt-4 rounded-md`}
            onPress={toggleOverlay}
          >
            <Text style={tw`text-white text-center`}>Back</Text>
          </TouchableOpacity>
        </View>
      </Overlay>

      <View style={tw`flex-1`}>
        <Text style={tw`text-white text-center font-bold`}>Current Video Quality: {streamingQuality}</Text>
        <Text style={tw`text-white text-center font-bold`}>Episode Number: {episodeNumber}</Text>
        <Video
          ref={videoRef}
          style={tw`flex-1 self-stretch`}
          source={{ uri: streamingSource }}
          useNativeControls
          resizeMode="contain"
          isLooping
          shouldPlay={true}
          onFullscreenUpdate={handleFullscreenUpdate}
          onLoading={renderLoadingIndicator}
          onError={showToastWithGravity}
        />
      </View>
    </SafeAreaView>
  );
};

export default AnimeEpisodeStreamingLinks;
