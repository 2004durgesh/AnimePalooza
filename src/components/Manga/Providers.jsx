<<<<<<< HEAD
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import MangaDex from '../../assets/MangaDex.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllProvidersLinks from '../AllProvidersLinks';

const Providers = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={tw`text-white text-2xl font-bold my-10 pl-2`}>Explore Providers</Text>
        <View style={tw`gap-20`}>
          {/* Display provider link */}
          {/* <TouchableOpacity onPress={() => { navigation.navigate('MangaSearch', { provider: 'mangadex' }) }}> */}
            <AllProvidersLinks
              image={MangaDex}
              provider="Mangadex"
              providerDesc="Unleash Your Imagination, One Page at a Time"
              onPressHandler={() => { navigation.navigate('MangaSearch', { provider: 'mangadex' }) }}
            />
          {/* </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
=======
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React from 'react';
import MangaDex from "../../assets/MangaDex.jpg";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Providers = ({ navigation }) => {

    return (
        <>
            <SafeAreaView style={tw`bg-black h-full`}>
                <ScrollView>
                    {/* Header with Back Button */}
                    <View style={tw`flex-row justify-between`}>
                        <Ionicons
                            name="arrow-back-circle-sharp"
                            size={40}
                            color="white"
                            style={tw`m-6`}
                            onPress={() => { navigation.goBack() }}
                        />
                    </View>
                    {/* Title */}
                    <Text style={tw`text-white text-2xl font-bold mb-10 pl-2`}>Explore Providers</Text>
                    <View style={tw`gap-10`}>
                        {/* Display provider link */}
                        <TouchableOpacity onPress={() => { navigation.navigate('MangaSearch', { provider: 'mangadex' }) }}>
                            <View style={tw`flex-row items-center px-2 border-b border-gray-500 mx-3 pb-2`}>
                                <Image source={MangaDex} style={tw`w-15 h-15`} />
                                <View style={tw`px-4 flex-1 `}>
                                    <Text style={tw`text-white font-bold text-xl`}>Mangadex</Text>
                                    <Text style={tw`text-white font-semibold`}>Unleash Your Imagination, One Page at a Time</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
>>>>>>> ce9f7fb7083a0007a46109cf2a859d954eacc4f3

export default Providers;
