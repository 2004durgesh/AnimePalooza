import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import tw from 'twrnc';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const FlixHQSearch = () => {
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://flixhq.durgesh-kumark3.repl.co/flixhq/search?searchValue=${text}`;


  // Function to fetch search results from the API
  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url, { params: { page } });
      setSearchResults(data.results);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data whenever the search text changes
    if (text !== '') {
      fetchData(currentPage);
    } else {
      // Clear the search results when the search text is empty
      setSearchResults([]);
    }
  }, [text]);

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

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.url, item.id)} style={tw`mx-1`}>
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
    // Implement the logic to handle the press, e.g., navigate to the AnimeInfo screen
    navigation.navigate('FlixHQInfo', {
      id: id
    })
  };
  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      {/* Header with Back Button and Share Button */}
      <View style={tw`flex-row justify-between`}>
        <Ionicons name="arrow-back-circle-sharp" size={40} color="white" style={tw`m-6`} onPress={() => { navigation.goBack() }} />
      </View>

      <View style={tw`p-4 mt-4 mx-2 w-full mx-auto`}>
        {/* Search Input */}
        <TextInput
          style={tw`h-16 p-2 py-4 border-b-2 border-gray-300 text-white`}
          onChangeText={onChangeText}
          placeholder='Search...'
          value={text}
          placeholderTextColor='#A0AEC0'
        />
        {text !== '' && (
          <Text style={tw`mt-2 text-gray-800 text-lg text-white`}>You searched for: {text}</Text>
        )}
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
        {/* Activity Loader or FlatList */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#DB202C" />
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-72`}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default FlixHQSearch