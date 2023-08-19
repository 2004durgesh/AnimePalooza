import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, Dimensions, Text } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const MangaChapterPages = ({ route, navigation }) => {
  // Extract chaptersId and provider from route parameters
  const { chaptersId, provider } = route.params ?? {};

  // State to hold fetched data
  const [serachResults, setSerachResults] = useState([]);

  // Construct the API URL
  const url = 'https://consumet-api-pied.vercel.app/manga/' + provider + '/read/' + chaptersId;

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setSerachResults(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Get the screen width
  const screenWidth = Dimensions.get('window').width;

  // Render each page with an image and page number
  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth }}>
      <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', alignItems: 'center' }}>
        <Text style={tw`text-white text-xl font-bold`}>Page: {item.page}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {/* Display pages in a horizontal FlatList */}
      <FlatList
        data={serachResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MangaChapterPages;
