import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Config from "../constants/env.config";
import PageNavigation from '../PageNavigation';
import RenderItemCards from '../RenderItemCards';
import ActivityLoader from '../ActivityLoader';

// RecentAnimeEpisode component
function RecentAnimeEpisode({ navigation }) {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const url = `${Config.API_BASE_URL}/anime/gogoanime/recent-episodes`;

  // Function to fetch data from the API
  const fetchData = async (page) => {
    try {
      const { data } = await axios.get(url, { 
        params: { page, type: 1 },
        headers:{'x-api-key': Config.API_KEY} });
      setResults(data.results);
      setCurrentPage(page);
      setHasNextPage(data.hasNextPage);
      setIsLoaded(false);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Fetch data on component mount and when currentPage changes
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  // Function to handle navigation to the next page
  const handleNextPage = () => {
    if (hasNextPage) {
      fetchData(currentPage + 1);
    }
  };

  // Function to handle navigation to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchData(currentPage - 1);
    }
  };

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Navigate to 'AnimeInfo' screen and pass the 'id' as a parameter
    navigation.navigate('AnimeInfo', {
      id: id,
    });
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`bg-black flex-1`}>
        <PageNavigation currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
        {/* FlatList to render the items */}
        {!isLoaded ? (
          <FlatList
            data={results}
            keyExtractor={(item) => item.episodeId.toString()}
            renderItem={({ item }) => <RenderItemCards item={item} handleItemPress={handleItemPress} />}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-28`}
            showsVerticalScrollIndicator={false}
          />
        ) : (<ActivityLoader />)}
      </View>
    </SafeAreaView>
  );
}

export default RecentAnimeEpisode;
