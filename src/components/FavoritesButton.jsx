import { View, Text, TouchableOpacity } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavoriteShowsLocalStorage } from './redux/actions/FavoritesActions';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const FavoritesButton = ({ type, id, title, image, provider }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteShows, setFavoriteShows] = useState([]);
    // Define a key to force a re-render when the component re-mounts
    const [componentRemountKey, setComponentRemountKey] = useState(0);
    const favoritesInfo = {
        id: id,
        title: title,
        image: image,
        type: type,
        provider: provider
    };
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    useEffect(() => {
        const fetchData = async () => {
            const storedData = await AsyncStorage.getItem('favoriteShows');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setFavoriteShows(parsedData);
            }
        };
        fetchData();
    }, [componentRemountKey]);

    useEffect(() => {
        setIsFavorite(favoriteShows.some(favorite => favorite.id === id));
    }, [id, favoriteShows]);

    const addToFavoritesHandler = () => {
        if (isFavorite) {
            const newFavorites = favoriteShows.filter(favorite => favorite.id !== id);
            AsyncStorage.setItem('favoriteShows', JSON.stringify(newFavorites));
            dispatch(setFavoriteShowsLocalStorage(newFavorites));
        } else {
            favoriteShows.push(favoritesInfo);
            AsyncStorage.setItem('favoriteShows', JSON.stringify(favoriteShows));
            dispatch(setFavoriteShowsLocalStorage(favoriteShows));
        }
        // Increment the key to trigger a re-render when the component re-mounts
        setComponentRemountKey((prevKey) => prevKey + 1);
        ReactNativeHapticFeedback.trigger("impactHeavy",
            {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false,
            });
    };
    const favoriteIcon = isFavorite ?
        <Ionicons name="heart" size={18} color="#D3D3D3" />
        :
        <Ionicons name="heart-outline" size={18} color="#D3D3D3" />;
    const favoriteText = isFavorite ? "Added to Favorites" : "Add to Favorites";

    return (
        <TouchableRipple style={tw`items-center ml-auto w-40 rounded-full p-1`} onPress={addToFavoritesHandler}
            rippleColor="rgba(219,32,44,1)"
            borderless={true}
            >
            <>
                {favoriteIcon}
                <Text style={tw`text-[#D3D3D3] text-xs px-2`}>{favoriteText}</Text>
            </>
        </TouchableRipple>
    )
}

export default FavoritesButton;
