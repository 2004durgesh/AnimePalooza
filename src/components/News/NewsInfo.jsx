import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const NewsInfo = ({ route, navigation }) => {
  const { id, thumbnail } = route.params ?? {};
  const [searchResults, setSearchResults] = useState({
    title: '',
    uploadedAt: '',
    intro: '',
    description: '',
    url: '',
  });

  const url = `https://consumet-api-pied.vercel.app/news/ann/info?id=${id}`;

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setSearchResults(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const openUrl = () => {
    if (searchResults.url) {
      Linking.openURL(searchResults.url).catch((err) =>
        console.error('An error occurred while opening URL', err)
      );
    }
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <ScrollView>
        <ImageBackground source={{ uri: thumbnail }} style={tw`h-96`}>
          {/* Gradient overlay */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']}
            style={{ height: '100%', width: '100%' }}
          >
            {/* Header */}
            <View style={tw`flex-row justify-between`}>
              <Ionicons
                name="arrow-back-circle-sharp"
                size={40}
                color="white"
                style={tw`m-6`}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Ionicons
                name="share-social-outline"
                size={35}
                color="white"
                style={tw`m-6`}
              />
            </View>
            {/* Anime Details */}
            <View style={tw`flex flex-row mx-2`}>
              <Image
                source={{ uri: thumbnail }}
                style={tw`w-32 h-44 rounded-md`}
              />
              <View style={tw`px-4 flex-1 gap-4`}>
                <View>
                  <Text
                    style={tw`text-white text-xl font-md`}
                    selectable={true}
                  >
                    {searchResults.title}
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <Fontisto name="date" size={18} color="#D3D3D3" />
                  <Text
                    style={tw`text-[#D3D3D3] text-lg px-2 font-md`}
                  >
                    {searchResults.uploadedAt} EDT
                  </Text>
                </View>
              </View>
            </View>
            {/* Anime Intro */}
            <Text
              style={[
                tw`text-[#D3D3D3] px-2 leading-5 text-justify text-lg my-5`,
              ]}
            >
              {searchResults.intro}
            </Text>
          </LinearGradient>
        </ImageBackground>
        {/* Description */}
        <View style={tw`mt-4`}>
          <Text
            style={[
              tw`text-[#D3D3D3] px-2 leading-5 text-justify text-xl mb-2`,
            ]}
          >
            Description:
          </Text>
          <Text
            style={[
              tw`text-[#D3D3D3] px-2 leading-5 text-justify text-xl mb-5`,
            ]}
          >
            {searchResults.description}
          </Text>
          {/* Read More Button */}
          <TouchableOpacity
            style={tw`bg-red-600 p-3 mx-4 rounded-md mb-10`}
            onPress={openUrl}
          >
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Read More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsInfo;
