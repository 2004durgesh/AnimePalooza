import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MangaChapterPages from "../Manga/MangaChapterPages";
import MangaInfo from "../Manga/MangaInfo";
import MangaSearch from "../Manga/MangaSearch";
import Providers from './Providers';

// Create a native stack navigator
const Stack = createNativeStackNavigator();

// Movies component contains navigation stack for different screens
const Manga = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                {/* Providers Screen */}
                <Stack.Screen
                    name="Providers"
                    component={Providers}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="MangaChapterPages"
                    component={MangaChapterPages}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MangaInfo"
                    component={MangaInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MangaSearch"
                    component={MangaSearch}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default Manga;
