import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Keyboard, } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import Config from "./constants/env.config";
import PageNavigation from './PageNavigation';
import RenderItemCards from './RenderItemCards';
import ActivityLoader from './ActivityLoader';

const SearchBar = ({type,provider}) => {
  const navigation = useNavigation();
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${Config.API_BASE_URL}/${type}/${provider}/${text}`;
  // Function to fetch search results from the API
  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url, { 
        params: { page: page },
        headers:{'x-api-key': Config.API_KEY} });
      setSearchResults(data.results);
      setCurrentPage(page);
      setHasNextPage(data.hasNextPage);
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

  // Function to handle search
  const handleSearch = () => {
    // Dismiss the keyboard
    Keyboard.dismiss();
    // Fetch data for the first page
    setCurrentPage(1);
    fetchData(1);
  };

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Implement the logic to handle the press, e.g., navigate to the AnimeInfo screen
    if(type === 'anime'){
      navigation.navigate('AnimeInfo', {
        id: id,
      });
    }
    if(type==='movies' && provider==='dramacool'){
      navigation.navigate('DramacoolInfo', {
        id: id,
      });
    }

    if(type==='movies' && provider==='flixhq'){
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
          style={tw`h-16 p-2 border-b-2 border-gray-300 text-white`}
          onChangeText={onChangeText}
          placeholder="Search..."
          value={text}
          placeholderTextColor="#A0AEC0"
          onSubmitEditing={handleSearch}
        />

        {text !== '' && (
          <Text style={tw`mt-2 text-gray-800 text-lg text-white`}>You searched for: {text.trim()}</Text>
        )}

        {hasNextPage ? <PageNavigation currentPage={currentPage} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} /> : null}
        {/* Activity Loader or FlatList */}
        {isLoading ? (
          <ActivityLoader style={tw`mt-20`}/>
        ) : (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RenderItemCards item={item} handleItemPress={handleItemPress} />}
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
