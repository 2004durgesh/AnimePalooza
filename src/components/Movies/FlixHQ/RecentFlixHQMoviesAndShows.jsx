import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Config from "../../constants/env.config";
import { useNavigation,useIsFocused } from '@react-navigation/native';
import RenderItemCards from '../../RenderItemCards';
import ActivityLoader from '../../ActivityLoader';

const RecentFlixHQMoviesAndShows = ({ typeOfService }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState('');
  const [swipeEnabled, setSwipeEnabled] = useState(false);
  const url = `${Config.API_BASE_URL}/movies/flixhq/${typeOfService}`;

  useLayoutEffect(() => {
    navigation.setOptions({
      swipeEnabled: swipeEnabled
    });
  }, [swipeEnabled]);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url,{
        headers:{'x-api-key': Config.API_KEY}
      });
      setResults(data);
      setIsLoaded(false); // Show the activity loader
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setIsLoaded(false); // Hide the activity loader after data fetching is done
    }
  };

  // Fetch data on component mount and whenever the currentPage changes
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    } else {
      setSwipeEnabled(false); // Disable swipe navigation when the tab is not in focus
    }
  }, [isFocused]);
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
          renderItem={({ item,index }) => <RenderItemCards item={item} index={index} handleItemPress={handleItemPress}/>}
          contentContainerStyle={tw`mx-2 mb-10`}
          showsVerticalScrollIndicator={false}
          horizontal={true}
          onEndReached={() => {setSwipeEnabled(true)}}
          onStartReached={() => {setSwipeEnabled(true)}}
        />
      ) : (
        // If data is loading, show the Activity Loader
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityLoader/>
        </View>
      )}
    </View>
  );
};

export default RecentFlixHQMoviesAndShows