import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NewsFeeds from './NewsFeeds';
import NewsInfo from './NewsInfo';

// Create a native stack navigator
const Stack = createNativeStackNavigator();

const News = () => {
  return (
    // Wrap the entire component with SafeAreaProvider for safe rendering
    <SafeAreaProvider>
      {/* Create a stack navigator */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Configure screens using Stack.Screen */}
        <Stack.Screen name="NewsFeeds" component={NewsFeeds} />
        <Stack.Screen name="NewsInfo" component={NewsInfo} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default News;
