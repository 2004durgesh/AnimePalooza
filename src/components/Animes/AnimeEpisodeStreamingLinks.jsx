import React from 'react';
import tw from 'twrnc';
import VideoPlayer from '../VideoPlayer';
import { View } from 'react-native';


const serverOptions = ["gogocdn", "streamsb", "vidstreaming"];
const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
      return (
        <>
        <View style={tw`bg-black h-full`}>
            <VideoPlayer route={route.params} type='anime' provider='gogoanime' server={serverOptions}/>
        </View>
        </>
    );
};

export default AnimeEpisodeStreamingLinks;
