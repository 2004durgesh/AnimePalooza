import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import axios from 'axios';
import Config from "../constants/env.config";
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import PageNavigation from '../PageNavigation';
import RenderItemCards from '../RenderItemCards';
import ActivityLoader from '../ActivityLoader';

const TopAiringAnime = ({ navigation }) => {
  // State to hold the results from the API
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const url = `${Config.API_BASE_URL}/anime/gogoanime/popular`;

  // Function to fetch data from the API
  const fetchData = async (page) => {
    setIsLoadingMore(true);
    try {
      const { data } = await axios.get(url, {
        params: { page, type: 1 },
        headers: { 'x-api-key': Config.API_KEY }
      });
      setResults(prevResults => [...prevResults, ...data.results]);
      setHasNextPage(data.hasNextPage);
      setIsLoaded(true);
      console.log('Data:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchData(currentPage);
  }, []);

  // Function to handle navigation to the next page
  const handleNextPage = () => {
    if (hasNextPage && !isLoadingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchData(nextPage);
    }
  };

  // Function to handle navigation to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1 && !isLoadingMore) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      // Fetch the previous page data and reset the results array
      fetchData(prevPage);
    }
  };

  // Function to handle item press (can be further implemented)
  const handleItemPress = (url, id) => {
    // Navigate to 'AnimeInfo' screen and pass the 'id' as a parameter
    navigation.navigate('AnimeInfo', {
      id: id,
    });
  };

  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
      {/* <PageNavigation
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        isLoaded={isLoaded}
        error={error}
      /> */}
      {/* FlatList to render the items */}
      {isLoaded ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RenderItemCards
              item={item}
              index={index}
              handleItemPress={handleItemPress}
            />
          )}
          numColumns={3} // Use the numColumns prop to show 3 items in a row
          contentContainerStyle={tw`pb-28`}
          showsVerticalScrollIndicator={false}
          onEndReached={handleNextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            isLoadingMore ? <ActivityLoader/> : null
          }
        />
      ) : (
        <ActivityLoader />
      )}
    </SafeAreaView>
  );
};

export default TopAiringAnime;
