import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Linking, Share } from 'react-native';
import Config from "../constants/env.config";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const NewsInfo = ({ route, navigation }) => {
  // Get id and thumbnail from route params
  const { id, thumbnail } = route.params ?? {};

  // State to hold news feed details
  const [searchResults, setSearchResults] = useState({ title: '', uploadedAt: '', intro: '', description: '', url: '', });

  const url = `${Config.API_BASE_URL}/news/ann/info?id=${id}`;

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url,{
        headers:{'x-api-key': Config.API_KEY}
      });
      setSearchResults(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Function to open URL in browser
  const openUrl = () => {
    if (searchResults.url) {
      Linking.openURL(searchResults.url).catch((err) =>
        console.error('An error occurred while opening URL', err)
      );
    }
  };

  // Sharing
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this news: ${searchResults.title}\n\n${searchResults.url}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: thumbnail }} style={{ height: 300 }}>
          {/* Gradient overlay */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.9)']}
            style={{ height: '100%', width: '100%' }}
          >
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={{ margin: 16 }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Ionicons name="share-social-outline" size={35} color="white" style={{ margin: 16 }} onPress={onShare} />
            </View>
            {/* Anime Details */}
            <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
              <Image
                source={{ uri: thumbnail }}
                style={{ width: 120, height: 180, borderRadius: 8 }}
              />
              <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <Text style={{ color: 'white', fontSize: 18 }} selectable={true}>
                  {searchResults.title}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 8 }}>
              <Fontisto name="date" size={18} color="#D3D3D3" />
              <Text style={{ color: '#D3D3D3', fontSize: 16, paddingLeft: 8 }}>
                {searchResults.uploadedAt}
              </Text>
            </View>
            {/* Anime Intro */}
            <View>
              <Text
                style={{ color: '#D3D3D3', paddingLeft: 16, paddingRight: 16, fontSize: 14, lineHeight: 24 }}
                numberOfLines={3}
              >
                Intro: {searchResults.intro}
              </Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        {/* Description */}
        <View style={{ marginTop: 16 }}>
          <Text
            style={{ color: '#D3D3D3', paddingHorizontal: 16, fontSize: 16, lineHeight: 24 }}
          >
            Description: {searchResults.description}
          </Text>
          {/* Read More Button */}
          <TouchableOpacity
            style={{ backgroundColor: 'red', padding: 12, marginHorizontal: 16, borderRadius: 8, marginBottom: 16 }}
            onPress={openUrl}
          >
            <Text style={{ color: 'white', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>
              Read More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsInfo;
