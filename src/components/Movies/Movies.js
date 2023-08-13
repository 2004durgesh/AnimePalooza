import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dramacool from "../Movies/Dramacool/Dramacool";
import FlixHQSearch from "../Movies/FlixHQ/FlixHQSearch";
import Providers from './Providers';

// Create a native stack navigator
const Stack = createNativeStackNavigator();

// Movies component contains navigation stack for different screens
const Movies = () => {
    return (
        <SafeAreaProvider>
                <Stack.Navigator>
                    {/* Providers Screen */}
                    <Stack.Screen
                        name="Providers"
                        component={Providers}
                        options={{ headerShown: false }}
                    />

                    {/* Individual Movie/Provider Screens */}
                    <Stack.Screen
                        name="Dramacool"
                        component={Dramacool}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FlixHQSearch"
                        component={FlixHQSearch}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default Movies;
