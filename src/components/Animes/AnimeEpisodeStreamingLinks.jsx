import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
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
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  // Function to handle orientation change
  const toggleOrientation = async () => {
    const currentOrientation = await ScreenOrientation.getOrientationAsync();

    if (currentOrientation === ScreenOrientation.OrientationLock.PORTRAIT) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: streamingLinks }}
        useNativeControls
        resizeMode="contain"
        isLooping
        // onPlaybackStatusUpdate={setStatus}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Toggle Orientation"
          onPress={toggleOrientation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    margin: 16,
  },
});

export default AnimeEpisodeStreamingLinks;
