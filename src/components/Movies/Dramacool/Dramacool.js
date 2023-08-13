import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DramacoolInfo from "./DramacoolInfo";
import DramacoolSearch from "./DramacoolSearch";
import StreamingLinks from './StreamingLinks';

// Create a native stack navigator
const Stack = createNativeStackNavigator();
// Movies component contains navigation stack for different screens
const Movies = () => {
    return (
        <SafeAreaProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="DramacoolSearch"
                        component={DramacoolSearch}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="DramacoolInfo"
                        component={DramacoolInfo}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="StreamingLinks"
                        component={StreamingLinks}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default Movies;
