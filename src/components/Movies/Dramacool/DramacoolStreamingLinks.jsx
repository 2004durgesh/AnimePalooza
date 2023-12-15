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
    const serverOptions = ["asianload", "mixdrop", "streamtape", "streamsb"];
    
    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <VideoPlayer route={route.params} type='movies' provider='dramacool' server={serverOptions}/>
        </SafeAreaView>
    );
};

export default DramacoolStreamingLinks;
