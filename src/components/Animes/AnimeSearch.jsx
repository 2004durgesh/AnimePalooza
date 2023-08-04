import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';
import axios from "axios";
import { SafeAreaView} from 'react-native-safe-area-context';


const AnimeSearch = () => {
  const [text, onChangeText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `https://api.consumet.org/anime/gogoanime/${text}`;

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
      fetchData();
    } else {
      // Clear the search results when the search text is empty
      setSearchResults([]);
    }
  }, [text]);

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
                {/* <Text style={tw`font-bold text-white text-sm`}>Episode {item.episodeNumber}</Text> */}
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`p-4 mt-4 mx-2 w-full mx-auto`}>
        {/* Search Input */}
        <TextInput
          style={tw`h-16 p-2 py-4 border-b-2 border-gray-300`}
          onChangeText={onChangeText}
          placeholder='Search...'
          value={text}
          placeholderTextColor='#A0AEC0'
        />
        {text !== '' && (
          <Text style={tw`mt-2 text-gray-800 text-lg`}>You searched for: {text}</Text>
        )}
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
