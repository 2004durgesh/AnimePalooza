import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, ToastAndroid } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Config from "../../constants/env.config";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import VideoPlayer from '../../VideoPlayer';

const DramacoolStreamingLinks = ({ route, navigation }) => {
    const { episodeId, mediaId, episodeNumber } = route.params;
    const webviewRef = useRef(null);
    const [streamingSource, setStreamingSource] = useState('');
    const [savedPosition, setSavedPosition] = useState(0);
    const isFocused = useIsFocused();


    // Fetch streaming links on component mount
    useEffect(() => {
        // API URL to fetch streaming links for the episode
        const url = `${Config.API_BASE_URL}/movies/dramacool/watch?episodeId=${episodeId}&mediaId=${mediaId}`;
        // Function to fetch streaming links from the API
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url, {
                    params: { server: 'asianload' },
                    headers: { 'x-api-key': Config.API_KEY }
                });
                setStreamingSource(data.sources[1].url);
                console.log(url, data.sources[1].url)
                return data;
            } catch (err) {
                throw new Error(err.message);
            }
        };
        fetchData()
    }, [episodeId, mediaId]);

    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <VideoPlayer src={streamingSource} title={`Episode Number: ${episodeNumber}`} provider='dramacool' />
        </SafeAreaView>
    );
};

export default DramacoolStreamingLinks;
