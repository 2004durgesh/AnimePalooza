import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, Text, ScrollView, TouchableOpacity, ActivityIndicator, NativeModules, ToastAndroid, SafeAreaView, StatusBar } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { WebView } from 'react-native-webview';
import { Overlay, ListItem } from '@rneui/themed';

const VideoPlayer = ({ src, quality = null, title, provider }) => {
    const videoRef = useRef(null);
    // const handleDismissFullscreen = () => {
    //     // Take the player out of fullscreen mode
    //     if (videoRef.current) {
    //         videoRef.current.dismissFullscreenPlayer();
    //     }
    // };

    // const handlePresentFullscreen = () => {
    //     // Put the player in fullscreen mode
    //     if (videoRef.current) {
    //         videoRef.current.presentFullscreenPlayer();
    //     }
    // };
    // Function to render a loading indicator
    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color="#DB202C" />
    );

    // Function to show a Toast notification with gravity
    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Error Fetching Video\nTry Changing Server',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
        );
    };

    return (
        <View style={tw`flex-1`}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />
            <Text style={tw`text-white text-center font-bold`}>{title}</Text>
            {/* WebView to display the video */}
            {/* <WebView
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
                source={{
                    html: `
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                
                video::-webkit-media-controls-timeline {
                background-color: #DB202C;
                padding-bottom: 0;
                padding-inline: 0;
                margin-bottom: 20px;
                }
                </style>
                <div id="container" style="transition: transform 0.5s;">
                <video id='video' controls autoplay src=${src} width="100%"></video>
                    </div>
                
                <script>
                const video = document.getElementById('video');
                const container = document.getElementById('container');
                
                function onFullscreenChange() {
                    if (document.fullscreenElement || document.webkitFullscreenElement) {
                        video.style.rotate = '90deg';
                        video.style.scale = '0.75 0.5';
                        console.log('rotate')
                    } else {
                        video.style.rotate = '0deg';
                        video.style.scale = '1';
                        console.log('back rotate')
                    }
                }
                
                video.addEventListener('fullscreenchange', onFullscreenChange);
                video.addEventListener('webkitfullscreenchange', onFullscreenChange);
                </script>
                `,
                }}
                style={tw`bg-white flex-1`}
                onMessage={(event) => {
                    const message = event.nativeEvent.data;
                    if (message === 'error') {
                        showToastWithGravity();
                    } else if (message === 'loading') {
                        renderLoadingIndicator();
                    }
                }}
            /> */}
            <View style={tw`h-70`}>
                <Video
                    source={{ uri: src }}
                    style={tw`bg-white flex-1`}
                    controls={true}
                    fullscreen={true}
                    pictureInPicture={true}
                    ref={videoRef}
                />
            </View>

            <Text style={tw`text-red-500 font-bold text-xl text-center`}>Turn on auto-rotate to change screen orientation in fullscreen</Text>
        </View>
    );
}

export default VideoPlayer;
