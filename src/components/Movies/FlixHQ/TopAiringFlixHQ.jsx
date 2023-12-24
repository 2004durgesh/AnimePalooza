import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';
import tw from 'twrnc';
import Config from "../../constants/env.config";
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderItemCards from '../../RenderItemCards';
import ActivityLoader from '../../ActivityLoader';

const TopAiringFlixHQ = ({navigation}) => {
  // State to hold the results from the API
  const [results, setResults] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [error, setError] = useState('');
  const url = `${Config.API_BASE_URL}/movies/flixhq/trending`;

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url,{
        headers:{'x-api-key': Config.API_KEY}
      });
      setResults(data.results);
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

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Navigate to 'FlixHQInfo' screen and pass the 'id' as a parameter
    navigation.navigate('FlixHQInfo', {
      id: id
    });
  };


  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      <View style={tw`bg-black flex-1`}>
        {/* FlatList to render the items */}
        {!isLoaded ? (
          // If data is loaded, show the FlatList
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item,index }) => <RenderItemCards item={item} index={index} handleItemPress={handleItemPress}/>}
            numColumns={3} // Use the numColumns prop to show 3 items in a row
            contentContainerStyle={tw`pb-28`}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          // If data is loading, show the Activity Loader
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityLoader/>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TopAiringFlixHQ