import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity, ActivityIndicator, Linking, ToastAndroid, ScrollView, StatusBar } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Config from "../constants/env.config";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { Overlay, ListItem, CheckBox } from '@rneui/themed';
import VideoPlayer from '../VideoPlayer';


const serverOptions = ["gogocdn", "streamsb", "vidstreaming"];

const AnimeEpisodeStreamingLinks = ({ route, navigation }) => {
    const [streamingSource, setStreamingSource] = useState('');
    const [downloadLinks, setDownloadLinks] = useState('');
    const [streamingLinks, setStreamingLinks] = useState([]);
    const [streamingQuality, setStreamingQuality] = useState('');
    const [selectedServer, setSelectedServer] = useState("");
    const isFocused = useIsFocused();
    const { episodeId, episodeNumber } = route.params;
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [selectedIndex, setSeletedIndex] = useState(0);
    // Function to toggle the overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // Fetch streaming links on component mount
    useEffect(() => {
        // API URL to fetch streaming links for the episode
        const url = `${Config.API_BASE_URL}/anime/gogoanime/watch/${episodeId}?server=${selectedServer || "gogocdn"}`;

        // Function to fetch streaming links from the API
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url, {
                    headers: { 'x-api-key': Config.API_KEY }
                });
                setStreamingLinks(data.sources);
                setDownloadLinks(data.download);
                const initialQuality = data.sources[3].quality; // Access quality from data
                setStreamingQuality(initialQuality); // Set the initial quality
                setSeletedIndex(3); // Set the initial index
                setStreamingSource(data.sources[3].url); // Set the initial source
                return data;
            } catch (err) {
                throw new Error(err.message);
            }
        };
        fetchData();
    }, [episodeId, selectedServer]);

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            {/* Header with Back Button */}
            <ScrollView style={tw`bg-black flex-1`}>
                <Overlay
                    isVisible={visible}
                    onBackdropPress={toggleOverlay}
                    style={tw`justify-center items-center`}
                >
                    <View style={tw`p-2 w-84`}>
                        <View>
                            {streamingLinks.map((source, index) => (
                                <View key={index}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setStreamingSource(source.url);
                                            setStreamingQuality(source.quality);
                                            setSeletedIndex(index);
                                        }}
                                        style={tw`p-2 flex-row justify-between items-center`}
                                    >
                                        <Text style={tw`text-[#DB202C]`}>Quality: {source.quality}</Text>
                                        <CheckBox
                                            checked={selectedIndex === index}
                                            checkedIcon="dot-circle-o"
                                            uncheckedIcon="circle-o"
                                            center={true}
                                            containerStyle={tw`-p-1`}
                                            checkedColor="#DB202C"
                                            onPress={() => {
                                                setStreamingSource(source.url);
                                                setStreamingQuality(source.quality);
                                                setSeletedIndex(index);
                                            }} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <ListItem.Accordion
                            content={
                                <ListItem.Content>
                                    <ListItem.Title style={tw`text-[#DB202C]`}>Select a server</ListItem.Title>
                                </ListItem.Content>
                            }
                            isExpanded={expanded}
                            onPress={() => {
                                setExpanded(!expanded);
                            }}
                        >
                            <View style={tw`flex flex-row flex-wrap gap-1`}>
                                {serverOptions.map((server) => (
                                    <View key={server}>
                                        <TouchableOpacity style={[tw`p-2 rounded-full`, { borderWidth: 1, borderColor: 'red', }]} onPress={() => setSelectedServer(server)}>
                                            <ListItem.Title style={tw`text-red-500 capitalize`}>{server}</ListItem.Title>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ListItem.Accordion>
                    </View>
                </Overlay>
                <VideoPlayer src={streamingSource} downloadLinks={downloadLinks} quality={streamingQuality} title={`Episode Number: ${episodeNumber}`} provider='gogoanime' />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AnimeEpisodeStreamingLinks;
