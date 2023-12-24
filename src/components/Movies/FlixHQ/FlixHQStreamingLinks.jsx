import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Config from "../../constants/env.config";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { Overlay, ListItem, CheckBox } from '@rneui/themed';
import VideoPlayer from '../../VideoPlayer';

const serverOptions = ["mixdrop", "vidcloud", "upcloud"];

const FlixHQStreamingLinks = ({ route, navigation }) => {

    const { episodeId, mediaId, title } = route.params;
    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <VideoPlayer route={route.params} type='movies' provider='flixhq' server={serverOptions}/>
        </SafeAreaView>
    );
};

export default FlixHQStreamingLinks;
