import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Config from "../constants/env.config";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { ActivityIndicator } from 'react-native';

const NewsFeeds = ({ navigation }) => {
  // State to hold the news feed data
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // API URL for fetching recent news feeds
  const url = `${Config.API_BASE_URL}/news/ann/recent-feeds`;

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url,{
        headers:{'x-api-key': Config.API_KEY}
      });
      setSearchResults(data);
      setIsLoading(false);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to render individual news items
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={tw`flex-row bg-white opacity-75 p-4 rounded-lg shadow-md my-2`}
        onPress={() =>
          navigation.navigate('NewsInfo', { id: item.id, thumbnail: item.thumbnail })
        }>
        <View style={tw`flex-1`}>
          <Image source={{ uri: item.thumbnail }} style={tw`h-44 rounded-md`} />
          <View style={tw`ml-4`}>
            <Text style={tw`font-bold text-xl mb-1`} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={tw`text-base`} numberOfLines={1}>
              {item.preview.intro}
            </Text>
            <Text style={tw`text-white mb-2`}>{item.uploadedAt} EDT</Text>
            <Text style={tw`text-white capitalize mb-2`}>Category: {item.topics}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View>
        {isLoading ? (
          // Activity Loader
          <View style={tw`h-full justify-center items-center`}>
            <ActivityIndicator size="large" color="#DB202C" />
          </View>
        ) : (
          /* FlatList to render the list of news items */
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewsFeeds;
