import { View, Text, TouchableOpacity,ScrollView } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import Dramacool from "../../assets/dramacool.png";
import FlixHQ from "../../assets/flixhq.png";
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllProvidersLinks from '../AllProvidersLinks';

const Providers = ({navigation}) => {

    return (
        <>
            <SafeAreaView style={tw`bg-black h-full`}>
                {/* Header with Back Button*/}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={tw`text-white text-2xl font-bold my-10 pl-2`}>Explore Providers</Text>
                    <View style={tw`gap-20`}>
                        {/* Display provider links */}
                            <AllProvidersLinks
                                image={Dramacool}
                                provider="Dramacool"
                                providerDesc="Your Ultimate Destination for Asian Dramas and Movies"
                                onPressHandler={() => { navigation.navigate('DramacoolSearch') }}
                            />
                    
                            <AllProvidersLinks
                                image={FlixHQ}
                                provider="FlixHQ"
                                providerDesc="Streaming Global Entertainment at Your Fingertips"
                                onPressHandler={() => { navigation.navigate('FlixHQ') }}
                            />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

export default Providers;
