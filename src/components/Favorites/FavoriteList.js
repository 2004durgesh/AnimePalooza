import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import RenderItemCards from '../RenderItemCards';
import ActivityLoader from '../ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteList = ({ navigation, favoriteType }) => {
  // const favoriteShows = useSelector((state) => state.favorites.favoriteShows);
  const [favorites, setFavorites] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const state = useSelector((state) => state);
  // Define a key to force a re-render when the component re-mounts
  const [componentRemountKey, setComponentRemountKey] = useState(0);

    const onRefresh = useCallback(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }, []);

  useEffect(() => {
    AsyncStorage.getItem('favoriteShows').then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Data from AsyncStorage:', parsedData);
        setFavorites(parsedData);
      }
    }
    );
    // Increment the key to trigger a re-render when the component re-mounts
    setComponentRemountKey((prevKey) => prevKey + 1);
  }, [state.favoriteShows.favoriteShows]);

  console.log('Favorites:', favoriteType,favorites);
 
    const handleItemPress = (url, id) => {
    let screenName = '';
    if (favoriteType === 'movies') {
      const movieProviderNavigator = id.split('/')[0];
      screenName = movieProviderNavigator === 'movie' ? 'FlixHQInfo' : 'DramacoolInfo';
    } else {
      switch (favoriteType) {
        case 'anime':
          screenName = 'AnimeInfo';
          break;
        case 'manga':
          screenName = 'MangaInfo';
          break;
        default:
          screenName = 'AnimeInfo';
      }
    }

    navigation.navigate(screenName, {
      id,
    });
  };


  return (
    <SafeAreaView style={tw`bg-black flex-1`}>
  {favorites.filter((favorite) => favorite.type === favoriteType).length > 0 ? (
    <FlatList
      data={favorites.filter((favorite) => favorite.type === favoriteType)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <RenderItemCards item={item} handleItemPress={handleItemPress} />
      )}
      numColumns={3}
      contentContainerStyle={tw`pb-28`}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  ) : (
    <View style={tw`flex-1 justify-center items-center gap-4`}>
      <Text style={tw`text-white text-4xl font-bold`}>{'.·´¯`(>__<)´¯`·.'}</Text>
      <Text style={tw`text-white font-bold`}>No favorites found .{favoriteType}</Text>
    </View>
  )}
</SafeAreaView>

  );
};

export default FavoriteList;
