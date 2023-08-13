import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import {FontAwesome} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopAiringAnime = ({ navigation }) => {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const url = `https://api.consumet.org/anime/gogoanime/top-airing`;

  // Function to fetch data from the API
  const fetchData = async (page) => {
    setIsLoaded(false); // Show the activity loader
    try {
      const { data } = await axios.get(url, { params: { page, type: 1 } });
      setResults(data.results);
      setCurrentPage(page);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoaded(false); // Hide the activity loader after data fetching is done
    }
  };

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

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.url, item.id)} style={tw`mx-auto`}>
        <View style={tw`flex-row items-center relative my-2`}>
          {/* Background image */}
          <ImageBackground source={{ uri: item.image }} style={tw`w-32 h-44`}>
            {/* Text and episode number */}
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={{ height: '100%', width: '100%' }}>
              <View style={tw`absolute w-28 h-44 pl-3 -bottom-32`}>
                <Text style={tw`font-bold text-white`} numberOfLines={2} ellipsizeMode="tail">
                  {item.title}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Navigate to 'AnimeInfo' screen and pass the 'id' as a parameter
    navigation.navigate('AnimeInfo', {
      id: id
    });
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View>
        {/* Navigation arrows */}
        <View style={tw`flex flex-row justify-between mx-4 my-4`}>
          <TouchableOpacity onPress={handlePrevPage} style={tw`bg-white pr-1 rounded-full w-12 h-12 justify-center items-center`}>
            <FontAwesome name="chevron-left" size={30} color="#DB202C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextPage} style={tw`bg-white pl-1 rounded-full w-12 h-12 justify-center items-center`}>
            <FontAwesome name="chevron-right" size={30} color="#DB202C" />
          </TouchableOpacity>
        </View>
        <Text style={tw`text-white font-bold pl-2`}>Page: {currentPage}</Text>
        {/* FlatList to render the items */}
        {!isLoaded ? (
          // If data is loaded, show the FlatList
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-28`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          // If data is loading, show the Activity Loader
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#DB202C" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TopAiringAnime;
