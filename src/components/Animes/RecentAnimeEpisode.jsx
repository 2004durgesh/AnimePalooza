// Import required libraries and components
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator,Dimensions } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// RecentAnimeEpisode component
function RecentAnimeEpisode({ navigation }) {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const url = 'https://consumet-api-pied.vercel.app/anime/gogoanime/recent-episodes';

  // Function to fetch data from the API
  const fetchData = async (page) => {
    try {
      const { data } = await axios.get(url, { params: { page, type: 1 } });
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

const screenWidth = Dimensions.get('window').width;
const imageBackgroundWidth = screenWidth *.3;

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.url, item.id)} style={tw`mx-auto`}>
        <View style={tw`flex-row items-center relative my-2`}>
          {/* Background image */}
          <ImageBackground source={{ uri: item.image }} style={[tw`h-44`, { width: imageBackgroundWidth }]}>
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
  const handleItemPress = (url, id) => {
    // Navigate to 'AnimeInfo' screen and pass the 'id' as a parameter
    navigation.navigate('AnimeInfo', {
      id: id
    });
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`bg-black flex-1`}>
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
          <FlatList
            data={results}
            keyExtractor={(item) => item.episodeId}
            renderItem={renderItem}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-28`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          // Activity Loader
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#DB202C" />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default RecentAnimeEpisode;
