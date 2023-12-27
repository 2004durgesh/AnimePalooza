import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import _ from 'lodash';
import Config from "../constants/env.config";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PageNavigation from '../PageNavigation';

const MangaSearch = ({ route, navigation }) => {
  // Extract the provider from route params
  const provider = route.params.provider;

  // State variables
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [currentQuery, setCurrentQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // API URL
  const url = `${Config.API_BASE_URL}/manga/${provider}/${text}`;

  // Function to fetch search results from the API
  const fetchData = async (page) => {
    try {
      if (text === currentQuery) {
        const { data } = await axios.get(url, {
          params: { page: page },
          headers: { 'x-api-key': Config.API_KEY }
        });
        setSearchResults(data.results);
        setCurrentPage(page);
        console.log('fetchData function called')
      }
    } catch (err) {
      setIsLoaded(false);
      throw new Error(err.message);
    } finally {
      setIsLoaded(false);
    }
  };
  const debouncedFetch = _.debounce(fetchData, 2000);
  useEffect(() => {
    AsyncStorage.getItem('favoriteShows').then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        setFavorites(parsedData);
      }
    }
    );
  }, []);
  useEffect(() => {
    // Fetch data whenever the search text changes
    if (text !== '') {
      setCurrentQuery(text);
      debouncedFetch(currentPage);
    } else {
      // Clear the search results when the search text is empty
      setSearchResults([]);
    }
  }, [text, currentPage]);

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

  // Function to handle search
  const handleSearch = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();
    // Fetch data for the first page
    setCurrentPage(1);
    console.log('handleSearch function called')

    fetchData(1);
  };
  const debouncedSearch = _.debounce(handleSearch, 1000);

  // Render each manga item
  const renderItem = ({ item }) => {
    const isAdultContent = item.contentRating !== 'safe';

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleItemPress(item.url, item.id)}
        style={tw`mx-1 p-2`}
      >
        <View style={tw`rounded-lg p-4 border border-gray-500`}>
          <Text style={tw`text-white font-bold mb-2 text-center`} numberOfLines={1}>
            {item.title}
          </Text>
          {favorites
                .filter((favItem) => favItem.id === item.id)
                .map((favItem) => (
                  <View key={favItem.id} style={tw`absolute top-2 left-2`}>
                    <MaterialIcons name="favorite" size={20} color="#DB202C" style={tw``} />
                  </View>
                ))}
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
      provider: provider,
    });
  };

  return (
    <SafeAreaView style={tw`bg-black h-full`}>
      {/* Header with Back Button */}
      <ScrollView>
        <View style={tw`p-4 mt-4 mx-2 w-full mx-auto`}>
          {/* Search Input */}
          <TextInput
            onChangeText={(text) => {
              onChangeText(text);
              // debouncedSearch();
            }}
            placeholder='Search...'
            inputMode='search'
            value={text}
            placeholderTextColor='#A0AEC0'
            onSubmitEditing={() => debouncedSearch()}
            style={tw`bg-black h-16 m-2 border-2 border-gray-300 text-white rounded-lg px-4 text-lg`}
          />
          {text !== '' && (
            <Text style={tw`mt-2 text-gray-800 text-lg text-white`}>You searched for: {text.trim()}</Text>
          )}
          <PageNavigation currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
          {/* Activity Loader or FlatList */}
          {isLoaded ? (
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
};

export default MangaSearch;
