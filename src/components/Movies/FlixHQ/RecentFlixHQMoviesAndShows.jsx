import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RecentFlixHQMoviesAndShows = ({typeOfService}) => {
  const navigation = useNavigation();
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const url = `https://consumet-api-pied.vercel.app/movies/flixhq/${typeOfService}`;

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setResults(data);
      setIsLoaded(false); // Show the activity loader
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setIsLoaded(false); // Hide the activity loader after data fetching is done
    }
  };

  // Fetch data on component mount and whenever the currentPage changes
  useEffect(() => {
    fetchData();
  }, []);

  const screenWidth = Dimensions.get('window').width;
  const imageBackgroundWidth = screenWidth * .3;

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => {
    return (
    <TouchableOpacity onPress={() =>{ handleItemPress(item.url, item.id);console.log(item.id)}} style={tw`mx-auto`}>
        <View style={tw`flex-row items-center relative my-2`}>
          {/* Background image */}
          <ImageBackground source={{ uri: item.image }} style={[tw`h-44`, { width: imageBackgroundWidth }]}>
            {/* Text and episode number */}
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']} style={{ height: '100%', width: '100%' }}>
              <View style={tw`absolute w-28 h-44 pl-3 -bottom-32`}>
                <Text style={tw`font-bold text-white`} numberOfLines={2}>
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
    // Navigate to 'FlixHQInfo' screen and pass the 'id' as a parameter
    navigation.navigate('FlixHQInfo', {
      id: id
    });
  };


  return (
      <View style={tw`bg-black`}>
      <Text style={tw`text-white text-2xl font-bold mb-5 pl-2 capitalize`}>{typeOfService}</Text>
        {/* FlatList to render the items */}
        {!isLoaded ? (
          // If data is loaded, show the FlatList
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={tw`mx-2 mb-10`}
            showsVerticalScrollIndicator={false}
            horizontal={true}
            ItemSeparatorComponent={<View style={tw`mx-2`}></View>}
          />
        ) : (
          // If data is loading, show the Activity Loader
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="large" color="#DB202C" />
          </View>
        )}
      </View>
  );
};

export default RecentFlixHQMoviesAndShows