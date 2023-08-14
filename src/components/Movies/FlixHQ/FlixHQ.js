import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlixHQInfo from "./FlixHQInfo";
import FlixHQSearch from "./FlixHQSearch";
import StreamingLinks from './StreamingLinks';
import Recommendations from './Recommendations';

// Create a native stack navigator
const Stack = createNativeStackNavigator();
// Movies component contains navigation stack for different screens
const FlixHQ = () => {
    return (
        <SafeAreaProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="FlixHQSearch"
                        component={FlixHQSearch}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="FlixHQInfo"
                        component={FlixHQInfo}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="StreamingLinks"
                        component={StreamingLinks}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Recommendations"
                        component={Recommendations}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}

export default FlixHQ;
