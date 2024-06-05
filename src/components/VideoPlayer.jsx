import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, StatusBar, Linking, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Video,{ TextTrackType } from 'react-native-video';
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
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [captionsVisible, setCaptionsVisible] = useState(false);
    const [expanded, setExpanded] = useState(true);
    const [downloadLinks, setDownloadLinks] = useState('');
    const [qualitySelectedIndex, setQualitySeletedIndex] = useState(0);
    const [captionsSelectedIndex, setCaptionsSeletedIndex] = useState(0);
    const [streamingSource, setStreamingSource] = useState('');
    const [subtitles, setSubtitles] = useState([]);
    const [subtitlesUrl, setSubtitlesUrl] = useState('');
    const [streamingLinks, setStreamingLinks] = useState([]);
    const [streamingQuality, setStreamingQuality] = useState('');
    const [selectedServer, setSelectedServer] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const { episodeId, mediaId, episodeNumber, title,image } = route
    
console.log(paused,"paused");
    
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
                console.log(data)
                setStreamingLinks(data.sources);
                setDownloadLinks(data.download);
                setSubtitles(data.subtitles);
                const initialQuality = data.sources[3].quality; // Access quality from data
                setStreamingQuality(initialQuality); // Set the initial quality
                setQualitySeletedIndex(3); // Set the initial index
                if (provider === "gogoanime") { setStreamingSource(data.sources[3].url); }
                if (provider === "dramacool") { setStreamingSource(data.sources[1].url); }
                if (provider === "flixhq") { setStreamingSource(data.sources[0].url); }
                return data;
            } catch (err) {
                throw new Error(err.message);
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
        console.log("sub", subtitles, subtitlesUrl)
    }, [episodeId, selectedServer]);

    const toggleSettingsOverlay = () => {
        setSettingsVisible(!settingsVisible);
    };

    const toggleCaptionsOverlay = () => {
        setCaptionsVisible(!captionsVisible);
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
        setProgress(parseInt((currentTime / seekableDuration) * 100));
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
        if (controlsVisible && !isLoading) {
            timer = setTimeout(() => {
                setControlsVisible(false);
            }, 5000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [controlsVisible, isLoading]);

    useEffect(() => {
        return () => {
            // Clean up listeners when the component unmounts
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)
            StatusBar.setTranslucent(false)
        };
    }, []);

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

    // Function to handle buffering
    const handleOnBuffer = ({ isBuffering }) => {
        console.log('Buffering status changed. Is buffering:', isBuffering);
        setIsLoading(isBuffering)
    };
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
                isVisible={settingsVisible}
                onBackdropPress={toggleSettingsOverlay}
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
                                        setQualitySeletedIndex(index);
                                    }}
                                    style={tw`p-2 flex-row justify-between items-center`}
                                >
                                    <Text style={tw`text-[#DB202C]`}>Quality: {source.quality}</Text>
                                    <CheckBox
                                        checked={qualitySelectedIndex === index}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        center={true}
                                        containerStyle={tw`-p-1`}
                                        checkedColor="#DB202C"
                                        onPress={() => {
                                            setStreamingSource(source.url);
                                            setStreamingQuality(source.quality);
                                            setQualitySeletedIndex(index);
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
            <Overlay
                isVisible={captionsVisible}
                onBackdropPress={toggleCaptionsOverlay}
                style={tw`justify-center items-center`}
            >
                <ScrollView style={tw`p-2 w-84 max-h-96`}>
                    <View>
                        {subtitles && subtitles.map((source, index) => (
                            <View key={index}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSubtitlesUrl(source.url)
                                    }}
                                    style={tw`p-2 flex-row justify-between items-center`}
                                >
                                    <Text style={tw`text-[#DB202C]`}>Language: {source.lang}</Text>
                                    <CheckBox
                                        checked={captionsSelectedIndex === index}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        center={true}
                                        containerStyle={tw`-p-1`}
                                        checkedColor="#DB202C"
                                        onPress={() => {
                                            setCaptionsSeletedIndex(index);
                                            setSubtitlesUrl(source.url)
                                        }} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
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
                        source={{
                            uri: streamingSource,
                            metadata: {
                                title: title,
                                subtitle: `Episode Number: ${episodeNumber}`,
                                artist: `Episode Number: ${episodeNumber}`,
                                description: '',
                                imageUri: image,
                            }
                        }}
                        style={tw`absolute top-0 left-0 right-0 bottom-0 z-10`}
                        paused={paused}
                        ref={videoRef}
                        onLoad={() => setIsLoading(false)}
                        onLoadStart={() => setIsLoading(true)}
                        onError={showToastWithGravity}
                        onFullscreenPlayerDidPresent={handlePresentFullscreen}
                        onFullscreenPlayerDidDismiss={handleDismissFullscreen}
                        onPlaybackStateChanged={(state) => setPaused(!state.isPlaying)}
                        onProgress={handleOnProgress}
                        progressUpdateInterval={1000}
                        resizeMode="contain"
                        onBuffer={handleOnBuffer}
                        showNotificationControls={true}
                        // playInBackground={true}
                        // playWhenInactive={true}
                        selectedTextTrack={{ type: 'language', value: 'en' }}
                        // textTracks={[
                        //     {
                        //         title: 'test',
                        //         language: 'en',
                        //         type: TextTrackType.VTT,
                        //         uri:
                        //             'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt',
                        //     },
                        // ]}
                        subtitleStyle={{ paddingBottom: 50, fontSize: 20, opacity: 1 }}
                    />
                   

                    <View>
                        <View style={tw` bg-opacity-25 absolute top-0 left-0 right-0 bottom-0 h-100 z-50`}>
                            <View style={tw`justify-center items-center h-3/4`}>
                                {controlsVisible && (<Animated.View
                                    entering={FadeInUp.delay(10)}
                                    exiting={FadeOutUp.delay(10)}
                                    style={tw` flex-row justify-between px-4 items-center ${fullscreen ? 'w-180' : 'w-full'} -top-10`}>
                                    <View>
                                        <Text style={tw`text-white font-bold w-80 mr-auto`} numberOfLines={1}>{title}</Text>
                                        {episodeNumber ? <Text style={tw`text-gray-500 text-xs mr-auto`} numberOfLines={1}>Episode Number: {episodeNumber}</Text> : null}
                                    </View>
                                    <View style={tw`flex-row items-center gap-4 ml-auto`}>
                                        {downloadLinks ? <Ionicons name='download-outline' color='#DB202C' size={30} style={tw``} onPress={handleOpenLink} /> : null}
                                        {subtitles && subtitles.length > 0 ? <MaterialIcons name='closed-caption-off' color='#DB202C' size={30} style={tw``} onPress={toggleCaptionsOverlay} /> : null}
                                        <Ionicons name='settings-outline' color='#DB202C' size={30} style={tw``} onPress={toggleSettingsOverlay} />
                                    </View>
                                </Animated.View>)}
                                <Animated.View entering={FadeIn.delay(10)} exiting={FadeOut.delay(10)} style={tw` flex-row justify-evenly items-center w-50 top-20`}>
                                    {isLoading
                                        ? <ActivityLoader />
                                        : (controlsVisible && <>
                                            <MaterialIcons name='replay-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime - 10) }} />
                                            <Ionicons name={paused ? 'play-outline' : 'pause-outline'} color='#DB202C' size={30} onPress={handlePlayPause} />
                                            <MaterialIcons name='forward-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime + 10) }} />
                                        </>)
                                    }
                                </Animated.View>
                                {controlsVisible && (<Animated.View
                                    entering={FadeInDown.delay(10)}
                                    exiting={FadeOutDown.delay(10)}
                                    style={tw` w-full px-4 ${fullscreen ? '-bottom-45' : '-bottom-20'}`}>
                                    <View style={tw`flex-row items-center justify-between`}>
                                        <TouchableOpacity
                                            style={tw`bg-red-500 w-20 justify-center items-center py-2 rounded-full`}
                                            onPress={() => { videoRef.current.seek(currentTime + 85) }}
                                        >
                                            <Text style={tw`text-white font-semibold`}>+85s</Text>
                                        </TouchableOpacity>
                                        <MaterialIcons name={fullscreen ? 'fullscreen-exit' : 'fullscreen'} color='#DB202C' size={30} onPress={handleToggleFullscreen} />
                                    </View>
                                    <View style={tw`flex-row items-center justify-between`}>
                                        <Text style={tw`text-white text-xs font-semibold`}>{currentTimeToDisplay ?? 0}</Text>
                                        <Slider
                                            style={tw`h-10 ${fullscreen ? 'w-180 -mx-2' : 'w-80'}`}
                                            minimumValue={0}
                                            maximumValue={100}
                                            value={progress}
                                            minimumTrackTintColor="#DB202C"
                                            maximumTrackTintColor="#fff"
                                            thumbTintColor="#DB202C"
                                            tapToSeek={true}
                                            onValueChange={(value) => {
                                                setProgress(value);
                                                const newCurrentTime = (value / 100) * seekableDuration;
                                                setCurrentTimeToDisplay(formatDuration(moment.duration(newCurrentTime, 'seconds')));
                                            }}
                                            onSlidingComplete={(value) => {
                                                if (videoRef.current) {
                                                    videoRef.current.seek((value / 100) * seekableDuration);
                                                }
                                            }}
                                        />
                                        <Text style={tw`text-white text-xs font-semibold`}>{durationToDisplay}</Text>
                                    </View>
                                </Animated.View>)}
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={tw`text-center font-bold bg-red-500 ${fullscreen ? 'hidden' : ''}`}>Try Changing Quality or Server if video doesn't plays</Text>
        </View>
    );
};

export default VideoPlayer;
