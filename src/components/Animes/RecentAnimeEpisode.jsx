import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/FontAwesome';

function Anime() {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true)
  const url = 'https://api.consumet.org/anime/gogoanime/recent-episodes';

  const fetchData = async (page) => {
    try {
      const { data } = await axios.get(url, { params: { page, type: 1 } });
      setResults(data.results);
      setCurrentPage(page);
      setHasNextPage(data.hasNextPage);
      setIsLoaded(false)
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Fetch data on component mount
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

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.url)} style={tw`mx-auto`}>
        <View style={tw`flex-row items-center relative my-2`}>
          {/* Background image */}
          <ImageBackground source={{ uri: item.image }} style={tw`w-32 h-44`}>
            {/* Text and episode number */}
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={{ height: '100%', width: '100%' }}>
              <View style={tw`absolute w-28 h-44 pl-3 -bottom-32`}>
                <Text style={tw`font-bold text-white`} numberOfLines={2} ellipsizeMode="tail">
                  {item.title}
                </Text>
                {/* <Text style={tw`font-bold text-white text-sm`}>Episode {item.episodeNumber}</Text> */}
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url) => {
    console.log('Pressed URL:', url);
    // Implement the logic to handle the press, e.g., open URL in web browser
  };

  return (
    <View>
      {/* Navigation arrows */}
      <View style={tw`flex flex-row justify-between mx-4 my-4 mt-16`}>
        <TouchableOpacity onPress={handlePrevPage} style={tw`bg-white pr-1 rounded-full w-12 h-12 justify-center items-center`}>
          <Icon name="chevron-left" size={30} color="#DB202C" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNextPage} style={tw`bg-white pl-1 rounded-full w-12 h-12 justify-center items-center`}>
          <Icon name="chevron-right" size={30} color="#DB202C" />
        </TouchableOpacity>
      </View>
      <Text>Recent Anime Episode</Text>
      {/* Activity Loader */}
    {isLoaded && <ActivityIndicator size="large" color="#DB202C" />}
      {/* FlatList to render the items */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.episodeId}
        renderItem={renderItem}
        numColumns={3} // Use the numColumns prop to show 3 items in a row
        contentContainerStyle={tw`pb-52`} 
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

export default Anime;
