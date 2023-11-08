import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import Config from "../constants/env.config";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import PageNavigation from '../PageNavigation';
import RenderItemCards from '../RenderItemCards';
import ActivityLoader from '../ActivityLoader';

const TopAiringAnime = ({ navigation }) => {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const url = `${Config.API_BASE_URL}/anime/gogoanime/top-airing`;
  // Function to fetch data from the API
  const fetchData = async (page) => {
    try {
      const { data } = await axios.get(url, { 
        params: { page, type: 1 } ,
        headers:{'x-api-key': Config.API_KEY}
      });
      setResults(data.results);
      setCurrentPage(page);
      setHasNextPage(data.hasNextPage);
      setIsLoaded(false); // Show the activity loader
    } catch (err) {
      console.error('Error fetching data:', err);
    } 
  };

console.log(Config.API_BASE_URL,Config.API_KEY)
  // Fetch data on component mount and whenever the currentPage changes
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
        <PageNavigation currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage}/>
        {/* FlatList to render the items */}
        {!isLoaded ? (
          // If data is loaded, show the FlatList
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item,index }) => <RenderItemCards item={item} index={index} handleItemPress={handleItemPress}/>}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-28`}
            showsVerticalScrollIndicator={false}
          />
        ) : (<ActivityLoader/>)}
    </SafeAreaView>
  );
};

export default TopAiringAnime;
