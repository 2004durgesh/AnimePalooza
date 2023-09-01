import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AnimeSearch = () => {
  const navigation = useNavigation()
  const [text, onChangeText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://consumet-api-pied.vercel.app/anime/gogoanime/${text}`;

  // Function to fetch search results from the API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(url, { params: { page: 1 } });
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

  
const screenWidth = Dimensions.get('window').width;
const imageBackgroundWidth = screenWidth * 0.3;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item.url, item.id)} style={tw`mx-1`}>
        <View style={tw`flex-row items-center relative my-2`}>
          {/* Background image */}
          <ImageBackground source={{ uri: item.image }} sstyle={[tw`h-44`, { width: imageBackgroundWidth }]}>
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
    // Implement the logic to handle the press, e.g., navigate to the AnimeInfo screen
    navigation.navigate('AnimeInfo', {
      id: id
    })
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`p-2 mx-2 w-full mx-auto`}>
        {/* Search Input */}
        <TextInput
          style={tw`h-16 p-2 border-b-2 border-gray-300 text-white`}
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
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-36`}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AnimeSearch;
