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

export default Providers;
