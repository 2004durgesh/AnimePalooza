import { View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'twrnc';
import { FontAwesome, Ionicons, Fontisto, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const MangaSearch = ({ route, navigation }) => {
  // Extract the provider from route params
  const provider = route.params.provider;

  // State variables
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // API URL
  const url = `https://consumet-api-pied.vercel.app/manga/${provider}/${text}`;

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

  // Render each manga item
  const renderItem = ({ item }) => {
    const isAdultContent = item.contentRating !== 'safe';

    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleItemPress(item.url, item.id)} style={tw`mx-1 p-2`}>
        <View style={tw`rounded-lg p-4 border border-gray-500`}>
          <Text style={tw`text-white font-bold mb-2 text-center`} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={tw`flex-row items-center gap-1`}>
            {item.status === 'completed' ? (
              <Ionicons name="checkmark-done" size={15} color="#D3D3D3" />
            ) : (
              <Feather name="clock" size={15} color="#D3D3D3" />
            )}
            <Text style={tw`text-gray-300 mb-1`}>
              Status: <Text style={tw`capitalize`}>{item.status}</Text>
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-1`}>
            <Fontisto name="date" size={15} color="#D3D3D3" />
            <Text style={tw`text-gray-300 mb-1`}>
              Release Date: {item.releaseDate ? <Text>{item.releaseDate}</Text> : <Text>-- --</Text>}
            </Text>
          </View>
          {isAdultContent && (
            <View style={tw`bg-red-600 rounded-md p-1 mt-2`}>
              <Text style={tw`text-white text-sm text-center`}>
                Warning: This manga may contain adult content.
              </Text>
            </View>
          )}
          <Text style={tw`text-gray-300`} numberOfLines={3} ellipsizeMode='tail'>
            {item.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // Function to handle item press
  const handleItemPress = (url, id) => {
    navigation.navigate('MangaInfo', {
      id: id,
      provider: provider
    });
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      {/* Header with Back Button */}
      <ScrollView>
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
            <Text style={tw`mt-2 text-gray-800 text-lg text-white`}>You searched for: {text.trim()}</Text>
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
              contentContainerStyle={tw`pb-96`}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MangaSearch;
