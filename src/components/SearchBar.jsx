import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Keyboard } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import _ from 'lodash'; // Import Lodash
import { Searchbar } from 'react-native-paper';
import Config from "./constants/env.config";
import PageNavigation from './PageNavigation';
import RenderItemCards from './RenderItemCards';
import ActivityLoader from './ActivityLoader';

const SearchBar = ({ type, provider }) => {
  const navigation = useNavigation();
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

  const url = `${Config.API_BASE_URL}/${type}/${provider}/${text}`;

  // Function to fetch search results from the API
  async function fetchData(page) {
    try {
      if (text === currentQuery) {
        const { data } = await axios.get(url, {
          params: { page: page },
          headers: { 'x-api-key': Config.API_KEY }
        });
        setSearchResults(data.results);
        setCurrentPage(page);
        setHasNextPage(data.hasNextPage);
        console.log('fetchData function called')
      }
    }
    catch (err) {
      setError(err.message);
      throw new Error(err.message);
    } finally {
      setIsLoaded(false);
    }
  }

  const debouncedFetch = _.debounce(fetchData, 2000);

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
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle navigation to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Implement the logic to handle the press, e.g., navigate to the AnimeInfo screen
    if (type === 'anime') {
      navigation.navigate('AnimeInfo', {
        id: id,
      });
    }
    if (type === 'movies' && provider === 'dramacool') {
      navigation.navigate('DramacoolInfo', {
        id: id,
      });
    }

    if (type === 'movies' && provider === 'flixhq') {
      navigation.navigate('FlixHQInfo', {
        id: id,
      });
    }
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`p-2 mx-2 w-full mx-auto`}>
        {/* Search Input */}
        <TextInput
          placeholder="Search"
          inputMode='search'
          onChangeText={(text) => {
            onChangeText(text);
            // debouncedSearch();
          }}
          value={text}
          onSubmitEditing={() => debouncedSearch()}
          style={tw`bg-black h-16 m-2 border-2 border-gray-300 text-white rounded-lg px-4 text-lg`}
        />
        {text !== '' && (
          <Text style={tw`mt-2 text-gray-800 text-lg text-white`}>You searched for: {text.trim()}</Text>
        )}

        {hasNextPage ? <PageNavigation currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} isLoaded={isLoaded} error={error} /> : null}
        {/* Activity Loader or FlatList */}
        {isLoaded ? (
          <ActivityLoader style={tw`mt-20`} />
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => <RenderItemCards item={item} index={index} handleItemPress={handleItemPress} />}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-96`}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;
