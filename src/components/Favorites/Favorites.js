// Import required libraries
import React from 'react';
import tw from 'twrnc';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AnimeFavorites,MoviesFavorites,MangaFavorites} from './index.js';
import { topTabScreenOptions } from '../constants/navigation.constants.js';

// Import screen components


// Create Material Top Tab Navigator
const Tab = createMaterialTopTabNavigator();
const Favorites = () => {
    return (
        <SafeAreaView style={tw`bg-black flex-1`}>
            <Tab.Navigator
                screenOptions={topTabScreenOptions}
            >
                {/* Screen for Trending */}
                <Tab.Screen
                    name="Anime"
                    component={AnimeFavorites}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons name="video-library" size={25} color={focused ? "white" : "gray"} />
                        ),
                    }}
                />
                {/* Screen for Latest */}
                <Tab.Screen
                    name="Manga"
                    component={MangaFavorites}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons name="my-library-books" size={25} color={focused ? "white" : "gray"} />
                        ),

                    }}
                />
                {/* Screen for Search */}
                <Tab.Screen
                    name="Movie"
                    component={MoviesFavorites}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons name="movie" size={25} color={focused ? "white" : "gray"} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default Favorites;