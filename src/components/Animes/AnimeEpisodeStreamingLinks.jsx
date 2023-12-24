import React from 'react';
import tw from 'twrnc';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import VideoPlayer from '../VideoPlayer';


const serverOptions = ["gogocdn", "streamsb", "vidstreaming"];
const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
      return (
        <SafeAreaView style={tw`bg-black h-full`}>
            <VideoPlayer route={route.params} type='anime' provider='gogoanime' server={serverOptions}/>
        </SafeAreaView>
    );
};

export default AnimeEpisodeStreamingLinks;
