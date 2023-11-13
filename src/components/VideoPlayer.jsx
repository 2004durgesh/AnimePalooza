import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ToastAndroid, StatusBar, Linking } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import moment from 'moment';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { Overlay, ListItem, CheckBox } from '@rneui/themed';
import Animated,{
    FadeIn,
    FadeInDown,
    FadeInLeft,
    FadeInUp,
    FadeOut,
    FadeOutDown,
    FadeOutLeft,
    FadeOutUp,
  } from 'react-native-reanimated';


const VideoPlayer = ({ src, downloadLinks, title }) => {
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
    const [expanded, setExpanded] = useState(false);
    const [selectedIndex, setSeletedIndex] = useState(0);

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
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
        return () => {
            // Clean up listeners when the component unmounts
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)

        };
    }, []);

    // Handle entering fullscreen
    const handlePresentFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.presentFullscreenPlayer();
            Orientation.lockToLandscape();
        }
        setFullscreen(true);
    };

    // Handle exiting fullscreen
    const handleDismissFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.dismissFullscreenPlayer();
            Orientation.lockToPortrait();
        }
        StatusBar.setHidden(true)
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
            <StatusBar barStyle="dark-content" />
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                style={tw`justify-center items-center`}
            >

            </Overlay>
            <TouchableOpacity
                onPress={toggleControls}
                delayPressIn={100}
                delayPressOut={100}
                activeOpacity={1}
            >
                <View style={tw`relative h-105`}>
                    <Video
                        source={{ uri: src }}
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
                    // resizeMode={fullscreen ? "contain" : "contain"}
                    />
                    {controlsVisible && (
                        <View style={tw`bg-transparent absolute top-0 left-0 right-0 bottom-0 h-65 z-50`}>
                            <View style={tw`justify-center items-center h-70`}>
                                <Animated.View
                                    entering={FadeInUp.delay(10)}
                                    exiting={FadeOutUp.delay(10)}
                                    style={tw`flex-row justify-between px-4 items-center ${fullscreen ? 'w-180' : 'w-full'} -top-10`}>
                                    <Text style={tw`text-white font-bold w-80 mr-auto`} numberOfLines={1}>{title}</Text>
                                    <View style={tw`flex-row items-center gap-4 ml-auto`}>
                                        <Ionicons name='download-outline' color='#DB202C' size={30} style={tw``} onPress={handleOpenLink} />
                                        <Ionicons name='settings-outline' color='#DB202C' size={30} style={tw``} onPress={toggleOverlay} />
                                    </View>
                                </Animated.View>
                                <Animated.View entering={FadeIn.delay(10)} exiting={FadeOut.delay(10)} style={tw`flex-row justify-evenly items-center w-50 top-20`}>
                                    <MaterialIcons name='replay-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime - 10) }} />
                                    <Ionicons name={paused ? 'play-outline' : 'pause-outline'} color='#DB202C' size={30} onPress={handlePlayPause} />
                                    <MaterialIcons name='forward-10' color='#DB202C' size={30} onPress={() => { videoRef.current.seek(currentTime + 10) }} />
                                </Animated.View>
                                <AnimatedTouchableOpacity
                                entering={FadeIn}
                                exiting={FadeOut}
                                    style={tw`bg-red-500 w-20 justify-center items-center py-2 rounded-full ${fullscreen ? '-bottom-45 -left-60' : '-bottom-25 -left-40'} `}
                                    onPress={() => { videoRef.current.seek(currentTime + 85) }}
                                >
                                    <Text style={tw`text-white font-semibold`}>+85s</Text>
                                </AnimatedTouchableOpacity>
                                <Animated.View 
                                entering={FadeInDown.delay(10)}
                                exiting={FadeOutDown.delay(10)}
                                style={tw`flex-row items-center justify-center ${fullscreen ? '-bottom-45' : '-bottom-25'}`}>
                                    <Text style={tw`text-white font-semibold`}>{currentTimeToDisplay}</Text>
                                    <Slider
                                        style={tw`h-10 ${fullscreen ? 'w-150 -mx-2' : 'w-70'}`}
                                        minimumValue={0}
                                        maximumValue={100}
                                        value={progress}
                                        minimumTrackTintColor="#DB202C"
                                        maximumTrackTintColor="#000000"
                                        thumbTintColor="#DB202C"
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
                                    <MaterialIcons name={fullscreen ? 'fullscreen-exit' : 'fullscreen'} color='#DB202C' size={30} onPress={handleToggleFullscreen} />
                                </Animated.View>
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default VideoPlayer;
