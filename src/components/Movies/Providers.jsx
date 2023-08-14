import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import Dramacool from "../../assets/dramacool.png";
import FlixHQ from "../../assets/flixhq.png";
import AllProvidersLinks from './AllProvidersLinks';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Providers = ({navigation}) => {

    return (
        <>
            <SafeAreaView style={tw`bg-black h-full`}>
                {/* Header with Back Button*/}
                <View style={tw`flex-row justify-between`}>
                    <Ionicons
                        name="arrow-back-circle-sharp"
                        size={40}
                        color="white"
                        style={tw`m-6`}
                        onPress={() => { navigation.goBack() }}
                    />
                </View>
                <Text style={tw`text-white text-2xl font-bold mb-10 pl-2`}>Explore Providers</Text>
                <View style={tw`gap-20`}>

                    {/* Display provider links */}
                    <TouchableOpacity onPress={() => { navigation.navigate('Dramacool') }}>
                        <AllProvidersLinks
                            image={Dramacool}
                            provider="Dramacool"
                            providerDesc="Your Ultimate Destination for Asian Dramas and Movies"
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => { navigation.navigate('FlixHQ') }}>
                        <AllProvidersLinks
                            image={FlixHQ}
                            provider="FlixHQ"
                            providerDesc="Streaming Global Entertainment at Your Fingertips"
                        />
                    </TouchableOpacity>
                </View>
                <Text style={tw`text-red-500 text-lg font-md mb-10 pl-2`}>/* FlixHQ Streaming Links are not working currently */</Text>
            </SafeAreaView>
        </>
    );
}

export default Providers;
