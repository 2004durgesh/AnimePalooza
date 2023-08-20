import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const NewsFeeds = ({ navigation }) => {
  // State to hold the news feed data
  const [searchResults, setSearchResults] = useState([]);

  // API URL for fetching recent news feeds
  const url = 'https://consumet-api-pied.vercel.app/news/ann/recent-feeds';

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setSearchResults(data);
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
        style={tw`flex-row bg-white opacity-75 p-4 rounded-lg shadow-md my-2`}
        onPress={() =>
          navigation.navigate('NewsInfo', { id: item.id, thumbnail: item.thumbnail })
        }>
        <View style={tw`flex-1`}>
            <Image source={{ uri: item.thumbnail }} style={tw`h-96 rounded-md`}/>
            <View style={tw`ml-4`}>
              <Text style={tw`font-bold text-xl mb-1`} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text style={tw`text-base`} numberOfLines={1} ellipsizeMode="tail">
                {item.preview.intro}
              </Text>
              <Text style={tw`text-black mb-2`}>{item.uploadedAt} EDT</Text>
              <Text style={tw`text-black capitalize mb-2`}>Catregory: {item.topics}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      <View>
        {/* FlatList to render the list of news items */}
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsFeeds;
