import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, StatusBar, Linking, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Config from "./constants/env.config";
import axios from 'axios';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { Overlay, ListItem, CheckBox } from '@rneui/themed';
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut, FadeOutDown, FadeOutUp, } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityLoader from './ActivityLoader';

const VideoPlayer = ({ route, type, provider, server }) => {
    const videoRef = useRef(null);
    const [controlsVisible, setControlsVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [currentTimeToDisplay, setCurrentTimeToDisplay] = useState('00:00');
    const [durationToDisplay, setDurationToDisplay] = useState('00:00');
    const [seekableDuration, setSeekableDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [downloadLinks, setDownloadLinks] = useState('');
    const [selectedIndex, setSeletedIndex] = useState(0);
    const [streamingSource, setStreamingSource] = useState('');
    const [streamingLinks, setStreamingLinks] = useState([]);
    const [streamingQuality, setStreamingQuality] = useState('');
    const [selectedServer, setSelectedServer] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const { episodeId, mediaId, episodeNumber, title } = route
    const [watchTime, setWatchTime] = useState([])
    const [isWatched, setIsWatched] = useState(false)

    const watchedInfo = {
        episodeId,
        mediaId: mediaId || null,
        title,
        type,
        provider,
        currentTime: currentTime,
    };
    // Fetch streaming links on component mount
    useEffect(() => {
        // API URL to fetch streaming links for the episode
        let url
        if (type === 'movies') {
            url = `${Config.API_BASE_URL}/${type}/${provider}/watch?episodeId=${episodeId}&mediaId=${mediaId}`;
        } else {
            url = `${Config.API_BASE_URL}/${type}/${provider}/watch/${episodeId}?server=${selectedServer || "gogocdn"}`;
        }
        // Function to fetch streaming links from the API
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url, {
                    headers: { 'x-api-key': Config.API_KEY }
                });
                console.log(data, url)
                setStreamingLinks(data.sources);
                setDownloadLinks(data.download);
                const initialQuality = data.sources[3].quality; // Access quality from data
                setStreamingQuality(initialQuality); // Set the initial quality
                setSeletedIndex(3); // Set the initial index
                if (provider === "gogoanime") { setStreamingSource(data.sources[3].url); }
                if (provider === "dramacool") { setStreamingSource(data.sources[1].url); }
                if (provider === "flixhq") { setStreamingSource(data.sources[0].url); }
                setIsLoading(false)
                return data;
            } catch (err) {
                throw new Error(err.message);
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    }, [episodeId, selectedServer]);
    // Function to toggle the overlay
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    // Toggle visibility of controls
    const toggleControls = () => {
        setControlsVisible(!controlsVisible);
    };

    // Handle Play/Pause button press
    const handlePlayPause = () => {
        setPaused(!paused);
    };

    // Function to handle opening the download link
    const handleOpenLink = () => {
        Linking.openURL(downloadLinks).catch((err) =>
            console.error('An error occurred: ', err)
        );
    };

    // Handle progress of the video
    const handleOnProgress = ({ currentTime, seekableDuration }) => {
        setCurrentTimeToDisplay(formatDuration(moment.duration(currentTime, 'seconds')));
        setDurationToDisplay(formatDuration(moment.duration(seekableDuration, 'seconds')));
        setCurrentTime(currentTime);
        setSeekableDuration(seekableDuration);
        // addToWatchTimeHandler()
        setProgress(parseInt((currentTime / seekableDuration) * 100));
        // console.log('call hua')
    };

    // Helper function to format duration
    const formatDuration = (duration) => {
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        let result = '';

        if (hours > 0) {
            result += `${hours}:`;
        }

        if (minutes > 0 || hours > 0) {
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            result += `${formattedMinutes}:`;
        }

        if (seconds > 0 || minutes > 0 || hours > 0) {
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
            result += `${formattedSeconds}`;
        }

        return result.trim();
    };

    useEffect(() => {
        let timer;
        if (controlsVisible) {
            timer = setTimeout(() => {
                setControlsVisible(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [controlsVisible]);

    useEffect(() => {
        const fetchWatchTimeData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('watched');
                console.log('Stored Data:', storedData);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    console.log('Parsed Data:', parsedData[parsedData.length - 1]);
                    console.log((parsedData[parsedData.length - 1].currentTime))
                    setWatchTime(parsedData);
                    if (videoRef.current) {
                        videoRef.current.seek((parsedData[parsedData.length - 1].currentTime));
                    }
                }
            } catch (error) {
                console.error('Error fetching watch time data:', error);
            }
        };

        fetchWatchTimeData();
        return () => {
            // Clean up listeners when the component unmounts
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)
            StatusBar.setTranslucent(false)
        };
    }, []);

    useEffect(() => {
        setIsWatched(watchTime.some(watched => watched.episodeId === episodeId));
        console.log('isWatched', watchTime.some(watched => watched.episodeId === episodeId), episodeId)

        const addToWatchTimeHandler = async () => {
            try {
                if (isWatched) {
                    const newWatchTime = watchTime.filter(watched => watched.episodeId !== episodeId);
                    console.log('Removing episode from watch time. New watch time:', newWatchTime, currentTime);
                    await AsyncStorage.setItem('watched', JSON.stringify(newWatchTime));
                    // setWatchTime(newWatchTime);
                } else {
                    watchTime.push(watchedInfo);
                    // watchTime.shift();
                    console.log('Adding episode to watch time. New watch time:', watchTime, currentTime);
                    await AsyncStorage.setItem('watched', JSON.stringify(watchTime));
                    // setWatchTime(watchTime);

                }
                console.log("watch time", watchTime)
            } catch (error) {
                console.error('Error updating watch time:', error);
            }
        };

        addToWatchTimeHandler();
    }, [episodeId, watchTime]);

    // Handle entering fullscreen
    const handlePresentFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.presentFullscreenPlayer();
            Orientation.lockToLandscape();
        }
        StatusBar.setHidden(true)
        StatusBar.setTranslucent(true)
        setFullscreen(true);
    };

    // Handle exiting fullscreen
    const handleDismissFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.dismissFullscreenPlayer();
            Orientation.lockToPortrait();
        }
        StatusBar.setHidden(false)
        StatusBar.setTranslucent(false)
        setFullscreen(false);
    };

    const handleToggleFullscreen = () => {
        if (fullscreen) {
            handleDismissFullscreen();
        } else {
            handlePresentFullscreen();
        }
    };

    // Function to render a loading indicator
    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color="#DB202C" />
    );

    // Function to show a Toast notification with gravity
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Error Fetching Video\nTry Changing Server\nOr Quality',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    };

    return (
        <View style={tw``}>
            <StatusBar backgroundColor='black' />
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                style={tw`justify-center items-center`}
            >
                <ScrollView style={tw`p-2 w-84 max-h-96`}>
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
                            {server.map((server) => (
                                <View key={server}>
                                    <TouchableOpacity style={[tw`p-2 rounded-full`, { borderWidth: 1, borderColor: 'red', }]} onPress={() => setSelectedServer(server)}>
                                        <ListItem.Title style={tw`text-red-500 capitalize`}>{server}</ListItem.Title>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ListItem.Accordion>
                </ScrollView>
            </Overlay>
            <TouchableOpacity
                onPress={toggleControls}
                delayPressIn={100}
                delayPressOut={100}
                activeOpacity={1}
            >
                <View style={tw`relative ${fullscreen ? 'h-full' : 'h-105'} w-full`}>
                    <Video
                        source={{ uri: streamingSource }}
                        style={tw`absolute top-0 left-0 right-0 bottom-0 z-10`}
                        paused={paused}
                        ref={videoRef}
                        onLoad={renderLoadingIndicator}
                        onLoadStart={renderLoadingIndicator}
                        onError={showToastWithGravity}
                        onFullscreenPlayerDidPresent={handlePresentFullscreen}
                        onFullscreenPlayerDidDismiss={handleDismissFullscreen}
                        onProgress={handleOnProgress}
                        progressUpdateInterval={1000}
                        resizeMode="contain"
                    />
                    {controlsVisible && (
                        <View>
                            <View style={tw`bg-transparent absolute top-0 left-0 right-0 bottom-0 h-65 z-50`}>
                                <View style={tw`justify-center items-center h-70`}>
                                    <Animated.View
                                        entering={FadeInUp.delay(10)}
                                        exiting={FadeOutUp.delay(10)}
                                        style={tw`flex-row justify-between px-4 items-center ${fullscreen ? 'w-180' : 'w-full'} -top-10`}>
                                        <View>
                                            <Text style={tw`text-white font-bold w-80 mr-auto`} numberOfLines={1}>{title}</Text>
                                            {episodeNumber ? <Text style={tw`text-gray-500 mr-auto`} numberOfLines={1}>Episode Number: {episodeNumber}</Text> : null}
                                        </View>
                                        <View style={tw`flex-row items-center gap-4 ml-auto`}>
                                            {downloadLinks ? <Ionicons name='download-outline' color='#DB202C' size={30} style={tw``} onPress={handleOpenLink} /> : null}
                                            <Ionicons name='settings-outline' color='#DB202C' size={30} style={tw``} onPress={toggleOverlay} />
                                        </View>
                                    </Animated.View>
                                    <Animated.View entering={FadeIn.delay(10)} exiting={FadeOut.delay(10)} style={tw`flex-row justify-evenly items-center w-50 top-20`}>
                                        {isLoading ?
                                            <ActivityLoader />
                                            : <>
                                                <MaterialIcons name='replay-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime - 10) }} />
                                                <Ionicons name={paused ? 'play-outline' : 'pause-outline'} color='#DB202C' size={30} onPress={handlePlayPause} />
                                                <MaterialIcons name='forward-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime + 10) }} />
                                            </>}
                                    </Animated.View>
                                    <Animated.View
                                        entering={FadeInDown.delay(10)}
                                        exiting={FadeOutDown.delay(10)}
                                        style={tw`flex-row items-center justify-between w-full px-4 ${fullscreen ? '-bottom-45' : '-bottom-20'}`}>
                                        <TouchableOpacity
                                            style={tw`bg-red-500 w-20 justify-center items-center py-2 rounded-full`}
                                            onPress={() => { videoRef.current.seek(currentTime + 85) }}
                                        >
                                            <Text style={tw`text-white font-semibold`}>+85s</Text>
                                        </TouchableOpacity>
                                        <MaterialIcons name={fullscreen ? 'fullscreen-exit' : 'fullscreen'} color='#DB202C' size={30} onPress={handleToggleFullscreen} />
                                    </Animated.View>
                                </View>
                            </View>
                            <Animated.View
                                entering={FadeInDown.delay(10)}
                                exiting={FadeOutDown.delay(10)}
                                style={tw`flex-row items-center justify-center ${fullscreen ? 'top-95' : 'top-70'}`}>
                                <Text style={tw`text-white font-semibold`}>{currentTimeToDisplay}</Text>
                                <Slider
                                    style={tw`h-10 ${fullscreen ? 'w-160 -mx-2' : 'w-80'}`}
                                    minimumValue={0}
                                    maximumValue={100}
                                    value={progress}
                                    minimumTrackTintColor="#DB202C"
                                    maximumTrackTintColor="#fff"
                                    thumbTintColor="#DB202C"
                                    tapToSeek={true}
                                    onValueChange={(value) => {
                                        setProgress(value);
                                    }}
                                    onSlidingComplete={(value) => {
                                        if (videoRef.current) {
                                            videoRef.current.seek((value / 100) * seekableDuration);
                                        }
                                    }}
                                />
                                <Text style={tw`text-white font-semibold`}>{durationToDisplay}</Text>

                            </Animated.View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <Text style={tw`text-center font-bold bg-red-500 ${fullscreen ? 'hidden' : ''}`}>Try Changing Quality or Server if video doesn't plays</Text>
        </View>
    );
};

export default VideoPlayer;
